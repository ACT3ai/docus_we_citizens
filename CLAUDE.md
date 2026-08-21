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

The four party front doors (site/docs/r/, /d/, /l/, /s/) are Level 2 areas of
this site AND roots of their own Level 2 / Level 3 hierarchies. Their inner
areas are registered nowhere but the filesystem — see "INSIDE A FRONT DOOR"
under THE FOUR PARTY FRONT DOORS below.

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

We The Citizens has four party front doors. All four are Level 2 areas on this
site. All four are independent editions with no pairing between them. Only R and
D are pinned items in the top bar; L and S are reached from the "More" menu and
the footer — a width decision, see WIDTH BUDGET below.

* "We The Citizens R"  -> Republicans  -> WeCitizensR.com
  level_2_key = r    (site/docs/r/)   nav_order 31   sidebar republicanSidebar
* "We The Citizens D"  -> Democrats    -> WeCitizensD.com
  level_2_key = d    (site/docs/d/)   nav_order 32   sidebar democratSidebar
* "We The Citizens L"  -> Libertarians -> WeCitizensL.com
  level_2_key = l    (site/docs/l/)   nav_order 33   sidebar libertarianSidebar
* "We The Citizens S"  -> Democratic Socialists -> WeCitizensSocialism.com
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

FOUR DOORS, NO PAIRS. THERE IS NO MIRROR RULE. This is the doctrine, and it
replaced the opposite doctrine on 2026-08-21.

The four doors used to be locked together in two pairs — R with D on a "partisan
axis", L with S on an "economic axis" — and a MIRROR-SYMMETRY RULE required that
everything true of one member of a pair be true of the other with the party label
swapped: same areas, same positions, same shape, same sentences, shipped in the
same commit. THAT RULE IS GONE. Do not re-derive it, do not reintroduce it under
another name, and do not write a helper that "keeps the doors in sync."

What replaced it:

* R is Republicans. D is Democrats. L is Libertarians. S is DEMOCRATIC
  SOCIALISTS. That mapping is the only thing the four doors have in common, and
  it is never to be scrambled.
* Each door answers to ITS OWN messaging file and to nothing else:
  r -> republicans.md, d -> democrats.md, l -> libertarians.md,
  s -> socialism.md. If a sentence is not supported by that door's file, it does
  not go on that door — no matter what another door says.
* A door does NOT need a partner to exist. One may be added, changed or improved
  alone. A door may have areas the others do not, in any number and any order.
* Editing one door creates ZERO obligation to any other. Improve a paragraph on
  D without owing the same paragraph to R.
* Never say a door "mirrors", "is paired with", "is the reflection of" or "is the
  same as" another door. Never call the four doors "two pairs". Never speak of a
  "partisan axis" or an "economic axis" as a pairing between editions.
* A ONE-TIME COPY IS FINE. The four front-door pages were forked from one
  template on 2026-08-21 precisely so they could then drift apart. Copy once to
  start a door; never wire two doors together afterwards.

WHAT STILL BINDS ALL FOUR, and it is arithmetic rather than prose:

1. ONE AWARD PIPELINE. Monkey, Llama and Flamingo are computed once, party-blind.
   No edition re-weights, re-rounds or re-thresholds anything.
2. THE UNIT OF JUDGEMENT IS A PERSON AND A VOTE, never a party. No door
   characterizes another party, compares parties, or attributes motive to one.
   This is the one editorial rule that survived the mirror rule's removal, and it
   survived on its own merits.
3. CROSS-PARTY CHALLENGERS ARE ALWAYS SHOWN. The third seat column is "the
   strongest challenger for this seat who is not from your side, whatever party
   that turns out to be" — NOT "the pair partner's challenger". A page that only
   ever showed your own team would be a campaign tool.

The review test is no longer "would I ship the exact mirror of this to the paired
edition tomorrow?" It is: DOES THIS DOOR'S OWN MESSAGING FILE SUPPORT IT, AND
DOES IT JUDGE A PERSON AND A VOTE RATHER THAN A PARTY?

HOW A FRONT-DOOR DIRECTORY IS LAID OUT. All four currently carry the same four
files at the top, and those four files are the door itself. That is a starting
shape, not a rule — a door may grow files the others do not have:

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

THE FOUR FRONT-DOOR PAGES ARE FOUR SEPARATE FILES. Each edition's
_overview_page.tsx is a complete, standalone page that imports nothing from the
other three. There is no shared PartyFrontDoor component; it was deleted on
2026-08-21 when the mirror rule was removed, because a single parameterized
component IS the mirror rule expressed as code — it makes divergence impossible,
which is now the thing we want to be possible. The four files were forked from
one template that day and are expected to drift.

If you find yourself reaching for a shared party component, a per-edition props
table, or a "sync the doors" script, stop: that is the removed rule growing back.

INSIDE A FRONT DOOR — THE EDITION'S OWN LEVEL 2s AND LEVEL 3s.
Those four files are only the door. A front-door directory is also the ROOT of
that edition's own content hierarchy, and it nests exactly one level the same
way the parent site does:

  site/docs/r/                        the Republican edition's docs root
  site/docs/r/{area}/                 ONE Level 2 area OF THE R EDITION
  site/docs/r/{area}/_category_.json  label, position, link -> doc id "overview"
  site/docs/r/{area}/overview.mdx     id "overview" — THE Level 2 page for that
                                      area, served at /docs/r/{area}/ (see
                                      THE DIRECTORY IS THE URL below)
  site/docs/r/{area}/{level_3}.mdx    a Level 3 page — a few words, underscores,
                                      always lowercase, never named "overview"

THE DIRECTORY IS THE URL. Inside a front door the file is still overview.mdx,
but the word "overview" never appears in the address. Every one of these pages
carries an explicit frontmatter slug:

  overview.mdx        slug: /r/{area}            -> /docs/r/{area}/
  {level_3}.mdx       slug: /r/{area}/{level_3}  -> /docs/r/{area}/{level_3}/

That is the whole mechanism — Docusaurus resolves a doc's `link` target, its
sidebar row and every ./file.mdx cross-link through the slug, so setting it is
enough and nothing else has to know. Two reasons it is not optional:

  * The reader gets the clean address. /docs/r/meritocracy/ loads the area's own
    page; a directory path that 404s is the thing this avoids.
  * A Level 3 file whose basename equals its folder name (words_we_use/
    words_we_use.mdx, abortion_rights/abortion_rights.mdx) is treated by
    Docusaurus as the FOLDER INDEX and silently claims /docs/r/words_we_use/ —
    the same route overview.mdx wants. The build reports "Duplicate routes
    found!" and routing goes non-deterministic. The explicit slug on every
    Level 3 page is what keeps that from happening again.

The PARENT site's thirty Level 2 areas still use the older /docs/{area}/overview
form, and internal/nav.ts overviewPath() plus the web app's docsOverviewPath
depend on it. Do not slug those without changing both.

SIDEBAR ORDER INSIDE A DOOR. The door's own overview.mdx sits at
sidebar_position 0 and reference_text.mdx at 0.5, because the inner areas take
positions 1..N from their nav_order. Without that the door page would tie with
whichever area is nav_order 1.

site/docs/d/, site/docs/l/ and site/docs/s/ are laid out identically, for the
Democrat, Libertarian and Socialist editions.

Read the nesting this way: a directory under site/docs/ is a Level 2 of the
PARENT site; a directory under site/docs/r/ is a Level 2 of the R EDITION. They
are different registries and they do not mix. A visitor who arrived at
WeCitizensR.com sees the R edition's Level 2s in the left bar, not the parent
site's thirty areas — that is the whole reason republicanSidebar exists.

WHAT AN INNER LEVEL 2 DOES AND DOES NOT NEED:
* It needs its own _category_.json WITH the `link` to doc id "overview", or the
  left bar row has nowhere to send the reader.
* It needs overview.mdx WITH its slug, and that page is what links to its Level 3
  pages. The left bar never lists Level 3s and never indents —
  src/theme/DocSidebarItem/Category draws a directory as one link, so the area's
  own page is the only place its children are listed.
* It does NOT go in level_2.csv, and it does NOT go in MENU_GROUPS /
  FOOTER_GROUPS in internal/nav.ts. That registry, and the build guard that
  enforces it, cover the PARENT site's Level 2 areas only — the four doors
  included, their inner areas never. The party bars are autogenerated from the
  filesystem (internal/sidebars.ts), so an inner area appears in its edition's
  left bar as soon as the directory exists.

INNER AREAS ARE PER-DOOR. An inner Level 2 added under r/ belongs to r/ and to
nothing else. It does NOT have to be added under d/, l/ or s/, in that commit or
ever. A door may carry twenty areas while another carries sixteen — that is not a
defect and it is not "broken symmetry", it is four audiences with four different
sets of priorities. Add the area where its messaging file asks for it.

WHERE THE INNER AREAS CAME FROM. All 72 of them (R 20, D 16, L 20, S 16) were
generated on 2026-08-20 from the four registry CSVs — level_2_r.csv,
level_2_d.csv, level_2_l.csv, level_2_s.csv — with the prose taken from the
matching file in MESSAGING_DIR, which is primary. Each area's overview.mdx opens
with the CSV's newcomer_question_it_answers, then the one_liner, then the
messaging file's own bullets for that big-numbered section; each Level 3 page is
one dot-numbered subsection. Every page footer names its source section, so any
page can be traced back to the paragraph it came from. The status column in all
four CSVs is now "created".

R and L happen to carry 20 areas and D and S 16, because that is how their
messaging files are structured — republicans.md and libertarians.md have 20
big-numbered sections, democrats.md and socialism.md have 16. That is a fact
about the source files, not a rule and not a pairing. Each door's counts and
areas track its own messaging file and are free to change independently.

The authoritative product spec is ~/BGit/act3/we_citizens/pm/party_front_doors.mdx.
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
same function so that adding a door cannot forget to add its bar — wiring, not
symmetry. Each bar is autogenerated from its own directory tree, so the four
doors carry whatever areas they carry and are expected to differ.
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
the navbar rides a 1320px rail. Below 1380px the site links (.wcNavFoldable)
fold out of the bar and their duplicates in the More menu (.wcMoreFolded)
appear instead. The fold point went to 1610px on 2026-08-17 when the bar briefly
carried all four party front doors — two extra buttons, roughly 230px — and came
back to 1380px the same day when L and S were taken back off the bar, because
folding the site links away on an ordinary laptop cost more than the two extra
buttons were worth. The party links are the ones that must survive the squeeze
— they are the whole point of the bar — so the site links fold first. Which
doors are on the bar is TOP_BAR_PARTY_KEYS in internal/nav.ts. That list is a
WIDTH decision and nothing else — any subset of the four may sit on the bar, and
there is no pairing constraint on it. If you add another top-bar item, re-check
that budget again.

The directory below will be the marketing guidelines for this directory or this docusaurus. 
~/BGit/all/politics/citizens_we/marketing/messaging


====================================================================
MARKETING MESSAGING -> CSV -> DOCS DIRECTORY (the three-way pairing)
====================================================================

MESSAGING_DIR dir is ~/BGit/all/politics/citizens_we/marketing/messaging

That directory is the MARKETING GUIDELINES for this Docusaurus site, and for
the four party editions it is PRIMARY. Its TABLE OF CONTENTS section is the
source the Level 2 registry CSVs in this repo are generated from. When the two
disagree, the messaging file wins and the CSV gets updated — never the reverse.
We READ from MESSAGING_DIR; nothing in this repo writes to it.

Five messaging files, five CSVs, five docs roots. Each row of this table is one
audience, end to end:

| Messaging file (primary)        | Registry CSV in this repo | Docs root      | Customer domain              | Public docs URL              | edition |
|---|---|---|---|---|---|
| republicans.md                  | level_2_r.csv             | site/docs/r/   | https://WeCitizensR.com      | https://WeTheCitizens.io/r/  | R    |
| democrats.md                    | level_2_d.csv             | site/docs/d/   | https://WeCitizensD.com      | https://WeTheCitizens.io/d/  | D    |
| libertarians.md                 | level_2_l.csv             | site/docs/l/   | https://WeCitizensL.com      | https://WeTheCitizens.io/l/  | L    |
| socialism.md                    | level_2_s.csv             | site/docs/s/   | https://WeCitizensSocialism.com | https://WeTheCitizens.io/s/ | S |
| non_partisan_io_messaging.md    | level_2.csv               | site/docs/     | https://WeTheCitizens.io/    | https://WeTheCitizens.io/    | main |

The single letter is the whole mapping. The docs subdirectory letter, the CSV
suffix, the level_2_key of the door in level_2.csv, and the edition code are all
the SAME letter. socialism.md is the one filename that is not a letter — it is
edition S, and the community is always called DEMOCRATIC SOCIALISTS, never
"socialists".

WHO EACH FILE IS FOR (short form; the file itself is the long form):

* republicans.md — the political right / Republican voters. Positions us as a
  replacement for TPUSA (that claim exists ONLY on this door), aimed at getting
  political challengers into power to replace incumbents controlled by global
  elites, plus the Republican voter's own package for removing the rigged
  economy through community-based voting and collaboration. The only door that
  carries Christian values.
* democrats.md — Democrat voters. That community building its own package for
  removing the rigged-economy layer through community-based voting and
  collaboration, and getting back to an ethical, clean economy that is ideal for
  workers. Money-in-politics and Citizens United are its named fights.
* libertarians.md — libertarians. Finding political challengers on MERITOCRACY,
  mapped to the will of the people, to replace incumbents controlled by
  globalist elites — explicitly against foreign or intelligence-service
  narrative control deciding who gets elected — plus the libertarian community's
  own rigged-economy package. Its ethics language is the non-aggression
  principle, consent and self-ownership.
* socialism.md — DEMOCRATIC SOCIALISTS. Finding the best challengers who are not
  controlled by special interests, on a meritocracy basis chosen by that
  community, plus their own package for removing the rigged economy and getting
  to an economy that is ethical and ideal for workers.
* non_partisan_io_messaging.md — the MAIN .io domain, the front door that is
  nobody's party edition. The shared cross-party voice used when a visitor
  arrives without a party door. Its docs root is site/docs/ itself — intro,
  the_movement/, how_it_works/, start_here/ and the rest of the non-party areas.

HOW A CSV IS DERIVED FROM ITS MESSAGING FILE

The BIG NUMBERS in the messaging file's TABLE OF CONTENTS (1.0, 2.0, 3.0 ...)
each become ONE Level 2 area of that edition. The DOT NUMBERS under them (2.1,
2.2 ...) become that area's Level 3 pages and are listed in level_3_pages. The
big number itself is recorded in the source_section column, so any row can be
traced back to the paragraph it came from.

Columns, all lowercase with underscores and no spaces or special characters:

  level_2_key    primary key. Three words or less, underscores, lowercase, no
                 special characters. Must equal the directory name under the
                 docs root. Unique within its own CSV; the SAME key may repeat
                 across editions (every door has about_us, meritocracy,
                 trust_scores) — a shared key across doors is just two doors
                 that both wanted that area, not a collision and not a pairing.
  title          the long, friendly human display name for the page itself
  left_bar_title the SHORT title, the one that has to fit the left bar
  nav_order      position within its own edition; matches the _category_.json
                 "position" for that directory
  dir_path       repo-relative path to the area's directory, e.g. site/docs/r/meritocracy/
  one_liner      one sentence: what this area is
  scope_in       what belongs on these pages
  scope_out      what deliberately does NOT, and where it lives instead
  newcomer_question_it_answers   the question a first-time visitor is asking
  source_file    the messaging file this row was derived from, e.g.
                 marketing/messaging/republicans.md (relative to
                 ~/BGit/all/politics/citizens_we/)
  source_section the big number in that file, e.g. "9.0". Empty when the row did
                 not come from a numbered TOC section.
  primary_sources  supporting specs and data to write the page from
  level_3_pages  semicolon-separated .mdx filenames, overview.mdx first
  status         planned | created

All five CSVs share this one header. The four party CSVs are ordered: the
generated Level 2 rows first, then TEN BLANK ROWS as working space, then any
pre-existing content below that. level_2.csv keeps its thirty original areas and
carries the ten blank rows above them.

The CSV is a REGISTRY, not the site. A row with status "planned" means the
directory does not exist yet. Creating it means the full Level 2 ritual for an
INSIDE-A-FRONT-DOOR area: the directory, _category_.json with position =
nav_order and a link to doc id "overview", and overview.mdx that links its own
Level 3 pages. Inner areas are NOT added to level_2.csv and NOT added to
MENU_GROUPS / FOOTER_GROUPS — see INSIDE A FRONT DOOR above.

TWO THINGS TO KNOW BEFORE TRUSTING THESE FILES

1. non_partisan_io_messaging.md has an EMPTY table of contents, and its OTHER
   section is still byte-for-byte Republican copy ("replacement for TPUSA",
   "voters who vote Republican"). That is party messaging sitting in the
   non-partisan file. So level_2.csv gained NO new rows from it — its thirty
   Level 2 areas still come from the product itself, not from the messaging
   file. Do not render the .io front door from that file, and do not generate
   .io Level 2 rows from it, until Bryan writes the real non-partisan voice.
   (Known issue, first recorded 2026-Aug-19.)

2. The four party files carry different section counts: republicans.md and
   libertarians.md have 20 big-numbered sections, democrats.md and socialism.md
   have 16. Under the old mirror rule this was a defect to be reconciled. It is
   not one any more — four audiences, four sets of priorities, four different
   shapes. The CSVs report each file exactly as it stands. Do not add rows to a
   CSV to make two doors match; if a door should gain an area, say so in
   MESSAGING_DIR, which is primary, and let the CSV follow.
