import Link from 'next/link';
// eslint-disable-next-line
import { withApollo } from '../../client/apollo';
import Layout from '../../client/components/ui/TwitterLayout';

const LoginFailed = () => (
  <Layout>
    <h1 className="title">Social login failed</h1>
    <div>Social authentication failed. We are informed and investigating error.</div>
    <div>
      You can try to
      {' '}
      <Link href="/twitter/login"><a>log in</a></Link>
      {' '}
      again.
    </div>
  </Layout>
);

export default withApollo(LoginFailed, { ssr: false });
