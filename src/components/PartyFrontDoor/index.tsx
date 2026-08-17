import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

/**
 * The party front-door overview page — one component, four editions.
 *
 * Why this is ONE component and not four copies
 * ---------------------------------------------
 * `pm/r_vs_d.mdx §5` states the mirror-symmetry rule and then says the thing
 * that matters most about it: it is *enforced, not promised*. Four hand-copied
 * page files would promise symmetry and then quietly lose it the first time
 * somebody improved a paragraph on one door and not on its partner — which is
 * precisely the failure §5 exists to prevent. So the page is written once and
 * parameterized by the edition profile below, exactly the way `internal/nav.ts`
 * builds both party sidebars "by the same function from the same shape". Change
 * a sentence here and all four doors change together, because there is only one
 * sentence.
 *
 * THE DOORS ARE TWO PAIRS, NOT FOUR SKINS (pm/r_vs_d.mdx §1.3a). `R` and `D`
 * are each other's reflection on the partisan axis; `L` and `S` are each
 * other's reflection on the economic axis. Every door names exactly one *other*
 * party — its pair partner — which is what fills the cross-party honesty column
 * (§8.3, column 3) and what gives the §5 mirror check a counterpart to run
 * against. A door proposed without a partner on its axis is not a door; it is
 * an unpaired skin with nothing to check it against.
 *
 * Kept as a .tsx component — and referenced from each edition directory through
 * an `_overview_page.tsx` whose leading underscore makes the docs plugin ignore
 * it as a page — because MDX wraps multi-line JSX text children in extra <p>
 * elements.
 *
 * Styled from the shared home-page stylesheet so every Level 2 party overview
 * reads as the same publication as wethecitizens.io. Note what is deliberately
 * ABSENT: no per-edition colour. Each edition profile in the web app carries a
 * chrome accent (`pm/r_vs_d.mdx §9.4`), but these Docusaurus pages use the one
 * shared palette for all four, so no door can read as louder than its partner.
 */
import styles from '@site/site/pages/index.module.css';

/** Single-letter edition code, per pm/r_vs_d.mdx §3.1. `main` is not a door. */
export type PartyEdition = 'R' | 'D' | 'L' | 'S';

type EditionProfile = {
  /** Single-letter edition code. */
  code: PartyEdition;
  /** `level_2_key` / directory name under site/docs/. Lowercase of `code`. */
  key: string;
  /** The pair partner's edition code — the one *other* party this door names. */
  otherCode: PartyEdition;
  /** The pair partner's `level_2_key`, for the cross-link between the pair. */
  otherKey: string;
  /** Singular party label for this door's own audience. */
  ownLabel: string;
  /** Singular party label for the pair partner. */
  otherLabel: string;
  /** The axis this pair reflects across (pm/r_vs_d.mdx §1.3a). */
  axis: string;
  /** Public front-door domain, in display casing. */
  domain: string;
};

/**
 * The four editions, in the order the pairs were shipped: the partisan pair
 * first, then the economic pair.
 *
 * These entries are bound by the mirror-symmetry rule as strictly as the pages
 * they generate. Every field of `R` has a counterpart in `D`, and every field of
 * `L` has a counterpart in `S`; the two members of a pair differ only by which
 * party is "own" and which is "other". Change one member of a pair, change the
 * other identically, in the same commit.
 *
 * The same four profiles exist in the web app (`we_citizens/code/we_citizens_*
 * /src/index.ts`) and in `internal/nav.ts`. This copy carries only what this
 * page renders — labels and the pairing — never a second source of truth for
 * hosts, accents or routing, which belong to the app's edition kernel.
 */
export const EDITION_PROFILES: Record<PartyEdition, EditionProfile> = {
  R: {
    code: 'R',
    key: 'r',
    otherCode: 'D',
    otherKey: 'd',
    ownLabel: 'Republican',
    otherLabel: 'Democrat',
    axis: 'partisan axis',
    domain: 'WeCitizensR.com',
  },
  D: {
    code: 'D',
    key: 'd',
    otherCode: 'R',
    otherKey: 'r',
    ownLabel: 'Democrat',
    otherLabel: 'Republican',
    axis: 'partisan axis',
    domain: 'WeCitizensD.com',
  },
  L: {
    code: 'L',
    key: 'l',
    otherCode: 'S',
    otherKey: 's',
    ownLabel: 'Libertarian',
    otherLabel: 'Socialist',
    axis: 'economic axis',
    domain: 'WeCitizensL.com',
  },
  S: {
    code: 'S',
    key: 's',
    otherCode: 'L',
    otherKey: 'l',
    ownLabel: 'Socialist',
    otherLabel: 'Libertarian',
    axis: 'economic axis',
    domain: 'WeCitizensSocialism.com',
  },
};

/** The four doors, listed once, for the "One product, four doors" section. */
const DOOR_ORDER: PartyEdition[] = ['R', 'D', 'L', 'S'];

const DOOR_ORDINAL: Record<PartyEdition, string> = {
  R: 'Door One',
  D: 'Door Two',
  L: 'Door Three',
  S: 'Door Four',
};

const PLURAL: Record<PartyEdition, string> = {
  R: 'Republicans',
  D: 'Democrats',
  L: 'Libertarians',
  S: 'Socialists',
};

export default function PartyFrontDoor({
  edition,
}: {
  edition: PartyEdition;
}): ReactNode {
  const p = EDITION_PROFILES[edition];
  const other = EDITION_PROFILES[p.otherCode];
  const url = `https://${p.domain.toLowerCase()}`;

  return (
      <div className={styles.page}>

      {/* ──────────────────────── HERO ──────────────────────── */}
      <section className={styles.hero} id="top">
        <div className={styles.heroInner}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 className={styles.heroDisplay}>We The<br />Citizens {p.code}</h1>
              <p className={styles.heroTagline}>
                Your Seats. Your <strong>Vote.</strong>
              </p>

              <div className={styles.heroActions}>
                <Link className={clsx(styles.btn, styles.btnGhost)} to="#seats">
                  Your seats
                </Link>
                <Link className={clsx(styles.btn, styles.btnGhost)} to="#mirror">
                  The mirror rule
                </Link>
                <Link
                  className={clsx(styles.btn, styles.btnGhost)}
                  to={`/docs/${p.otherKey}/overview`}>
                  The {p.otherCode} edition
                </Link>
                <Link className={clsx(styles.btn, styles.btnPrimary)} to={url}>
                  {p.domain} <span className="arw">&rarr;</span>
                </Link>
              </div>
            </div>

            <div className={styles.heroPortrait}>
              <img
                src={useBaseUrl('/img/hero-citizen.jpg')}
                alt="An American citizen seated, hands folded, wearing a flag pin"
                width={1000}
                height={1247}
                loading="eager"
              />
            </div>
          </div>

          <div className={styles.heroFirsts}>
            <span><em>I.</em>&nbsp;&nbsp;Ethics First</span>
            <span><em>II.</em>&nbsp;&nbsp;Citizens First</span>
            <span><em>III.</em>&nbsp;&nbsp;Truth First</span>
          </div>

          <div className={styles.heroBelow}>
            <p className={styles.heroLede}>
              The {p.ownLabel} front door onto We The Citizens. It asks you for nothing up
              front and shows you one thing: your own seats, the people holding them right
              now, what they actually voted for, and who could replace them.
            </p>

            <aside className={styles.heroLedger} aria-label="At a glance">
              <div className={styles.ledHead}>This edition, at a glance</div>
              <div className={styles.ledRow}>
                <span className={styles.ledNum}>5</span>
                <span className={styles.ledLab}>Seat blocks you actually vote on</span>
              </div>
              <div className={styles.ledRow}>
                <span className={styles.ledNum}>3</span>
                <span className={styles.ledLab}>Columns per seat, never reordered</span>
              </div>
              <div className={styles.ledRow}>
                <span className={styles.ledNum}>0</span>
                <span className={styles.ledLab}>Accounts required to read every word</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ──────────────────────── WHY THIS DOOR EXISTS ──────────────────────── */}
      <section className={styles.section} id="why">
        <div className={styles.wrap}>
          <div className={styles.editorialGrid}>
            <div className={styles.editorialAside}>
              <div className={styles.editorialStick}>
                <span className={styles.eyebrow}>Why a {p.ownLabel} front door exists</span>
                <h2 className={styles.sectionTitle} style={{marginTop: '1.2rem'}}>
                  I am a {p.ownLabel}. Is this site for me?
                </h2>
              </div>
            </div>
            <div className={styles.editorialBody}>
              <p className={styles.dropcap}>
                Yes. The main app asks a citizen to reason from first principles about the
                social contract. That is the right ask, and it is a big one for somebody who
                arrived from an argument thirty seconds ago.
              </p>
              <p>
                It also asks you to look at problems and politicians without a partisan frame
                — which, however correct, reads to a committed partisan as "this site is for
                the other team." So this edition lowers the first ask to one sentence.
              </p>
              <blockquote className={styles.pullquote}>
                Here are your elected officials. Here is what they actually voted for. Here is
                who could replace them.
              </blockquote>
              <p>
                Cross-party persuasion is expensive and slow. In-party accountability is cheap
                and fast, because you already agree with the party label and only have to be
                shown that this particular officeholder is not delivering on it. Holding your
                own side to its own stated standard is the highest-leverage act available to a
                voter.
              </p>
              <div className={styles.dateStamp}>{p.domain} · The {p.ownLabel} edition</div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────── STATS BAND ──────────────────────── */}
      <section className={styles.bandNavy}>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statNum}>1</div>
            <div className={styles.statLab}>Award Pipeline, Party-Blind</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>4</div>
            <div className={styles.statLab}>Doors, One Web App</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>100<em>%</em></div>
            <div className={styles.statLab}>Sourced Roll-Call Evidence</div>
          </div>
        </div>
      </section>

      {/* ──────────────────────── WHAT YOU SEE ──────────────────────── */}
      <section className={styles.section} id="seats">
        <div className={styles.wrap}>
          <div className={clsx(styles.sectionHead, styles.sectionHeadSplit)}>
            <div>
              <span className={styles.eyebrow}>What you see on the front page</span>
              <h2 className={styles.sectionTitle} style={{marginTop: '1.1rem'}}>
                A stack of seat blocks — one for every seat you vote on.
              </h2>
            </div>
            <p className={styles.sectionLead}>
              Your two US senators, your US House seat, your governor, your state assembly
              seat. Every block carries the same three columns, in the same order, every time.
            </p>
          </div>

          <div className={styles.planGrid}>
            <article className={styles.planCard}>
              <span className={styles.pIndex}>Column One</span>
              <h3>In office</h3>
              <p>
                The person holding the seat right now, with their record — their Monkey Award
                and Llama Award, and the specific sourced votes underneath each number.
              </p>
              <div className={styles.pTag}>Incumbent · Sourced</div>
            </article>
            <article className={styles.planCard}>
              <span className={styles.pIndex}>Column Two</span>
              <h3>{p.ownLabel} challenger</h3>
              <p>
                The leading challenger on your own side — a primary challenger when the
                incumbent is also a {p.ownLabel} — with Qualified and Vetted bars.
              </p>
              <div className={styles.pTag}>Your side · Primary</div>
            </article>
            <article className={styles.planCard}>
              <span className={styles.pIndex}>Column Three</span>
              <h3>{p.otherLabel} challenger</h3>
              <p>
                The leading challenger on the side you actually argue with — same photo size,
                same arithmetic, same bars. The cross-party column is always present.
              </p>
              <div className={styles.pTag}>Other side · Same math</div>
            </article>
          </div>

          <div className={styles.planCta}>
            <p className={styles.planCtaText}>
              An empty column stays a column. You get an honest "no vetted {p.ownLabel}{' '}
              challenger yet for this seat" and a way to recommend somebody — never a quietly
              collapsed grid.
            </p>
            <Link className={clsx(styles.btn, styles.btnPrimary)} to="/docs/voting_records/overview">
              Voting records <span className="arw">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────── THE MIRROR RULE ──────────────────────── */}
      <section className={clsx(styles.section, styles.bgPanel)} id="mirror">
        <div className={styles.wrap}>
          <div className={clsx(styles.sectionHead, styles.sectionHeadSplit)}>
            <div>
              <span className={styles.eyebrow}>The mirror rule</span>
              <h2 className={styles.sectionTitle} style={{marginTop: '1.1rem'}}>
                Partisan skins become partisan arguments unless something stops them.
              </h2>
            </div>
            <p className={styles.sectionLead}>
              This is what stops them — enforced, not promised. Everything true of {p.code} is
              true of {p.otherCode} with the party label swapped, because the two are one pair
              reflected across the {p.axis}.
            </p>
          </div>

          <div className={styles.articles}>
            <article className={styles.article}>
              <div className={styles.artNumwrap}>
                <span className={styles.artNum}>01</span>
                <span className={styles.artKicker}>Rule</span>
              </div>
              <div className={styles.artBody}>
                <h3>One award pipeline</h3>
                <p>
                  Awards are computed once, party-blind. No edition re-weights, re-rounds, or
                  re-thresholds anything.
                </p>
              </div>
            </article>
            <article className={styles.article}>
              <div className={styles.artNumwrap}>
                <span className={styles.artNum}>02</span>
                <span className={styles.artKicker}>Rule</span>
              </div>
              <div className={styles.artBody}>
                <h3>Symmetric harshness</h3>
                <p>
                  A {p.ownLabel} incumbent at 71% on the Monkey Award reads exactly as a{' '}
                  {p.otherLabel} incumbent at 71% does on the {p.otherCode} edition. One set of
                  strings, parameterized by the party label.
                </p>
              </div>
            </article>
            <article className={styles.article}>
              <div className={styles.artNumwrap}>
                <span className={styles.artNum}>03</span>
                <span className={styles.artKicker}>Rule</span>
              </div>
              <div className={styles.artBody}>
                <h3>No comparative copy</h3>
                <p>
                  Nothing on any edition compares the parties, characterizes the other party,
                  or attributes motive to a party. The unit of judgement is a person and a vote.
                </p>
              </div>
            </article>
            <article className={styles.article}>
              <div className={styles.artNumwrap}>
                <span className={styles.artNum}>04</span>
                <span className={styles.artKicker}>Rule</span>
              </div>
              <div className={styles.artBody}>
                <h3>The cross-party column is the honesty check</h3>
                <p>
                  An edition that only ever showed its own team's challengers would be a party
                  organ. Showing the good person on the other side, same size, same arithmetic,
                  is what makes this a citizens' tool instead of a campaign tool.
                </p>
              </div>
            </article>
            <article className={styles.article}>
              <div className={styles.artNumwrap}>
                <span className={styles.artNum}>05</span>
                <span className={styles.artKicker}>Rule</span>
              </div>
              <div className={styles.artBody}>
                <h3>A test enforces it, once per pair</h3>
                <p>
                  One seat, rendered under both editions of a pair, must produce the same page
                  once the labels are swapped. The check runs over R↔D and over L↔S, and it is
                  the reason a door only ever ships with its partner on the same axis. The
                  review test for any change: would I ship the exact mirror of this to the
                  paired edition tomorrow? If not, it does not ship.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ──────────────────────── ONE PRODUCT, FOUR DOORS ──────────────────────── */}
      <section className={styles.section} id="doors">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>One product, four doors</span>
            <h2 className={styles.sectionTitle}>
              The same web app, the same data, the same admin-approved records.
            </h2>
          </div>
          <div className={styles.programs}>
            {DOOR_ORDER.map((code) => {
              const door = EDITION_PROFILES[code];
              return (
                <article className={styles.program} key={code}>
                  <span className={styles.pIndex}>{DOOR_ORDINAL[code]}</span>
                  <h3>We The Citizens {door.code}</h3>
                  <p>
                    The {door.ownLabel} front door at {door.domain}. Not a separate product and
                    not a separate deployment — the same corpus of roster, awards, roll-call
                    evidence and proposed laws, rendered differently because of the domain the
                    request arrived on, and paired with the {door.otherCode} edition across the{' '}
                    {door.axis}.
                  </p>
                  <div className={styles.pTag}>{PLURAL[code]} · {door.domain}</div>
                </article>
              );
            })}
          </div>

          <div className={styles.planCta}>
            <p className={styles.planCtaText}>
              Reading here is wide open — no account, no sign-in, nothing recorded about you.
              Every action hands you to the app to join, and brings you back to the seat you
              were looking at.
            </p>
            <Link className={clsx(styles.btn, styles.btnPrimary)} to="https://app.WeTheCitizens.io/">
              Enter App <span className="arw">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────── WHERE TO GO NEXT ──────────────────────── */}
      <section className={clsx(styles.section, styles.bgPanel)} id="next">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>Where to go next</span>
            <h2 className={styles.sectionTitle}>
              The rest of the movement, from here.
            </h2>
          </div>
          <div className={styles.govGrid}>
            <div className={styles.govItem}>
              <span className={styles.gRom}>I</span>
              <h3>
                <Link to={`/docs/${p.otherKey}/overview`}>
                  We The Citizens {p.otherCode}
                </Link>
              </h3>
              <p>
                The same thing, for {PLURAL[p.otherCode]} — the enforced mirror of this page
                across the {p.axis}.
              </p>
            </div>
            <div className={styles.govItem}>
              <span className={styles.gRom}>II</span>
              <h3><Link to="/docs/legacy_politicians/overview">Elected Politicians</Link></h3>
              <p>The people with a voting record, and what that record actually says.</p>
            </div>
            <div className={styles.govItem}>
              <span className={styles.gRom}>III</span>
              <h3><Link to="/docs/new_politicians/overview">Good New Leaders</Link></h3>
              <p>The people worth electing who have never held office.</p>
            </div>
            <div className={styles.govItem}>
              <span className={styles.gRom}>IV</span>
              <h3><Link to="/docs/start_here/overview">Start Here</Link></h3>
              <p>What the whole movement is, in sixty seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────── FINAL CTA ──────────────────────── */}
      <section className={clsx(styles.bandRed, styles.section)} id="join">
        <div className={styles.ctaFinal}>
          <span className={clsx(styles.eyebrow, styles.eyebrowCenter, styles.eyebrowNoLine)}>
            The front door
          </span>
          <h2>Find your seats. See the record. Pick the replacement.</h2>
          <p>
            Your two senators, your House member, your governor, your assembly seat — each with
            the person in office, the challenger on your side, and the challenger on theirs. No
            account, no sign-in, nothing recorded about you until you decide to act.
          </p>
          <Link className={clsx(styles.btn, styles.btnLight)} to={url}>
            Go to {p.domain} <span className="arw">&rarr;</span>
          </Link>
        </div>
      </section>

      </div>
  );
}
