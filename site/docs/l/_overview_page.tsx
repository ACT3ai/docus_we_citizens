import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

/**
 * The We The Citizens L front door — WeCitizensL.com.
 *
 * THIS PAGE IS ITS OWN. It is not generated from a shared component and it is
 * not the mirror of any other door. There is no pairing, no partner edition and
 * no symmetry rule: L is Libertarian, and what belongs on this page is decided by
 * marketing/messaging/libertarians.md alone. Editing it changes this door and nothing else, which is the
 * point — improve a paragraph here without owing the same paragraph to anybody.
 *
 * The four doors were forked from one template on 2026-08-21 and are expected to
 * drift apart from here. If you find yourself adding a "keep the doors in sync"
 * helper, that is the rule we just removed growing back.
 *
 * Named with a leading underscore so the docs plugin ignores it as a page of its
 * own; it is rendered by ./overview.mdx.
 *
 * Styled from the shared home-page stylesheet so this page reads as the same
 * publication as wethecitizens.io.
 */
import styles from '@site/site/pages/index.module.css';

const DOMAIN = 'WeCitizensL.com';
const URL = 'https://wecitizensl.com';

/** The other three front doors, for the "One product, four doors" section. */
const OTHER_DOORS: {code: string; key: string; audience: string; domain: string}[] = [
  {code: 'R', key: 'r', audience: 'Republicans', domain: 'WeCitizensR.com'},
  {code: 'D', key: 'd', audience: 'Democrats', domain: 'WeCitizensD.com'},
  {code: 'S', key: 's', audience: 'Democratic Socialists', domain: 'WeCitizensSocialism.com'},
];

export default function WeTheCitizensLOverview(): ReactNode {
  return (
    <div className={styles.page}>

      {/* ──────────────────────── HERO ──────────────────────── */}
      <section className={styles.hero} id="top">
        <div className={styles.heroInner}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 className={styles.heroDisplay}>We The<br />Citizens L</h1>
              <p className={styles.heroTagline}>
                Your Seats. Your <strong>Vote.</strong>
              </p>

              <div className={styles.heroActions}>
                <Link className={clsx(styles.btn, styles.btnGhost)} to="#seats">
                  Your seats
                </Link>
                <Link className={clsx(styles.btn, styles.btnGhost)} to="#stands">
                  What this door stands for
                </Link>
                <Link className={clsx(styles.btn, styles.btnGhost)} to="#doors">
                  The other doors
                </Link>
                <Link className={clsx(styles.btn, styles.btnPrimary)} to={URL}>
                  {DOMAIN} <span className="arw">&rarr;</span>
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
              The Libertarian front door onto We The Citizens. It asks you for nothing up front and shows you one thing you can check yourself: your own seats, the people holding them right now, what they actually voted for, and who could replace them.
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
                <span className={styles.eyebrow}>Why a Libertarian front door exists</span>
                <h2 className={styles.sectionTitle} style={{marginTop: '1.2rem'}}>
                  I am a Libertarian. Is this site for me?
                </h2>
              </div>
            </div>
            <div className={styles.editorialBody}>
              <p className={styles.dropcap}>
                Yes — and verifiability is the reason. This door exists so a libertarian can check, not take our word, that the best new political leaders are being surfaced on merit and on the will of the people rather than by narrative control deciding in advance who gets elected.
              </p>
              <p>
                The main app asks a citizen to reason from first principles about the social contract. That is the right ask, and it is a big one for somebody who arrived from an argument thirty seconds ago. This door lowers the first ask to one sentence.
              </p>
              <blockquote className={styles.pullquote}>
                Here are your elected officials. Here is what they actually voted for. Here is
                who could replace them.
              </blockquote>
              <p>
                The alternative we are displacing is not another party. It is foreign services, intelligence services and concentrated money choosing the ballot before you reach it. Open code, open data and an open method are what turn that objection into something you can settle for yourself.
              </p>
              <div className={styles.dateStamp}>{DOMAIN} · The Libertarian edition</div>
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
              <h3>Libertarian challenger</h3>
              <p>
                The leading challenger on your own side — a primary challenger when the incumbent is also a Libertarian — with
                Qualified and Vetted bars.
              </p>
              <div className={styles.pTag}>Your side · Primary</div>
            </article>
            <article className={styles.planCard}>
              <span className={styles.pIndex}>Column Three</span>
              <h3>Challengers from other parties</h3>
              <p>
                The strongest challenger for this seat who is not from your side, whatever party
                that turns out to be — same photo size, same arithmetic, same bars. It is always
                present, because a page that only ever showed your own team would be a campaign
                tool rather than a citizens' tool.
              </p>
              <div className={styles.pTag}>Other parties · Same math</div>
            </article>
          </div>

          <div className={styles.planCta}>
            <p className={styles.planCtaText}>
              An empty column stays a column. You get an honest "no vetted Libertarian{' '}
              challenger yet for this seat" and a way to recommend somebody — never a quietly
              collapsed grid.
            </p>
            <Link className={clsx(styles.btn, styles.btnPrimary)} to="/docs/voting_records/overview">
              Voting records <span className="arw">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────── WHAT THIS DOOR STANDS FOR ──────────────────────── */}
      <section className={clsx(styles.section, styles.bgPanel)} id="stands">
        <div className={styles.wrap}>
          <div className={clsx(styles.sectionHead, styles.sectionHeadSplit)}>
            <div>
              <span className={styles.eyebrow}>What this door stands for</span>
              <h2 className={styles.sectionTitle} style={{marginTop: '1.1rem'}}>
                The planks this community actually builds on.
              </h2>
            </div>
            <p className={styles.sectionLead}>
              Written by libertarians, in the liberty movement's own language, on this door and nowhere else. The .io stays neutral; everything partisan lives here.
            </p>
          </div>

          <div className={styles.articles}>
            <article className={styles.article}>
              <div className={styles.artNumwrap}>
                <span className={styles.artNum}>01</span>
                <span className={styles.artKicker}>Plank</span>
              </div>
              <div className={styles.artBody}>
                <h3><Link to="/docs/l/verifiable_meritocracy">Verifiable meritocracy, not narrative control</Link></h3>
                <p>
                  The claim is checkable or it is nothing. Open source for the voting, matching and scoring; open data you can re-run; an open method you can disagree with.
                </p>
              </div>
            </article>
            <article className={styles.article}>
              <div className={styles.artNumwrap}>
                <span className={styles.artNum}>02</span>
                <span className={styles.artKicker}>Plank</span>
              </div>
              <div className={styles.artBody}>
                <h3><Link to="/docs/l/liberty_ethics">Great ethics, like the non-aggression principle</Link></h3>
                <p>
                  Consent and self-ownership are this door's ethical language, deliberately and exclusively. No religion goes on this door or on the .io.
                </p>
              </div>
            </article>
            <article className={styles.article}>
              <div className={styles.artNumwrap}>
                <span className={styles.artNum}>03</span>
                <span className={styles.artKicker}>Plank</span>
              </div>
              <div className={styles.artBody}>
                <h3><Link to="/docs/l/replace_incumbents">Replacing captured incumbents</Link></h3>
                <p>
                  Elections are the mechanism. Challengers first, incumbent protection never. The threat is any powerful force that is not the citizen — globalist elites, foreign governments, intelligence services, concentrated money.
                </p>
              </div>
            </article>
            <article className={styles.article}>
              <div className={styles.artNumwrap}>
                <span className={styles.artNum}>04</span>
                <span className={styles.artKicker}>Plank</span>
              </div>
              <div className={styles.artBody}>
                <h3><Link to="/docs/l/us_intelligence">Intelligence services that answer to citizens</Link></h3>
                <p>
                  No agency, domestic or foreign, decides an election. Leverage over officeholders is how capture actually works, and ending it is a candidate test.
                </p>
              </div>
            </article>
            <article className={styles.article}>
              <div className={styles.artNumwrap}>
                <span className={styles.artNum}>05</span>
                <span className={styles.artKicker}>Plank</span>
              </div>
              <div className={styles.artBody}>
                <h3><Link to="/docs/l/no_forever_wars">No forever wars, no draft, no social credit</Link></h3>
                <p>
                  Citizens are not raw material for someone else's foreign policy, and a score that decides what a citizen may do never gets built here — including its private-sector versions.
                </p>
              </div>
            </article>
            <article className={styles.article}>
              <div className={styles.artNumwrap}>
                <span className={styles.artNum}>06</span>
                <span className={styles.artKicker}>Plank</span>
              </div>
              <div className={styles.artBody}>
                <h3><Link to="/docs/l/rigged_economy">The libertarian rigged-economy package</Link></h3>
                <p>
                  Built by this community through voting and collaboration, not handed down. The destination is an economy that is ethical, clean and ideal for workers.
                </p>
              </div>
            </article>
          </div>

          <div className={styles.planCta}>
            <p className={styles.planCtaText}>
              Two things this door does not do, whatever the plank. It never characterizes
              another party or attributes motive to one — the unit of judgement is a person and
              a vote. And it never re-weights an award: the Monkey, Llama and Flamingo numbers
              are computed once, party-blind, and no edition re-rounds or re-thresholds them.
            </p>
            <Link className={clsx(styles.btn, styles.btnPrimary)} to="/docs/l/words_we_use">
              Words we use and words we avoid <span className="arw">&rarr;</span>
            </Link>
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
          <p className={styles.sectionLead}>
            Four doors, four audiences, four sets of priorities. They share the corpus — roster,
            awards, roll-call evidence, proposed laws — and nothing else. No door is another
            door's mirror, and none of them owes its content to any of the others.
          </p>
          <div className={styles.programs}>
            <article className={styles.program}>
              <span className={styles.pIndex}>This door</span>
              <h3>We The Citizens L</h3>
              <p>
                The Libertarian front door at {DOMAIN}. Written for Libertarians, from
                marketing/messaging/libertarians.md.
              </p>
              <div className={styles.pTag}>Libertarians · {DOMAIN}</div>
            </article>
            {OTHER_DOORS.map((door) => (
              <article className={styles.program} key={door.code}>
                <span className={styles.pIndex}>Another door</span>
                <h3>We The Citizens {door.code}</h3>
                <p>
                  The {door.audience} front door at {door.domain}. Its own audience, its own
                  priorities, its own pages — read it if you want to, but nothing here is written
                  to match it.
                </p>
                <div className={styles.pTag}>{door.audience} · {door.domain}</div>
              </article>
            ))}
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
                <Link to="/docs/l/words_we_use">Words we use and words we avoid</Link>
              </h3>
              <p>The language of this door, written down: what belongs here, and what was deliberately left to another audience.</p>
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
            the person in office, the challenger on your side, and the strongest challenger from
            anywhere else. No account, no sign-in, nothing recorded about you until you decide to
            act.
          </p>
          <Link className={clsx(styles.btn, styles.btnLight)} to={URL}>
            Go to {DOMAIN} <span className="arw">&rarr;</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
