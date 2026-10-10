"""Render a shared static evidence component. No runtime request or build dependency."""
from pathlib import Path
from html import escape
import argparse
import json
import re

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'assets/content/ai-communication.json'
START = '<!-- AI_EVIDENCE:START -->'
END = '<!-- AI_EVIDENCE:END -->'


def evidence(data):
    samples = ''.join(
        '<div><dt>' + escape(item['label']) + '</dt><dd><span>N = </span>' + str(item['n']) + '</dd></div>'
        for item in data['samples'])
    findings = ''.join(
        '<div><dt>' + escape(item['construct']) + '</dt><dd>' + escape(item['direction']) + '</dd></div>'
        for item in data['findings'])
    sequence = ' → '.join(escape(item) for item in data['sequence'])
    return ('<div class="evidence-component">'
            '<dl class="sample-strip" aria-label="Documented study samples">' + samples + '</dl>'
            '<p class="study-sequence">' + sequence + '</p>'
            '<p class="evidence-label">' + escape(data['evidenceLabel']) + '</p>'
            '<dl class="finding-directions">' + findings + '</dl>'
            '<p class="evidence-boundary">' + escape(data['limitation']) + '</p></div>')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true', help='Fail if checked-in evidence differs from its source.')
    args = parser.parse_args()
    data = json.loads(DATA.read_text())
    rendered = START + '\n' + evidence(data) + '\n' + END
    expression = re.escape(START) + r'.*?' + re.escape(END)
    for name in ['index.html', 'research.html']:
        path = ROOT / name
        current = path.read_text()
        updated, count = re.subn(expression, lambda _: rendered, current, flags=re.S)
        if count != 1:
            raise SystemExit(f'{name}: exactly one evidence component is required')
        if args.check and current != updated:
            raise SystemExit(f'{name}: generated evidence is stale')
        if not args.check:
            path.write_text(updated)
    print('PASS: Home and Research use the same documented samples and preliminary findings.' if args.check else 'Rendered shared evidence in Home and Research.')


if __name__ == '__main__':
    main()
