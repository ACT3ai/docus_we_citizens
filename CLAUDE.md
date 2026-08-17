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

NEW REPO for this Docusaurus for WeTheCitizens.io:   https://github.com/ACT3ai/docus_we_citizents.git

It used to have an old repo. Note that the above is the newest as of August 15th, 2026. 

## Domains → Code → Hosting (authoritative)

DNS for `wethecitizens.io` lives in **AWS Route 53**, hosted zone `Z00802751HL8B4GZPUCJH`
(AWS account `068493425108`, user `BryanStarbuck`). Two completely different systems serve
this domain — the apex is this Docusaurus repo on GitHub Pages, and only the `app.` / `api.`
subdomains reach the EC2 web app.

| Domain | Code directory | Hosted by | Route 53 record |
|---|---|---|---|
| `wethecitizens.io` (apex) | `{SITE_DIR}` (**this repo**) | GitHub Pages, repo `ACT3ai/docus_we_citizens`, workflow `.github/workflows/deploy.yml` | 4 × `A` → `185.199.108–111.153`, plus `AAAA` → `2606:50c0:800{0..3}::153` |
| `www.wethecitizens.io` | same as apex | GitHub Pages (301 → apex) | `CNAME` → `bryanstarbuck.github.io` |
| `app.wethecitizens.io` | `~/BGit/act3/we_citizens/` | EC2 / Docker Swarm behind an ALB | `A` ALIAS → `dualstack.heroe9-appec2lb-prod-30037372.us-east-2.elb.amazonaws.com` |
| `api.wethecitizens.io` | `~/BGit/act3/we_citizens/code/` (backend) | same ALB | `A` ALIAS → same ALB |

Note: the publishing repo moved on 2026-08-15. It used to be `BryanStarbuck/uplift` — a leftover
from when the site was "Uplift America". That repo has been renamed `BryanStarbuck/DEAD_uplift`,
its Pages custom domain has been cleared (`cname: null`), and it no longer serves anything at
wethecitizens.io. The live repo is `ACT3ai/docus_we_citizens`, which now holds the
`wethecitizens.io` custom domain and the approved cert. `upliftamerica.net` no longer serves this
site either.

### Publishing the public site

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site from the
repo root (content under `site/`) and deploys the artifact to GitHub Pages. `docs/priv/` is
never published. Two things pin the custom domain and both must stay in sync:

* `{SITE_DIR}/static/CNAME` — must contain exactly `wethecitizens.io` (it ships inside the build artifact)
* The repo's Pages setting — `gh api repos/ACT3ai/docus_we_citizens/pages` must report
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

====================================================================
LEVEL 2 AREAS — THE CONTENT REGISTRY
====================================================================

The list of directories which we call the Level 2 directories is under
(LEVEL_2_DIRECTORIES):
{SITE_DIR}/docs/

* {SITE_DIR}/docs/{one specific level 2 dir}/
* {SITE_DIR}/docs/{one specific level 2 dir}/overview.mdx <== The UI page for that "Level 2 area"
* {SITE_DIR}/docs/{one specific level 2 dir}/{level 3 page}.mdx <== A UI page
  for a Level 3. The name won't be overview.mdx; it'll be a few words,
  underscores, always lowercase. The Level 2 overview.mdx should link to it.

This file is where we keep the list of the level twos, with descriptions to
understand the meaning and scope of each one:
{ROOT_DIR}/level_2.csv

Related repos for this topic:

* ~/BGit/act3/we_citizens/ — the main product (web app). code/ is the app;
  pm/ holds the product management specification files (also ai/, cli/, mcp/).
* ~/BGit/act3/data_we_citizens/ — the movement's open data repo. Look in here
  to learn things when writing pages. This site's job is introduction:
  ramping people up from knowing nothing to understanding it; lower Level 3s
  can get more specific.

We pair up with our social network, which is secondary, but sometimes we'll
make references to it:

* Social network name = WeCitizens Social
* Social network domain: WeCitizens.social
* Social network marketing site docusaurus: m.WeCitizens.social
  (repo: ~/BGit/act3/docu_social_media/)

====================================================================
THE TWO PARTY FRONT DOORS
====================================================================

We The Citizens has two partisan front doors. They are Level 2 areas on this
site and they are also pinned items in the top bar.

* "We The Citizens R"  -> Republicans -> WeCitizensR.com
  level_2_key = we_the_citizens_r
* "We The Citizens D"  -> Democrats   -> WeCitizensD.com
  level_2_key = we_the_citizens_d

They are ONE web app rendered two ways, selected by the domain the request
arrived on. Not two products, not two deployments, not two data sets.

THE MIRROR-SYMMETRY RULE binds everything we write about them. Everything true
of R is true of D with the party label swapped: one award pipeline, symmetric
harshness, no copy that compares or characterizes a party, the cross-party
column always present. The unit of judgement is a person and a vote, never a
party. Review test for any change: "would I ship the exact mirror of this to
the other edition tomorrow?" If no, it does not ship.

The authoritative product spec is ~/BGit/act3/we_citizens/pm/r_vs_d.mdx.
Read it before writing anything new about the two editions.

====================================================================
SITE NAVIGATION — ONE SOURCE, EVERY PAGE
====================================================================

The top bar and the footer are defined ONCE and appear on every page. Do not
add a second navbar or footer anywhere.

* internal/nav.ts is THE single source of truth.
  It reads level_2.csv at build time and generates the party front-door navbar
  items, the "More" mega-menu, the footer columns, and the footer column-title
  links. Node-side only — it touches the filesystem, so never import it from a
  client component.

* docusaurus.config.ts consumes it: partyNavbarItems(), moreNavbarItem(),
  footerColumns(), clientNavData().

* Docusaurus renders themeConfig.navbar / themeConfig.footer through
  @theme/Layout, and every surface on this site — MDX docs, blog posts, and
  the hand-written React pages under site/pages/ — is wrapped in that Layout.
  That is why one edit in internal/nav.ts changes the whole site.

* Anything the BROWSER needs from internal/nav.ts crosses over through
  siteConfig.customFields (clientNavData()), never by importing the module.

Two swizzled theme components support this:

* src/theme/NavbarItem/NavbarNavLink — adds a `subLabel` prop, which renders a
  navbar or dropdown label on two lines ("We The Citizens R" over
  "Republicans"). Every navbar link funnels through this one component, so the
  two-line label works in the top bar, in dropdowns, and in the mobile drawer.
* src/theme/Footer/Links/MultiColumn — makes footer column titles clickable,
  using the title -> route map from customFields.footerColumnLinks.

TO ADD A LEVEL 2 AREA:
1. Add the row to level_2.csv.
2. Create site/docs/{level_2_key}/overview.mdx and _category_.json
   (_category_.json position = the nav_order column).
3. Put the key in one MENU_GROUPS group and one FOOTER_GROUPS group in
   internal/nav.ts, and give it a short subLabel.
Step 3 is enforced: the build FAILS with a named error if a CSV key is in no
group, in two groups, or in a group but not in the CSV. That guard is what
keeps "the More menu shows all the Level 2s" true over time.

WIDTH BUDGET FOR THE TOP BAR (internal/css/custom.css, "Fitting the bar"):
the navbar rides a 1320px rail. Below 1380px the four site links
(.wcNavFoldable) fold out of the bar and their duplicates in the More menu
(.wcMoreFolded) appear instead. If you add another top-bar item, re-check
that budget.
