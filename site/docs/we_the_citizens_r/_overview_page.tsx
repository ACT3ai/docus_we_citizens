import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

/* The We The Citizens R front door — WeCitizensR.com.
   Styled from the shared home-page stylesheet so this Level 2 overview reads
   as the same publication as wethecitizens.io. Kept as a .tsx component (and
   named with a leading underscore so the docs plugin ignores it as a page)
   because MDX wraps multi-line JSX text children in extra <p> elements. */
import styles from '../../pages/index.module.css';

export default function WeTheCitizensROverview(): ReactNode {
  return (
      <div className={styles.page}>

      {/* ──────────────────────── HERO ──────────────────────── */}
      <section className={styles.hero} id="top">
        <div className={styles.heroInner}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 className={styles.heroDisplay}>We The<br />Citizens R</h1>
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
                <Link className={clsx(styles.btn, styles.btnGhost)} to="/docs/we_the_citizens_d/overview">
                  The D edition
                </Link>
                <Link className={clsx(styles.btn, styles.btnPrimary)} to="https://wecitizensr.com">
                  WeCitizensR.com <span className="arw">&rarr;</span>
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
              The Republican front door onto We The Citizens. It asks you for nothing up
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
                <span className={styles.eyebrow}>Why a Republican front door exists</span>
                <h2 className={styles.sectionTitle} style={{marginTop: '1.2rem'}}>
                  I am a Republican. Is this site for me?
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
                shown that this particular incumbent is not delivering on it. Primarying your
                own bad incumbent is the highest-leverage act available to a voter.
              </p>
              <div className={styles.dateStamp}>WeCitizensR.com · The Republican edition</div>
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
            <div className={styles.statNum}>2</div>
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
              <h3>Republican challenger</h3>
              <p>
                The leading challenger on your own side — a primary challenger when the
                incumbent is also a Republican — with Qualified and Vetted bars.
              </p>
              <div className={styles.pTag}>Your side · Primary</div>
            </article>
            <article className={styles.planCard}>
              <span className={styles.pIndex}>Column Three</span>
              <h3>Democrat challenger</h3>
              <p>
                The leading challenger on the other side — same photo size, same arithmetic,
                same bars. The cross-party column is always present.
              </p>
              <div className={styles.pTag}>Other side · Same math</div>
            </article>
          </div>

          <div className={styles.planCta}>
            <p className={styles.planCtaText}>
              An empty column stays a column. You get an honest "no vetted Republican
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
                Two partisan skins become two partisan arguments unless something stops them.
              </h2>
            </div>
            <p className={styles.sectionLead}>
              This is what stops them — enforced, not promised. Everything true of R is true
              of D with the party label swapped.
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
                  A Republican incumbent at 71% on the Monkey Award reads exactly as a Democrat
                  incumbent at 71% does on the other edition. One set of strings, parameterized
                  by the party label.
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
                  Nothing on either edition compares the parties, characterizes the other party,
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
                <h3>A test enforces it</h3>
                <p>
                  One seat, rendered under both editions, must produce the same page once the
                  labels are swapped. The review test for any change: would I ship the exact
                  mirror of this to the other edition tomorrow? If not, it does not ship.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ──────────────────────── ONE PRODUCT, TWO DOORS ──────────────────────── */}
      <section className={styles.section} id="doors">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>One product, two doors</span>
            <h2 className={styles.sectionTitle}>
              The same web app, the same data, the same admin-approved records.
            </h2>
          </div>
          <div className={styles.programs}>
            <article className={styles.program}>
              <span className={styles.pIndex}>Door One</span>
              <h3>We The Citizens R</h3>
              <p>
                The Republican front door at WeCitizensR.com. Not a second product and not a
                second deployment — the same corpus of roster, awards, roll-call evidence and
                proposed laws, rendered differently because of the domain the request arrived on.
              </p>
              <div className={styles.pTag}>Republicans · WeCitizensR.com</div>
            </article>
            <article className={styles.program}>
              <span className={styles.pIndex}>Door Two</span>
              <h3>We The Citizens D</h3>
              <p>
                The Democrat front door at WeCitizensD.com. Identical in every respect except
                the party label — the mirror of this page, built from the same numbers by the
                same party-blind pipeline.
              </p>
              <div className={styles.pTag}>Democrats · WeCitizensD.com</div>
            </article>
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
              <h3><Link to="/docs/we_the_citizens_d/overview">We The Citizens D</Link></h3>
              <p>The same thing, for Democrats — the enforced mirror of this page.</p>
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
          <Link className={clsx(styles.btn, styles.btnLight)} to="https://wecitizensr.com">
            Go to WeCitizensR.com <span className="arw">&rarr;</span>
          </Link>
        </div>
      </section>

      </div>
  );
}
