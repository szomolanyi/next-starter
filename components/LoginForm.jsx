const TextInput = (props) => (
  <div>
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">{props.label}</label>
      </div>

      <div className="field-body">
        <div className="field">
          <div className="control">
            <input className="input" {...props} />
          </div>
        </div>
      </div>  
    </div>
  </div>
)

const LoginForm = (props) => (
  <form action="/login" method="post">
    <TextInput className="input" name="email" type="text" placeholder="Email" label="Email" />
    <TextInput className="input" name="password" type="password" placeholder="Password" label="Password" />
    <input className="button" type="submit" value="Submit" />
  </form>
)

export default LoginForm
