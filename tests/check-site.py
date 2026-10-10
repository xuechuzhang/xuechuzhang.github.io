"""Static integrity checks; not a browser, accessibility audit, or participant study."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import re
import hashlib
import json

ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self,text):
        super().__init__();self.ids=set();self.duplicates=[];self.links=[];self.scripts=[]
        self.feed(text)
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if 'id' in attrs:
            if attrs['id'] in self.ids:self.duplicates.append(attrs['id'])
            self.ids.add(attrs['id'])
        for key in ['href','src','poster']:
            if key in attrs:self.links.append(attrs[key])
        if tag=='script' and 'src' in attrs:self.scripts.append(attrs['src'])

pages={p:Page(p.read_text()) for p in ROOT.glob('*.html')}
errors=[];checks=0
for path,page in pages.items():
    if page.duplicates:errors.append(f'{path.name}: duplicate IDs {page.duplicates}')
    for link in page.links:
        parts=urlsplit(link)
        if parts.scheme or parts.netloc:
            prefix='https://github.com/xuechuzhang/xuechuzhang.github.io/blob/main/'
            if link.startswith(prefix):
                target=ROOT/link[len(prefix):].split('#')[0]
                if not target.is_file():errors.append(f'{path.name}: missing repository artifact {link}')
                checks+=1
            continue
        target=(path.parent/unquote(parts.path)).resolve() if parts.path else path
        if not target.is_relative_to(ROOT):errors.append(f'{path.name}: path leaves root {link}');continue
        if not target.exists():errors.append(f'{path.name}: missing {link}');continue
        if parts.fragment and target.suffix=='.html' and parts.fragment not in pages[target].ids:
            errors.append(f'{path.name}: missing anchor {link}')
        checks+=1
    text=path.read_text()
    nav=re.search(r'<nav id="site-nav".*?</nav>',text,re.S)
    if not nav or re.findall(r'href="([^"]+)"',nav.group()) != ['index.html','research.html','publications.html','about.html','cv.html']:
        errors.append(f'{path.name}: main navigation changed')

baseline=json.loads((ROOT/'tests/baseline-integrity.json').read_text())
for name,digest in baseline['files'].items():
    if hashlib.sha256((ROOT/name).read_bytes()).hexdigest()!=digest:errors.append(f'Protected baseline file changed: {name}')
new=(ROOT/'research.html').read_text()
for case in ['ai-communication','gaming-disorder','social-perception']:
    expression=r'<article class="case-study" id="'+case+r'".*?</article>'
    normalize=lambda s:re.sub(r'(?<=<p class="eyebrow">)\d\d /','NN /',s)
    if hashlib.sha256(normalize(re.search(expression,new,re.S).group()).encode()).hexdigest()!=baseline['cases'][case]:
        errors.append(f'Empirical case content changed: {case}')

for directory in ['prototype', 'scaffolding']:
    modules=list((ROOT/directory).glob('*.mjs'))
    source='\n'.join(module.read_text() for module in modules)
    for prohibited in ['localStorage','sessionStorage','fetch(', 'XMLHttpRequest','sendBeacon','document.cookie']:
        if prohibited in source:errors.append(f'{directory}: unexpected storage/network API: {prohibited}')
    if 'innerHTML' in source:errors.append(f'{directory}: dynamic HTML insertion bypasses text-node rendering')
    for module in modules:
        for imported in re.findall(r'from [\'\"]([^\'\"]+)[\'\"]',module.read_text()):
            if imported.startswith('.') and not (module.parent/urlsplit(imported).path).is_file():
                errors.append(f'{module.name}: missing imported module {imported}')
if errors:raise SystemExit('\n'.join(errors))
print(f'PASS: {len(pages)} HTML pages; {checks} local/artifact links and anchors; five-item navigation.')
print('PASS: flagship matches its authorized revision; two foundational cases preserved; About/Publications/CV match approved snapshots; PDF and original navigation script unchanged.')
print('PASS: both demos use no persistent storage, collection API or dynamic innerHTML. This is a static code check, not a security audit.')
