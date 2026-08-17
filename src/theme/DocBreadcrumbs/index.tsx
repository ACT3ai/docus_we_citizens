/**
 * src/theme/DocBreadcrumbs — permanently disabled, site-wide.
 *
 * We The Citizens has no breadcrumb bar. The left bar is a flat list of Level 2
 * areas and every page states where it sits in its own copy, so a
 * "Docs / Area / Page" trail above the title is noise.
 *
 * This stub is the belt to src/theme/DocItem/Layout's braces: the docs template
 * no longer calls <DocBreadcrumbs />, and @theme/DocCategoryGeneratedIndexPage
 * (which we do not eject) calls it too. Returning null here covers both, and
 * any future theme component that renders breadcrumbs.
 */

import type {ReactNode} from 'react';

export default function DocBreadcrumbs(): ReactNode {
  return null;
}
