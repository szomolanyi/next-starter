import Layout from '../components/layout';
import LoginForm from '../components/LoginFormFormik';

const Login = ({ messages }) => (
  <Layout>
    <section className="section">
      <h1 className="title">Login</h1>
      <LoginForm messages={messages} />
    </section>
  </Layout>
);

Login.getInitialProps = async ({ req }) => {
  if (req) {
    // const messages = req.flash() TODO: toto nefunguje na zeit lamba TODO: zisti preco
    return {};
  }
  return {};
};
export default Login;
