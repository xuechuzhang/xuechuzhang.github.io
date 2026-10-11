import {SCENARIOS} from './scenarios.mjs';
import {createSession, submitInitial, submitReflection, finishGuidance, chooseStrategy, submitResponse, beginTransfer, submitUnaided, view, record, implementationTrace, VERSION} from './engine.mjs?v=20261011-modes';
import {configurationFromQuery, policyFor, STRATEGIES, MODES} from './policies.mjs?v=20261011-modes';
const setup = document.querySelector('#demo-setup');
const controls = document.querySelector('#demo-controls');
const root = document.querySelector('#interaction-stage');
const message = document.querySelector('#demo-message');
const phaseLabel = document.querySelector('#phase-label');
const tracePanel = document.querySelector('#policy-trace');
const traceText = document.querySelector('#trace-output');
let state = null;
const element = (tag, text, className) => {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
};
function button(text, action, primary = false) {
  const node = element('button', text, primary ? 'button-link primary' : 'button-link');
  node.type = 'button'; node.addEventListener('click', action); return node;
}
function accept(action) {
  try { state = action(); message.textContent = ''; render(); }
  catch (error) { message.textContent = error.message; root.querySelector('textarea, select')?.focus(); }
}
function responseForm(labelText, action, submitText) {
  const form = element('form', undefined, 'response-form'); form.noValidate = true;
  const label = element('label', labelText); label.htmlFor = 'reflection-text';
  const input = element('textarea'); Object.assign(input, {id:'reflection-text', name:'demo-response', rows:4, maxLength:1200, required:true, autocomplete:'off'});
  input.setAttribute('aria-describedby', 'input-help demo-message');
  const help = element('p', '3–1,200 characters. Use fictional details; your text stays in this page’s memory.', 'input-help'); help.id = 'input-help';
  const submit = element('button', submitText, 'button-link primary'); submit.type = 'submit';
  form.append(label, input, help, submit);
  form.addEventListener('submit', event => { event.preventDefault(); accept(() => action(input.value)); });
  return form;
}
function reasoningHistory() {
  const details = element('details', undefined, 'reasoning-history');
  details.id = 'reasoning-history';
  details.append(element('summary', 'My earlier reasoning · this session only'));
  details.append(element('h3', 'Initial interpretation'), element('p', state.initialInterpretation, 'visitor-draft'));
  for (const item of state.reflections) {
    const title = policyFor(state.mode).steps.find(step => step.id === item.id).title;
    details.append(element('h3', title), element('p', item.text, 'visitor-draft'));
  }
  return details;
}
function render(focus = true) {
  root.replaceChildren();
  const phase = state?.phase ?? 'setup';
  for (const item of document.querySelectorAll('[data-phase]')) {
    if (item.dataset.phase === phase) item.setAttribute('aria-current', 'step');
    else item.removeAttribute('aria-current');
  }
  tracePanel.hidden = !state || phase === 'transfer';
  traceText.textContent = state && phase !== 'transfer' ? JSON.stringify(implementationTrace(state), null, 2) : '';
  if (tracePanel.hidden) tracePanel.open = false;
  if (!state) {
    phaseLabel.textContent = 'Ready to explore';
    document.querySelector('#policy-label').textContent = 'Three authored policies · v' + VERSION;
    root.append(element('h2', 'An answer, a reasoning process, or your own reflection?'),
      element('p', 'Choose a mode and fictional situation. Record your first reading, select a strategy, write your response, and then try a new situation without help.'),
      element('p', 'Modes differ in information, time, effort, and practice. This walkthrough is not a randomized or validated experiment.', 'demo-boundary'));
    return;
  }
  const current = view(state);
  document.querySelector('#policy-label').textContent = policyFor(state.mode).label + ' · ' + state.policyId + ' v' + state.policyVersion;
  const labels = {initial:'1 / Initial interpretation', assistance:'2 / Interaction policy', strategy:'3 / Select a strategy', response:'4 / Author a response', withdrawal:'5 / End the first task', transfer:'6 / New situation, unaided', review:'7 / Transparent summary'};
  phaseLabel.textContent = labels[phase];
  const heading = element('h2', current.title || 'Your interaction summary');
  heading.id = 'stage-title'; heading.tabIndex = -1; root.append(heading);
  if (current.context) root.append(element('p', current.context, 'scenario-context'));
  if (['assistance','strategy','response'].includes(phase)) root.append(reasoningHistory());
  if (phase === 'initial') {
    root.append(element('p', 'Record your reading before any candidate interpretation or guided prompt is shown. The system does not analyze this text.', 'demo-boundary'),
      responseForm('What is your initial interpretation of this message?', text => submitInitial(state, text), 'Save my initial reading'));
  } else if (phase === 'assistance' && current.guidance) {
    const guidance = element('dl', undefined, 'scripted-guidance');
    for (const [key, title] of [['interpretation','One possible interpretation'],['recommendation','Suggested action'],['draft','A candidate draft']]) {
      const row = element('div'); row.append(element('dt', title), element('dd', current.guidance[key])); guidance.append(row);
    }
    root.append(element('p', 'Authored example · not generated from your input', 'step-count'), guidance,
      button('Continue to my strategy', () => accept(() => finishGuidance(state)), true));
  } else if (phase === 'assistance' && current.independent) {
    root.append(element('p', 'No AI suggestions in this mode.', 'withdrawal-label'),
      element('p', current.instruction),
      element('p', 'The same strategy menu and response fields remain. This is not a no-task control or an experimentally equivalent condition.', 'demo-boundary'),
      button('Choose my strategy', () => accept(() => finishGuidance(state)), true));
  } else if (phase === 'assistance') {
    root.append(element('p', 'Reflection ' + current.step + ' of ' + current.total, 'step-count'), element('h3', current.prompt.title));
    root.append(responseForm(current.prompt.prompt, text => submitReflection(state, text),
      current.step === current.total ? 'Continue to strategy' : 'Continue reflection'));
  } else if (phase === 'strategy') {
    const form = element('form', undefined, 'response-form strategy-form'); form.noValidate = true;
    const label = element('label', 'Which communication strategy will you choose?'); label.htmlFor = 'strategy-choice';
    const select = element('select'); select.id = 'strategy-choice'; select.name = 'strategy'; select.required = true;
    select.setAttribute('aria-describedby', 'strategy-definition demo-message');
    const empty = element('option', 'Choose a strategy'); empty.value = ''; select.append(empty);
    for (const item of STRATEGIES) { const option = element('option', item.label); option.value = item.id; select.append(option); }
    const definition = element('p', 'Select an authored label to inspect its definition.', 'input-help'); definition.id = 'strategy-definition'; definition.setAttribute('aria-live','polite');
    select.addEventListener('change', () => { definition.textContent = STRATEGIES.find(item => item.id === select.value)?.definition || 'Select an authored label to inspect its definition.'; });
    const submit = element('button', 'Use this strategy', 'button-link primary'); submit.type = 'submit';
    form.append(label, select, definition, submit);
    form.addEventListener('submit', event => {event.preventDefault(); accept(() => chooseStrategy(state, select.value));});
    root.append(element('p', 'These are choices you report yourself, not a classification of your text. No strategy is scored or recommended by the software.', 'demo-boundary'), form);
  } else if (phase === 'response') {
    root.append(element('p', 'Your strategy: ' + current.strategy.label, 'withdrawal-label'), element('p', current.strategy.definition));
    const form = responseForm('Write the response you would choose to send', text => submitResponse(state, text), 'Finish first task');
    if (current.draft) {
      root.append(button('Use the candidate draft', () => {
        const input = form.querySelector('textarea'); input.value = current.draft; input.focus();
        message.textContent = 'The authored draft is in the response field. You can edit it before submitting.';
      }));
    }
    root.append(form);
  } else if (phase === 'withdrawal') {
    root.append(element('p', state.mode === 'independent' ? 'No AI assistance was supplied in the first task. You will now respond to a new person and situation.' : 'Candidate interpretations and guided prompts end here. You will now see a new person and a different situation.'),
      element('p', 'The next screen contains no earlier reasoning, strategy, draft, event trace, or suggested interpretation. Your memory and outside help cannot be controlled by a public walkthrough.', 'demo-boundary'),
      button('Start new unaided task', () => accept(() => beginTransfer(state)), true));
  } else if (phase === 'transfer') {
    root.append(element('p', 'No assistance or earlier reasoning is displayed.', 'withdrawal-label'));
    root.append(responseForm('Your independent response to the new situation', text => submitUnaided(state, text), 'Review my interaction'));
  } else {
    const drafts = element('div', undefined, 'draft-comparison');
    for (const [title, text] of [['Response in the first situation',current.stageOneResponse],['Response in the new situation',current.unaidedResponse]]) {
      const column = element('section'); column.append(element('h3', title), element('p', text, 'visitor-draft')); drafts.append(column);
    }
    root.append(element('p', 'Completed · ' + policyFor(state.mode).label, 'withdrawal-label'), drafts,
      element('p', 'Your initial interpretation: ' + current.initialInterpretation, 'visitor-draft'),
      element('p', 'Your selected strategy: ' + current.strategy.label, 'withdrawal-label'),
      element('p', 'Different situations and self-selected modes cannot tell us whether competence improved. No response rating or learning score is produced. A study needs random assignment, matched tasks, an unaided baseline, and reliable blinded ratings.', 'demo-boundary'));
    if (current.reflections.length) root.append(reasoningHistory());
    const details = element('details', undefined, 'local-record');
    details.append(element('summary', 'Inspect this local demonstration record'), element('pre', JSON.stringify(record(state), null, 2)));
    root.append(details, button('Try another mode', reset));
  }
  if (focus) heading.focus();
}
function reset() {
  const previousMode = state?.mode;
  state = null; controls.disabled = false;
  if (previousMode) setup.querySelector('input[value="' + MODES[(MODES.indexOf(previousMode) + 1) % MODES.length] + '"]').checked = true;
  message.textContent = 'Local progress cleared. Choose a mode to start again.'; render(false); document.querySelector('#start-demo').focus();
}
setup.addEventListener('submit', event => {
  event.preventDefault(); const data = new FormData(setup);
  accept(() => createSession(data.get('mode'), data.get('scenario')));
  if (state) controls.disabled = true;
});
document.querySelector('#reset-demo').addEventListener('click', reset);
const scenarioSelect = setup.querySelector('select');
for (const scenario of SCENARIOS) { const option = element('option', scenario.title); option.value = scenario.id; scenarioSelect.append(option); }
try {
  const config = configurationFromQuery(window.location.search);
  setup.querySelector('input[value="' + config.mode + '"]').checked = true;
  scenarioSelect.value = config.scenarioId;
  document.body.classList.toggle('embedded-demo', config.embedded);
} catch { message.textContent = 'Unrecognized public configuration. Default settings restored.'; }
function clearOnNavigation() {
  state = null; controls.disabled = false; message.textContent = ''; render(false);
}
window.addEventListener('pagehide', clearOnNavigation);
window.addEventListener('pageshow', event => { if (event.persisted) clearOnNavigation(); });
document.querySelector('#start-demo').disabled = false;
render(false);
