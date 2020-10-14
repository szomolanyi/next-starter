import Link from 'next/link';
// eslint-disable-next-line
import { withApollo } from '../client/apollo';
import Layout from '../client/components/ui/layout';

const LoginFailed = () => (
  <Layout>
    <div className="section">
      <div className="container">
        <h1 className="title">Social login failed</h1>
        <div>Social authentication failed. We are informed and investigating error.</div>
        <div>
          You can try to
          {' '}
          <Link href="/login"><a>log in</a></Link>
          {' '}
          again.
        </div>
      </div>
    </div>
  </Layout>
);

export default withApollo(LoginFailed, { ssr: false });
