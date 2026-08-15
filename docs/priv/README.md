# Private / Internal Team Content (formerly the priv/ Docusaurus site)

This directory holds the surviving content from the old `priv/` Docusaurus
site, which was removed on 2026-08-15 when the repo was realigned to the
standard single-site layout (root `docusaurus.config.ts` + content under
`site/`).

The old `priv/` install was almost entirely the untouched Docusaurus starter
scaffold (sample blog posts, default images, and pages byte-identical to the
public site's). The files here are the only pieces with real content:

* `intro.md` — the Internal Overview doc (team coordination, governance,
  planning). This was the only real doc the priv site had.
* `markdown-page.md` — standalone internal markdown page stub.
* `docusaurus.config.ts.bak` — the priv site's config, kept for reference
  because it carries the "private site" hardening (noindex/nofollow meta,
  sitemap disabled). If a private site is ever stood up again, start from this.
* `robots.txt.bak` — the priv site's Disallow-all robots file, same reason.

Everything in this directory is confidential, for internal team use only, and
is NOT part of the public Docusaurus build (the site builds only from
`site/`).
