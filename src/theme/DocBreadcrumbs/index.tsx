/**
 * src/theme/DocBreadcrumbs — no visible breadcrumb bar, site-wide; the
 * BreadcrumbList structured data stays.
 *
 * We The Citizens has no breadcrumb bar. The left bar is a flat list of Level 2
 * areas and every page states where it sits in its own copy, so a
 * "Docs / Area / Page" trail above the title is noise.
 *
 * The stock component renders two things: the visible <nav> bar and the
 * BreadcrumbList JSON-LD in <head> that search engines read. This override keeps
 * the JSON-LD ON PURPOSE (it is invisible; it lets Google show the page's place
 * in the site in results) and renders no visible markup at all.
 * src/theme/DocItem/Layout calls it for that reason, and
 * @theme/DocCategoryGeneratedIndexPage (which we do not eject) calls it too.
 */

import type {ReactNode} from 'react';
import {useSidebarBreadcrumbs} from '@docusaurus/plugin-content-docs/client';
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData';

export default function DocBreadcrumbs(): ReactNode {
  const breadcrumbs = useSidebarBreadcrumbs();
  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }
  return <DocBreadcrumbsStructuredData breadcrumbs={breadcrumbs} />;
}
