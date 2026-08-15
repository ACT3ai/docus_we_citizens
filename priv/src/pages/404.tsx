import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function NotFound(): ReactNode {
  return (
    <Layout
      title="Page Not Found"
      description="The page you requested does not exist on the We The Citizens internal site.">
      <main className="container margin-vert--xl">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <Heading as="h1">Page Not Found</Heading>
            <p>
              The page you requested does not exist on this internal team site.
              It may have been moved, renamed, or never existed.
            </p>
            <p>
              Try the <Link to="/">home page</Link> or the{' '}
              <Link to="/docs/intro">team docs index</Link>.
            </p>
            <p>
              If you reached this page from an internal link, please report the
              broken link so it can be fixed.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
