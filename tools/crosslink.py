#!/usr/bin/env python3
"""
crosslink.py — turn phrases into hyperlinks across every page of the site.

Reads pages.csv (the registry: key, url, and the phrases that should point at
that page), then walks every .md/.mdx under site/docs and links the first
unlinked, un-protected occurrence of each phrase.

WHAT IS PROTECTED AND NEVER TOUCHED
  frontmatter, fenced code blocks, inline code spans, headings, existing
  markdown links (text and target), JSX/HTML tags, and any line that opens with
  a JSX element.

RULES
  * an edition only links within itself: a main-site page links to main-site
    pages, an r/ page links to r/ pages. Never across doors.
  * never link a page to itself.
  * at most one link per target per page, and never a second link to a target
    the page already links to by any route.
  * a budget per page, so prose does not turn into link soup.
  * longest phrase wins where two overlap.

Usage:  crosslink.py [--apply]   (default is a dry run)
"""
import csv, os, re, sys, collections

DOCS = 'site/docs'
APPLY = '--apply' in sys.argv
BUDGET = 7            # max new links added to any one page

# ------------------------------------------------------------------ registry
rows = list(csv.DictReader(open('pages.csv')))
by_key = {r['page_key']: r for r in rows}
by_path = {r['file_path']: r for r in rows}

# phrase -> candidate pages
cand = collections.defaultdict(list)
for r in rows:
    for p in [x.strip().lower() for x in r['link_phrases'].split(';') if x.strip()]:
        cand[p].append(r)

def rank(r):
    # prefer the area overview over a deep page, and a shorter path over a longer
    return (0 if r['level'] == '2' else 1 if r['level'] == 'door' else 2,
            len(r['file_path']))

phrase_target = {}
collisions = []
for p, rs in cand.items():
    for ed in {r['edition'] for r in rs}:
        pick = sorted([r for r in rs if r['edition'] == ed], key=rank)[0]
        phrase_target[(ed, p)] = pick
        if len([r for r in rs if r['edition'] == ed]) > 1:
            collisions.append((ed, p, pick['page_key'],
                               [r['page_key'] for r in rs if r['edition'] == ed]))

# longest phrases first so "money in politics" beats "politics"
PHRASES = sorted({p for (_, p) in phrase_target}, key=len, reverse=True)
PATTERNS = [(p, re.compile(r'(?<![\w-])' + re.escape(p).replace(r'\ ', r'[  ]')
                           + r'(?![\w-])', re.I)) for p in PHRASES]

# ------------------------------------------------------------------- masking
def protected_mask(text):
    """True where a character must not be touched."""
    mask = bytearray(len(text))
    def block(a, b):
        for i in range(a, min(b, len(text))):
            mask[i] = 1

    m = re.match(r'^---\n.*?\n---\n', text, re.S)
    if m:
        block(0, m.end())
    # (pattern, flags). DOTALL is used ONLY for the fenced-code block; every
    # line-anchored pattern must stay single-line or it swallows the whole file.
    for rx, fl in (
        (r'```.*?```',                 re.S),          # fenced code
        (r'`[^`\n]*`',                 0),             # inline code
        (r'\[[^\]\n]*\]\([^)\n]*\)',   0),             # markdown links, text and target
        (r'^[ \t]{0,3}#{1,6} .*$',     re.M),          # headings
        (r'<[^>\n]*>',                 0),             # JSX / HTML tags
        (r'^[ \t]*<.*$',               re.M),          # any line opening with JSX
        (r'^:::.*$',                   re.M),          # admonition fences
        (r'^[ \t]*\|.*\|[ \t]*$',      re.M),          # table rows
        (r'https?://\S+',              0),             # bare URLs
    ):
        for mm in re.finditer(rx, text, fl):
            block(mm.start(), mm.end())
    return mask

# ------------------------------------------------------------------ the walk
report, total = [], 0
for dirpath, dirs, files in os.walk(DOCS):
    for f in sorted(files):
        if not f.endswith(('.md', '.mdx')):
            continue
        path = os.path.join(dirpath, f)
        rel = os.path.relpath(path, DOCS).replace(os.sep, '/')
        me = by_path.get(rel)
        if me is None:
            continue
        text = open(path).read()
        ed = me['edition']

        # Every destination this page already points at, normalised to a URL.
        # Relative `../area/overview.mdx` links have to be resolved first, or a
        # page that already links a target by file path gets a second link to
        # the same place by URL.
        already = set()
        for mm in re.finditer(r'\]\(([^)\n]+)\)', text):
            tgt = mm.group(1).split('#')[0].strip()
            if tgt.endswith(('.md', '.mdx')):
                resolved = os.path.normpath(
                    os.path.join(os.path.dirname(rel), tgt)).replace(os.sep, '/')
                hit = by_path.get(resolved)
                if hit:
                    tgt = hit['url_path']
            already.add(tgt.rstrip('/'))

        mask = protected_mask(text)
        edits, used = [], set()
        for phrase, rx in PATTERNS:
            t = phrase_target.get((ed, phrase))
            if t is None or t['page_key'] == me['page_key'] or t['page_key'] in used:
                continue
            url = t['url_path']
            if url.rstrip('/') in already or url in already:
                continue
            for mm in rx.finditer(text):
                a, b = mm.span()
                if any(mask[i] for i in range(a, b)):
                    continue
                if any(not (b <= x or a >= y) for x, y, _, _ in edits):
                    continue
                edits.append((a, b, url, t['page_key']))
                used.add(t['page_key'])
                break
            if len(used) >= BUDGET:
                break

        if not edits:
            continue
        edits.sort()
        out, last = [], 0
        for a, b, url, key in edits:
            out.append(text[last:a])
            out.append(f'[{text[a:b]}]({url})')
            last = b
        out.append(text[last:])
        new = ''.join(out)

        total += len(edits)
        report.append((rel, [(text[a:b], k) for a, b, u, k in edits]))
        if APPLY:
            open(path, 'w').write(new)

print(f'{"APPLIED" if APPLY else "DRY RUN"}: {total} links across {len(report)} pages\n')
for rel, es in report:
    print(rel)
    for txt, key in es:
        print(f'    "{txt}"  ->  {key}')

print(f'\ncollisions resolved: {len(collisions)}')
for c in collisions[:15]:
    print('   ', c)
