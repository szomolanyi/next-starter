// eslint-disable-next-line
import { withApollo } from '../../client/apollo';
import Layout from '../../client/components/ui/TwitterLayout';
import SignUp from '../../client/components/users/SignUp';
import SocialLoginButtons from '../../client/components/users/SocialLoginButtons';

const SignUpPage = () => (
  <Layout>
    <h1 className="title">Sign up with email</h1>
    <SignUp />
    <hr />
    <h1 className="title has-text-centered">or</h1>
    <SocialLoginButtons />
  </Layout>
);

export default withApollo(SignUpPage, { ssr: false });
