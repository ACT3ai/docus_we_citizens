/**
 * src/plugins/docs-redirects.js — @docusaurus/plugin-client-redirects, plus a
 * clean-up of the pages it writes.
 *
 * The client-redirects plugin writes a meta-refresh page at /docs/<path>/ for
 * every doc page (docs moved to the site root on 2026-09-17; GitHub Pages
 * cannot send a 301). Its stock page has a RELATIVE canonical, no robots tag
 * and no <html lang>, so a search engine can count it as a duplicate.
 *
 * This plugin runs the client-redirects plugin itself (same options), waits for
 * it to write its files, and then, ONLY in files that carry
 * http-equiv="refresh", makes the canonical absolute, adds lang="en" and adds
 * <meta name="robots" content="noindex, follow">. It wraps the plugin instead of
 * sitting beside it because Docusaurus runs every plugin's postBuild at once:
 * a separate plugin could read a redirect page before it was written.
 * fs only, no new dependency.
 */
const fs = require('fs');
const path = require('path');
const clientRedirects = require('@docusaurus/plugin-client-redirects').default;

const DEFAULT_OPTIONS = {fromExtensions: [], toExtensions: [], redirects: []};

function walk(dir, out) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name === 'index.html') out.push(full);
  }
  return out;
}

function cleanRedirectPages(outDir, siteUrl) {
  let changed = 0;
  for (const file of walk(path.join(outDir, 'docs'), [])) {
    const html = fs.readFileSync(file, 'utf8');
    if (!html.includes('http-equiv="refresh"')) continue;
    const next = html
      .replace(/<html>/, '<html lang="en">')
      .replace(
        /<link rel="canonical" href="(\/[^"]*)" \/>/,
        (_m, target) =>
          `<link rel="canonical" href="${siteUrl}${target}" />\n    <meta name="robots" content="noindex, follow">`,
      );
    if (next !== html) {
      fs.writeFileSync(file, next);
      changed += 1;
    }
  }
  return changed;
}

module.exports = function docsRedirects(context, options) {
  const {id, ...userOptions} = options || {};
  const inner = clientRedirects(context, {...DEFAULT_OPTIONS, ...userOptions});
  if (!inner) return null;
  const siteUrl = context.siteConfig.url.replace(/\/$/, '');
  return {
    ...inner,
    name: 'docs-redirects',
    async postBuild(props) {
      await inner.postBuild(props);
      const changed = cleanRedirectPages(props.outDir, siteUrl);
      console.log(`[docs-redirects] ${changed} /docs/ redirect pages: absolute canonical + noindex`);
    },
  };
};
