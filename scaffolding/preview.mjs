/** A read-only first-state preview, using the same engine as the full demo. */
import {createSession, view} from './engine.mjs?v=20261010-invention';
import {policyFor} from './policies.mjs';
const preview = document.querySelector('#home-policy-preview');
if (preview) {
  const output = preview.querySelector('#policy-preview-output');
  const link = preview.querySelector('#policy-demo-link');
  const node = (tag, text, className) => {
    const item = document.createElement(tag);
    item.textContent = text;
    if (className) item.className = className;
    return item;
  };
  function render(mode) {
    const policy = policyFor(mode);
    const current = view(createSession(mode, 'team'));
    output.replaceChildren(node('p', current.context, 'preview-context'));
    if (current.guidance) {
      output.append(node('span', 'The system offers a reading', 'preview-state-label'),
        node('p', current.guidance.interpretation, 'preview-response'));
    } else {
      output.append(node('span', 'The system asks you to reason', 'preview-state-label'),
        node('p', current.prompt.prompt, 'preview-response'));
    }
    preview.querySelector('#preview-policy-id').textContent = `${policy.id} · v${policy.version}`;
    link.href = `scaffolding.html?mode=${mode}&scenario=team`;
    link.textContent = `Continue in ${policy.label.toLowerCase()} mode ↗`;
  }
  preview.addEventListener('change', event => {
    if (event.target.name === 'preview-mode') render(event.target.value);
  });
  render('scaffolding');
}
