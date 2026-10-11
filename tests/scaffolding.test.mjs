import test from 'node:test';
import assert from 'node:assert/strict';
import {createSession, submitInitial, submitReflection, finishGuidance, chooseStrategy, submitResponse, beginTransfer, submitUnaided, view, record, implementationTrace, policyEntry, VERSION} from '../scaffolding/engine.mjs';
import {POLICIES, MODES, STRATEGIES, policyFor, strategyFor, configurationFromQuery} from '../scaffolding/policies.mjs';
import {SCENARIOS} from '../scaffolding/scenarios.mjs';

const firstText = 'My own initial reading is uncertain.';
const ownResponse = 'Could we talk about what would work for both of us?';
function toStrategy(mode, scenario = 'team') {
  let s = submitInitial(createSession(mode, scenario, 1000), firstText, 1010);
  if (mode === 'scaffolding') {
    for (let i = 0; i < policyFor(mode).steps.length; i++) s = submitReflection(s, 'My own reflection ' + i + '.', 1020 + i);
  } else s = finishGuidance(s, 1020);
  return s;
}
function toWithdrawal(mode, scenario = 'team', strategy = 'clarify') {
  return submitResponse(chooseStrategy(toStrategy(mode, scenario), strategy, 1030), ownResponse, 1040);
}

for (const mode of MODES) {
  for (const scenario of SCENARIOS) {
    test(mode + '/' + scenario.id + ': complete seven-phase flow, unaided boundary and descriptive record', () => {
      const initial = createSession(mode, scenario.id, 1000);
      assert.equal(initial.phase, 'initial');
      assert.deepEqual(Object.keys(view(initial)).sort(), ['context','phase','title']);
      const strategy = toStrategy(mode, scenario.id);
      assert.equal(strategy.phase, 'strategy');
      const response = chooseStrategy(strategy, 'clarify', 1030);
      assert.equal(response.phase, 'response');
      assert.equal(Boolean(view(response).draft), mode === 'substitution');
      const withdrawal = submitResponse(response, ownResponse, 1040);
      assert.equal(withdrawal.phase, 'withdrawal');
      const transfer = beginTransfer(withdrawal, 1050);
      assert.deepEqual(Object.keys(view(transfer)).sort(), ['context','phase','title']);
      assert.notEqual(view(transfer).context, view(initial).context);
      for (const text of [firstText, ownResponse, ...strategy.reflections.map(r => r.text)]) assert.ok(!JSON.stringify(view(transfer)).includes(text));
      assert.equal(implementationTrace(transfer), null);
      const finished = submitUnaided(transfer, 'Let us find a time that works for both of us.', 1060);
      assert.equal(finished.phase, 'review');
      assert.equal(view(finished).stageOneResponse, ownResponse);
      assert.equal(view(finished).initialInterpretation, firstText);
      const output = record(finished);
      assert.equal(output.schemaVersion, 'prototype02.demo.v3');
      assert.equal(output.notResearchData, true);
      assert.equal(output.version, VERSION);
      assert.equal('score' in output, false);
      assert.equal('classification' in output, false);
      assert.equal(output.reflections.length, mode === 'scaffolding' ? 5 : 0);
      assert.deepEqual(output.events.slice(-3).map(e => e.type), ['first_task_completed','transfer_started','transfer_submitted']);
      assert.equal(output.events.at(-2).payload.assistanceWasPresent, mode !== 'independent');
    });
  }
}

test('all routes require an initial interpretation before help and reject empty/oversized text', () => {
  for (const mode of MODES) {
    const s = createSession(mode, 'team');
    for (const invalid of ['', ' a ', null, 'x'.repeat(1201)]) assert.throws(() => submitInitial(s, invalid));
    assert.throws(() => finishGuidance(s));
    assert.throws(() => chooseStrategy(s, 'clarify'));
    assert.equal(s.phase, 'initial');
    assert.equal(s.events.length, 1);
    assert.equal(submitInitial(s, '  Valid reading.  ').initialInterpretation, 'Valid reading.');
  }
});

test('the scaffold cannot skip prompts and non-scaffold modes cannot submit them', () => {
  let s = submitInitial(createSession('scaffolding', 'team'), firstText);
  for (let i = 0; i < 5; i++) {
    assert.throws(() => finishGuidance(s));
    assert.throws(() => chooseStrategy(s, 'clarify'));
    assert.throws(() => submitReflection(s, '  '));
    s = submitReflection(s, 'Reflection ' + i);
  }
  assert.equal(s.phase, 'strategy');
  assert.deepEqual(s.reflections.map(r => r.id), ['uncertainty','evidence','perspective','alternatives','challenge']);
  assert.throws(() => submitReflection(s, 'Extra step.'));
  for (const mode of ['substitution','independent']) assert.throws(() => submitReflection(submitInitial(createSession(mode, 'team'), firstText), 'A reflection.'));
});

test('strategy is a required, allowlisted self-report and every definition is routable', () => {
  const s = toStrategy('independent');
  for (const invalid of ['', 'toString', 'unknown', undefined]) assert.throws(() => chooseStrategy(s, invalid));
  assert.throws(() => submitResponse(s, ownResponse));
  for (const strategy of STRATEGIES) {
    const response = chooseStrategy(s, strategy.id, 1030);
    assert.equal(view(response).strategy.definition, strategy.definition);
    assert.deepEqual(response.events.at(-1).payload, {strategyId: strategy.id});
  }
  assert.throws(() => strategyFor('constructor'));
});

test('first response, explicit withdrawal and novel response cannot be bypassed', () => {
  const response = chooseStrategy(toStrategy('substitution'), 'clarify', 1030);
  assert.throws(() => beginTransfer(response));
  assert.throws(() => submitResponse(response, ''));
  const withdrawal = submitResponse(response, ownResponse, 1040);
  assert.throws(() => submitUnaided(withdrawal, 'New response.'));
  const transfer = beginTransfer(withdrawal, 1050);
  assert.throws(() => submitUnaided(transfer, 'ab'));
  const final = submitUnaided(transfer, 'New response.', 1060);
  assert.throws(() => submitUnaided(final, 'Another response.'));
  assert.throws(() => beginTransfer(final));
});

test('independent policy entry has no reading, action or draft; all entries use real scenario content', () => {
  for (const mode of MODES) {
    const entry = policyEntry(mode, 'plans');
    assert.equal(entry.context, SCENARIOS[1].context);
    if (mode === 'independent') {assert.equal(entry.independent, true);assert.equal('guidance' in entry, false);assert.equal('prompt' in entry, false);}
  }
  assert.equal(policyEntry('scaffolding','team').prompt.id, 'uncertainty');
  assert.ok(Object.isFrozen(POLICIES.scaffolding.steps[0]));
});

test('public routing only selects allowed configuration and cannot inject text or progress', () => {
  for (const mode of MODES) assert.equal(configurationFromQuery('?mode='+mode).mode, mode);
  assert.deepEqual(configurationFromQuery('?mode=independent&scenario=plans&embed=1&response=secret&phase=review'), {mode:'independent',scenarioId:'plans',embedded:true});
  assert.equal(configurationFromQuery('?embed=yes').embedded, false);
  assert.throws(() => configurationFromQuery('?mode=toString'));
  assert.throws(() => configurationFromQuery('?scenario=unknown'));
  assert.throws(() => createSession('invalid', 'team'));
});

test('records, review objects and event traces are detached from this page and another session', () => {
  const state = submitUnaided(beginTransfer(toWithdrawal('scaffolding'), 1050), 'A new reply.', 1060);
  const exported = record(state), review = view(state), trace = implementationTrace(state);
  exported.reflections[0].text = 'edited';
  exported.events[0].payload.policyId = 'edited';
  review.reflections[0].text = 'edited';
  review.strategy.definition = 'edited';
  trace.events[0].payload.policyId = 'edited';
  assert.notEqual(state.reflections[0].text, 'edited');
  assert.equal(state.events[0].payload.policyId, 'guided-judgment');
  assert.notEqual(view(state).strategy.definition, 'edited');
  assert.equal(createSession('scaffolding','team').reflections.length, 0);
});

test('ordered minimal events omit free text and reject invalid or decreasing clocks', () => {
  const initial = createSession('scaffolding', 'team', 1000);
  const next = submitInitial(initial, firstText, 1010);
  assert.equal(initial.events.length, 1);
  assert.deepEqual(next.events.map(e => e.sequence), [1,2]);
  assert.deepEqual(next.events.at(-1).payload, {characters:firstText.length});
  assert.ok(!JSON.stringify(next.events).includes(firstText));
  for (const invalid of [1009,NaN,Infinity]) assert.throws(() => submitReflection(next,'Valid reflection.',invalid));
  assert.throws(() => createSession('independent','team',Infinity));
  const completed = toWithdrawal('scaffolding');
  assert.deepEqual(completed.events.map(e=>e.sequence), completed.events.map((_,i)=>i+1));
  assert.ok(!JSON.stringify(completed.events).includes('My own reflection'));
});

test('invalid policy version, phase and reflection sequence are rejected', () => {
  const s = createSession('scaffolding','team');
  for (const changed of [{mode:'unknown'},{policyVersion:'future'},{phase:'unrecognized'},{step:5},{phase:'transfer'}]) assert.throws(() => view({...s,...changed}));
  const started = submitInitial(s,firstText);
  assert.throws(() => view({...started,phase:'strategy'}));
  assert.throws(() => view({...started,step:1,reflections:[{id:'response',text:'Wrong sequence.'}]}));
});
