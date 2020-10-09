// eslint-disable-next-line
import { withApollo } from '../client/apollo';
import Layout from '../client/components/ui/layout';
import { useUser } from '../client/hooks';

const LoginPage = () => (
  <Layout>
    <div className="hero is-medium is-light bg-image">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-1">Welcome.</h1>
        </div>
      </div>
    </div>
  </Layout>
);

export default withApollo(LoginPage, { ssr: false });
