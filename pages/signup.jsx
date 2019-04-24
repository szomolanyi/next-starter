import Layout from '../components/layout'
import SignUpForm from "../components/SignUpForm"

const TextInput = (props) => (
  <div className="field is-horizontal">
    <div className="field-label is-normal">
      <label className="label">{props.label}</label>
    </div>

    <div className="field-body">
      <div className="field">
        <div className="control">
          <input className="input" type={props.type} placeholder={props.placeholder} />
        </div>
      </div>
    </div>
  </div>
)

/*
const Login = (props) => (
  <Layout>
    <section className="section">
      <h1 className="title">Sign up</h1>
      <form>
        <TextInput type="text" placeholder="Email" label="Email"/>
        <TextInput type="password" placeholder="Password" label="Password" />
        <TextInput type="password" placeholder="Confirm password" label="Confirm password" />
      </form>
    </section>
  </Layout>
)*/

const Login = (props) => (
  <Layout>
    <section className="section">
      <h1 className="title">Sign up</h1>
      <SignUpForm />
    </section>
  </Layout>
)

export default Login
