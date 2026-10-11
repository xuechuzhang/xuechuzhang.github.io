"""Render documented reach/status records into static pages; no front-end data dependency."""
from pathlib import Path
from html import escape
import json, re, argparse
ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT/'assets/content/impact.json').read_text())
e = escape
metrics = '<dl class="impact-metrics">'
for item in data['records']:
    reach = item['reach']
    if reach:
        metrics += '<div><dt>'+e(item['title'])+'</dt><dd>'+e(reach['display'])+'</dd><p>'+e(reach['unit'])+' · Self-reported in CV<br>'+e(reach['limitation'])+'</p></div>'
metrics += '</dl>'
rows = '<div class="table-wrap" tabindex="0" role="region" aria-label="Documented contributions and sources"><table><thead><tr><th>Contribution</th><th>Artifact and role</th><th>Evidence and limits</th></tr></thead><tbody>'
for item in data['records']:
    rows += '<tr><td>'+e(item['title'])+'</td><td>'+e(item['role'])+'<br><br>'+e(item['artifact'])+'</td><td>'+e(item['status'])+'<br><br>'+e(item['learning'])+'<br><a class="source-link" href="'+e(item['source'], quote=True)+'">Source record ↗</a></td></tr>'
rows += '</tbody></table></div>'
parser = argparse.ArgumentParser(); parser.add_argument('--check', action='store_true'); args = parser.parse_args()
for filename, name, content in [('index.html','IMPACT_TEASER',metrics),('impact.html','IMPACT_RECORDS',metrics+rows)]:
    path = ROOT/filename; original = path.read_text()
    expression = '<!-- '+name+':START -->.*?<!-- '+name+':END -->'
    updated, count = re.subn(expression, '<!-- '+name+':START -->\n'+content+'\n<!-- '+name+':END -->', original, flags=re.S)
    if count != 1: raise SystemExit('Missing unique marker in '+filename)
    if args.check:
        if updated != original: raise SystemExit('Stale generated reach records in '+filename)
    else: path.write_text(updated)
print('PASS: documented impact records agree on Home and Impact; no aggregate audience or outcome estimate.')
