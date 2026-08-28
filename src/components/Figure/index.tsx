/**
 * src/components/Figure/index.tsx — the frame every feature diagram sits in.
 *
 * WHY IT EXISTS
 * Each page under site/docs/features/ carries one picture of the feature it
 * describes. Those pictures are hand-authored inline SVG rather than image
 * files, for three reasons that all matter on this site:
 *
 *   1. THEME. The site ships light and dark, and the --ua-* ink/rule tokens are
 *      defined only on :root — a raster asset baked for the paper background
 *      goes muddy on #14110b. An inline SVG drawn in `currentColor` inherits the
 *      correct colour in both themes for free.
 *   2. SOURCING. A diagram of "which evidence feeds which award" is a factual
 *      claim about the product. Keeping it as markup next to the prose means it
 *      is reviewed and corrected in the same edit as the sentence it illustrates,
 *      instead of drifting inside a .png nobody can diff.
 *   3. WEIGHT. Thirty-odd diagrams as images is megabytes of static assets on a
 *      GitHub Pages build; as markup it is kilobytes.
 *
 * WHAT IT DOES
 * Frames the drawing, constrains it to the content column, and renders the
 * caption as a real <figcaption>. Sets `color` on the wrapper so the child SVG's
 * `currentColor` strokes resolve to body ink, and exposes two CSS custom
 * properties the SVGs use for their accent and their fills:
 *
 *   --wc-fig-accent   the primary red / dark-mode rose
 *   --wc-fig-wash     a faint tint for filled shapes, correct in both themes
 *
 * ACCESSIBILITY
 * The caption is the accessible description, so the SVG itself is marked
 * aria-hidden by the wrapper's `role="img"` + `aria-label`. Pass `alt` when the
 * caption alone does not describe the drawing.
 *
 * USAGE (registered globally in src/theme/MDXComponents.tsx — no import line)
 *   <Figure caption="The wall between the two kinds of evidence.">
 *     <svg viewBox="0 0 720 260" ...>…</svg>
 *   </Figure>
 */
import type {ReactNode} from 'react';

import styles from './styles.module.css';

export default function Figure({
  caption,
  alt,
  children,
}: {
  /** Rendered under the drawing as a <figcaption>. */
  caption: ReactNode;
  /** Accessible label. Defaults to the caption when it is a plain string. */
  alt?: string;
  /** The inline <svg>. */
  children: ReactNode;
}): ReactNode {
  const label = alt ?? (typeof caption === 'string' ? caption : undefined);
  return (
    <figure className={styles.figure}>
      <div className={styles.canvas} role="img" aria-label={label}>
        {children}
      </div>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
