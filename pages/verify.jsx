import Layout from '../components/ui/layout';
import EmailVerify from '../components/users/EmailVerify';

const EmailVerifyPage = ({ token }) => (
  <Layout>
    <section className="hero">
      <div className="hero-head"><p className="is-size-2">Email verification</p></div>
      <div className="hero-body"><EmailVerify token={token} /></div>
    </section>
  </Layout>
);

EmailVerifyPage.getInitialProps = async ({ query: { token } }) => {
  if (token) {
    return {
      token,
    };
  }
  return {
    token: '',
  };
};

export default EmailVerifyPage;
