/**
 * src/components/FeatureGrid/index.tsx — the two-column table of contents used
 * by the Features Level 2 page (site/docs/features/overview.mdx).
 *
 * WHY IT EXISTS
 * The Features area is a catalogue: thirty-odd pages, each one capability of the
 * product. A flat bulleted list of thirty links is unreadable, and the left bar
 * deliberately never lists Level 3 pages (src/theme/DocSidebarItem/Category
 * draws a directory as ONE link), so the overview page is the ONLY place a
 * reader can see the whole catalogue at once. That makes the grid load-bearing
 * rather than decorative.
 *
 * TWO COLUMNS, NOT THREE
 * Each card carries a title plus a full sentence of what the feature is. Three
 * columns squeezes that sentence to four words a line on a laptop. Two columns
 * on desktop, one below 900px.
 *
 * HOW IT REACHES THE PAGES
 * Registered globally in src/theme/MDXComponents.tsx, so an .mdx file writes
 * <FeatureGrid> with no import line.
 *
 * USAGE
 *   <FeatureGrid>
 *     <FeatureCard title="The Monkey Award" to="./the_monkey_award.mdx"
 *                  goal="Name the votes that damaged democracy.">
 *       One sentence on what the feature is.
 *     </FeatureCard>
 *   </FeatureGrid>
 */
import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

export function FeatureCard({
  title,
  to,
  goal,
  children,
}: {
  /** The feature's display name — matches the H1 of the page it links to. */
  title: string;
  /** Route or relative .mdx path of the feature page. */
  to: string;
  /** The one-line political or business goal this feature serves. Optional. */
  goal?: ReactNode;
  /** One sentence: what the feature is. */
  children: ReactNode;
}): ReactNode {
  return (
    <Link className={styles.card} to={to}>
      <span className={styles.cardTitle}>{title}</span>
      <span className={styles.cardBody}>{children}</span>
      {goal ? (
        <span className={styles.cardGoal}>
          <span className={styles.goalLabel}>Goal</span>
          {goal}
        </span>
      ) : null}
    </Link>
  );
}

export default function FeatureGrid({children}: {children: ReactNode}): ReactNode {
  return <div className={styles.grid}>{children}</div>;
}
