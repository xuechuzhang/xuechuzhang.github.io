/** Versioned, authored policies. No inference about visitor text. */
export const POLICY_VERSION = '0.2.0';
const step = (id, title, prompt) => Object.freeze({id, title, prompt});
export const POLICIES = Object.freeze({
  substitution: Object.freeze({
    id: 'answer-supply', version: POLICY_VERSION, mode: 'substitution', label: 'Substitution',
    steps: Object.freeze([]), route: Object.freeze(['Interpret', 'Recommend', 'Draft'])
  }),
  scaffolding: Object.freeze({
    id: 'guided-judgment', version: POLICY_VERSION, mode: 'scaffolding', label: 'Scaffolding',
    steps: Object.freeze([
      step('uncertainty', 'Locate the uncertainty', 'What is uncertain about this message? Separate what you know from what you are assuming.'),
      step('evidence', 'Look for evidence', 'Which details support your reading? What do those details leave unresolved?'),
      step('perspective', 'Consider the other person', 'What constraints, needs, or concerns might the other person have? Treat these as possibilities, not facts.'),
      step('alternatives', 'Generate alternatives', 'What are two plausible explanations for the same message?'),
      step('challenge', 'Check your conclusion', 'What could make your first interpretation wrong? What would you ask before deciding?'),
      step('response', 'Author your response', 'Write the response you would choose to send, leaving room for the other person to clarify.')
    ]),
    route: Object.freeze(['Uncertainty', 'Evidence', 'Perspective', 'Alternatives', 'Check', 'Own response'])
  })
});
export const MODES = Object.freeze(Object.keys(POLICIES));
export function policyFor(mode) {
  if (!Object.hasOwn(POLICIES, mode)) throw new Error('Choose a valid interaction mode.');
  return POLICIES[mode];
}
/** Public configuration only. URLs cannot supply responses or session state. */
export function configurationFromQuery(search) {
  const query = new URLSearchParams(search);
  const mode = query.get('mode') ?? 'substitution';
  const scenarioId = query.get('scenario') ?? 'team';
  policyFor(mode);
  if (!['team', 'plans'].includes(scenarioId)) throw new Error('Choose a valid scenario.');
  return {mode, scenarioId};
}
