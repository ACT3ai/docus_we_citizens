import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

// Custom 404 page.
//
// Why this exists:
// * The default Docusaurus 404 is bare. A friendlier page reduces bounce
//   rate, which is a soft Google Search ranking signal.
// * The <meta name="robots" content="noindex"> tag tells Google not to
//   index the 404 itself (Docusaurus does not add this automatically).
// * The links route users back to the canonical entry points so crawl
//   equity flows back to indexable pages.
export default function NotFound(): ReactNode {
  return (
    <Layout
      title="Page Not Found"
      description="The page you are looking for does not exist on wethecitizens.io. Return to the We The Citizens charter, board, or blog.">
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <main className="container margin-vert--xl">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <Heading as="h1">Page Not Found</Heading>
            <p>
              We could not find the page you were looking for. The link may be
              outdated, or the page may have been moved.
            </p>
            <p>Try one of these instead:</p>
            <ul>
              <li>
                <Link to="/">Home — We The Citizens</Link>
              </li>
              <li>
                <Link to="/docs/intro">Charter</Link>
              </li>
              <li>
                <Link to="/docs/board">Founding Board</Link>
              </li>
              <li>
                <Link to="/docs/dietrich-bonhoeffers">
                  Dietrich Bonhoeffers
                </Link>
              </li>
              <li>
                <Link to="/docs/bonhoeffer-criteria">Bonhoeffer Criteria</Link>
              </li>
              <li>
                <Link to="/docs/politician-challengers">
                  Politician Challengers
                </Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
}
