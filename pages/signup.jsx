// eslint-disable-next-line
import { withApollo } from '../client/apollo';
import Layout from '../client/components/ui/layout';
import SignUp from '../client/components/users/SignUp';
import SocialLoginButtons from '../client/components/users/SocialLoginButtons';

const SignUpPage = () => (
  <Layout>
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <h1 className="title">Sign up</h1>
            <SignUp />
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

export default withApollo(SignUpPage, { ssr: false });
