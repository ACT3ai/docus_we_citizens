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
            Washington has stopped working for the people who pay for it. We do not
            argue that — we establish it from the public record, publish the arithmetic
            beside every claim, and then go replace the people who earned it. Here is
            the whole agenda, numbered, with nothing held back.
          </p>

          <aside className={styles.heroLedger} aria-label="At a glance">
            <div className={styles.ledHead}>The agenda, at a glance</div>
            <div className={styles.ledRow}>
              <span className={styles.ledNum}>20</span>
              <span className={styles.ledLab}>Numbered commitments, published in full</span>
            </div>
            <div className={styles.ledRow}>
              <span className={styles.ledNum}>4</span>
              <span className={styles.ledLab}>Party doors, one shared public record</span>
            </div>
            <div className={styles.ledRow}>
              <span className={styles.ledNum}>100<em>%</em></span>
              <span className={styles.ledLab}>Open source, open data, open arithmetic</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── THE AGENDA — THE TWENTY ────────────────────────
   One row per top-level numbered item in the messaging table of contents.
   Each row's sub-points are that item's dot-numbered subsections, and each
   row links to the Level 2 area on this site that carries the long version. */
type AgendaLink = {label: string; to: string};
type AgendaItem = {
  n: string;
  title: string;
  q: string;
  body: string;
  points: string[];
  links: AgendaLink[];
};

const AGENDA: AgendaItem[] = [
  {
    n: '01',
    title: 'Congress Working For Citizens',
    q: 'Who is Congress actually working for?',
    body:
      'The one test every other item on this list serves. Control over Congress gets hijacked — by money in politics, by a globalist deep state, by an intelligence service. Where it has happened we prove it from the official record rather than assert it, publish it, and then remove it at the ballot box.',
    points: [
      'Money in politics',
      'A globalist deep state',
      'Intelligence service capture',
      'Expose the hijack',
      'Remove the hijack',
    ],
    links: [{label: 'Congress For Citizens', to: '/docs/congress_for_citizens/overview'}],
  },
  {
    n: '02',
    title: 'A Deliberately Non-Partisan Site',
    q: 'Why is this site not taking a side?',
    body:
      'Some capture is egregious enough that it runs against the base of both parties at once, and the formal party apparatus in Washington has fixed it in neither. This door is the shared ground where citizens from every party look at the same record, decide together, and then carry it back into their own party.',
    points: [
      'What crosses both parties',
      'A forum between the two bases',
    ],
    links: [{label: 'Non-Partisan Site', to: '/docs/non_partisan_site/overview'}],
  },
  {
    n: '03',
    title: 'Replacing Captured Incumbents',
    q: 'How do you actually get a captured incumbent out of office?',
    body:
      'Elections, and nothing else. A captured incumbent is replaced when a party’s own base gets behind the single strongest challenger before the primary, instead of splitting three ways after it. Challengers first — the fight is inside your own party, where your vote is worth the most.',
    points: [
      'Challengers first',
      'Rally behind one challenger, per party, per seat',
    ],
    links: [{label: 'Replace Incumbents', to: '/docs/replace_incumbents/overview'}],
  },
  {
    n: '04',
    title: 'Meritocracy — Finding the Best Candidates',
    q: 'How do you judge a candidate without just judging their party?',
    body:
      'Eighteen published qualification areas, each with a rubric running level 1 to level 10 and a declared weight — written down and readable in advance, so a challenger knows the standard before anybody assesses them against it.',
    points: [
      'Dedicated to always work for citizens',
      'Strong enough to refuse being co-opted',
      'Matched to where you sit on the spectrum',
    ],
    links: [
      {label: 'Qualifications', to: '/docs/qualifications/overview'},
      {label: 'Meritocracy', to: '/docs/meritocracy/overview'},
    ],
  },
  {
    n: '05',
    title: 'Removing the Rigged Economy',
    q: 'Rigged how, and rigged by whom?',
    body:
      'Citizens behind every party door already agree the economy is rigged. The work here is turning that agreement into receipts — documenting it from the record instead of feeling it at the register — and then into a fix both bases will actually sign.',
    points: [
      'Identify the rigging, with sources',
      'A fix supported by both sides',
    ],
    links: [{label: 'Rigged Economy', to: '/docs/rigged_economy/overview'}],
  },
  {
    n: '06',
    title: 'Fix Bills and Fix Laws',
    q: 'Do you have actual legislation, or just ideas?',
    body:
      'Whole bills with numbered sections, written by the movement, published in the open, waiting for a sponsor. A fix bill is not a law and no page here will let it read as one — it exists so a citizen can point at the exact text and ask their representative why it has not been introduced.',
    points: [
      'Add the laws this community cares about',
      'The fix bills that matter most',
    ],
    links: [
      {label: 'Fix Bills', to: '/docs/good_bills/overview'},
      {label: 'Fixing the Law', to: '/docs/fix_laws/overview'},
    ],
  },
  {
    n: '07',
    title: 'Fully Exposing the Deep State',
    q: 'What has actually been documented, and where do I read the source myself?',
    body:
      'What the deep state, the global elites and the Epstein class have been documented doing — sourced at the door, never asserted without a record behind it. Where the files are still withheld, the withholding is itself recorded as a finding, because a gap somebody created on purpose is a fact about the record.',
    points: [
      'Who the deep state is',
      'The documented crimes',
      'The withheld files',
    ],
    links: [{label: 'Deep State', to: '/docs/deep_state/overview'}],
  },
  {
    n: '08',
    title: 'US Intelligence Serves This Country',
    q: 'Are our own agencies running our politics?',
    body:
      'US intelligence serves the United States and nothing else. It is never a puppet master over American politics, and never the route a foreign power uses to reach American citizens. That includes whistleblower protection strong enough for an employee to say so in public, with specifics.',
    points: [
      'No removing democracy at home',
      'No puppet master over US politics',
      'Whistleblower protection',
    ],
    links: [{label: 'US Intelligence', to: '/docs/us_intelligence/overview'}],
  },
  {
    n: '09',
    title: 'No Foreign Puppet Masters',
    q: 'Is a foreign government helping pick our leaders?',
    body:
      'No foreign service gets to be puppet master over American politics or American citizens. Where it is being attempted, prevent it; where it already happened, expose it from the record — including paid influencers and propagandists posting as though they were ordinary citizens.',
    points: [
      'Democracy removed from the outside',
      'Puppet master over US politics',
      'Paid influence operations',
    ],
    links: [{label: 'Foreign Intelligence', to: '/docs/foreign_intelligence/overview'}],
  },
  {
    n: '10',
    title: 'Election Integrity',
    q: 'How do I know the count was real?',
    body:
      'An election either produces a result that any side can reproduce for itself from the public record, or it does not count. That is a technology problem with a technology answer: open-source voting systems, routine post-election audits, and gaps published rather than argued away.',
    points: [
      'Open-source voting technology',
      'Reproduce the result yourself',
      'Audits and open gaps',
    ],
    links: [{label: 'Election Integrity', to: '/docs/election_integrity/overview'}],
  },
  {
    n: '11',
    title: 'No Needless Wars. No Forever Wars. No Draft.',
    q: 'Will my kids be drafted into another war nobody chose?',
    body:
      'One of the few positions the citizen base holds identically behind all four party doors. Forever wars survive every change of party in Washington anyway — which is itself evidence that the decision is not being made by voters.',
    points: [
      'The forever war pattern',
      'Remove the draft',
      'Who pays, and who profits',
    ],
    links: [{label: 'No Forever Wars', to: '/docs/no_forever_wars/overview'}],
  },
  {
    n: '12',
    title: 'No Social Credit System in America',
    q: 'Could China’s system happen here?',
    body:
      'The American version is already being assembled — out of scoring, de-banking, and access shut off with no due process and no appeal. Nobody here calls it a social credit system, which is exactly why it has to be named, mapped and removed before it finishes being built.',
    points: [
      'The American version',
      'Why it is not called that',
      'How we remove it',
    ],
    links: [{label: 'No Social Credit', to: '/docs/no_social_credit/overview'}],
  },
  {
    n: '13',
    title: 'Trust Scores',
    q: 'How do you know I am a real person and not a bot farm?',
    body:
      'A trust score answers exactly one question — is this a real, believable citizen — and never what that citizen believes. Stitched together, verified citizens form a mesh that can vote, and that mesh is the defense against bots, intelligence services and paid propagandists. Trust is built and voted on the party doors; this site carries the read-only roll-up.',
    points: [
      'Built and voted at the party level',
      'The read-only roll-up here',
      'The mesh that defends the vote',
    ],
    links: [{label: 'Trust Scores', to: '/docs/trust_scores/overview'}],
  },
  {
    n: '14',
    title: 'Open Source. Open Data. Open AI.',
    q: 'Can I check all of this myself?',
    body:
      'The public record is a git repository, not a database you are asked to trust. Clone it, follow any claim down to its source on the official record, read the code that computed it, and send back a correction. The AI reads and checks reasoning; it never decides what is published about a person.',
    points: [
      'Open source — the code',
      'Open data — the record',
      'Open AI — and its hard limits',
    ],
    links: [
      {label: 'Open Data', to: '/docs/open_data/overview'},
      {label: 'Repos', to: '/docs/repos/overview'},
      {label: 'AI', to: '/docs/ai/overview'},
    ],
  },
  {
    n: '15',
    title: 'One App, Four Doors',
    q: 'There are five sites. Which one am I supposed to use?',
    body:
      'One app, one data record, one award pipeline, five front doors. This non-partisan site is the cross-party ground; your party’s door is where your own package gets built, argued and voted. Every door names the other three rather than pretending they are not there.',
    points: [
      'One app, four doors',
      'Finding the door that is yours',
    ],
    links: [{label: 'The Four Doors', to: '/docs/four_doors/overview'}],
  },
  {
    n: '16',
    title: 'Take Action',
    q: 'What can I do today that is not just posting online?',
    body:
      'Call a representative, add a video to a politician’s record, vet a challenger, recruit one, draft a fix bill. Each is worth points and each is logged with a link so somebody else can check it. The scarce resource in this movement is action, not opinion.',
    points: [
      'The action catalog',
      'Call your representative',
      'Log what you did',
    ],
    links: [{label: 'Take Action', to: '/docs/take_action/overview'}],
  },
  {
    n: '17',
    title: 'Karma',
    q: 'What do I get out of doing the work?',
    body:
      'The citizen side of the ledger. Raw points normalize into a monthly karma score and accumulate into a lifetime total, and the History Book of Citizens Fixing Democracy is hash-chained — so a name that earned its way in cannot be quietly written back out.',
    points: [
      'Points to monthly karma',
      'Verification and disputes',
      'The leader history book',
    ],
    links: [{label: 'Karma', to: '/docs/karma/overview'}],
  },
  {
    n: '18',
    title: 'Problem Laws',
    q: 'Which laws are the ones actually doing the damage?',
    body:
      'The enacted laws the American people did not want, were never asked about, and are governed by anyway. Each carries a badness rating from 1 to 100 that citizens vote on, the root causes it creates, sources at the door, and a frozen key — argue with the record in public, but never change it underneath the argument.',
    points: [
      'What makes a law a problem law',
      'How badness is rated',
      'Report a problem law',
    ],
    links: [{label: 'Problem Laws', to: '/docs/problem_laws/overview'}],
  },
  {
    n: '19',
    title: 'Community Voting and Collaboration',
    q: 'Do I have to do this alone?',
    body:
      'The community builds the package; we do not hand it down. You record where you actually stand, the platform runs the comparison against the social contract, and the app always shows you the delta between you and where the community landed rather than quietly averaging you away.',
    points: [
      'The community builds the package',
      'Vote on where you sit on the spectrum',
    ],
    links: [
      {label: 'Communities', to: '/docs/communities/overview'},
      {label: 'Decisions', to: '/docs/decisions/overview'},
    ],
  },
  {
    n: '20',
    title: 'Great American Ethics',
    q: 'Why does this cost the country more than money?',
    body:
      'When a hijacked Congress exempts itself from the rules it writes for everyone else, or pays settlements and hides them, the damage is not only to the law. Each act teaches a whole country that the rules are for other people. Restoring that standard — not just changing who occupies the seats — is the point of all twenty of these.',
    points: [
      'The standard',
      'How a hijacked Congress damages it',
      'Restoring it',
    ],
    links: [{label: 'American Ethics', to: '/docs/american_ethics/overview'}],
  },
];

function AgendaSection() {
  return (
    <section className={styles.section} id="agenda">
      <div className={styles.wrap}>
        <div className={clsx(styles.sectionHead, styles.sectionHeadSplit)}>
          <div>
            <span className={styles.eyebrow}>The agenda</span>
            <h2 className={styles.sectionTitle} style={{marginTop: '1.1rem'}}>
              Twenty things we are doing. Numbered, public, checkable.
            </h2>
          </div>
          <p className={styles.sectionLead}>
            Every movement will tell you what it believes. This is the list of what we
            actually work on — in order, with the question each one answers, and a link
            to the full record behind it.
          </p>
        </div>

        <ol className={styles.toc}>
          {AGENDA.map((item) => (
            <li key={item.n} className={styles.tocRow}>
              <div className={styles.tocNumWrap}>
                <span className={styles.tocNum}>{item.n}</span>
              </div>

              <div className={styles.tocMain}>
                <h3 className={styles.tocTitle}>{item.title}</h3>
                <p className={styles.tocQ}>{item.q}</p>
                <p className={styles.tocBody}>{item.body}</p>

                <ul className={styles.tocPoints}>
                  {item.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>

                <div className={styles.tocLinks}>
                  {item.links.map((l) => (
                    <Link key={l.to} className={styles.tocLink} to={l.to}>
                      {l.label} <span className="arw">&rarr;</span>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ──────────────────────── THE FOUR DOORS ──────────────────────── */
const doors = [
  {letter: 'R', name: 'Republicans', domain: 'WeCitizensR.com', to: '/docs/r/overview'},
  {letter: 'D', name: 'Democrats', domain: 'WeCitizensD.com', to: '/docs/d/overview'},
  {letter: 'L', name: 'Libertarians', domain: 'WeCitizensL.com', to: '/docs/l/overview'},
  {
    letter: 'S',
    name: 'Democratic Socialists',
    domain: 'WeCitizensSocialism.com',
    to: '/docs/s/overview',
  },
];

function DoorsSection() {
  return (
    <section className={clsx(styles.bandNavy, styles.section)} id="doors">
      <div className={styles.wrap}>
        <div className={styles.doorsHead}>
          <span className={clsx(styles.eyebrow, styles.eyebrowLight)}>Four front doors</span>
          <h2 className={styles.doorsTitle}>
            This is the shared ground. Now take it home to your own side.
          </h2>
          <p className={styles.doorsLead}>
            One app, one public record, one award pipeline — four doors onto it. Your
            party&rsquo;s door is where the partisan work happens: the laws your side cares
            about, the challengers it will get behind, its board, its conference, and the
            trust scores it builds and votes for itself.
          </p>
        </div>

        <div className={styles.doorsGrid}>
          {doors.map((d) => (
            <Link key={d.letter} className={styles.door} to={d.to}>
              <span className={styles.doorLetter}>{d.letter}</span>
              <span className={styles.doorName}>We The Citizens {d.letter}</span>
              <span className={styles.doorWho}>{d.name}</span>
              <span className={styles.doorDomain}>
                {d.domain} <span className="arw">&rarr;</span>
              </span>
            </Link>
          ))}
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

/* ──────────────────────── ABOUT US ──────────────────────── */
function AboutSection() {
  return (
    <section className={styles.section} id="charter">
      <div className={styles.wrap}>
        <div className={clsx(styles.sectionHead, styles.sectionHeadSplit)}>
          <div>
            <span className={styles.eyebrow}>About us</span>
            <h2 className={styles.sectionTitle} style={{marginTop: '1.1rem'}}>
              Measurement, not argument.
            </h2>
          </div>
          <p className={styles.sectionLead}>
            Arguing about politics online changes nothing. Computing the claim from the
            public record, and publishing the derivation beside it, changes something.
          </p>
        </div>

        <div className={styles.aboutBlock}>
          <p className={styles.aboutText}>
            We The Citizens is a movement, a company, and a piece of software under one
            name — and the software belongs to you. Run it on your own machine, or use
            the hosted copy; it is the same program either way. No account is needed to
            read anything here, and staying anonymous is a safety feature rather than a
            loophole. We take what a politician <em>did</em> — their recorded votes — and
            what they <em>said</em> in their own words, compute the result in ordinary
            arithmetic, and publish the derivation so anyone can check it or prove us
            wrong. Sourced to the official record, or it does not get said.
          </p>
          <Link className={clsx(styles.btn, styles.btnPrimary)} to="/docs/about">
            About Us <span className="arw">&rarr;</span>
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

/* ──────────────────────── FINAL CTA ──────────────────────── */
function FinalCtaSection() {
  return (
    <section className={clsx(styles.bandRed, styles.section)} id="join">
      <div className={styles.ctaFinal}>
        <span className={clsx(styles.eyebrow, styles.eyebrowCenter, styles.eyebrowNoLine)}>
          The promise
        </span>
        <h2>Twenty items. Nothing hidden behind any of them.</h2>
        <p>
          Every number on this site is computed from the public record and shown with the
          work. Every claim names its source. The code is open, the data is open, and any
          citizen can clone the whole record and check it — including checking us. That is
          the only kind of movement that cannot be quietly bought out from under the people
          who built it.
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
      description="We The Citizens is a non-partisan, citizen-powered platform: twenty numbered commitments, computed from the public record, with the arithmetic published beside every claim.">
      <div className={styles.page}>
        <main>
          <HeroSection />
          <AgendaSection />
          <DoorsSection />
          <PlanSection />
          <AboutSection />
          <WelcomeVideoSection />
          <FinalCtaSection />
        </main>
      </div>
    </Layout>
  );
}
