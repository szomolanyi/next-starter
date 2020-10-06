// eslint-disable-next-line
import { withApollo } from '../client/apollo';
import Layout from '../client/components/ui/layout';

const LoginPage = () => (
  <Layout>
    <div className="section">
      <div className="container has-text-centered">
        <h1 className="title is-1">Welcome.</h1>
      </div>
    </div>
  </Layout>
);

export default withApollo(LoginPage, { ssr: false });
