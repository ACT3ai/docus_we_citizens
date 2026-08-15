import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './index.module.css';

/* The paired We The Citizens web app — app.WeTheCitizens.io */
const WEBAPP_HOME_URL = 'https://app.WeTheCitizens.io/';
const WEBAPP_PLAN_URL = 'https://app.WeTheCitizens.io/plan';

/* ──────────────────────── HERO ──────────────────────── */
function HeroSection() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.heroInner}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroDisplay}>
              We The<br />Citizens
            </h1>
            <p className={styles.heroTagline}>
              Our Voice. Our <strong>Future.</strong>
            </p>

            <div className={styles.heroActions}>
              <Link className={clsx(styles.btn, styles.btnGhost)} to="#plan">
                The plan
              </Link>
              <Link className={clsx(styles.btn, styles.btnGhost)} to="#charter">
                About us
              </Link>
              <Link className={clsx(styles.btn, styles.btnGhost)} to="#watch">
                Watch video
              </Link>
              <Link className={clsx(styles.btn, styles.btnPrimary)} to={WEBAPP_HOME_URL}>
                Enter App <span className="arw">&rarr;</span>
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...({fetchpriority: 'high'} as any)}
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
            A very lightweight organization operating the way Charlie Kirk wanted
            TPUSA to ideally work — built on good ethics, radical transparency, and
            the power of citizens to take back their government from those who sold it.
          </p>

          <aside className={styles.heroLedger} aria-label="At a glance">
            <div className={styles.ledHead}>The Charter, at a glance</div>
            <div className={styles.ledRow}>
              <span className={styles.ledNum}>7</span>
              <span className={styles.ledLab}>Charter principles guiding every decision</span>
            </div>
            <div className={styles.ledRow}>
              <span className={styles.ledNum}>16</span>
              <span className={styles.ledLab}>Founding board members</span>
            </div>
            <div className={styles.ledRow}>
              <span className={styles.ledNum}>100<em>%</em></span>
              <span className={styles.ledLab}>Financial transparency, every dollar visible</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── WHY WE EXIST ──────────────────────── */
function WhySection() {
  return (
    <section className={styles.section} id="charter">
      <div className={styles.wrap}>
        <div className={styles.editorialGrid}>
          <div className={styles.editorialAside}>
            <div className={styles.editorialStick}>
              <span className={styles.eyebrow}>Why this movement exists</span>
              <h2 className={styles.sectionTitle} style={{marginTop: '1.2rem'}}>
                We are not replacing one man. We are replacing the broken model.
              </h2>
            </div>
          </div>
          <div className={styles.editorialBody}>
            <p className={styles.dropcap}>
              Charlie Kirk built the largest conservative youth organization in America.
              When he was taken from us on September 10, 2025, his organization was
              captured within days — restructured to serve interests he actively opposed.
            </p>
            <p>
              We The Citizens is the movement Charlie would have wanted. Not a massive
              bureaucracy — a very lightweight organization that operates the way he
              always envisioned TPUSA should work.
            </p>
            <blockquote className={styles.pullquote}>
              An organization where the board answers to the members, where every dollar
              is visible, and where no corporate sponsor or foreign interest can buy influence.
            </blockquote>
            <p>
              This is not a tribute. It is a correction — a structure built so that what
              happened can never happen again.
            </p>
            <div className={styles.dateStamp}>In memoriam · September 10, 2025</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── STATS BAND ──────────────────────── */
function StatsBand() {
  return (
    <section className={styles.bandNavy}>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statNum}>7</div>
          <div className={styles.statLab}>Charter Principles</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>16</div>
          <div className={styles.statLab}>Founding Board Members</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>100<em>%</em></div>
          <div className={styles.statLab}>Financial Transparency</div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── PRINCIPLES ──────────────────────── */
const principles = [
  {
    num: '01',
    title: 'Good Ethics',
    body: 'Too often, politics betrays ethics for other agendas. We keep this focused on good ethics. Every decision, every endorsement, every dollar — measured by ethical standards first.',
  },
  {
    num: '02',
    title: 'Politicians Work for Citizens',
    body: 'US politicians should work for US citizens — not sell out to money in politics, the deep state, or the powerful, domestic or foreign, pursuing agendas against the interests and wants of the American citizen base.',
  },
  {
    num: '03',
    title: 'Expose the Deep State',
    body: 'The structure of the deep state must be fully exposed, with a plan to fix any wrongs in that process — true for any domestic or foreign deep state encompassing elites or any other puppet-master equivalent power structure.',
  },
  {
    num: '04',
    title: 'Christian Values',
    body: "A Christian organization. It exists to represent Christian values — not any other religion's goals that may be at odds with US citizens or Christian values.",
  },
  {
    num: '05',
    title: 'Online Political Thought Leadership',
    body: 'Highly leveraged online thought leadership that changes the most critical, biggest problems we face — harnessing content, debates, and ideas to get good people into power, even with less money than sold-out opponents.',
  },
  {
    num: '06',
    title: 'Win With Less Money',
    body: 'Enable candidates to win even when they have less money. Build infrastructure that makes the best citizen-aligned candidate win against opposition with far more campaign cash — running hyper-efficiently, with high leverage.',
  },
  {
    num: '07',
    title: 'End Voter Fraud Permanently',
    body: 'When voting systems are proprietary and not thoroughly policed by technology and transparency, voter fraud will always happen. Open-source software and hyper-policed transparency guarantee one citizen, one vote, no fraud — ever.',
  },
];

function PrinciplesSection() {
  return (
    <section className={styles.section} id="principles">
      <div className={styles.wrap}>
        <div className={clsx(styles.sectionHead, styles.sectionHeadSplit)}>
          <div>
            <span className={styles.eyebrow}>The political charter</span>
            <h2 className={styles.sectionTitle} style={{marginTop: '1.1rem'}}>
              The Seven Charter Principles
            </h2>
          </div>
          <p className={styles.sectionLead}>
            The charter that guides every decision we make — read it the way it was
            written, as articles of a founding document.
          </p>
        </div>

        <div className={styles.articles}>
          {principles.map((p) => (
            <article key={p.num} className={styles.article}>
              <div className={styles.artNumwrap}>
                <span className={styles.artNum}>{p.num}</span>
                <span className={styles.artKicker}>Article</span>
              </div>
              <div className={styles.artBody}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── PROGRAMS ──────────────────────── */
function ProgramsSection() {
  return (
    <section className={clsx(styles.section, styles.bgPanel)} id="programs">
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>Two core programs</span>
          <h2 className={styles.sectionTitle}>
            Action that advances the charter — on the national stage and on every campus.
          </h2>
        </div>
        <div className={styles.programs}>
          <article className={styles.program}>
            <span className={styles.pIndex}>Program One</span>
            <h3>We The Citizens Conference</h3>
            <p>
              A once-a-year national conference bringing together thought leaders across
              the political spectrum that Charlie Kirk would have wanted. The board of
              directors selects speakers — education, coalition-building, and advancing
              the seven charter principles through public discourse.
            </p>
            <div className={styles.pTag}>National · Annual</div>
          </article>
          <article className={styles.program}>
            <span className={styles.pIndex}>Program Two</span>
            <h3>Campus Debates</h3>
            <p>
              Great political thought leaders visit universities, answer questions, and
              engage students in debate — progressing great ideas and building future
              leaders. All campus content is repurposed for social media to extend its
              reach, following good ethics.
            </p>
            <div className={styles.pTag}>Campus · Ongoing</div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── THE PLAN ──────────────────────── */
const planCards = [
  {
    index: 'One',
    title: 'The default plan',
    body: 'A single living document naming what the movement intends to build and do in a normal year — every goal, initiative, and milestone, grouped into sections and written down where citizens can read it.',
    tag: 'Always current',
  },
  {
    index: 'Two',
    title: 'A plan for every year',
    body: 'Each year follows the default plan by default, so improvements reach it automatically. A year can carry its own changes on top when that year needs something different.',
    tag: 'Inherited',
  },
  {
    index: 'Three',
    title: 'Locked in when we commit',
    body: 'When a year is settled we lock it in, and it is frozen exactly as it stood. Later changes to the default plan land on future years instead — so what we promised for this year cannot quietly move.',
    tag: 'Frozen · Auditable',
  },
];

function PlanSection() {
  return (
    <section className={styles.section} id="plan">
      <div className={styles.wrap}>
        <div className={clsx(styles.sectionHead, styles.sectionHeadSplit)}>
          <div>
            <span className={styles.eyebrow}>The plan</span>
            <h2 className={styles.sectionTitle} style={{marginTop: '1.1rem'}}>
              What we are going to do — written down, dated, and public.
            </h2>
          </div>
          <p className={styles.sectionLead}>
            A movement that will not say what it intends to do cannot be held to it.
            Our plan is published in the open, versioned, and visible to every citizen.
          </p>
        </div>

        <div className={styles.planGrid}>
          {planCards.map((c) => (
            <article key={c.index} className={styles.planCard}>
              <span className={styles.pIndex}>{c.index}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <div className={styles.pTag}>{c.tag}</div>
            </article>
          ))}
        </div>

        <div className={styles.planCta}>
          <p className={styles.planCtaText}>
            Every section, every item, every year — with its status, its owner, and the
            date it was last changed — lives in the We The Citizens web app.
          </p>
          <Link className={clsx(styles.btn, styles.btnPrimary)} to={WEBAPP_PLAN_URL}>
            Plan details web app <span className="arw">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── WELCOME VIDEO ──────────────────────── */
function WelcomeVideoSection() {
  return (
    <section className={clsx(styles.section, styles.bgPanel)} id="watch">
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>Welcome video</span>
          <h2 className={styles.sectionTitle}>
            Hear it in our own words.
          </h2>
        </div>

        <div className={styles.videoFrame}>
          <div className={styles.videoPlaceholder} role="img" aria-label="Welcome video coming soon">
            <span className={styles.videoPlay} aria-hidden="true">{'▶'}</span>
            <span className={styles.videoText}>Welcome Video Coming Soon</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── ABOUT US ──────────────────────── */
function AboutSection() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.wrap}>
        <div className={clsx(styles.sectionHead, styles.sectionHeadSplit)}>
          <div>
            <span className={styles.eyebrow}>About us</span>
            <h2 className={styles.sectionTitle} style={{marginTop: '1.1rem'}}>
              Who we are, and who we answer to.
            </h2>
          </div>
        </div>

        <div className={styles.aboutBlock}>
          <p className={styles.aboutText}>
            We The Citizens is a lightweight, ethics-first political movement built to
            carry forward the work Charlie Kirk started — and to do it in a structure
            that cannot be captured. We are members, not donors' interests. Our charter
            is public, our board is term-limited and recallable, and every dollar we
            take in is visible to anyone who wants to look. We exist to put citizens
            back in control of the government that is supposed to serve them.
          </p>
          <Link className={clsx(styles.btn, styles.btnPrimary)} to="/docs/about">
            About Us <span className="arw">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── BOARD ──────────────────────── */
const board = [
  ['CO', 'Candace Owens'],
  ['DS', 'Dave Smith'],
  ['JK', 'Joe Kent'],
  ['TG', 'Tulsi Gabbard'],
  ['TC', 'Tucker Carlson'],
  ['SB', 'Steve Bannon'],
  ['MG', 'Marjorie Taylor Greene'],
  ['BS', 'Bryan Starbuck'],
  ['IC', 'Ian Carroll'],
  ['TM', 'Thomas Massie'],
  ['MG', 'Matt Gaetz'],
  ['GG', 'Glenn Greenwald'],
  ['CC', 'Collin Campbell'],
  ['BC', 'Baron Coleman'],
  ['RM', 'Ryan Matta'],
  ['MK', 'Megyn Kelly'],
];

function BoardSection() {
  return (
    <section className={styles.section} id="board">
      <div className={styles.wrap}>
        <div className={clsx(styles.sectionHead, styles.sectionHeadSplit)}>
          <div>
            <span className={styles.eyebrow}>The founding board</span>
            <h2 className={styles.sectionTitle} style={{marginTop: '1.1rem'}}>
              People Charlie Kirk trusted.
            </h2>
          </div>
          <p className={styles.sectionLead}>
            People who stood with him — not people who stood to profit from his absence.
          </p>
        </div>

        <div className={styles.boardGrid}>
          {board.map(([mono, name], i) => (
            <div key={`${name}-${i}`} className={styles.member}>
              <div className={styles.portrait}>
                <span className={styles.portraitMono}>{mono}</span>
              </div>
              <div className={styles.memberName}>{name}</div>
            </div>
          ))}
        </div>

        <div className={styles.commit}>
          <h3>Board Commitments</h3>
          <div className={styles.commitGrid}>
            <div className={styles.commitItem}>
              <span className={styles.commitCheck}>{'✓'}</span>
              <span className={styles.commitText}>Term-limited positions with member recall authority.</span>
            </div>
            <div className={styles.commitItem}>
              <span className={styles.commitCheck}>{'✓'}</span>
              <span className={styles.commitText}>No conflicts of interest with corporate sponsors or foreign entities.</span>
            </div>
            <div className={styles.commitItem}>
              <span className={styles.commitCheck}>{'✓'}</span>
              <span className={styles.commitText}>Required to disclose all financial interests publicly.</span>
            </div>
            <div className={styles.commitItem}>
              <span className={styles.commitCheck}>{'✓'}</span>
              <span className={styles.commitText}>Bound by the charter to serve member interests above all else.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── GOVERNANCE ──────────────────────── */
function GovernanceSection() {
  return (
    <section className={clsx(styles.section, styles.bgPanel)} id="governance">
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>How we govern</span>
          <h2 className={styles.sectionTitle}>
            Power flows up from the people, never down from the top.
          </h2>
        </div>
        <div className={styles.govGrid}>
          <div className={styles.govItem}>
            <span className={styles.gRom}>I</span>
            <h3>Member Sovereignty</h3>
            <p>
              Every major decision flows from the membership. The board serves at the
              pleasure of the people, not the other way around.
            </p>
          </div>
          <div className={styles.govItem}>
            <span className={styles.gRom}>II</span>
            <h3>Radical Transparency</h3>
            <p>
              All finances, all board votes, all major decisions — documented and
              published on wethecitizens.io. Every dollar visible.
            </p>
          </div>
          <div className={styles.govItem}>
            <span className={styles.gRom}>III</span>
            <h3>No Corporate Capture</h3>
            <p>
              No single donor, corporation, or foreign interest may hold outsized
              influence. Grassroots funding from real Americans only.
            </p>
          </div>
          <div className={styles.govItem}>
            <span className={styles.gRom}>IV</span>
            <h3>Accountable Leadership</h3>
            <p>
              Elected board with term limits. Annual independent audits published in
              full. Any board member can be recalled by member vote.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── FINAL CTA ──────────────────────── */
function FinalCtaSection() {
  return (
    <section className={clsx(styles.bandRed, styles.section)} id="join">
      <div className={styles.ctaFinal}>
        <span className={clsx(styles.eyebrow, styles.eyebrowCenter, styles.eyebrowNoLine)}>
          The promise
        </span>
        <h2>This movement will never be captured.</h2>
        <p>
          When the members own the organization, when finances are transparent, when
          leadership is accountable and term-limited, and when no single interest can
          buy influence — the movement belongs to the people. That is what Charlie Kirk
          fought for. That is what we will protect.
        </p>
        <Link className={clsx(styles.btn, styles.btnLight)} to={WEBAPP_HOME_URL}>
          Enter App <span className="arw">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}

/* ──────────────────────── PAGE ──────────────────────── */
export default function Home(): ReactNode {
  return (
    <Layout
      title="Ethics First. Citizens First. Truth First."
      description="We The Citizens is a lightweight, ethics-first political movement carrying forward Charlie Kirk's values — exposing the deep state, ending voter fraud, and putting citizens back in control.">
      <div className={styles.page}>
        <main>
          <HeroSection />
          <WhySection />
          <StatsBand />
          <PrinciplesSection />
          <ProgramsSection />
          <PlanSection />
          <WelcomeVideoSection />
          <AboutSection />
          <BoardSection />
          <GovernanceSection />
          <FinalCtaSection />
        </main>
      </div>
    </Layout>
  );
}
