/**
 * src/components/Button/index.tsx — the site's link button: bordered, a right
 * chevron inside, text you write yourself.
 *
 * WHY IT EXISTS
 * Pages used to carry next-step buttons through <NextSteps />, which kept the
 * button text and the sentence beside it inside a TypeScript array. Nobody
 * editing a page could see or change that copy from the .mdx file. This is the
 * same look as a plain inline component, so every word stays in the page.
 *
 * HOW TO USE IT IN AN .mdx FILE (no import line — registered globally in
 * src/theme/MDXComponents.tsx)
 *
 *   One button, with a line of text on its right:
 *     <Button to="/start_here/overview">Start here</Button> What this is, in sixty seconds
 *
 *   Several buttons in a row, left to right:
 *     <Button to="/about">About us</Button> <Button to="/start_here/overview">Start here</Button>
 *
 * Keep the button and its text on ONE line; MDX then treats the line as a
 * paragraph with the button inline. Put a blank line between rows.
 *
 * PROPS
 *   to        internal path (/about) or full URL. A URL starting with http
 *             opens in a new tab automatically.
 *   children  the text inside the button
 */
import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

function Chevron(): ReactNode {
  return (
    <svg className={styles.chev} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Button({to, children}: {to: string; children: ReactNode}): ReactNode {
  const external = /^https?:\/\//i.test(to);
  return (
    <Link
      className={styles.btn}
      to={to}
      {...(external ? {target: '_blank', rel: 'noopener'} : {})}>
      <span>{children}</span>
      <Chevron />
    </Link>
  );
}
