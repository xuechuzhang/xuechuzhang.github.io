/** Lazily open the real demo. Width changes preserve the iframe and its session. */
const panel = document.querySelector('#embedded-build');
if (panel) {
  const frame = panel.querySelector('#build-frame');
  const viewport = panel.querySelector('.embed-viewport');
  const status = panel.querySelector('#embed-status');
  frame.addEventListener('load', () => {
    if (frame.hasAttribute('src')) status.textContent = 'Interface page loaded. Use the mode controls and Start demonstration inside the frame.';
  });
  panel.addEventListener('toggle', () => {
    if (panel.open && !frame.hasAttribute('src')) {
      status.textContent = 'Opening the interactive page…';
      frame.src = frame.dataset.src;
    }
  });
  for (const button of panel.querySelectorAll('[data-demo-width]')) {
    button.addEventListener('click', () => {
      for (const item of panel.querySelectorAll('[data-demo-width]')) item.setAttribute('aria-pressed', String(item === button));
      viewport.style.width = button.dataset.demoWidth === '390' ? '390px' : '100%';
      status.textContent = button.dataset.demoWidth === '390' ? 'Narrow viewport: up to 390 px. Existing local progress is retained.' : 'Full-width viewport. Existing local progress is retained.';
    });
  }
}
