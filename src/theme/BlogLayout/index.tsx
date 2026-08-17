/**
 * src/theme/BlogLayout — the same "no right bar" rule, applied to blog pages.
 *
 * @theme/BlogPostPage builds a <TOC /> and hands it to BlogLayout, which renders
 * it in a `col col--2` on the right. This wrapper drops that prop before the
 * stock layout sees it, so the column is never emitted and the post keeps the
 * width the column would have taken.
 *
 * (The blog itself is no longer linked from the top bar — see the navbar in
 * docusaurus.config.ts — but its pages still exist and still have to obey the
 * site template.)
 */

import React, {type ReactNode} from 'react';
import BlogLayout from '@theme-original/BlogLayout';
import type BlogLayoutType from '@theme/BlogLayout';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof BlogLayoutType>;

export default function BlogLayoutWrapper({toc, ...props}: Props): ReactNode {
  return <BlogLayout {...props} />;
}
