import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'We The Citizens (Priv)',
  tagline: 'Internal strategy, governance, and coordination',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'http://localhost:3848',
  baseUrl: '/',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Private site — discourage indexing at every layer.
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'robots',
        content: 'noindex,nofollow,noarchive,nosnippet',
      },
    },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        // Disable the default sitemap plugin — this is a private site.
        sitemap: false,
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    metadata: [
      {name: 'robots', content: 'noindex,nofollow,noarchive,nosnippet'},
      {name: 'googlebot', content: 'noindex,nofollow,noarchive,nosnippet'},
      {name: 'description', content: 'We The Citizens — private internal team documentation. Not for public distribution.'},
    ],
    navbar: {
      title: 'We The Citizens (Priv)',
      logo: {
        alt: 'We The Citizens logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: 'Team Docs',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `CONFIDENTIAL — Internal use only. © ${new Date().getFullYear()} We The Citizens.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
