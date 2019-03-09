import Layout from 'components/layout'

const TextInput = (props) => (
  <div className="field is-horizontal">
    <div className="field-label is-normal">
      <label className="label">{props.label}</label>
    </div>

    <div className="field-body">
      <div className="field">
        <div className="control">
          <input className="input" type={props.text} placeholder={props.placeholder} />
        </div>
      </div>
    </div>
  </div>
)

const Login = (props) => (
  <Layout>
    <section className="section">
      <div className="container">
        <h1 className="title">Sign up</h1>
        <form>
          <TextInput type="text" placeholder="Email" label="Email"/>
          <TextInput type="password" placeholder="Password" label="Password" />
          <TextInput type="password" placeholder="Confirm password" label="Confirm password" />
        </form>
      </div>
    </section>
  </Layout>
)

export default Login
