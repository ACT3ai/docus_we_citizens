/**
 * src/components/CTA/index.tsx — the call-to-action row that rides above the
 * fold on every Level 2 area page.
 *
 * WHY IT EXISTS
 * The site's root page (site/pages/index.tsx) opens with four actions — the
 * plan, about us, the video, and the app itself. A reader who lands on a Level
 * 2 area from a search result or a shared link never sees that row, so every
 * Level 2 page carries its own copy directly under the H1. Same destinations,
 * same order of importance: sign up first, then the pages that explain what you
 * just signed up for.
 *
 * HOW IT REACHES THE PAGES
 * Registered globally in src/theme/MDXComponents.tsx, so an .mdx file writes
 * `<CTA />` with no import line. One edit here changes the row on every page.
 *
 * PROPS
 *   note   optional one-line sentence rendered under the buttons, used to say
 *          what this particular area asks the reader to do next.
 */
import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

/** The paired We The Citizens web app. Every join / sign-up action lands here. */
const WEBAPP_URL = 'https://app.WeTheCitizens.io/';
const WEBAPP_PLAN_URL = 'https://app.WeTheCitizens.io/plan';

type Action = {
  label: string;
  to: string;
  primary?: boolean;
  external?: boolean;
};

const ACTIONS: Action[] = [
  {label: 'Join — create your account', to: WEBAPP_URL, primary: true, external: true},
  {label: 'Start here', to: '/start_here/overview'},
  {label: 'The plan', to: WEBAPP_PLAN_URL, external: true},
  {label: 'About us', to: '/about'},
];

export default function CTA({note}: {note?: ReactNode}): ReactNode {
  return (
    <aside className={styles.cta} aria-label="Join We The Citizens">
      <div className={styles.row}>
        {ACTIONS.map((a) => (
          <Link
            key={a.to}
            className={a.primary ? `${styles.btn} ${styles.btnPrimary}` : styles.btn}
            to={a.to}
            {...(a.external ? {target: '_blank', rel: 'noopener'} : {})}>
            {a.label}
            {a.primary ? <span className={styles.arw}>&rarr;</span> : null}
          </Link>
        ))}
      </div>
      <p className={styles.note}>
        {note ?? (
          <>
            Reading is free and needs no account. Creating one is what lets you record where
            you stand, log what you did, and vote inside your own community.
          </>
        )}
      </p>
    </aside>
  );
}
