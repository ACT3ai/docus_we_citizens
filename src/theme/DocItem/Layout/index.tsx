/**
 * src/theme/DocItem/Layout — the shell every docs page is rendered inside.
 *
 * Ejected from @docusaurus/theme-classic and cut down on purpose. Two things
 * the stock layout renders are gone from this site, everywhere, permanently:
 *
 *   1. THE RIGHT BAR (the "On this page" table of contents). The stock layout
 *      renders <DocItemTOCDesktop /> in a `col col--3` beside the article and
 *      squeezes the article to 75%. Neither exists here, so the article gets
 *      the full width of the content area on every page.
 *   2. THE BREADCRUMB BAR. The stock layout opens the <article> with
 *      <DocBreadcrumbs />. It is not rendered here, and @theme/DocBreadcrumbs
 *      is also stubbed out to null so the breadcrumbs cannot come back through
 *      the category-generated-index pages either.
 *
 * The mobile TOC (<DocItemTOCMobile />) is gone with the desktop one — the
 * "right bar" is one feature, and a collapsed copy of it above the article on a
 * phone is the same feature.
 *
 * Because this is the docs template, no page and no frontmatter can opt back
 * in. `hide_table_of_contents` in frontmatter is now a no-op.
 */

import React, {type ReactNode} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemContent from '@theme/DocItem/Content';
import ContentVisibility from '@theme/ContentVisibility';
import type {Props} from '@theme/DocItem/Layout';

import styles from './styles.module.css';

export default function DocItemLayout({children}: Props): ReactNode {
  const {metadata} = useDoc();
  return (
    <div className="row">
      {/* Plain `col` — no sibling TOC column, so the article is full width. */}
      <div className="col">
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocVersionBadge />
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
    </div>
  );
}
