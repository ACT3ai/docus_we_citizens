/**
 * src/theme/DocSidebarItem/Category — a category is a LINK, never a drawer.
 *
 * The left bar on this site is a flat list of destinations. Three rules, applied
 * here in the template so they hold on every page of the site at once:
 *
 *   1. NO CHEVRON. Nothing in the left bar expands. The stock component renders
 *      a `menu__caret` button and a <Collapsible> list of children; neither is
 *      rendered here.
 *   2. NO LEVEL 3s IN THE LEFT BAR. A Level 2 area's children are dropped, so
 *      the bar never nests and never indents. The pages inside an area are
 *      listed on that area's own overview page, which is where a reader who has
 *      arrived in the area is looking anyway.
 *   3. CLICKING A LEVEL 2 NAVIGATES TO ITS LEVEL 2 PAGE. Every area directory
 *      declares its front page in `_category_.json`:
 *          "link": { "type": "doc", "id": "overview" }
 *      That becomes `item.href`, and that is where the row goes.
 *
 * The children keep their sidebar membership — membership is decided from the
 * sidebar data at build time, not from what this component draws — so a Level 3
 * page still renders with the same left bar as everything else.
 *
 * Escape hatch: a directory that should not appear in the left bar at all sets
 *   "customProps": { "hideInSidebar": true }
 * in its `_category_.json`. site/docs/Bonhoeffers uses this — its roster is
 * reached from the "Dietrich Bonhoeffers" page, so a second row for the folder
 * of 24 person pages would be a duplicate.
 */

import React, {type ReactNode} from 'react';
import {findFirstSidebarItemLink} from '@docusaurus/plugin-content-docs/client';
import DocSidebarItemLink from '@theme/DocSidebarItem/Link';
import type {Props} from '@theme/DocSidebarItem/Category';

export default function DocSidebarItemCategory({
  item,
  ...props
}: Props): ReactNode {
  if ((item.customProps as {hideInSidebar?: boolean} | undefined)?.hideInSidebar) {
    return null;
  }

  // `_category_.json`'s `link` gives us the area's own page. A directory with no
  // declared link falls back to its first child so the row still goes somewhere.
  const href = item.href ?? findFirstSidebarItemLink(item);
  if (!href) {
    return null;
  }

  // Strip everything that only means something to a collapsible category.
  const {
    type,
    href: _href,
    items,
    collapsed,
    collapsible,
    linkUnlisted,
    customProps,
    description,
    ...rest
  } = item as typeof item & {description?: string};

  return (
    <DocSidebarItemLink
      item={{...rest, type: 'link', href}}
      {...props}
    />
  );
}
