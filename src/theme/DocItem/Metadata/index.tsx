/**
 * src/theme/DocItem/Metadata — the <head> metadata of every docs page.
 *
 * Wraps the stock component's job (title, description, keywords, image) with
 * four SEO rules. None of them changes a word on the page: the H1, the sidebar
 * label and the frontmatter title stay exactly as written.
 *
 *   1. PARTY DOORS GET THEIR OWN TITLE AND DESCRIPTION. Pages under /r/ /d/ /l/
 *      /s/ were forked from one template, so the same page on two doors carried
 *      the same <title> and description. The door's audience
 *      ("Democrats", from internal/nav.ts PARTIES via customFields.partyAudiences)
 *      is added to both, so each door's copy is distinct. Nothing is taken from
 *      another door.
 *   2. A SEARCH TITLE MAY BE SET. Frontmatter `seo_title` replaces the title in
 *      <title> / og:title only (for titles that are too long or too short for a
 *      results page); the H1 still reads `title`.
 *   3. SEARCH TITLES STAY WITHIN 60 CHARACTERS WHERE THEY CAN. When the brand
 *      suffix would push the full title past 60, it is shortened or dropped.
 *   4. /internal/ (the Internal Research pages) is noindex. They stay public and
 *      in the left bar; they are also out of the sitemap (docusaurus.config.ts).
 */

import React, {type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {PageMetadata} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

const MAX_TITLE = 60;
const MAX_DESCRIPTION = 160;

function partyFor(
  permalink: string,
  audiences: Record<string, string>,
): string | undefined {
  const prefix = Object.keys(audiences).find((p) => permalink.startsWith(p));
  return prefix ? audiences[prefix] : undefined;
}

/** The first candidate that fits in MAX_TITLE, else the last (shortest). */
function fit(candidates: string[]): string {
  return candidates.find((t) => t.length <= MAX_TITLE) ?? candidates[candidates.length - 1];
}

export default function DocItemMetadata(): ReactNode {
  const {metadata, frontMatter, assets} = useDoc();
  const {siteConfig} = useDocusaurusContext();
  const audiences = (siteConfig.customFields?.partyAudiences ?? {}) as Record<string, string>;
  const brand = siteConfig.title;

  const permalink = metadata.permalink;
  const party = partyFor(permalink, audiences);
  const seoTitle = (frontMatter as {seo_title?: string}).seo_title;
  const base = (seoTitle ?? metadata.title).trim();

  const fullTitle = party
    ? fit([`${base} | ${brand} for ${party}`, `${base} | For ${party}`])
    : base === brand
      ? brand
      : fit([`${base} | ${brand}`, base]);

  let description = metadata.description;
  if (party && description) {
    const end = /[.!?]$/.test(description.trim()) ? '' : '.';
    const lead = `${description.trim()}${end}`;
    // The long form when it keeps the description within 160 characters.
    const long = `${lead} ${brand} for ${party}.`;
    description = long.length <= MAX_DESCRIPTION ? long : `${lead} For ${party}.`;
  }

  const noindex = permalink.startsWith('/internal/');

  return (
    <>
      <PageMetadata
        description={description}
        keywords={frontMatter.keywords}
        image={assets.image ?? frontMatter.image}
      />
      <Head>
        <title>{fullTitle}</title>
        <meta property="og:title" content={fullTitle} />
        <meta name="twitter:title" content={fullTitle} />
        {description && <meta name="twitter:description" content={description} />}
        {noindex && <meta name="robots" content="noindex, follow" />}
      </Head>
    </>
  );
}
