// eslint-disable-next-line
import { withApollo } from '../client/apollo';
import Layout from '../client/components/ui/layout';
import LoginForm from '../client/components/users/LoginForm';
import SocialLoginButtons from '../client/components/users/SocialLoginButtons';

const LoginPage = ({ messages }) => (
  <Layout>
    <div className="columns">
      <div className="column">
        <section className="section">
          <h1 className="title">Email and password</h1>
          <LoginForm messages={messages} />
        </section>
      </div>
      <div className="column">
        <section className="section">
          <h1 className="title">Social login</h1>
          <SocialLoginButtons />
        </section>
      </div>
    </div>
  </Layout>
);

export default withApollo(LoginPage, { ssr: false });
