"""Read-only SEO checks against a running local build or the production site."""
import concurrent.futures
import html
import json
import re
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from urllib.parse import urlsplit

BASE = (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:3000').rstrip('/')
CANONICAL = 'https://foot-plus.co.uk'
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args): return None
opener = urllib.request.build_opener(NoRedirect)
def fetch(path):
    try: response = opener.open(BASE + path, timeout=30)
    except urllib.error.HTTPError as error: response = error
    return response.status, response.headers, response.read().decode()
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.canonicals=[]; self.h1=0; self.noindex=False; self.links=[]; self.schemas=[]; self.in_schema=False; self.buffer=''
    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs)
        if tag=='h1': self.h1+=1
        if tag=='link' and attrs.get('rel')=='canonical': self.canonicals.append(attrs.get('href'))
        if tag=='meta' and attrs.get('name')=='robots': self.noindex='noindex' in attrs.get('content','')
        if tag=='a' and attrs.get('href','').startswith('/'): self.links.append(attrs['href'])
        if tag=='script' and attrs.get('type')=='application/ld+json': self.in_schema=True; self.buffer=''
    def handle_data(self,data):
        if self.in_schema: self.buffer+=data
    def handle_endtag(self,tag):
        if tag=='script' and self.in_schema: self.schemas.append(json.loads(self.buffer)); self.in_schema=False

status, _, xml = fetch('/sitemap.xml'); assert status==200
urls=[item.text for item in ET.fromstring(xml).iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
assert len(urls)==len(set(urls)), 'Duplicate sitemap URLs'
assert CANONICAL+'/about' in urls
assert CANONICAL+'/advice/why-toenails-are-difficult-to-cut' in urls
paths={urlsplit(url).path or '/' for url in urls}
all_links=set()
def verify(url):
    assert url.startswith(CANONICAL), url
    path=urlsplit(url).path or '/'
    status,headers,body=fetch(path)
    assert status==200, (path,status,headers.get('Location'))
    page=Page(); page.feed(body)
    assert len(page.canonicals)==1 and page.canonicals[0].rstrip('/')==url.rstrip('/'), (path,page.canonicals)
    assert not page.noindex, path
    assert page.h1==1, (path,page.h1)
    assert not re.search(r'Content-confirmation TODO|Repository service pages|Booking-click measurement',body), path
    assert not re.search(r'Foot\+ \| Foot\+',body), path
    return path,page.links
for path,links in concurrent.futures.ThreadPoolExecutor(max_workers=8).map(verify,urls):
    all_links.update(links)
for link in all_links:
    target=urlsplit(link).path or '/'
    if target in ['/bristol','/southampton','/areas-we-cover','/areas']: raise AssertionError(('Redirected internal link',link))
    assert target in paths or target.startswith('/api/') or target.startswith('/images/'), ('Unknown internal page',link)
for alias,destination in {'/areas':'/locations/bristol/areas-we-cover','/areas-we-cover':'/locations/bristol/areas-we-cover','/foot-health-practitioner-bristol':'/locations/bristol','/bristol':'/locations/bristol','/southampton':'/locations/southampton'}.items():
    status,headers,_=fetch(alias)
    assert status in [301,308], (alias,status)
    assert headers.get('Location')==destination,(alias,headers.get('Location'))
status,_,body=fetch('/toenail-cutting-bristol');page=Page();page.feed(body)
nodes=[node for schema in page.schemas for node in schema.get('@graph',[schema])]
service=next(node for node in nodes if node.get('@type')=='Service')
assert service['provider']['@id']==CANONICAL+'/locations/bristol#medicalbusiness'
assert {offer['price'] for offer in service['offers']}=={'55','60'}
assert 'location=bristol&amp;service=nails' in body
status,_,body=fetch('/about');page=Page();page.feed(body)
assert 'id="adam-james"' in body and 'id="katie-preston"' in body
print(json.dumps({'base':BASE,'sitemapPagesChecked':len(urls),'internalLinksChecked':len(all_links),'redirectsChecked':5,'result':'PASS'},indent=2))
