import Layout from '../components/layout'
import LoginForm from "../components/LoginForm"

const Login = ({messages}) => (
  <Layout>
    <section className="section">
      <h1 className="title">Login</h1>
      <LoginForm messages={messages}/>
    </section>
  </Layout>
)

Login.getInitialProps = async ({req}) => {
  if (req) {
    const messages = req.flash()
    console.log({messages:messages})
    return {messages}
  }
  else return {}
}
export default Login
