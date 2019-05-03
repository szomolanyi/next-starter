const TextInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">{props.label}</label>
      </div>

      <div className="field-body">
        <div className="field">
          <div className="control">
            <input className="input" {...field} {...props} />
          </div>
        </div>
      </div>  
    </div>

    <div>
      {touched[field.name] &&
      errors[field.name] && <p className="help is-danger">{errors[field.name]}</p>}
    </div>
  </div>
)

export default TextInput