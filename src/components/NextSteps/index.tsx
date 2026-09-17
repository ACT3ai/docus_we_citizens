/**
 * src/components/NextSteps/index.tsx — a stacked list of next-step buttons that
 * sits at the END of a page, not under its H1.
 *
 * WHY IT EXISTS
 * <CTA /> is the boxed action row under the H1 of every Level 2 page. Some
 * pages read better with the reader's next steps after the argument instead of
 * before it. This is that variant: no outer box, one button per row, a right
 * chevron inside each button, and a short line of text after it.
 *
 * Registered globally in src/theme/MDXComponents.tsx, so an .mdx file writes
 * `<NextSteps />` with no import line.
 */
import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

type Step = {
  label: string;
  to: string;
  text: string;
  external?: boolean;
};

const STEPS: Step[] = [
  {label: 'Start here', to: '/start_here/overview', text: 'What this is, in sixty seconds'},
  {
    label: 'The plan',
    to: 'https://app.WeTheCitizens.io/plan',
    text: 'The plan, in the We The Citizens app',
    external: true,
  },
  {label: 'About us', to: '/about', text: 'Who we are, and why we built this'},
];

function Chevron(): ReactNode {
  return (
    <svg className={styles.chev} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function NextSteps(): ReactNode {
  return (
    <nav className={styles.steps} aria-label="Next steps">
      {STEPS.map((s) => (
        <div key={s.to} className={styles.step}>
          <Link
            className={styles.btn}
            to={s.to}
            {...(s.external ? {target: '_blank', rel: 'noopener'} : {})}>
            <span>{s.label}</span>
            <Chevron />
          </Link>
          <span className={styles.text}>{s.text}</span>
        </div>
      ))}
    </nav>
  );
}
