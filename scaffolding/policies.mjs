/** Authored policies and strategy labels. No semantic classification or model call. */
export const POLICY_VERSION = '0.3.0';
const step = (id, title, prompt) => Object.freeze({id, title, prompt});
export const POLICIES = Object.freeze({
  substitution: Object.freeze({
    id: 'answer-supply', version: POLICY_VERSION, mode: 'substitution', label: 'Direct AI · scripted',
    steps: Object.freeze([]), route: Object.freeze(['Candidate reading', 'Suggested action', 'Editable draft'])
  }),
  scaffolding: Object.freeze({
    id: 'guided-judgment', version: POLICY_VERSION, mode: 'scaffolding', label: 'Scaffolding AI · scripted',
    steps: Object.freeze([
      step('uncertainty', 'Locate the uncertainty', 'What is uncertain about this message? Separate what you know from what you are assuming.'),
      step('evidence', 'Look for evidence', 'Which details support your reading? What do those details leave unresolved?'),
      step('perspective', 'Consider the other person', 'What constraints, needs, or concerns might the other person have? Treat these as possibilities, not facts.'),
      step('alternatives', 'Generate alternatives', 'What are two plausible explanations for the same message?'),
      step('challenge', 'Check your conclusion', 'What could make your first interpretation wrong? What would you ask before deciding?')
    ]),
    route: Object.freeze(['Uncertainty', 'Evidence', 'Perspective', 'Alternatives', 'Check'])
  }),
  independent: Object.freeze({
    id: 'independent-reflection', version: POLICY_VERSION, mode: 'independent', label: 'Independent Reflection',
    steps: Object.freeze([]), route: Object.freeze(['Own reading', 'Own strategy', 'Own response'])
  })
});
export const STRATEGIES = Object.freeze([
  Object.freeze({id: 'clarify', label: 'Ask for clarification', definition: 'Ask an open question before settling on one interpretation.'}),
  Object.freeze({id: 'acknowledge', label: 'Acknowledge their perspective', definition: 'Recognize the other person’s possible needs without claiming to know their intent.'}),
  Object.freeze({id: 'express', label: 'Express my needs', definition: 'State a relevant need or constraint while leaving room for a reply.'}),
  Object.freeze({id: 'pause', label: 'Pause before responding', definition: 'Allow time or seek context before committing to an interpretation.'})
]);
export const MODES = Object.freeze(Object.keys(POLICIES));
export function policyFor(mode) {
  if (!Object.hasOwn(POLICIES, mode)) throw new Error('Choose a valid interaction mode.');
  return POLICIES[mode];
}
export function strategyFor(id) {
  const strategy = STRATEGIES.find(item => item.id === id);
  if (!strategy) throw new Error('Choose a communication strategy.');
  return strategy;
}
/** Public options only: never visitor input, progress state, or a private identifier. */
export function configurationFromQuery(search) {
  const query = new URLSearchParams(search);
  const mode = query.get('mode') ?? 'substitution';
  const scenarioId = query.get('scenario') ?? 'team';
  policyFor(mode);
  if (!['team', 'plans'].includes(scenarioId)) throw new Error('Choose a valid scenario.');
  return {mode, scenarioId, embedded: query.get('embed') === '1'};
}
