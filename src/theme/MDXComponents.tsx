/**
 * src/theme/MDXComponents.tsx — components every .mdx page can use without an
 * import line.
 *
 * Docusaurus passes this map to MDXProvider, so anything registered here is in
 * scope for every doc, every blog post and every party-door page. That is what
 * lets a Level 2 overview open with a bare `<CTA />` instead of repeating an
 * import in ninety files — and it means the call-to-action row is edited in one
 * place, not ninety.
 */
import MDXComponents from '@theme-original/MDXComponents';

import CTA from '@site/src/components/CTA';

export default {
  ...MDXComponents,
  CTA,
};
