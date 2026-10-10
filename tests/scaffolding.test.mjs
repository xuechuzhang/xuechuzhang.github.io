import test from 'node:test';
import assert from 'node:assert/strict';
import {createSession, submitAssisted, withdrawAssistance, submitUnaided, view, record, implementationTrace} from '../scaffolding/engine.mjs';
import {POLICIES, policyFor, configurationFromQuery} from '../scaffolding/policies.mjs';

function scaffold() {
  let state = createSession('scaffolding', 'team');
  for (const answer of ['Unclear intention.', 'An earlier request to discuss.', 'Maybe short on time.', 'Busy or wants input.', 'I should ask first.', 'Could we talk before the deadline?']) state = submitAssisted(state, answer);
  return state;
}

test('configuration and incomplete inputs cannot advance a session', () => {
  assert.throws(() => createSession('invalid', 'team'));
  assert.throws(() => createSession('scaffolding', 'missing'));
  const s = createSession('scaffolding', 'team');
  assert.throws(() => submitAssisted(s, '  '));
  assert.throws(() => submitAssisted(s, 'a'.repeat(1201)));
  assert.throws(() => withdrawAssistance(s));
  assert.throws(() => submitUnaided(s, 'A reply.'));
  assert.equal(s.step, 0);
});

test('scaffolding requires all six reflections before withdrawal', () => {
  const s = scaffold();
  assert.equal(s.phase, 'withdrawal');
  assert.deepEqual(s.reflections.map(r => r.id), ['uncertainty', 'evidence', 'perspective', 'alternatives', 'challenge', 'response']);
  assert.equal(s.supportedResponse, 'Could we talk before the deadline?');
  assert.throws(() => submitAssisted(s, 'More help.'));
});

test('both modes expose only the novel situation during the unaided phase', () => {
  for (const s of [scaffold(), submitAssisted(createSession('substitution', 'team'), 'My chosen reply.')]) {
    const before = view(createSession(s.mode, s.scenarioId));
    const current = view(withdrawAssistance(s));
    assert.deepEqual(Object.keys(current).sort(), ['context', 'phase', 'title']);
    assert.notEqual(current.context, before.context);
    for (const privateText of [s.supportedResponse, ...s.reflections.map(r => r.text)]) assert.ok(!JSON.stringify(current).includes(privateText));
    assert.equal(implementationTrace(withdrawAssistance(s)), null);
  }
});

test('independent sessions and inspectable records do not share mutable reflections', () => {
  const first = scaffold();
  const second = createSession('scaffolding', 'team');
  const exported = record(first);
  exported.reflections[0].text = 'changed';
  exported.events[0].payload.policyId = 'changed';
  assert.notEqual(first.reflections[0].text, 'changed');
  assert.equal(second.reflections.length, 0);
  assert.notEqual(first.events[0].payload.policyId, 'changed');
  assert.equal(exported.notResearchData, true);
});

test('completion preserves drafts as demo text and rejects further task submissions', () => {
  const s = submitUnaided(withdrawAssistance(scaffold()), 'I hope we can find another time to meet.');
  assert.equal(s.phase, 'review');
  assert.equal(view(s).unaidedResponse, 'I hope we can find another time to meet.');
  assert.throws(() => submitUnaided(s, 'Another response.'));
  assert.throws(() => withdrawAssistance(s));
  assert.equal('score' in record(s), false);
});

test('immutable policies route only public configuration, never visitor text or progress', () => {
  assert.equal(policyFor('scaffolding').steps.length, 6);
  assert.ok(Object.isFrozen(POLICIES.scaffolding.steps[0]));
  assert.throws(() => policyFor('toString'));
  assert.throws(() => configurationFromQuery('?mode=unknown'));
  assert.throws(() => configurationFromQuery('?scenario=unknown'));
  assert.deepEqual(configurationFromQuery('?mode=scaffolding&scenario=plans&response=secret&phase=review'), {mode:'scaffolding', scenarioId:'plans'});
});

test('ordered local events preserve prior state, reject invalid clocks, and omit free text', () => {
  const initial = createSession('scaffolding', 'team', 1000);
  const next = submitAssisted(initial, 'This fictional reply may be ambiguous.', 1010);
  assert.equal(initial.events.length, 1);
  assert.deepEqual(next.events.map(e => e.sequence), [1, 2]);
  assert.equal(next.events[1].payload.stepId, 'uncertainty');
  assert.ok(!JSON.stringify(next.events).includes('This fictional reply'));
  assert.throws(() => submitAssisted(next, 'A valid next answer.', 1009));
  assert.throws(() => submitAssisted(next, 'A valid next answer.', NaN));
  assert.throws(() => createSession('scaffolding', 'team', Infinity));
  assert.equal(next.step, 1);
});

test('invalid mode, policy version, phase and step cannot bypass withdrawal', () => {
  const initial = createSession('scaffolding', 'team');
  for (const changed of [{mode:'unknown'}, {policyVersion:'future'}, {step:6}, {phase:'transfer'}])
    assert.throws(() => view({...initial, ...changed}));
  assert.equal(initial.phase, 'assistance');
});

test('a completed trace records withdrawal before transfer and returns detached event objects', () => {
  const assisted = scaffold();
  const finished = submitUnaided(withdrawAssistance(assisted), 'Can we find another time?');
  const trace = implementationTrace(finished);
  assert.deepEqual(trace.events.slice(-3).map(e => e.type), ['assistance_completed','assistance_withdrawn','transfer_submitted']);
  trace.events[0].payload.policyId = 'edited';
  assert.equal(finished.events[0].payload.policyId, 'guided-judgment');
  assert.ok(!JSON.stringify(trace).includes('Can we find another time?'));
});
