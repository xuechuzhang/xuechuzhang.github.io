import {SCENARIOS} from './scenarios.mjs';
import {createSession, submitAssisted, withdrawAssistance, submitUnaided, view, record} from './engine.mjs';

const setup = document.querySelector('#demo-setup');
const controls = document.querySelector('#demo-controls');
const root = document.querySelector('#interaction-stage');
const message = document.querySelector('#demo-message');
const phaseLabel = document.querySelector('#phase-label');
let state = null;

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function button(text, action, primary = false) {
  const node = element('button', text, primary ? 'button-link primary' : 'button-link');
  node.type = 'button';
  node.addEventListener('click', action);
  return node;
}

function accept(action) {
  try {
    state = action();
    message.textContent = '';
    render();
  } catch (error) {
    message.textContent = error.message;
    root.querySelector('textarea')?.focus();
  }
}

function responseForm(labelText, action, submitText, defaultText = '') {
  const form = element('form', undefined, 'response-form');
  form.noValidate = true;
  const label = element('label', labelText);
  label.htmlFor = 'reflection-text';
  const input = element('textarea');
  input.id = 'reflection-text';
  input.name = 'demo-response';
  input.rows = 4;
  input.maxLength = 1200;
  input.required = true;
  input.autocomplete = 'off';
  input.value = defaultText;
  input.setAttribute('aria-describedby', 'input-help demo-message');
  const help = element('p', '3–1,200 characters. Use fictional details; your text stays in this page’s memory.', 'input-help');
  help.id = 'input-help';
  const submit = element('button', submitText, 'button-link primary');
  submit.type = 'submit';
  form.append(label, input, help, submit);
  form.addEventListener('submit', event => { event.preventDefault(); accept(() => action(input.value)); });
  return form;
}

function render(focus = true) {
  root.replaceChildren();
  if (!state) {
    phaseLabel.textContent = 'Ready to explore';
    root.append(element('h2', 'An answer to borrow—or a process to practise?'),
      element('p', 'Choose an interaction mode and a fictional situation. Both routes then lead to a different situation with the assistance removed.'),
      element('p', 'This is a hand-authored software demonstration. It does not evaluate your ability or establish which mode produces learning.', 'demo-boundary'));
    return;
  }
  const current = view(state);
  const labels = {assistance: '1 / Assisted situation', withdrawal: '2 / Assistance withdrawn', transfer: '3 / New situation, unaided', review: '4 / Review your drafts'};
  phaseLabel.textContent = labels[current.phase];
  const heading = element('h2', current.title || 'Two drafts, two contexts');
  heading.id = 'stage-title';
  heading.tabIndex = -1;
  root.append(heading);
  if (current.context) root.append(element('p', current.context, 'scenario-context'));

  if (current.phase === 'assistance' && current.guidance) {
    const guidance = element('dl', undefined, 'scripted-guidance');
    for (const [key, title] of [['interpretation', 'One possible interpretation'], ['recommendation', 'Suggested action'], ['draft', 'A draft you can adapt']]) {
      const row = element('div');
      row.append(element('dt', title), element('dd', current.guidance[key]));
      guidance.append(row);
    }
    root.append(guidance);
    const form = responseForm('Your response for this situation', text => submitAssisted(state, text), 'Finish assisted task');
    root.append(button('Use this draft', () => {
      const input = form.querySelector('textarea');
      input.value = current.guidance.draft;
      input.focus();
      message.textContent = 'The scripted draft is in the response field. You can edit it before continuing.';
    }), form);
  } else if (current.phase === 'assistance') {
    root.append(element('p', `Reflection ${current.step} of ${current.total}`, 'step-count'),
      element('h3', current.prompt.title));
    root.append(responseForm(current.prompt.prompt, text => submitAssisted(state, text), current.step === current.total ? 'Finish assisted task' : 'Continue reflection'));
  } else if (current.phase === 'withdrawal') {
    root.append(element('p', 'You will now see a new person and a different interpersonal situation. The next screen contains no suggested interpretation, reflection prompts, or generated draft.'),
      element('p', 'A future experiment would test transfer here. This public walkthrough provides no score or evidence of learning.', 'demo-boundary'),
      button('Start unaided task', () => accept(() => withdrawAssistance(state)), true));
  } else if (current.phase === 'transfer') {
    root.append(element('p', 'Assistance is off. Choose your response independently.', 'withdrawal-label'));
    root.append(responseForm('Write the response you would choose to send', text => submitUnaided(state, text), 'Review my two drafts'));
  } else {
    const drafts = element('div', undefined, 'draft-comparison');
    for (const [title, text] of [['With assistance', current.supportedResponse], ['In the new situation, without assistance', current.unaidedResponse]]) {
      const column = element('section');
      column.append(element('h3', title), element('p', text, 'visitor-draft'));
      drafts.append(column);
    }
    root.append(drafts, element('p', 'You responded to different situations. These drafts cannot tell us whether your competence improved. A study would need random assignment, comparable tasks, reliable blinded ratings, and independent human interaction.', 'demo-boundary'));
    const details = element('details', undefined, 'local-record');
    details.append(element('summary', 'Inspect this local demonstration record'), element('pre', JSON.stringify(record(state), null, 2)));
    root.append(details, button('Try the other mode', reset));
  }
  if (focus) heading.focus();
}

function reset() {
  const previousMode = state?.mode;
  state = null;
  controls.disabled = false;
  if (previousMode) setup.querySelector(`input[value="${previousMode === 'scaffolding' ? 'substitution' : 'scaffolding'}"]`).checked = true;
  message.textContent = 'Local progress cleared. Choose a mode to start again.';
  render(false);
  document.querySelector('#start-demo').focus();
}

setup.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(setup);
  accept(() => createSession(data.get('mode'), data.get('scenario')));
  if (state) controls.disabled = true;
});
document.querySelector('#reset-demo').addEventListener('click', reset);
const scenarioSelect = setup.querySelector('select');
for (const scenario of SCENARIOS) {
  const option = element('option', scenario.title);
  option.value = scenario.id;
  scenarioSelect.append(option);
}
document.querySelector('#start-demo').disabled = false;
render(false);
