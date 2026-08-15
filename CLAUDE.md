## We The Citizens

* Website: wethecitizens.io
* Political movement / grassroots advocacy site
* Two Docusaurus sites in one repo:
  - pub/ = public-facing website at wethecitizens.io
  - priv/ = internal team docs (not published publicly)

## Domains → Code → Hosting (authoritative)

DNS for `wethecitizens.io` lives in **AWS Route 53**, hosted zone `Z00802751HL8B4GZPUCJH`
(AWS account `068493425108`, user `BryanStarbuck`). Two completely different systems serve
this domain — the apex is this Docusaurus repo on GitHub Pages, and only the `app.` / `api.`
subdomains reach the EC2 web app.

| Domain | Code directory | Hosted by | Route 53 record |
|---|---|---|---|
| `wethecitizens.io` (apex) | `{PUB_DIR}` (**this repo**) | GitHub Pages, repo `BryanStarbuck/uplift`, workflow `.github/workflows/deploy.yml` | 4 × `A` → `185.199.108–111.153`, plus `AAAA` → `2606:50c0:800{0..3}::153` |
| `www.wethecitizens.io` | same as apex | GitHub Pages (301 → apex) | `CNAME` → `bryanstarbuck.github.io` |
| `app.wethecitizens.io` | `~/BGit/Bryan_git/we_citizens/` | EC2 / Docker Swarm behind an ALB | `A` ALIAS → `dualstack.heroe9-appec2lb-prod-30037372.us-east-2.elb.amazonaws.com` |
| `api.wethecitizens.io` | `~/BGit/Bryan_git/we_citizens/code/backend/` | same ALB | `A` ALIAS → same ALB |

Note: the GitHub remote for this repo is still named `BryanStarbuck/uplift` — a leftover from
when the site was "Uplift America". The repo *name* is stale; the content and the custom domain
are We The Citizens. `upliftamerica.net` no longer serves this site.

### Publishing the public site

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds `pub/` and deploys
the artifact to GitHub Pages. `priv/` is never published. Two things pin the custom domain and
both must stay in sync:

* `{PUB_DIR}/static/CNAME` — must contain exactly `wethecitizens.io` (it ships inside the build artifact)
* The repo's Pages setting — `gh api repos/BryanStarbuck/uplift/pages` must report
  `"cname": "wethecitizens.io"` with an approved cert covering `wethecitizens.io` + `www.wethecitizens.io`

Rules when touching DNS:
* **Never** repoint the apex or `www` at the ALB — that breaks this website.
* **Never** repoint `app.` or `api.` at GitHub Pages — that breaks the web app.
* Leave the `_49886a4a94bec80e87b8da368f3d0b06` CNAME alone — it is the ACM validation record for the ALB cert.

## Project Structure

ROOT_DIR dir is ~/BGit/Bryan_git/docu_we_citizens

PUB_DIR dir is {ROOT_DIR}/pub
PRIV_DIR dir is {ROOT_DIR}/priv

```
{ROOT_DIR}/
├── pub/                # Public Docusaurus site (wethecitizens.io)
├── priv/               # Private/internal Docusaurus site (team only)
├── knowledge/          # Shared research, source material
├── prompts/            # Prompt files
├── Product/            # TO_DO.md, Goal.md, Use_Cases.md, Decisions.yaml
├── Engineering/        # Architecture, deployment, infra docs
├── Research/           # Policy research, talking points, opposition research
├── tests/              # Test_Results/, Test_cases.csv
├── docs/               # Wiki markdown + subdirs
├── UI/ascii/           # ASCII UI mockups
├── UI/screenshots/     # images/ + markdown/
├── README.md, claude.md
```

## Docusaurus Sites

* pub/ and priv/ are independent Docusaurus installations with their own package.json, docusaurus.config.ts, and sidebars
* pub/ is the production public site deployed to wethecitizens.io
* priv/ is internal-only, run locally or on a private URL for team coordination
* Each site follows standard Docusaurus structure: docs/, blog/, src/, static/

## Dev Servers

* pub/ dev server: `cd {PUB_DIR} && npm start` → http://localhost:3849/
* priv/ dev server: `cd {PRIV_DIR} && npm start -- --port 3848`

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
cd {PUB_DIR} && npx docusaurus clear && npm start
cd {PRIV_DIR} && npx docusaurus clear && npm start -- --port 3848
```

Also check for stale processes on ports 3849/3848 before starting:
```
lsof -ti :3849 | xargs kill 2>/dev/null; lsof -ti :3848 | xargs kill 2>/dev/null
```

## Content Rules

* Defamation prevention: never state as fact that any living person committed a crime unless court-proven. Use attribution language ("according to [source]...", "allegedly", "reportedly").
* Plain text preferred in non-web content. Asterisks for bullets, no dashes.

## "Add People" Convention

When the user says "add people" (or "add this person", "add them to the list", or any similar instruction without naming a specific file), do all three of the following:

**1. Append to both list files.**

* {PUB_DIR}/docs/Dietrich_Bonhoeffer.mdx — the broad Bonhoeffer roster (journalists, researchers, citizens, politicians, anyone who meets the criteria)
* {PUB_DIR}/docs/Politican_Challengers.mdx — the politician-specific subset

Both files have a `## The List` section with a numbered list. Append new entries to the end of that numbered list, preserving numbering order. Entry format:

```
N. [Full Name](/docs/bonhoeffers/<slug>) — [@handle](https://x.com/handle)
```

* The name is a link to the person's individual page (see step 2)
* The @-handle links to `https://x.com/<handle>`
* Do NOT add unverified claims about why the person qualifies — name + page link + handle only, unless the user explicitly provides supporting context

**2. Create an individual person page.**

Create `{PUB_DIR}/docs/Bonhoeffers/<First_Last>.mdx` (one file per person). Frontmatter:

```
---
id: <first-last>
title: <Full Name>
slug: /bonhoeffers/<first-last>
---
```

Page contents:

* Header bullets: X handle link, `**Status:** Alive`, one-line role description
* `## Bonhoeffer Criteria Scores (1–10)` — a 15-row markdown table of all criteria from {PUB_DIR}/docs/Dietrich_Bonhoeffer_Criteria.mdx, scored 1–10
* For criteria where public-record knowledge is unclear, use `—` (em-dash) rather than guessing a score
* `## Notes` — short paragraph; include any cost-bearing public actions, executive history, or government background

**3. Verify the build.**

Run `cd {PUB_DIR} && npx docusaurus clear && npm run build` after the edits to confirm no broken links.

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
* When framing for the public site (pub/), follow defamation rules — describe
  the system as captured/controlled in attributed terms, not as proven
  criminal acts by named living individuals.
* The internal site (priv/) can carry the unvarnished version of the charter
  for organizers.
