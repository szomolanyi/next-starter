// eslint-disable-next-line
import { withApollo } from '../client/apollo';
import Layout from '../client/components/ui/layout';
import LoginForm from '../client/components/users/LoginForm';
import SocialLoginButtons from '../client/components/users/SocialLoginButtons';

const LoginPage = () => (
  <Layout>
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <h1 className="title">Email and password</h1>
            <LoginForm redirectTo="/" />
          </div>
          <div className="column">
            <h1 className="title">Social login</h1>
            <SocialLoginButtons />
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default withApollo(LoginPage, { ssr: false });
