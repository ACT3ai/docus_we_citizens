/**
 * src/theme/MDXComponents.tsx — components every .mdx page can use without an
 * import line.
 *
 * Docusaurus passes this map to MDXProvider, so anything registered here is in
 * scope for every doc, every blog post and every party-door page. That is what
 * lets a Level 2 overview open with a bare `<CTA />` instead of repeating an
 * import in ninety files — and it means the call-to-action row is edited in one
 * place, not ninety.
 *
 * CTA           the join / start-here action row under a Level 2 H1
 * FeatureGrid   the two-column catalogue grid on site/docs/features/overview.mdx
 * FeatureCard   one cell of that grid
 * Figure        the frame around a feature's inline-SVG diagram
 * NextSteps     stacked next-step buttons at the end of a page (no outer box)
 */
import MDXComponents from '@theme-original/MDXComponents';

import CTA from '@site/src/components/CTA';
import Figure from '@site/src/components/Figure';
import NextSteps from '@site/src/components/NextSteps';
import FeatureGrid, {FeatureCard} from '@site/src/components/FeatureGrid';

export default {
  ...MDXComponents,
  CTA,
  Figure,
  NextSteps,
  FeatureGrid,
  FeatureCard,
};
