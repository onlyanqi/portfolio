"""Validate static links and deployment safety without external dependencies."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]

class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.links = []
        self.h1_count = 0
        self.main_count = 0
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'h1':
            self.h1_count += 1
        if tag == 'main':
            self.main_count += 1
        for attr in ('href', 'src'):
            if attr in attrs:
                self.links.append(attrs[attr])

parser = SiteParser()
parser.feed((ROOT / 'index.html').read_text())
assert parser.h1_count == 1, 'Expected one primary heading'
assert parser.main_count == 1, 'Expected one main landmark'
assert len(parser.ids) == len(set(parser.ids)), 'Duplicate IDs'
for link in parser.links:
    url = urlsplit(link)
    if url.scheme or url.netloc:
        continue
    assert not url.path.startswith('/'), f'Root-relative link breaks project hosting: {link}'
    if url.path:
        assert (ROOT / unquote(url.path)).is_file(), f'Missing local asset: {link}'
    elif url.fragment:
        assert url.fragment in parser.ids, f'Missing anchor: {link}'
assert (ROOT / 'files/resume.pdf').read_bytes().startswith(b'%PDF'), 'Invalid resume PDF'
assert (ROOT / '.nojekyll').exists(), 'Static hosting marker missing'
print(f'PASS: {len(parser.links)} links, {len(parser.ids)} unique IDs, local assets and Pages paths valid.')
