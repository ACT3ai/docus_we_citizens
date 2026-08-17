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
THE FOUR PARTY FRONT DOORS
====================================================================

We The Citizens has four party front doors. They are Level 2 areas on this
site and they are also pinned items in the top bar.

* "We The Citizens R"  -> Republicans  -> WeCitizensR.com
  level_2_key = r    (site/docs/r/)   nav_order 31   sidebar republicanSidebar
* "We The Citizens D"  -> Democrats    -> WeCitizensD.com
  level_2_key = d    (site/docs/d/)   nav_order 32   sidebar democratSidebar
* "We The Citizens L"  -> Libertarians -> WeCitizensL.com
  level_2_key = l    (site/docs/l/)   nav_order 33   sidebar libertarianSidebar
* "We The Citizens S"  -> Socialists   -> WeCitizensSocialism.com
  level_2_key = s    (site/docs/s/)   nav_order 34   sidebar socialistSidebar

All four are registered on Bryan Starbuck's CLOUDFLARE account, along with
citizensstudio.io, wecitizens.social and wethecitizens.tv. DNS, nameservers,
renewals and registrar transfers are all done in Cloudflare. They are NOT on
Namecheap; do not reach for the Namecheap dashboard or the Namecheap MCP tools
for any of them. (wethecitizens.io itself is the exception — its DNS is in AWS
Route 53, per DOMAINS -> CODE -> HOSTING above.)

The public Docusaurus path for each door is a path under WeTheCitizens.io, not
a domain of its own: https://WeTheCitizens.io/r/ , /d/ , /l/ , /s/ . There is no
such host as WeTheCitizensR.io or WeTheCitizensD.io; a reference to either is a
typo for the path form.

The keys were renamed from we_the_citizens_r / we_the_citizens_d to r / d on
2026-08-17, and the L and S doors were added on the same day already using the
short form, so all four keys are the one-letter codes r / d / l / s. Any
surviving long-form key is stale and resolves to nothing. THREE PLACES have to
agree for each key or the build breaks:

  1. the directory name under site/docs/
  2. the level_2_key column in level_2.csv
  3. PARTY_KEYS / PARTIES / PARTY_SIDEBAR_IDS in internal/nav.ts

Each edition has its own left bar — see THE FIVE LEFT BARS below.

They are ONE web app rendered four ways, selected by the domain the request
arrived on. Not four products, not four deployments, not four data sets. The
edition is a request attribute.

FOUR DOORS, TWO PAIRS. They are not four unrelated skins. R and D are each
other's reflection on the PARTISAN axis; L and S are each other's reflection on
the ECONOMIC axis. Every door names exactly one other party — its partner on the
same axis — which is what fills the cross-party honesty column and what gives
the mirror check a counterpart to run against. A door is only ever added
together with its partner; an unpaired door has nothing to check it against.

THE MIRROR-SYMMETRY RULE binds everything we write about them, and it runs ONCE
PER PAIR. Everything true of R is true of D with the party label swapped, and
everything true of L is true of S the same way: one award pipeline, symmetric
harshness, no copy that compares or characterizes a party, the cross-party
column always present. The unit of judgement is a person and a vote, never a
party. Review test for any change: "would I ship the exact mirror of this to
the paired edition tomorrow?" If no, it does not ship.

HOW A FRONT-DOOR DIRECTORY IS LAID OUT. All four are identical, four files each,
and that sameness is the mirror rule made structural:

  _category_.json      label, position, link -> doc id "overview"
  _overview_page.tsx   thin per-edition entry point; renders the shared
                       src/components/PartyFrontDoor with edition="R|D|L|S"
  overview.mdx         id "overview" — THE Level 2 page. Every link in the
                       product points here: nav.ts overviewPath(), the
                       _category_.json link, and the web app's
                       docsOverviewPath (/docs/r/overview, /docs/d/overview,
                       /docs/l/overview, /docs/s/overview).
  reference_text.mdx   id "reference_text", unlisted — the long-form prose
                       version of the same argument, for reference and reuse.

The page itself is written ONCE, in src/components/PartyFrontDoor, and
parameterized by edition. Four hand-copied page files would promise mirror
symmetry and then lose it the first time somebody improved a paragraph on one
door and not on its partner. Do not fork that component per edition.

The authoritative product spec is ~/BGit/act3/we_citizens/pm/r_vs_d.mdx.
Read it before writing anything new about the four editions.

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

NO BLOG IN THE TOP BAR. Permanent. The blog still builds, its posts still
resolve, and it is linked from the footer, but it is not a top-bar destination.
Do not add it back to themeConfig.navbar.

Swizzled theme components support this:

* src/theme/NavbarItem/NavbarNavLink — adds a `subLabel` prop, which renders a
  navbar or dropdown label on two lines ("We The Citizens R" over
  "Republicans"). Every navbar link funnels through this one component, so the
  two-line label works in the top bar, in dropdowns, and in the mobile drawer.
* src/theme/Footer/Links/MultiColumn — makes footer column titles clickable,
  using the title -> route map from customFields.footerColumnLinks.

The footer carries the legal pages, and they are the only copies:
  Terms of Service -> /docs/legal/terms   (site/docs/legal/terms/index.md)
  Privacy Policy   -> /docs/legal/privacy (site/docs/legal/privacy/index.md)
Both name ACT3ai, Inc., a Delaware corporation, DBA wethecitizens.io, as the
operating entity. Contacts: legal@, privacy@, dmca@wethecitizens.io.

TO ADD A LEVEL 2 AREA:
1. Add the row to level_2.csv.
2. Create site/docs/{level_2_key}/overview.mdx and _category_.json. The
   _category_.json position = the nav_order column, AND it must carry the link
   to the area's own page, or the left bar has nowhere to send the reader:
     { "label": "...", "position": N,
       "link": { "type": "doc", "id": "overview" } }
3. Put the key in one MENU_GROUPS group and one FOOTER_GROUPS group in
   internal/nav.ts, and give it a short subLabel.
Step 3 is enforced: the build FAILS with a named error if a CSV key is in no
group, in two groups, or in a group but not in the CSV. That guard is what
keeps "the More menu shows all the Level 2s" true over time.

====================================================================
THE FIVE LEFT BARS
====================================================================

There are exactly five left bars on this site, declared in
internal/sidebars.ts from data in internal/nav.ts. No page defines its own.

  mainSidebar         the whole site — every Level 2 area, flat
  republicanSidebar   every page under site/docs/r/
  democratSidebar     every page under site/docs/d/
  libertarianSidebar  every page under site/docs/l/
  socialistSidebar    every page under site/docs/s/

The party bars exist because those areas are front doors onto their own
hierarchies: a visitor who arrived at WeCitizensR.com sees the R edition's own
Level 2s, not the thirty areas of the parent site. All four are generated by the
same function from the same shape — sidebars.ts maps over PARTIES rather than
writing them out one at a time — so the mirror-symmetry rule holds for
navigation too and no door can be given a bar its pair partner does not get.
internal/nav.ts's docsSidebarItemsGenerator lifts the party areas out of the
root autogenerated slice; without it those pages would belong to two sidebars at
once and would have no single left bar to render.

THREE RULES, ENFORCED IN THE TEMPLATE, NOT PER PAGE
src/theme/DocSidebarItem/Category draws a directory as ONE LINK to that
directory's own page:

* NO EXPAND CHEVRON. Nothing in the left bar opens.
* NO LEVEL 3 ROWS. The bar never nests and never indents. The pages inside an
  area are listed on that area's own overview page.
* CLICKING A LEVEL 2 NAVIGATES TO ITS LEVEL 2 PAGE, from the `link` in that
  area's _category_.json.

Children keep their sidebar membership — membership is decided from the sidebar
data at build time, not from what the component draws — so a Level 3 page still
renders with the same left bar as everything else.

Escape hatch: a directory that should not appear in the left bar at all sets
  "customProps": { "hideInSidebar": true }
in its _category_.json. site/docs/Bonhoeffers/ uses it, because its roster is
reached from the "Dietrich Bonhoeffers" page.

Ordering note: standalone docs at the root of site/docs/ share one position
space with the Level 2 categories. The site pages sit at 0.1-0.3 (Charter,
About Us, Board), the Level 2 areas at 1-30 in reading order, the Bonhoeffer
roster pages at 85-88, Legal at 90, Internal Research at 97.

====================================================================
NO RIGHT BAR, NO BREADCRUMB BAR
====================================================================

Both are gone site-wide, permanently, at the template level. Nothing in
frontmatter can bring them back — `hide_table_of_contents` is now a no-op.

* src/theme/DocItem/Layout — ejected. No table of contents (desktop or mobile),
  no breadcrumbs, and the article takes the full content width because there is
  no TOC column to leave room for.
* src/theme/TOC — returns null. The template-level guarantee that no page type
  or future theme component can put a TOC back on the right.
* src/theme/DocBreadcrumbs — returns null. Covers the docs pages and the
  category generated-index pages.
* src/theme/BlogLayout — drops the `toc` prop before the stock layout sees it,
  so blog posts get no right column either.
* internal/css/custom.css — "The left bar" and "No right bar" sections are the
  styling half of the same decisions.

====================================================================
FAVICON
====================================================================

The mark is the black box with the white W (site/static/img/logo.svg).

* site/static/img/favicon.ico — multi-resolution ICO (16/32/48/64), the one
  docusaurus.config.ts `favicon:` points at
* site/static/favicon.ico — same file at the site root, because bookmark and
  favorites managers request /favicon.ico directly and ignore the <head>
* site/static/img/favicon-16|32|48|192|512.png and apple-touch-icon.png (180),
  wired up as <link> tags in the config's headTags

Keep them in sync. If the logo changes, regenerate all of them, not just one.

WIDTH BUDGET FOR THE TOP BAR (internal/css/custom.css, "Fitting the bar"):
the navbar rides a 1320px rail. Below 1610px the site links (.wcNavFoldable)
fold out of the bar and their duplicates in the More menu (.wcMoreFolded)
appear instead. The fold point was 1380px until the bar went from two party
front doors to four on 2026-08-17; the two extra buttons cost roughly 230px, so
the fold point moved up by the same amount rather than letting the row wrap.
The party links are the ones that must survive the squeeze — they are the whole
point of the bar — so the site links fold first. If you add another top-bar
item, re-check that budget again.
