// eslint-disable-next-line
import { withApollo } from '../lib/apollo';
import Layout from '../components/ui/layout';
import LoginForm from '../components/users/LoginForm';

const LoginPage = ({ messages }) => (
  <Layout>
    <section className="section">
      <h1 className="title">Login</h1>
      <LoginForm messages={messages} />
    </section>
  </Layout>
);

export default withApollo(LoginPage);
