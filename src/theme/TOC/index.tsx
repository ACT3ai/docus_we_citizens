/**
 * src/theme/TOC — permanently disabled, site-wide.
 *
 * The right bar ("On this page") is gone from this site. src/theme/DocItem/Layout
 * already stops rendering it on docs pages and src/theme/BlogLayout drops it on
 * blog pages; this stub is the template-level guarantee that no other page type,
 * plugin, or future theme component can put a table of contents back on the
 * right side of the screen.
 *
 * Anything that needs a list of a page's own headings should write it into the
 * page body as ordinary Markdown.
 */

import type {ReactNode} from 'react';

export default function TOC(): ReactNode {
  return null;
}
