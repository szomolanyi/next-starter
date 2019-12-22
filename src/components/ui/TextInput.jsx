const TextInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  name,
  ...props
}) => (
  <div>
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label" htmlFor={field.name}>{label}</label>
      </div>

      <div className="field-body">
        <div className="field">
          <div className="control">
            <input id={field.name} className="input" {...field} {...props} />
          </div>
        </div>
      </div>
    </div>

    <div>
      {touched[field.name]
      && errors[field.name] && <p className="help is-danger">{errors[field.name]}</p>}
    </div>
  </div>
);

export default TextInput
;