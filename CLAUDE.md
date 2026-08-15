## We The Citizens

* Website: wethecitizens.io
* Political movement / grassroots advocacy site
* ONE Docusaurus site in this repo, using the standard layout:
  - docusaurus.config.ts, package.json, tsconfig.json at the repo root
  - site/ = all site content (docs/, blog/, pages/, static/)
  - internal/ = site wiring (sidebars.ts, css/custom.css)
  - The old pub/ + priv/ two-site split was removed on 2026-08-15. The public
    site content moved to site/; the priv site's real content moved to
    docs/priv/ (see docs/priv/README.md) and is NOT part of the build.


This repo is the docusaurus markdown site before they enter the web app for We The Citizens. 

NEW REPO for this Docusaurus for WeTheCitizens.io:   https://github.com/ACT3ai/docus_we_citizens.git

It used to have an old repo. Note that the above is the newest as of August 15th, 2026. 

## Domains → Code → Hosting (authoritative)

DNS for `wethecitizens.io` lives in **AWS Route 53**, hosted zone `Z00802751HL8B4GZPUCJH`
(AWS account `068493425108`, user `BryanStarbuck`). Two completely different systems serve
this domain — the apex is this Docusaurus repo on GitHub Pages, and only the `app.` / `api.`
subdomains reach the EC2 web app.

| Domain | Code directory | Hosted by | Route 53 record |
|---|---|---|---|
| `wethecitizens.io` (apex) | `{SITE_DIR}` (**this repo**) | GitHub Pages, repo `BryanStarbuck/uplift`, workflow `.github/workflows/deploy.yml` | 4 × `A` → `185.199.108–111.153`, plus `AAAA` → `2606:50c0:800{0..3}::153` |
| `www.wethecitizens.io` | same as apex | GitHub Pages (301 → apex) | `CNAME` → `bryanstarbuck.github.io` |
| `app.wethecitizens.io` | `~/BGit/Bryan_git/we_citizens/` | EC2 / Docker Swarm behind an ALB | `A` ALIAS → `dualstack.heroe9-appec2lb-prod-30037372.us-east-2.elb.amazonaws.com` |
| `api.wethecitizens.io` | `~/BGit/Bryan_git/we_citizens/code/backend/` | same ALB | `A` ALIAS → same ALB |

Note: the GitHub remote for this repo is still named `BryanStarbuck/uplift` — a leftover from
when the site was "Uplift America". The repo *name* is stale; the content and the custom domain
are We The Citizens. `upliftamerica.net` no longer serves this site.

### Publishing the public site

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site from the
repo root (content under `site/`) and deploys the artifact to GitHub Pages. `docs/priv/` is
never published. Two things pin the custom domain and both must stay in sync:

* `{SITE_DIR}/static/CNAME` — must contain exactly `wethecitizens.io` (it ships inside the build artifact)
* The repo's Pages setting — `gh api repos/BryanStarbuck/uplift/pages` must report
  `"cname": "wethecitizens.io"` with an approved cert covering `wethecitizens.io` + `www.wethecitizens.io`

Rules when touching DNS:
* **Never** repoint the apex or `www` at the ALB — that breaks this website.
* **Never** repoint `app.` or `api.` at GitHub Pages — that breaks the web app.
* Leave the `_49886a4a94bec80e87b8da368f3d0b06` CNAME alone — it is the ACM validation record for the ALB cert.

## Project Structure

ROOT_DIR dir is ~/BGit/act3/docus_we_citizens

SITE_DIR dir is {ROOT_DIR}/site

```
{ROOT_DIR}/
├── docusaurus.config.ts   # Single Docusaurus site config (at repo root)
├── package.json           # Docusaurus deps + scripts (npm start / npm run build)
├── tsconfig.json
├── site/                  # ALL site content
│   ├── docs/              # Docs pages (Bonhoeffers, challengers, legal, ...)
│   ├── blog/              # Blog posts
│   ├── pages/             # React pages (index.tsx, 404.tsx)
│   └── static/            # CNAME, robots.txt, img/
├── internal/              # Site wiring (not content)
│   ├── sidebars.ts
│   └── css/custom.css
├── knowledge/          # Shared research, source material
├── prompts/            # Prompt files
├── Product/            # TO_DO.md, Goal.md, Use_Cases.md, Decisions.yaml
├── Engineering/        # Architecture, deployment, infra docs
├── Research/           # Policy research, talking points, opposition research
├── tests/              # Test_Results/, Test_cases.csv
├── docs/               # Wiki markdown + subdirs (docs/priv/ = old priv-site content, unpublished)
├── UI/ascii/           # ASCII UI mockups
├── UI/screenshots/     # images/ + markdown/
├── README.md, CLAUDE.md
```

## Docusaurus Site

* One Docusaurus installation at the repo root; content lives under site/
  (docs, blog, pages, static) and wiring under internal/ (sidebars, css) —
  same pattern as ~/BGit/act3/docu_social_media/
* docusaurus.config.ts points at them: docs.path = site/docs,
  blog.path = site/blog, pages.path = site/pages,
  staticDirectories = [site/static], sidebarPath = ./internal/sidebars.ts,
  customCss = ./internal/css/custom.css
* Production public site deployed to wethecitizens.io
* Internal-only team content lives in docs/priv/ (plain markdown, never built)

## Dev Server

* `cd {ROOT_DIR} && npm start` → http://localhost:3849/

## Docusaurus Cache Bug (RECURRING)

Docusaurus caches compiled MDX in node_modules/.cache and .docusaurus/. When blog
posts, docs, or config files are added, renamed, or deleted, the dev server often
serves stale cached data and throws errors like "Blog post not found for filePath=..."
or "Module build failed" even though the files are correct on disk.

FIX: Always run `npx docusaurus clear` before `npm start` after any file
add/rename/delete. This removes node_modules/.cache, .docusaurus/, and build/.

PREVENTION:
* After adding, renaming, or deleting any content file: run `npx docusaurus clear`
* After deleting old sample/template blog posts: run `npx docusaurus clear`
* If the dev server shows "not found" errors for files that exist: stop the server,
  run `npx docusaurus clear`, then restart with `npm start`
* The production `npm run build` also benefits from a clear first if errors appear

STARTUP SEQUENCE (use this every time):
```
cd {ROOT_DIR} && npx docusaurus clear && npm start
```

Also check for a stale process on port 3849 before starting:
```
lsof -ti :3849 | xargs kill 2>/dev/null
```

## Content Rules

* Defamation prevention: never state as fact that any living person committed a crime unless court-proven. Use attribution language ("according to [source]...", "allegedly", "reportedly").
* Plain text preferred in non-web content. Asterisks for bullets, no dashes.

## "Add People" Convention

When the user says "add people" (or "add this person", "add them to the list", or any similar instruction without naming a specific file), do all three of the following:

**1. Append to both list files.**

* {SITE_DIR}/docs/Dietrich_Bonhoeffer.mdx — the broad Bonhoeffer roster (journalists, researchers, citizens, politicians, anyone who meets the criteria)
* {SITE_DIR}/docs/Politican_Challengers.mdx — the politician-specific subset

Both files have a `## The List` section with a numbered list. Append new entries to the end of that numbered list, preserving numbering order. Entry format:

```
N. [Full Name](/docs/bonhoeffers/<slug>) — [@handle](https://x.com/handle)
```

* The name is a link to the person's individual page (see step 2)
* The @-handle links to `https://x.com/<handle>`
* Do NOT add unverified claims about why the person qualifies — name + page link + handle only, unless the user explicitly provides supporting context

**2. Create an individual person page.**

Create `{SITE_DIR}/docs/Bonhoeffers/<First_Last>.mdx` (one file per person). Frontmatter:

```
---
id: <first-last>
title: <Full Name>
slug: /bonhoeffers/<first-last>
---
```

Page contents:

* Header bullets: X handle link, `**Status:** Alive`, one-line role description
* `## Bonhoeffer Criteria Scores (1–10)` — a 15-row markdown table of all criteria from {SITE_DIR}/docs/Dietrich_Bonhoeffer_Criteria.mdx, scored 1–10
* For criteria where public-record knowledge is unclear, use `—` (em-dash) rather than guessing a score
* `## Notes` — short paragraph; include any cost-bearing public actions, executive history, or government background

**3. Verify the build.**

Run `cd {ROOT_DIR} && npx docusaurus clear && npm run build` after the edits to confirm no broken links.

## Movement Concept: 1,000 Bonhoeffers

Core organizing concept for We The Citizens. Charlie Kirk repeatedly referenced
wanting to "find and encourage 1,000 Dietrich Bonhoeffers" (sometimes
mis-transcribed as "D-tricks"). The premise: the US government and its
politicians are currently controlled by outside forces, and democracy in
practice does not exist. A single reformer can be neutralized, but a
distributed network of 1,000 ethics-first leaders cannot be stopped.

* Charlie Kirk's framing: he appears to have understood he could be removed
  personally and would then be ineffective. The 1,000 Bonhoeffers concept is
  his answer to that vulnerability — distribute the moral leadership so no
  single removal collapses the movement.
* The reference is NOT religious recruiting. It is about the character type:
  ethics first, willing to stand against a captured system at personal cost.
* Goal: free the US in 2026 from whatever is controlling its government and
  denying real democracy.

Who Dietrich Bonhoeffer was (1906–1945):
* German Lutheran pastor, theologian, and anti-Nazi dissident (NOT a Catholic
  priest — common misattribution).
* Publicly opposed Hitler's regime; helped lead the Confessing Church
  resistance movement; was linked to plots against Hitler.
* Arrested by the Nazis in 1943; executed by hanging at Flossenbürg
  concentration camp in April 1945, weeks before the war in Europe ended.
* Remembered as a martyr for writings like *The Cost of Discipleship* and for
  his willingness to stand against evil at the cost of his life.

How to apply this when writing for We The Citizens:
* Treat "1,000 Bonhoeffers" as the movement's recruiting and character
  standard — ethics first, distributed, resilient to the removal of any
  single leader.
* When framing for the public site (site/), follow defamation rules — describe
  the system as captured/controlled in attributed terms, not as proven
  criminal acts by named living individuals.
* The internal content (docs/priv/) can carry the unvarnished version of the charter
  for organizers.
