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
 *   - docusaurus.config.ts   → navbar items, footer columns, customFields
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
 * `level_2_key`s of the two party front doors. Their rows live in level_2.csv
 * like every other area, but they are pinned top-level navbar items rather than
 * stops on the ordered reading path, so they are held apart here — see PARTIES.
 */
const PARTY_KEYS = ["we_the_citizens_r", "we_the_citizens_d"] as const;

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
 * The two partisan front doors
 * ------------------------------------------------------------------ */

export type Party = Level2 & {
  /** Single-letter edition code, per we_citizens/pm/r_vs_d.mdx. */
  edition: "R" | "D";
  /** The public front-door domain for this edition. */
  domain: string;
};

/**
 * The two party editions.
 *
 * Mirror-symmetry rule (pm/r_vs_d.mdx §5): everything true of R is true of D
 * with the party label swapped. That rule binds this file too — the two entries
 * below, and every menu and footer block generated from them, differ only in the
 * party label. Change one, change the other identically.
 *
 * They live here rather than being read out of level_2.csv's ordering because
 * they are pinned top-level navbar items, not part of the ordered reading path.
 * Their rows are still in level_2.csv so the registry stays complete.
 */
export const PARTIES: Party[] = [
  {
    key: "we_the_citizens_r",
    title: "We The Citizens R",
    subLabel: "Republicans",
    order: 31,
    edition: "R",
    domain: "https://wecitizensr.com",
  },
  {
    key: "we_the_citizens_d",
    title: "We The Citizens D",
    subLabel: "Democrats",
    order: 32,
    edition: "D",
    domain: "https://wecitizensd.com",
  },
];

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
 * The four site links that live in the top bar on a wide screen, repeated here
 * so they stay reachable once CSS folds them out of the bar below 1380px.
 * `wcMoreFolded` is the switch: hidden in the menu on wide screens, shown in the
 * menu on narrow ones. See internal/css/custom.css → "Fitting the bar".
 */
const FOLDED_SITE_LINKS = [
  menuHeading("This site", "wcMenuHeading wcMoreFolded"),
  {
    to: "/docs/about",
    label: "About Us",
    subLabel: "Who We The Citizens is",
    className: "wcMenuLink wcMoreFolded",
  },
  {
    to: "/docs/intro",
    label: "Charter",
    subLabel: "The movement's founding document",
    className: "wcMenuLink wcMoreFolded",
  },
  {
    to: "/#principles",
    label: "Principles",
    subLabel: "The seven principles",
    className: "wcMenuLink wcMoreFolded",
  },
  {
    to: "/docs/board",
    label: "Board",
    subLabel: "The founding board",
    className: "wcMenuLink wcMoreFolded",
  },
];

/**
 * Movement pages that used to live in the old "More" dropdown. Always visible
 * in the mega-menu (no wcMoreFolded), because they have no top-bar duplicate.
 */
const MOVEMENT_PAGE_LINKS = [
  menuHeading("This movement"),
  {
    to: "/#programs",
    label: "Programs",
    subLabel: "Conference, debates, and more",
    className: "wcMenuLink",
  },
  {
    to: "/#governance",
    label: "Governance",
    subLabel: "Transparency and public financials",
    className: "wcMenuLink",
  },
  menuHeading("1,000 Bonhoeffers"),
  {
    to: "/docs/dietrich-bonhoeffers",
    label: "Dietrich Bonhoeffer",
    subLabel: "The roster, and why the name",
    className: "wcMenuLink",
  },
  {
    to: "/docs/bonhoeffer-criteria",
    label: "Bonhoeffer Criteria",
    subLabel: "The character standard, scored",
    className: "wcMenuLink",
  },
  {
    to: "/docs/politician-challengers",
    label: "Politician Challengers",
    subLabel: "The politician subset of the list",
    className: "wcMenuLink",
  },
];

function menuLink(key: string) {
  const area = byKey(key);
  return {
    to: overviewPath(area.key),
    label: area.title,
    subLabel: area.subLabel,
    className: "wcMenuLink",
  };
}

/**
 * One top-level navbar item per party front door.
 *
 * Each is a dropdown whose own label is a link straight to that area's
 * `overview.mdx`, and whose label renders on two lines — "We The Citizens R"
 * over "Republicans" — via the `subLabel` prop understood by the swizzled
 * `src/theme/NavbarItem/NavbarNavLink`.
 */
export function partyNavbarItems() {
  return PARTIES.map((party) => ({
    type: "dropdown" as const,
    label: party.title,
    subLabel: party.subLabel,
    to: overviewPath(party.key),
    position: "left" as const,
    className: `wcPartyNav wcPartyNav--${party.edition.toLowerCase()}`,
    items: [
      {
        to: overviewPath(party.key),
        label: "Overview",
        subLabel: `What the ${party.edition} front door is`,
        className: "wcMenuLink",
      },
      menuLink("legacy_politicians"),
      menuLink("new_politicians"),
      menuLink("voting_records"),
      menuLink("monkey"),
      menuLink("llama"),
      menuHeading("Go to the front door"),
      {
        href: party.domain,
        label: party.domain.replace("https://", ""),
        subLabel: "Your seats, and who could replace them",
        className: "wcMenuLink wcMenuLink--external",
      },
    ],
  }));
}

/**
 * The "More ⌄" mega-menu: every Level 2 area on the site, grouped, each linking
 * to that area's `overview.mdx`. Docusaurus draws the chevron on any dropdown.
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
        subLabel: p.subLabel,
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
