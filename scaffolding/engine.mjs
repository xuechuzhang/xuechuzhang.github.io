import {SCENARIOS} from './scenarios.mjs';
import {policyFor, MODES} from './policies.mjs';
export const VERSION = '0.2.0';
export {MODES};
const PHASES = ['assistance', 'withdrawal', 'transfer', 'review'];
function cleanText(value) {
  if (typeof value !== 'string' || value.trim().length < 3 || value.trim().length > 1200)
    throw new Error('Please write between 3 and 1,200 characters.');
  return value.trim();
}
function validateState(state) {
  const policy = policyFor(state?.mode);
  if (!SCENARIOS.some(s => s.id === state.scenarioId) || !PHASES.includes(state.phase) ||
      state.version !== VERSION || state.policyId !== policy.id || state.policyVersion !== policy.version ||
      !Array.isArray(state.events) || !state.events.length || !Array.isArray(state.reflections) ||
      !Number.isInteger(state.step) || state.step < 0 || state.step > policy.steps.length)
    throw new Error('The session state is invalid. Reset to start again.');
  if (state.reflections.length !== state.step || state.reflections.some((r, i) => r.id !== policy.steps[i]?.id))
    throw new Error('The reflection sequence is invalid.');
  if (state.mode === 'scaffolding' && ((state.phase === 'assistance') !== (state.step < policy.steps.length)))
    throw new Error('The policy and phase do not agree.');
  if (state.phase !== 'assistance' && !state.supportedResponse) throw new Error('An assisted response is required.');
  if (state.phase === 'review' && !state.unaidedResponse) throw new Error('An unaided response is required.');
  return policy;
}
function event(state, type, at, payload = {}) {
  if (!Number.isFinite(at) || !Number.isFinite(new Date(at).getTime()) ||
      (state.events.length && at < state.events.at(-1).at))
    throw new Error('Event times must be valid and nondecreasing.');
  return {...state, events: [...state.events, {sequence: state.events.length + 1, type, at, payload: {...payload}}]};
}
export function createSession(mode, scenarioId, at = Date.now()) {
  const policy = policyFor(mode);
  if (!SCENARIOS.some(s => s.id === scenarioId)) throw new Error('Choose a valid scenario.');
  return event({version: VERSION, mode, scenarioId, policyId: policy.id, policyVersion: policy.version,
    phase: 'assistance', step: 0, reflections: [], supportedResponse: '', unaidedResponse: '', events: []},
    'session_started', at, {policyId: policy.id, policyVersion: policy.version, scenarioId});
}
export function submitAssisted(state, text, at = Date.now()) {
  const policy = validateState(state);
  if (state.phase !== 'assistance') throw new Error('Assistance is no longer available in this phase.');
  const answer = cleanText(text);
  if (state.mode === 'substitution')
    return event({...state, phase: 'withdrawal', supportedResponse: answer}, 'assistance_completed', at, {characters: answer.length});
  const reflections = [...state.reflections, {id: policy.steps[state.step].id, text: answer}];
  const nextStep = state.step + 1;
  let next = event({...state, reflections, step: nextStep,
    phase: nextStep === policy.steps.length ? 'withdrawal' : 'assistance',
    supportedResponse: nextStep === policy.steps.length ? answer : ''},
    'reflection_submitted', at, {stepId: policy.steps[state.step].id, characters: answer.length});
  if (nextStep === policy.steps.length) next = event(next, 'assistance_completed', at);
  return next;
}
export function withdrawAssistance(state, at = Date.now()) {
  validateState(state);
  if (state.phase !== 'withdrawal') throw new Error('Finish the assisted task before the new situation.');
  return event({...state, phase: 'transfer'}, 'assistance_withdrawn', at);
}
export function submitUnaided(state, text, at = Date.now()) {
  validateState(state);
  if (state.phase !== 'transfer') throw new Error('The unaided task is not active.');
  const answer = cleanText(text);
  return event({...state, phase: 'review', unaidedResponse: answer}, 'transfer_submitted', at, {characters: answer.length});
}
/** Transfer whitelist: no previous prompt, trace, or response. */
export function view(state) {
  const policy = validateState(state);
  const scenario = SCENARIOS.find(s => s.id === state.scenarioId);
  if (state.phase === 'transfer') return {phase: 'transfer', title: scenario.transfer.title, context: scenario.transfer.context};
  if (state.phase === 'withdrawal') return {phase: 'withdrawal', title: 'The assistance ends here'};
  if (state.phase === 'review') return {phase: 'review', mode: state.mode, supportedResponse: state.supportedResponse, unaidedResponse: state.unaidedResponse};
  return state.mode === 'substitution'
    ? {phase: 'assistance', title: scenario.title, context: scenario.context, guidance: {interpretation: scenario.interpretation, recommendation: scenario.recommendation, draft: scenario.draft}}
    : {phase: 'assistance', title: scenario.title, context: scenario.context, prompt: {...policy.steps[state.step]}, step: state.step + 1, total: policy.steps.length};
}
/** Technical trace is withheld during transfer; event payloads contain no free text. */
export function implementationTrace(state) {
  validateState(state);
  if (state.phase === 'transfer') return null;
  return {softwareVersion: VERSION, policyId: state.policyId, policyVersion: state.policyVersion,
    phase: state.phase, completedReflections: state.step, renderer: 'authored-script',
    events: state.events.map(e => ({...e, payload: {...e.payload}}))};
}
export function record(state) {
  validateState(state);
  return {schemaVersion: 'prototype02.demo.v2', evidenceType: 'scripted_interaction_design_demo', notResearchData: true,
    description: 'Visitor-entered demonstration text. No scoring, research collection, or learning claim.',
    ...state, reflections: state.reflections.map(item => ({...item})),
    events: state.events.map(e => ({...e, payload: {...e.payload}}))};
}
