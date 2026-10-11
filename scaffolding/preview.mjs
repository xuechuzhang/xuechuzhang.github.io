/** The actual authored policy entry, after an initial reading; no fake visitor text or event record. */
import {policyEntry} from './engine.mjs?v=20261011-modes';
import {policyFor} from './policies.mjs?v=20261011-modes';
const preview = document.querySelector('#home-policy-preview');
if (preview) {
  const output = preview.querySelector('#policy-preview-output'), link = preview.querySelector('#policy-demo-link');
  const node = (tag, text, className) => { const item = document.createElement(tag); item.textContent = text; if (className) item.className = className; return item; };
  function render(mode) {
    const policy = policyFor(mode), current = policyEntry(mode, 'team');
    output.replaceChildren(node('p', current.context, 'preview-context'));
    if (current.guidance) output.append(node('span','The system offers a candidate reading','preview-state-label'),node('p',current.guidance.interpretation,'preview-response'));
    else if (current.prompt) output.append(node('span','The person performs the reasoning','preview-state-label'),node('p',current.prompt.prompt,'preview-response'));
    else output.append(node('span','No suggested interpretation','preview-state-label'),node('p',current.instruction,'preview-response'));
    preview.querySelector('#preview-policy-id').textContent = policy.id + ' · v' + policy.version;
    link.href = 'scaffolding.html?mode=' + mode + '&scenario=team';
    link.textContent = 'Try ' + policy.label.replace(' · scripted','') + ' ↗';
  }
  preview.addEventListener('change', event => { if (event.target.name === 'preview-mode') render(event.target.value); });
  render('scaffolding');
}
