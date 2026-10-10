import test from 'node:test';
import assert from 'node:assert/strict';
import {createSession, submitAssisted, withdrawAssistance, submitUnaided, view, record} from '../scaffolding/engine.mjs';

function scaffold() {
  let state = createSession('scaffolding', 'team');
  for (const answer of ['Possibly wants input.', 'An earlier request to discuss.', 'Maybe short on time.', 'Could we talk before the deadline?']) state = submitAssisted(state, answer);
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

test('scaffolding requires the four distinct reflections before withdrawal', () => {
  const s = scaffold();
  assert.equal(s.phase, 'withdrawal');
  assert.deepEqual(s.reflections.map(r => r.id), ['interpretation', 'evidence', 'alternative', 'response']);
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
  }
});

test('independent sessions and inspectable records do not share mutable reflections', () => {
  const first = scaffold();
  const second = createSession('scaffolding', 'team');
  const exported = record(first);
  exported.reflections[0].text = 'changed';
  assert.notEqual(first.reflections[0].text, 'changed');
  assert.equal(second.reflections.length, 0);
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
