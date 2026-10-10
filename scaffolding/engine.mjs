import {SCENARIOS, PROMPTS} from './scenarios.mjs';

export const VERSION = '0.1.0';
export const MODES = Object.freeze(['substitution', 'scaffolding']);

function cleanText(value) {
  if (typeof value !== 'string' || value.trim().length < 3 || value.trim().length > 1200)
    throw new Error('Please write between 3 and 1,200 characters.');
  return value.trim();
}

export function createSession(mode, scenarioId) {
  if (!MODES.includes(mode)) throw new Error('Choose a valid interaction mode.');
  if (!SCENARIOS.some(s => s.id === scenarioId)) throw new Error('Choose a valid scenario.');
  return {version: VERSION, mode, scenarioId, phase: 'assistance', step: 0, reflections: [], supportedResponse: '', unaidedResponse: ''};
}

export function submitAssisted(state, text) {
  if (state.phase !== 'assistance') throw new Error('Assistance is no longer available in this phase.');
  const answer = cleanText(text);
  if (state.mode === 'substitution') return {...state, phase: 'withdrawal', supportedResponse: answer};
  const reflections = [...state.reflections, {id: PROMPTS[state.step].id, text: answer}];
  const step = state.step + 1;
  return {...state, reflections, step,
    phase: step === PROMPTS.length ? 'withdrawal' : 'assistance',
    supportedResponse: step === PROMPTS.length ? answer : ''};
}

export function withdrawAssistance(state) {
  if (state.phase !== 'withdrawal') throw new Error('Finish the assisted task before the new situation.');
  return {...state, phase: 'transfer'};
}

export function submitUnaided(state, text) {
  if (state.phase !== 'transfer') throw new Error('The unaided task is not active.');
  return {...state, phase: 'review', unaidedResponse: cleanText(text)};
}

/** The view is a whitelist: no scripts, prompts, or supported answer during transfer. */
export function view(state) {
  const scenario = SCENARIOS.find(s => s.id === state.scenarioId);
  if (!scenario) throw new Error('Unknown scenario.');
  if (state.phase === 'transfer') return {phase: 'transfer', title: scenario.transfer.title, context: scenario.transfer.context};
  if (state.phase === 'withdrawal') return {phase: 'withdrawal', title: 'The assistance ends here'};
  if (state.phase === 'review') return {phase: 'review', mode: state.mode, supportedResponse: state.supportedResponse, unaidedResponse: state.unaidedResponse};
  if (state.phase !== 'assistance') throw new Error('Unknown phase.');
  return state.mode === 'substitution'
    ? {phase: 'assistance', title: scenario.title, context: scenario.context, guidance: {interpretation: scenario.interpretation, recommendation: scenario.recommendation, draft: scenario.draft}}
    : {phase: 'assistance', title: scenario.title, context: scenario.context, prompt: {...PROMPTS[state.step]}, step: state.step + 1, total: PROMPTS.length};
}

export function record(state) {
  return {evidenceType: 'scripted_interaction_design_demo', notResearchData: true,
    description: 'Visitor-entered demonstration text. No psychological scoring, research collection, or learning claim.',
    ...state, reflections: state.reflections.map(item => ({...item}))};
}
