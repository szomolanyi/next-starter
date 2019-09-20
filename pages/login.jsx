import Layout from '../components/layout';
import LoginForm from '../components/LoginForm';

const LoginPage = ({ messages }) => (
  <Layout>
    <section className="section">
      <h1 className="title">Login</h1>
      <LoginForm messages={messages} />
    </section>
  </Layout>
);

export default LoginPage;
