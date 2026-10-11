import {SCENARIOS} from './scenarios.mjs';
import {policyFor, strategyFor, MODES, POLICY_VERSION} from './policies.mjs?v=20261011-modes';
export const VERSION = POLICY_VERSION;
export {MODES};
const PHASES = ['initial', 'assistance', 'strategy', 'response', 'withdrawal', 'transfer', 'review'];
function cleanText(value) {
  if (typeof value !== 'string' || value.trim().length < 3 || value.trim().length > 1200)
    throw new Error('Please write between 3 and 1,200 characters.');
  return value.trim();
}
function scenarioFor(id) {
  const scenario = SCENARIOS.find(item => item.id === id);
  if (!scenario) throw new Error('Choose a valid scenario.');
  return scenario;
}
function validateState(state) {
  const policy = policyFor(state?.mode);
  scenarioFor(state.scenarioId);
  if (!PHASES.includes(state.phase) || state.version !== VERSION || state.policyId !== policy.id ||
      state.policyVersion !== policy.version || !Array.isArray(state.events) || !state.events.length ||
      !Array.isArray(state.reflections) || !Number.isInteger(state.step) || state.step < 0 || state.step > policy.steps.length)
    throw new Error('The session state is invalid. Reset to start again.');
  if (state.reflections.length !== state.step || state.reflections.some((r, i) => r.id !== policy.steps[i]?.id))
    throw new Error('The reflection sequence is invalid.');
  if (state.phase !== 'initial') cleanText(state.initialInterpretation);
  if (state.phase === 'initial' && (state.step || state.initialInterpretation || state.strategyId || state.stageOneResponse))
    throw new Error('The initial stage is invalid.');
  if (state.mode === 'scaffolding' && state.phase !== 'initial' &&
      ((state.phase === 'assistance') !== (state.step < policy.steps.length)))
    throw new Error('The policy and phase do not agree.');
  if (['response', 'withdrawal', 'transfer', 'review'].includes(state.phase)) strategyFor(state.strategyId);
  if (['withdrawal', 'transfer', 'review'].includes(state.phase)) cleanText(state.stageOneResponse);
  if (state.phase === 'review') cleanText(state.unaidedResponse);
  return policy;
}
function event(state, type, at, payload = {}) {
  if (!Number.isFinite(at) || !Number.isFinite(new Date(at).getTime()) ||
      (state.events.length && at < state.events.at(-1).at))
    throw new Error('Event times must be valid and nondecreasing.');
  return {...state, events: [...state.events, {sequence: state.events.length + 1, type, at, payload: {...payload}}]};
}
function expectPhase(state, phase) {
  const policy = validateState(state);
  if (state.phase !== phase) throw new Error('Complete the current stage before continuing.');
  return policy;
}
export function createSession(mode, scenarioId, at = Date.now()) {
  const policy = policyFor(mode);
  scenarioFor(scenarioId);
  return event({version: VERSION, mode, scenarioId, policyId: policy.id, policyVersion: policy.version,
    phase: 'initial', step: 0, initialInterpretation: '', reflections: [], strategyId: '',
    stageOneResponse: '', unaidedResponse: '', events: []}, 'session_started', at,
    {policyId: policy.id, policyVersion: policy.version, scenarioId});
}
export function submitInitial(state, text, at = Date.now()) {
  expectPhase(state, 'initial');
  const answer = cleanText(text);
  return event({...state, initialInterpretation: answer, phase: 'assistance'}, 'initial_interpretation_submitted', at, {characters: answer.length});
}
export function submitReflection(state, text, at = Date.now()) {
  const policy = expectPhase(state, 'assistance');
  if (state.mode !== 'scaffolding') throw new Error('This mode does not use guided reflection prompts.');
  const answer = cleanText(text);
  const reflections = [...state.reflections, {id: policy.steps[state.step].id, text: answer}];
  const nextStep = state.step + 1;
  let next = event({...state, reflections, step: nextStep, phase: nextStep === policy.steps.length ? 'strategy' : 'assistance'},
    'reflection_submitted', at, {stepId: policy.steps[state.step].id, characters: answer.length});
  if (next.phase === 'strategy') next = event(next, 'guidance_completed', at);
  return next;
}
export function finishGuidance(state, at = Date.now()) {
  expectPhase(state, 'assistance');
  if (state.mode === 'scaffolding') throw new Error('Complete all reflection prompts before choosing a strategy.');
  return event({...state, phase: 'strategy'}, state.mode === 'independent' ? 'independent_stage_started' : 'guidance_completed', at);
}
export function chooseStrategy(state, id, at = Date.now()) {
  expectPhase(state, 'strategy');
  strategyFor(id);
  return event({...state, strategyId: id, phase: 'response'}, 'strategy_selected', at, {strategyId: id});
}
export function submitResponse(state, text, at = Date.now()) {
  expectPhase(state, 'response');
  const answer = cleanText(text);
  return event({...state, stageOneResponse: answer, phase: 'withdrawal'}, 'first_task_completed', at, {characters: answer.length});
}
export function beginTransfer(state, at = Date.now()) {
  expectPhase(state, 'withdrawal');
  return event({...state, phase: 'transfer'}, 'transfer_started', at, {assistanceWasPresent: state.mode !== 'independent'});
}
export function submitUnaided(state, text, at = Date.now()) {
  expectPhase(state, 'transfer');
  const answer = cleanText(text);
  return event({...state, phase: 'review', unaidedResponse: answer}, 'transfer_submitted', at, {characters: answer.length});
}
/** Actual authored entry also used by Home; not an inference from a visitor’s reading. */
export function policyEntry(mode, scenarioId) {
  const policy = policyFor(mode), scenario = scenarioFor(scenarioId);
  const common = {title: scenario.title, context: scenario.context};
  if (mode === 'substitution') return {...common, guidance: {interpretation: scenario.interpretation, recommendation: scenario.recommendation, draft: scenario.draft}};
  if (mode === 'scaffolding') return {...common, prompt: {...policy.steps[0]}};
  return {...common, independent: true, instruction: 'No candidate interpretation, suggested action, or generated draft. Choose your own strategy and write your response.'};
}
export function view(state) {
  const policy = validateState(state), scenario = scenarioFor(state.scenarioId);
  // Strict whitelist: previous reasoning, strategy, drafts and trace never enter the transfer view.
  if (state.phase === 'transfer') return {phase: 'transfer', title: scenario.transfer.title, context: scenario.transfer.context};
  if (state.phase === 'withdrawal') return {phase: 'withdrawal', title: state.mode === 'independent' ? 'The first task ends here' : 'The assistance ends here'};
  if (state.phase === 'review') return {phase: 'review', mode: state.mode, initialInterpretation: state.initialInterpretation,
    reflections: state.reflections.map(r => ({...r})), strategy: {...strategyFor(state.strategyId)}, stageOneResponse: state.stageOneResponse, unaidedResponse: state.unaidedResponse};
  const common = {phase: state.phase, title: scenario.title, context: scenario.context};
  if (state.phase === 'initial' || state.phase === 'strategy') return common;
  if (state.phase === 'response') return {...common, strategy: {...strategyFor(state.strategyId)}, ...(state.mode === 'substitution' ? {draft: scenario.draft} : {})};
  if (state.mode === 'scaffolding') return {...common, prompt: {...policy.steps[state.step]}, step: state.step + 1, total: policy.steps.length};
  return {...common, ...policyEntry(state.mode, state.scenarioId)};
}
export function implementationTrace(state) {
  validateState(state);
  if (state.phase === 'transfer') return null;
  return {softwareVersion: VERSION, policyId: state.policyId, policyVersion: state.policyVersion,
    phase: state.phase, completedReflections: state.step, renderer: state.mode === 'independent' ? 'no-assistance' : 'authored-script',
    events: state.events.map(e => ({...e, payload: {...e.payload}}))};
}
export function record(state) {
  validateState(state);
  return {schemaVersion: 'prototype02.demo.v3', evidenceType: 'interaction_design_demo', notResearchData: true,
    description: 'Local demonstration text. Manual mode selection; no model, score, random assignment, or research collection.',
    ...state, reflections: state.reflections.map(item => ({...item})),
    events: state.events.map(e => ({...e, payload: {...e.payload}}))};
}
