import Layout from '../components/layout'
import LoginForm from "../components/LoginForm"

const Login = (props) => (
  <Layout>
    <section className="section">
      <h1 className="title">Login</h1>
      <LoginForm />
    </section>
  </Layout>
)

export default Login
