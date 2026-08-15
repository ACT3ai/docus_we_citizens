import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function CharterSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>Our Charter</Heading>
        <div className={styles.charterGrid}>
          <div className={styles.charterCard}>
            <div className={styles.charterIcon}>&#9734;</div>
            <Heading as="h3">Member Sovereignty</Heading>
            <p>Members own this organization. Every major decision flows from the membership. The board serves at the pleasure of the members.</p>
          </div>
          <div className={styles.charterCard}>
            <div className={styles.charterIcon}>&#9673;</div>
            <Heading as="h3">Radical Transparency</Heading>
            <p>All finances public. All board votes public. All major decisions documented and published. No exceptions.</p>
          </div>
          <div className={styles.charterCard}>
            <div className={styles.charterIcon}>&#9878;</div>
            <Heading as="h3">No Corporate Capture</Heading>
            <p>No single donor, corporation, or foreign interest may hold outsized influence. Funding comes from grassroots small-dollar donations.</p>
          </div>
          <div className={styles.charterCard}>
            <div className={styles.charterIcon}>&#9745;</div>
            <Heading as="h3">Accountable Leadership</Heading>
            <p>Board elected by members. Term limits enforced. Annual independent audits published in full. Recall by member vote.</p>
          </div>
          <div className={styles.charterCard}>
            <div className={styles.charterIcon}>&#9883;</div>
            <Heading as="h3">Charlie Kirk's Values</Heading>
            <p>Empowering young Americans. Fighting government overreach. Defending constitutional rights. Speaking truth when it is dangerous.</p>
          </div>
          <div className={styles.charterCard}>
            <div className={styles.charterIcon}>&#9878;</div>
            <Heading as="h3">Grassroots Power</Heading>
            <p>Every chapter locally governed. Policy positions emerge from member debate and vote, not top-down directives.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GovernanceSection() {
  return (
    <section className={styles.sectionAlt}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>Governance Structure</Heading>
        <div className={styles.govGrid}>
          <div className={styles.govCard}>
            <Heading as="h3">Local Chapters</Heading>
            <p>The backbone. Each chapter elects its own leadership, sets priorities within the charter, and sends representatives to the National Council.</p>
          </div>
          <div className={styles.govArrow}>&#8594;</div>
          <div className={styles.govCard}>
            <Heading as="h3">National Council</Heading>
            <p>Chapter representatives who vote on national policy, budget allocations, and board nominations.</p>
          </div>
          <div className={styles.govArrow}>&#8594;</div>
          <div className={styles.govCard}>
            <Heading as="h3">The Board</Heading>
            <p>Elected by the National Council, confirmed by member vote. All actions documented and published. Term-limited with recall authority.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>Why We The Citizens Exists</Heading>
        <div className={styles.whyContent}>
          <p>
            Charlie Kirk built TPUSA into the largest conservative youth organization in America. When he was taken from us on September 10, 2025, the organization was captured within days by interests he actively opposed.
          </p>
          <p>
            We The Citizens is the movement Charlie would have wanted. An organization where the board answers to the members, where financial transparency is non-negotiable, and where no corporate sponsor or foreign interest can buy influence over the mission.
          </p>
          <p>
            <strong>We are not replacing one man. We are replacing the broken model.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

function BoardSection() {
  return (
    <section className={styles.sectionAlt}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>Board Principles</Heading>
        <div className={styles.boardList}>
          <div className={styles.boardItem}>People who stood with Charlie, not people who stood to profit from his absence</div>
          <div className={styles.boardItem}>Term-limited positions with member recall authority</div>
          <div className={styles.boardItem}>No conflicts of interest with corporate sponsors or foreign entities</div>
          <div className={styles.boardItem}>Required to disclose all financial interests publicly</div>
          <div className={styles.boardItem}>Bound by the charter to serve member interests above all else</div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="We The Citizens internal team coordination and charter">
      <header className={styles.heroBanner}>
        <div className="container">
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>
            The movement belongs to the people who built it.
          </p>
          <p className={styles.heroTagline}>
            Carrying forward Charlie Kirk's vision with member-owned governance, radical transparency, and grassroots power.
          </p>
          <div className={styles.buttons}>
            <Link className="button button--secondary button--lg" to="/docs/intro">
              Team Docs
            </Link>
          </div>
        </div>
      </header>
      <main>
        <WhySection />
        <CharterSection />
        <GovernanceSection />
        <BoardSection />
      </main>
    </Layout>
  );
}
