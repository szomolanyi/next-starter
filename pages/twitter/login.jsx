// eslint-disable-next-line
import { withApollo } from '../../client/apollo';
import Layout from '../../client/components/ui/TwitterLayout';
import LoginForm from '../../client/components/users/LoginForm';
import SocialLoginButtons from '../../client/components/users/SocialLoginButtons';

const LoginPage = ({ messages }) => (
  <Layout>
    <h1 className="title">Email login</h1>
    <LoginForm messages={messages} />
    <hr />
    <h1 className="title has-text-centered">or</h1>
    <SocialLoginButtons />
  </Layout>
);

export default withApollo(LoginPage, { ssr: false });
