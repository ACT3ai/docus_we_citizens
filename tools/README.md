# tools/

Two scripts that keep `pages.csv` and the site's internal cross-links current.
Both are run from the repo root and both are safe to re-run — the link pass is
idempotent and converges to zero new links.

## `gen_pages_csv.py` — rebuild the page registry

```bash
python3 tools/gen_pages_csv.py
```

Walks every `.md` / `.mdx` under `site/docs/` and writes `pages.csv`, one row
per UI page:

| column | what it holds |
|---|---|
| `page_key` | unique key — words joined by underscores, lowercase, no special characters |
| `title` | the page's frontmatter title |
| `level` | `1` root doc · `2` area overview · `3` page inside an area · `door` a party front door |
| `edition` | `main` · `r` · `d` · `l` · `s` |
| `level_2_area` | the Level 2 directory the page belongs to |
| `file_path` | path relative to `site/docs/`, e.g. `congress_for_citizens/money_in_politics.mdx` |
| `url_path` | the served URL, e.g. `/congress_for_citizens/money_in_politics/` |
| `description` | what the page is, in 50 words or less (from frontmatter `description:`) |
| `link_phrases` | the phrases that, seen on any other page, should link **here** |

`link_phrases` is derived from the title, then filtered and extended by two
tables inside the script: `BLOCK` (phrases too generic to link on, which would
turn prose into link soup) and `EXTRA` (the product's actual vocabulary, curated
per page). Edit those two tables rather than the CSV — the CSV is generated.

## `crosslink.py` — turn phrases into hyperlinks site-wide

```bash
python3 tools/crosslink.py            # dry run: prints every link it would add
python3 tools/crosslink.py --apply    # write them
```

Reads `pages.csv`, then links the first unlinked occurrence of each phrase on
every page.

**Never touched:** frontmatter, fenced code blocks, inline code, headings,
existing markdown links, JSX/HTML tags, admonition fences, table rows, bare URLs.

**Rules:** an edition only links within itself (a main-site page never links into
`r/`, and `r/` never links into `d/`); a page never links to itself; at most one
link per target per page, deduped against links the page already carries by file
path *or* URL; and a per-page budget so no page turns into link soup.

Always run `npm run build` afterwards — `onBrokenLinks` is `throw`, so a bad
link fails the build rather than shipping.
