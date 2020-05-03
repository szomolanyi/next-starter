// eslint-disable-next-line
import { withApollo } from '../apollo';
import Layout from '../components/ui/layout';
import SignUp from '../components/users/SignUp';
import SocialLoginButtons from '../components/users/SocialLoginButtons';

const SignUpPage = () => (
  <Layout>
    <div className="columns">
      <div className="column">
        <section className="section">
          <h1 className="title">Sign up</h1>
          <SignUp />
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

export default withApollo(SignUpPage, { ssr: false });
