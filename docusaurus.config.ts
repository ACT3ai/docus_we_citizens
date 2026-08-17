import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Single source of truth for the Level 2 areas and everything built from them.
// internal/nav.ts reads level_2.csv at build time and generates the party
// front-door navbar items, the "More" mega-menu, the footer columns, and the
// clickable footer column titles. The navbar and footer defined below are
// rendered by @theme/Layout, which wraps every docs page, blog post and React
// page under site/pages/, so editing internal/nav.ts changes the top bar and
// the footer on every page of the site at once.
import {
  clientNavData,
  docsSidebarItemsGenerator,
  footerColumns,
  moreNavbarItem,
  partyNavbarItems,
} from './internal/nav';

const SITE_URL = 'https://wethecitizens.io';
// The paired We The Citizens web app — every Join / Create account CTA lands here.
const WEBAPP_URL = 'https://app.WeTheCitizens.io/';
const SITE_NAME = 'We The Citizens';
const SITE_TAGLINE = 'Ethics First. Citizens First. Truth First.';
const SITE_DESCRIPTION =
  'We The Citizens is a citizen-first, ethics-first political movement. ' +
  'A lightweight organization promoting good ethics, radical transparency, ' +
  'and the power of citizens to take back their government.';
const SITE_KEYWORDS =
  'We The Citizens, Charlie Kirk, 1000 Bonhoeffers, Dietrich Bonhoeffer, ' +
  'citizen movement, political ethics, radical transparency, conservative, ' +
  'TPUSA alternative, grassroots advocacy, anti-corruption, free speech, ' +
  'deep state, voter integrity, US politics, citizen first, Christian values';
const SOCIAL_CARD = 'img/cover.jpeg';
const SOCIAL_CARD_ABS = `${SITE_URL}/${SOCIAL_CARD}`;

// Structured data (schema.org) — helps Google Knowledge Graph and rich results.
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: 'We The Citizens',
  url: SITE_URL + '/',
  logo: `${SITE_URL}/img/logo.svg`,
  image: SOCIAL_CARD_ABS,
  description: SITE_DESCRIPTION,
  slogan: SITE_TAGLINE,
  sameAs: [],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL + '/',
  description: SITE_DESCRIPTION,
  inLanguage: 'en-US',
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const config: Config = {
  title: SITE_NAME,
  tagline: SITE_TAGLINE,
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: SITE_URL,
  baseUrl: '/',

  // GitHub Pages serves both /path and /path/ — pick one canonical form so
  // Google does not see duplicate URLs. `true` means all routes end with `/`,
  // which matches GitHub Pages' directory-style serving.
  trailingSlash: true,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  staticDirectories: ['site/static'],

  // Node-side nav data the browser needs (the footer's clickable column titles).
  // Read with useDocusaurusContext().siteConfig.customFields.
  customFields: {
    ...clientNavData(),
  },

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Note: do NOT add a manual rel="canonical" here — Docusaurus auto-emits one
  // per page via React Helmet, and a duplicate confuses Google's canonical picker.
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1',
      },
    },
    // Helps Google understand author/publisher for non-blog pages too.
    {
      tagName: 'meta',
      attributes: {
        name: 'author',
        content: SITE_NAME,
      },
    },
    // Verify ownership in Google Search Console later by replacing content="".
    // Leaving the tag stub commented out — uncomment and fill once site is verified.
    // {
    //   tagName: 'meta',
    //   attributes: {name: 'google-site-verification', content: ''},
    // },
    // Theme color hints for mobile browser chrome — minor mobile-SEO signal.
    {
      tagName: 'meta',
      attributes: {
        name: 'theme-color',
        content: '#1a1a2e',
      },
    },
    // ---- Favicon: the black box with the white W ----------------------------
    // `favicon` above already emits one <link rel="icon">, pointing at the
    // multi-resolution .ico (16/32/48/64). These add the PNG sizes modern
    // browsers prefer for tabs, the bookmarks bar, and a saved home-screen
    // shortcut. site/static/favicon.ico is a copy at the site root, because
    // bookmark and favorites managers request /favicon.ico directly, ignoring
    // whatever the <head> says.
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/img/favicon-32.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/img/favicon-16.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/img/favicon-192.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/img/apple-touch-icon.png',
      },
    },
    // Preconnect to fonts/CDN origin if Docusaurus loads them — improves LCP.
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    // JSON-LD Organization schema — Google Knowledge Panel signal.
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify(orgJsonLd),
    },
    // JSON-LD WebSite schema — enables sitelinks searchbox.
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify(websiteJsonLd),
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'site/docs',
          sidebarPath: './internal/sidebars.ts',
          // Lifts the two party areas out of the root autogenerated slice so
          // each of them can own its own left bar — see internal/sidebars.ts.
          sidebarItemsGenerator: docsSidebarItemsGenerator,
          // Enables "Last updated" metadata, which the sitemap plugin uses
          // for <lastmod> entries.
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
        },
        blog: {
          path: 'site/blog',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
            title: `${SITE_NAME} Blog`,
            description: SITE_DESCRIPTION,
            copyright: `Copyright © ${new Date().getFullYear()} ${SITE_NAME}.`,
            language: 'en-US',
          },
          blogTitle: `${SITE_NAME} Blog`,
          blogDescription:
            'News, announcements, and analysis from We The Citizens — ' +
            'a citizen-first, ethics-first political movement.',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        pages: {
          path: 'site/pages',
        },
        theme: {
          customCss: './internal/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.7,
          // Emits <lastmod> per route from frontmatter / git / file mtime.
          // Strongly preferred by Google for crawl scheduling.
          lastmod: 'date',
          filename: 'sitemap.xml',
          // Include every UI-visible page in the sitemap; only skip the
          // 404 page (which must never be indexed) and tag/archive
          // permutations that create thin/duplicate content.
          ignorePatterns: ['/404', '/404.html', '/tags/**', '/blog/tags/**', '/blog/archive/**', '/blog/authors/**'],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: SOCIAL_CARD,
    // Site-wide default <meta> tags. Overridden per page by frontmatter.
    metadata: [
      {name: 'description', content: SITE_DESCRIPTION},
      {name: 'keywords', content: SITE_KEYWORDS},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: SITE_NAME},
      {name: 'twitter:description', content: SITE_DESCRIPTION},
      {name: 'twitter:image', content: SOCIAL_CARD_ABS},
      {name: 'twitter:image:alt', content: `${SITE_NAME} — ${SITE_TAGLINE}`},
      {property: 'og:title', content: SITE_NAME},
      {property: 'og:description', content: SITE_DESCRIPTION},
      {property: 'og:type', content: 'website'},
      {property: 'og:url', content: SITE_URL + '/'},
      {property: 'og:site_name', content: SITE_NAME},
      {property: 'og:image', content: SOCIAL_CARD_ABS},
      {property: 'og:image:alt', content: `${SITE_NAME} — ${SITE_TAGLINE}`},
      {property: 'og:image:width', content: '586'},
      {property: 'og:image:height', content: '305'},
      {property: 'og:locale', content: 'en_US'},
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: SITE_NAME,
      logo: {
        alt: `${SITE_NAME} Logo`,
        src: 'img/logo.svg',
      },
      items: [
        // The two site links. `wcNavFoldable` lets CSS fold them into the
        // "More" menu below 1610px, where the whole row no longer fits — the
        // matching `wcMoreFolded` duplicates live in internal/nav.ts. The fold
        // point moved up from 1380px when the bar went from two party front
        // doors to four; see "Fitting the bar" in internal/css/custom.css.
        // Charter sits left of About Us. Board lives in the footer and on the
        // party front doors, not in the top bar.
        {
          to: '/docs/intro',
          label: 'Charter',
          position: 'left',
          className: 'wcNavFoldable',
        },
        {
          to: '/docs/about',
          label: 'About Us',
          position: 'left',
          className: 'wcNavFoldable',
        },
        // The four party front doors — plain "Republicans" / "Democrats" /
        // "Libertarians" / "Socialists" buttons that open WeCitizensR.com,
        // WeCitizensD.com, WeCitizensL.com and WeCitizensSocialism.com in a new
        // tab. Two pairs, not four skins: R↔D on the partisan axis, L↔S on the
        // economic one (pm/r_vs_d.mdx §1.3a).
        ...partyNavbarItems(),
        // "More ⌄" — every Level 2 area, each going to its overview.mdx, plus
        // the movement pages (Programs, Governance, the Bonhoeffer pages).
        moreNavbarItem(),
        // NO BLOG LINK IN THE TOP BAR. Permanent. The blog still builds and its
        // posts still resolve, and it is linked from the footer, but it is not a
        // top-bar destination on this site. Do not add it back.
        {
          href: WEBAPP_URL,
          label: 'Enter App →',
          position: 'right',
          className: 'navbar__cta',
        },
      ],
    },
    footer: {
      style: 'dark',
      // Built from internal/nav.ts, the same data the navbar uses, so the two
      // can never drift. Rendered by @theme/Layout on every page of the site.
      links: footerColumns(),
      copyright: `Copyright © ${new Date().getFullYear()} ${SITE_NAME}.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
