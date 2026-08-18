/**
 * internal/nav.ts — THE single source of truth for site-wide navigation.
 *
 * Why this file exists
 * --------------------
 * Docusaurus renders the navbar and footer from `themeConfig.navbar` /
 * `themeConfig.footer`, and every page — MDX docs, blog posts, and the
 * hand-written React pages under `site/pages/**` — is wrapped in `@theme/Layout`,
 * which renders exactly that one navbar and that one footer. So a single
 * rendering path already existed. What was missing was a single *data* path.
 *
 * The Level 2 areas are read straight out of `level_2.csv` at build time, which
 * is the registry Product Management edits. Add a row there and the area shows
 * up in the "More" menu, in the footer, and (via its directory) in the sidebar —
 * on every page of the site, with no per-page work.
 *
 * Drift is a build error, not a surprise: `assertGroupsCoverCsv()` fails the
 * build if a CSV key is missing from, or duplicated across, the menu groups.
 *
 * NODE-SIDE ONLY. This module reads the filesystem, so it must never be imported
 * by a client component. Anything the browser needs is handed across via
 * `siteConfig.customFields` (see `clientNavData()`).
 *
 * Consumed by:
 *   - docusaurus.config.ts   → navbar items, footer columns, customFields,
 *                              docs.sidebarItemsGenerator
 *   - internal/sidebars.ts   → the three left bars
 *   - src/theme/Footer/Links/MultiColumn  → reads customFields.footerColumnLinks
 *   - src/theme/NavbarItem/NavbarNavLink  → renders the `subLabel` two-line labels
 */

import fs from "node:fs";
import path from "node:path";

/** Base route of the docs plugin. Keep in sync with `presets.classic.docs`. */
export const DOCS_BASE = "/docs";

/**
 * Locate level_2.csv without relying on `import.meta.url` or `__dirname`, either
 * of which may be absent depending on how Docusaurus transpiles the TS config.
 */
const LEVEL_2_CSV = (() => {
  const candidates = [
    path.resolve(process.cwd(), "level_2.csv"),
    path.resolve(process.cwd(), "..", "level_2.csv"),
  ];
  const found = candidates.find((p) => fs.existsSync(p));
  if (!found) {
    throw new Error(
      `internal/nav.ts: could not find level_2.csv. Looked in:\n  ${candidates.join("\n  ")}`,
    );
  }
  return found;
})();

/* ------------------------------------------------------------------ *
 * level_2.csv
 * ------------------------------------------------------------------ */

/** Minimal RFC 4180 reader — the CSV has quoted fields containing commas. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      quoted = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c !== "\r") {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

/** A Level 2 area — one directory under `site/docs/`, fronted by `overview.mdx`. */
export type Level2 = {
  /** Directory name under site/docs/ — the `level_2_key` column. */
  key: string;
  /** Human title, used in nav, footer and sidebar. */
  title: string;
  /** Position from the `nav_order` column. */
  order: number;
  /** Second line under the title in menus. Four to six words, no full stop. */
  subLabel: string;
};

function readCsvAreas(): Omit<Level2, "subLabel">[] {
  const rows = parseCsv(fs.readFileSync(LEVEL_2_CSV, "utf8")).filter(
    (r) => r.length > 3,
  );
  const header = rows[0].map((h) => h.trim());
  const col = (name: string) => {
    const i = header.indexOf(name);
    if (i < 0) {
      throw new Error(`level_2.csv is missing the "${name}" column`);
    }
    return i;
  };
  const [k, t, o] = [col("level_2_key"), col("title"), col("nav_order")];

  return rows
    .slice(1)
    .map((r) => ({
      key: r[k].trim(),
      title: r[t].trim(),
      order: Number(r[o].trim()),
    }))
    .filter((a) => a.key.length > 0)
    .sort((a, b) => a.order - b.order);
}

/**
 * The short second line shown under each title in menus. Keyed by
 * `level_2_key`. A key with no entry here falls back to its title alone, so a
 * new CSV row never breaks the build over copywriting.
 */
const SUB_LABELS: Record<string, string> = {
  start_here: "What this is, in sixty seconds",
  the_problem: "What is actually broken",
  the_movement: "Charter, pillars, and joining",
  how_it_works: "The core loop, end to end",
  get_started: "Hosted, or on your computer",
  social_contract: "The yardstick we measure against",
  problems: "The ranked, sourced catalog",
  laws: "The four law libraries",
  problem_laws: "Enacted, and nobody asked us",
  fix_laws: "From problem to bill text",
  good_bills: "Written, waiting for a sponsor",
  good_laws: "Passed, blocked, or never voted",
  politicians: "Awards earned, and the wall",
  legacy_politicians: "The people with a voting record",
  new_politicians: "Never been in office",
  monkey: "How much they broke it",
  llama: "How much they repaired it",
  flamingo: "Outside the voting record",
  voting_records: "How we know how they voted",
  qualifications: "Sixteen public rubrics",
  meritocracy: "Earned, with a hard ceiling",
  decisions: "Record where you stand",
  values: "Your ethics, applied at scale",
  evidence: "Deciding when proof is withheld",
  communities: "Doing the work together",
  take_action: "What you can do this week",
  karma: "The citizen side of the ledger",
  open_data: "Clone it and check every claim",
  ai: "What the AI never decides",
  repos: "Inspect it, fork it, run it",
};

/**
 * `level_2_key`s of the four party front doors. Their rows live in level_2.csv
 * like every other area, but they are pinned top-level navbar items rather than
 * stops on the ordered reading path, so they are held apart here — see PARTIES.
 *
 * These are the one-letter codes, and they must match three other places or the
 * build breaks: the directory name under `site/docs/`, the `level_2_key` column
 * in `level_2.csv`, and PARTY_SIDEBAR_IDS further down this file. They were
 * `we_the_citizens_r` / `we_the_citizens_d` until the 2026-08-17 rename; any
 * surviving long-form key is stale and resolves to nothing.
 */
export const PARTY_KEYS = ["r", "d", "l", "s"] as const;

const CSV_AREAS = readCsvAreas();

for (const key of PARTY_KEYS) {
  if (!CSV_AREAS.some((a) => a.key === key)) {
    throw new Error(
      `internal/nav.ts: level_2.csv has no row for the party front door "${key}". ` +
        `Every Level 2 area, including the party editions, must be registered there.`,
    );
  }
}

/** Every content area from level_2.csv, in nav_order, party editions excluded. */
export const LEVEL_2: Level2[] = CSV_AREAS.filter(
  (a) => !PARTY_KEYS.includes(a.key as (typeof PARTY_KEYS)[number]),
).map((a) => ({ ...a, subLabel: SUB_LABELS[a.key] ?? "" }));

/* ------------------------------------------------------------------ *
 * The four party front doors
 * ------------------------------------------------------------------ */

export type Party = Level2 & {
  /** Single-letter edition code, per we_citizens/pm/r_vs_d.mdx §3.1. */
  edition: "R" | "D" | "L" | "S";
  /** The public front-door domain for this edition. */
  domain: string;
};

/**
 * The four party editions.
 *
 * FOUR DOORS, TWO PAIRS (pm/r_vs_d.mdx §1.3a). They are not four unrelated
 * skins. R and D are each other's reflection on the partisan axis; L and S are
 * each other's reflection on the economic axis. Every door names exactly one
 * *other* party — its partner on the same axis — which is what fills the
 * cross-party honesty column and what gives the mirror check a counterpart to
 * run against. A door proposed without a partner on its axis is not a door; it
 * is an unpaired skin, and §5 has nothing to check it against.
 *
 * Mirror-symmetry rule (pm/r_vs_d.mdx §5): everything true of one member of a
 * pair is true of the other with the party label swapped, and the rule now runs
 * once per pair rather than once overall. That rule binds this file too — the
 * four entries below, and every menu and footer block generated from them,
 * differ only in the party label. Change one member of a pair, change the other
 * identically, in the same commit.
 *
 * They live here rather than being read out of level_2.csv's ordering because
 * they are pinned top-level navbar items, not part of the ordered reading path.
 * Their rows are still in level_2.csv so the registry stays complete, and the
 * loop above fails the build if any of the four is missing from it.
 */
export const PARTIES: Party[] = [
  {
    key: "r",
    title: "We The Citizens R",
    subLabel: "Republicans",
    order: 31,
    edition: "R",
    domain: "https://wecitizensr.com",
  },
  {
    key: "d",
    title: "We The Citizens D",
    subLabel: "Democrats",
    order: 32,
    edition: "D",
    domain: "https://wecitizensd.com",
  },
  {
    key: "l",
    title: "We The Citizens L",
    subLabel: "Libertarians",
    order: 33,
    edition: "L",
    domain: "https://wecitizensl.com",
  },
  {
    key: "s",
    title: "We The Citizens S",
    subLabel: "Socialists",
    order: 34,
    edition: "S",
    domain: "https://wecitizenssocialism.com",
  },
];

/**
 * The party front doors that get their own button in the top bar.
 *
 * The bar carries the R and D pair only. L and S were taken off it on
 * 2026-08-17: four party buttons plus the site links plus the app CTA left the
 * row with nothing to give, and the two smaller doors were the ones paying for
 * it. They are not demoted — both are still full Level 2 areas, both are listed
 * under "Party front doors" in the "More" menu and in the footer, and their
 * overview pages hand the visitor WeCitizensL.com / WeCitizensSocialism.com the
 * same way the bar button did.
 *
 * Mirror symmetry runs once per pair (pm/r_vs_d.mdx §5), so this list is only
 * ever a whole pair: R and D on the bar, L and S off it. Never one member of a
 * pair without the other.
 */
export const TOP_BAR_PARTY_KEYS = ["r", "d"] as const;

/** The party front doors pinned to the top bar, in order. */
const TOP_BAR_PARTIES = PARTIES.filter((p) =>
  TOP_BAR_PARTY_KEYS.includes(p.key as (typeof TOP_BAR_PARTY_KEYS)[number]),
);

/** Every Level 2 area on the site, party front doors first. */
export const ALL_LEVEL_2: Level2[] = [...PARTIES, ...LEVEL_2];

/** Route to a Level 2 area's front page. Every area is fronted by `overview.mdx`. */
export function overviewPath(key: string): string {
  return `${DOCS_BASE}/${key}/overview`;
}

function byKey(key: string): Level2 {
  const found = ALL_LEVEL_2.find((a) => a.key === key);
  if (!found) {
    throw new Error(
      `internal/nav.ts: unknown Level 2 key "${key}". ` +
        `Add a row to level_2.csv (and a site/docs/${key}/overview.mdx) first.`,
    );
  }
  return found;
}

/* ------------------------------------------------------------------ *
 * Groupings
 * ------------------------------------------------------------------ */

/** Groups for the "More" mega-menu. Must cover every CSV key exactly once. */
export const MENU_GROUPS: { title: string; keys: string[] }[] = [
  {
    title: "Start here",
    keys: ["start_here", "the_problem", "the_movement", "how_it_works", "get_started"],
  },
  {
    title: "The standard, and the law",
    keys: ["social_contract", "problems", "laws", "problem_laws", "fix_laws", "good_bills", "good_laws"],
  },
  {
    title: "The people",
    keys: ["politicians", "legacy_politicians", "new_politicians", "voting_records", "qualifications"],
  },
  { title: "The awards", keys: ["monkey", "llama", "flamingo"] },
  { title: "The four pillars", keys: ["decisions", "values", "evidence"] },
  { title: "Citizens", keys: ["communities", "take_action", "karma", "meritocracy"] },
  { title: "In the open", keys: ["open_data", "ai", "repos"] },
];

/** Wider groups for the footer, which has fewer, taller columns than the menu. */
const FOOTER_GROUPS: { title: string; keys: string[] }[] = [
  {
    title: "The Movement",
    keys: ["start_here", "the_problem", "the_movement", "how_it_works", "get_started", "social_contract"],
  },
  {
    title: "The Law",
    keys: ["problems", "laws", "problem_laws", "fix_laws", "good_bills", "good_laws"],
  },
  {
    title: "The People",
    keys: ["politicians", "legacy_politicians", "new_politicians", "voting_records", "qualifications", "monkey", "llama", "flamingo"],
  },
  {
    title: "Citizens",
    keys: ["decisions", "values", "evidence", "communities", "take_action", "karma", "meritocracy"],
  },
  { title: "In The Open", keys: ["open_data", "ai", "repos"] },
];

/**
 * Fail the build when level_2.csv and the groupings above disagree.
 *
 * This is the guard that keeps "the top bar shows all the Level 2s" honest. A
 * new CSV row that nobody filed into a group would otherwise vanish silently
 * from the More menu and the footer.
 */
function assertGroupsCoverCsv(
  label: string,
  groups: { title: string; keys: string[] }[],
): void {
  const grouped = groups.flatMap((g) => g.keys);
  const seen = new Set<string>();
  const dupes = grouped.filter((k) => (seen.has(k) ? true : (seen.add(k), false)));
  const csvKeys = LEVEL_2.map((a) => a.key);
  const missing = csvKeys.filter((k) => !seen.has(k));
  const unknown = grouped.filter((k) => !csvKeys.includes(k));

  const problems = [
    missing.length && `not in any ${label} group: ${missing.join(", ")}`,
    unknown.length && `in a ${label} group but not in level_2.csv: ${unknown.join(", ")}`,
    dupes.length && `in more than one ${label} group: ${dupes.join(", ")}`,
  ].filter(Boolean);

  if (problems.length) {
    throw new Error(
      `internal/nav.ts: level_2.csv and the ${label} groups are out of sync — ` +
        problems.join("; ") +
        `. Fix the group lists in internal/nav.ts.`,
    );
  }
}

assertGroupsCoverCsv("menu", MENU_GROUPS);
assertGroupsCoverCsv("footer", FOOTER_GROUPS);

/* ------------------------------------------------------------------ *
 * Navbar builders
 * ------------------------------------------------------------------ */

/** A non-link heading rendered inside a dropdown menu. */
function menuHeading(text: string, className = "wcMenuHeading") {
  return {
    type: "html" as const,
    className,
    value: `<span>${text}</span>`,
  };
}

/**
 * The two site links that live in the top bar on a wide screen, repeated here
 * so they stay reachable once CSS folds them out of the bar below 1380px.
 * `wcMoreFolded` is the switch: hidden in the menu on wide screens, shown in the
 * menu on narrow ones. See internal/css/custom.css → "Fitting the bar".
 *
 * Order matches the top bar: Charter, then About Us.
 */
const FOLDED_SITE_LINKS = [
  menuHeading("This site", "wcMenuHeading wcMoreFolded"),
  {
    to: "/docs/intro",
    label: "Charter",
    className: "wcMenuLink wcMoreFolded",
  },
  {
    to: "/docs/about",
    label: "About Us",
    className: "wcMenuLink wcMoreFolded",
  },
];

/**
 * Movement pages that used to live in the old "More" dropdown. Always visible
 * in the mega-menu (no wcMoreFolded), because they have no top-bar duplicate.
 */
const MOVEMENT_PAGE_LINKS = [
  menuHeading("This movement"),
  { to: "/#programs", label: "Programs", className: "wcMenuLink" },
  { to: "/#governance", label: "Governance", className: "wcMenuLink" },
  { to: "/docs/board", label: "Founding Board", className: "wcMenuLink" },
  menuHeading("1,000 Bonhoeffers"),
  {
    to: "/docs/dietrich-bonhoeffers",
    label: "Dietrich Bonhoeffer",
    className: "wcMenuLink",
  },
  {
    to: "/docs/bonhoeffer-criteria",
    label: "Bonhoeffer Criteria",
    className: "wcMenuLink",
  },
  {
    to: "/docs/politician-challengers",
    label: "Politician Challengers",
    className: "wcMenuLink",
  },
];

/**
 * One row in the "More" menu: the Level 2 title alone, linking to that area's
 * `overview.mdx`.
 *
 * Deliberately no `subLabel` — the menu is a flat list of destinations, not a
 * place to explain them. The one-liner for an area belongs on the area's own
 * overview page, and the descriptive text under every row made a thirty-item
 * menu hard to scan. Its copy still lives in SUB_LABELS above for reuse.
 */
function menuLink(key: string) {
  const area = byKey(key);
  return {
    to: overviewPath(area.key),
    label: area.title,
    className: "wcMenuLink",
  };
}

/**
 * One top-level navbar item per TOP-BAR party front door — a plain
 * "Republicans" / "Democrats" button that opens that edition's public domain in
 * a new tab.
 *
 * Not a dropdown, and no "We The Citizens" line above the party name: the top
 * bar hands the visitor straight to WeCitizensR.com or WeCitizensD.com. The
 * internal overview pages for all four editions stay reachable from the "More"
 * menu and the footer.
 *
 * WIDTH BUDGET. The bar carries two party buttons, which is what the 1380px
 * fold point in internal/css/custom.css ("Fitting the bar") was sized for. It
 * briefly carried four; L and S came back off on 2026-08-17 because two more
 * buttons cost roughly 230px and pushed the fold point to 1610px, folding the
 * site links out of the bar on ordinary laptop screens. Adding a pair back
 * means re-doing that budget — see TOP_BAR_PARTY_KEYS.
 */
export function partyNavbarItems() {
  return TOP_BAR_PARTIES.map((party) => ({
    href: party.domain,
    label: party.subLabel,
    target: "_blank",
    rel: "noopener noreferrer",
    position: "left" as const,
    className: `wcPartyNav wcPartyNav--${party.edition.toLowerCase()}`,
  }));
}

/**
 * The "More ⌄" mega-menu: the list of Level 2 areas on the site, grouped, each
 * linking to that area's `overview.mdx`. Titles only — no per-area description
 * lines and no Level 3 pages; those live on the area's own overview page.
 * Docusaurus draws the chevron on any dropdown.
 */
export function moreNavbarItem() {
  return {
    type: "dropdown" as const,
    label: "More",
    position: "left" as const,
    className: "wcMoreNav",
    items: [
      ...FOLDED_SITE_LINKS,
      menuHeading("Party front doors"),
      ...PARTIES.map((p) => ({
        to: overviewPath(p.key),
        label: p.title,
        className: "wcMenuLink",
      })),
      ...MENU_GROUPS.flatMap((group) => [
        menuHeading(group.title),
        ...group.keys.map(menuLink),
      ]),
      ...MOVEMENT_PAGE_LINKS,
    ],
  };
}

/* ------------------------------------------------------------------ *
 * Footer builders
 * ------------------------------------------------------------------ */

function footerLink(key: string) {
  const area = byKey(key);
  return { label: area.title, to: overviewPath(area.key) };
}

/** Footer columns, built from the same registry the navbar uses. */
export function footerColumns() {
  return [
    {
      title: "Party Front Doors",
      className: "wcFooterParties",
      items: PARTIES.flatMap((party) => [
        { label: `${party.title} — ${party.subLabel}`, to: overviewPath(party.key) },
        { label: party.domain.replace("https://", ""), href: party.domain },
      ]),
    },
    ...FOOTER_GROUPS.map((group) => ({
      title: group.title,
      items: group.keys.map(footerLink),
    })),
    {
      title: "We The Citizens",
      items: [
        { label: "About Us", to: "/docs/about" },
        { label: "Founding Board", to: "/docs/board" },
        { label: "Blog & Updates", to: "/blog" },
        { label: "Terms of Service", to: "/docs/legal/terms" },
        { label: "Privacy Policy", to: "/docs/legal/privacy" },
      ],
    },
  ];
}

/**
 * Footer column titles that are themselves links.
 *
 * Docusaurus's footer schema has no link target on a column header, so the
 * swizzled `src/theme/Footer/Links/MultiColumn` needs this map. It is a Node-side
 * value that a browser component has to read, so it crosses over through
 * `siteConfig.customFields` — see `clientNavData()`.
 */
function footerColumnLinks(): Record<string, string> {
  return {
    "Party Front Doors": overviewPath(PARTIES[0].key),
    "The Movement": overviewPath("start_here"),
    "The Law": overviewPath("laws"),
    "The People": overviewPath("politicians"),
    Citizens: overviewPath("communities"),
    "In The Open": overviewPath("open_data"),
    "We The Citizens": "/",
  };
}

/* ------------------------------------------------------------------ *
 * The three left bars
 * ------------------------------------------------------------------ */

/**
 * This site has exactly five left bars, and they are declared here so the four
 * party editions can never drift apart:
 *
 *   mainSidebar         — the whole site. A flat list of Level 2 areas.
 *   republicanSidebar   — everything under site/docs/r/
 *   democratSidebar     — everything under site/docs/d/
 *   libertarianSidebar  — everything under site/docs/l/
 *   socialistSidebar    — everything under site/docs/s/
 *
 * The party bars exist because those four areas are front doors onto their own
 * hierarchies, not stops on the main reading path. A visitor who arrived at
 * WeCitizensR.com should see the R edition's own Level 2s in the left bar, not
 * the thirty areas of the parent site — and the same is true of a visitor who
 * arrived at WeCitizensD.com, WeCitizensL.com or WeCitizensSocialism.com.
 *
 * All four party bars are generated by one function from one shape in
 * internal/sidebars.ts, which is how the mirror-symmetry rule (pm/r_vs_d.mdx §5)
 * gets enforced for navigation rather than merely promised: there is no way to
 * give one door a bar the other member of its pair does not get.
 *
 * Every bar is drawn by src/theme/DocSidebarItem/Category, which renders a
 * category as a single link to its own page: no chevrons, no nesting, no indents.
 */
export const MAIN_SIDEBAR_ID = "mainSidebar";

/**
 * Sidebar id for a party edition. Mirror-symmetric by construction, and one of
 * the THREE PLACES that must agree for a front door to build at all — the other
 * two being the directory name under site/docs/ and the `level_2_key` column in
 * level_2.csv.
 */
export const PARTY_SIDEBAR_IDS: Record<string, string> = {
  r: "republicanSidebar",
  d: "democratSidebar",
  l: "libertarianSidebar",
  s: "socialistSidebar",
};

/** True when a generated sidebar item lives entirely inside a party area. */
function isPartyAreaItem(item: unknown): boolean {
  const ids: string[] = [];
  const walk = (it: any): void => {
    if (!it || typeof it !== "object") return;
    if (it.type === "doc" && typeof it.id === "string") ids.push(it.id);
    if (it.type === "category") {
      if (it.link?.type === "doc" && typeof it.link.id === "string") {
        ids.push(it.link.id);
      }
      (it.items ?? []).forEach(walk);
    }
  };
  walk(item);
  return (
    ids.length > 0 &&
    ids.every((id) => PARTY_KEYS.some((key) => id.startsWith(`${key}/`)))
  );
}

/**
 * `docs.sidebarItemsGenerator` for docusaurus.config.ts.
 *
 * The main sidebar is autogenerated from the whole `site/docs` tree, which would
 * otherwise pull the two party areas into it as well — and a doc that sits in two
 * sidebars has no single left bar to render. So the party areas are lifted out of
 * the ROOT autogenerated slice here; `internal/sidebars.ts` then autogenerates
 * each of them into its own sidebar. Nothing else is filtered.
 */
export async function docsSidebarItemsGenerator(arg: any): Promise<any[]> {
  const { defaultSidebarItemsGenerator, ...args } = arg;
  const items = await defaultSidebarItemsGenerator(args);
  if (args.item?.dirName !== ".") {
    return items;
  }
  return items.filter((item: unknown) => !isPartyAreaItem(item));
}

/**
 * Everything the browser needs from this Node-only module. Spread into
 * `customFields` in docusaurus.config.ts; read with
 * `useDocusaurusContext().siteConfig.customFields`.
 */
export function clientNavData() {
  return {
    footerColumnLinks: footerColumnLinks(),
  };
}
