import type {MouseEvent, ReactNode} from 'react';
import Layout from '@theme/Layout';
import {useHistory} from '@docusaurus/router';

// The home page is plain HTML: site/pages/home.html is the page, and this file
// only wraps it in the site Layout so it keeps the shared navbar and footer.
// Edit the copy in home.html and the styles in home.css. The .html import is
// read as a string by the webpack rule in docusaurus.config.ts (html-source).
// The React version this replaced is kept at site/pages/home2/ (/home2/).
import homeHtml from './home.html';
import './home.css';

export default function Home(): ReactNode {
  const history = useHistory();

  // Plain <a href="/..."> links would reload the whole site. Route same-site
  // links through the client router instead, the way @docusaurus/Link does.
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const a = (e.target as HTMLElement).closest('a');
    if (!a || e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target) return;
    const href = a.getAttribute('href') ?? '';
    if (!href.startsWith('/') || href.startsWith('//')) return;
    e.preventDefault();
    history.push(href);
  };

  return (
    <Layout
      title="Ethics First. Citizens First. Truth First."
      description="We The Citizens is a non-partisan, citizen-powered platform: twenty-one numbered commitments, computed from the public record, with the arithmetic published beside every claim.">
      <div
        className="wch-page"
        onClick={onClick}
        dangerouslySetInnerHTML={{__html: homeHtml}}
      />
    </Layout>
  );
}
