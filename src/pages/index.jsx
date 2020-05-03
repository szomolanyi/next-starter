import Link from 'next/link';
// eslint-disable-next-line
import { withApollo } from '../apollo';
import Layout from '../components/ui/layout';

const Index = () => (
  <Layout>
    <Link href="/login">
      <a href="/login">Login</a>
    </Link>
    <p>Hello Next.js</p>
    <button type="button" className="button">Aha</button>
  </Layout>
);

export default withApollo(Index, { ssr: false });
