import {Mutation} from "react-apollo"
import * as Yup from 'yup'
import { Formik, Field, Form } from 'formik'
import {CREATE_USER} from "../lib/queries"

const CommentSchema = Yup.object().shape({
  email: Yup.string()
    .required("Required"),
  password: Yup.string()
    .required("Required"),
  password2: Yup.string()
    .required("Required"),
})

const TextInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
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

    <div>
      {touched[field.name] &&
      errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </div>
  </div>
)

const SignUpForm = (props) => (
  <Formik
    initialValues={props.initialValues}
    onSubmit={
      (values, fvals) => {
        const { setSubmitting, resetForm } = fvals
        props.mutate({ variables: values })
          .then(() => {
            setSubmitting(false)
            if (props.postSubmit) props.postSubmit()
            else resetForm()
          }
        )
      }
    }
    validationSchema={CommentSchema}
  >
    {
      ({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting}) => {
        return (
          <Form>
            <Field className="input" name="email" type="text" placeholder="Email" label="Email" component={TextInput} />
            {errors.email && touched.email && <p className="help is-danger">{errors.email}</p>}
            <Field className="input" name="password" type="password" placeholder="Password" label="Password" component={TextInput} />
            {errors.password && touched.password && <p className="help is-danger">{errors.password}</p>}
            <Field className="input" name="password2" type="password" placeholder="Confirm password" label="Confirm Password" component={TextInput} />
            {errors.password2 && touched.password2 && <p className="help is-danger">{errors.password2}</p>}
            <input className="button" disabled={isSubmitting} type="submit" value="Submit" />
          </Form>
        )
      }
    }
  </Formik>
)

export default (props) => (
  <Mutation 
    mutation={CREATE_USER}
    /*
    update={(cache, { data: { createComment } } ) => {
      const { comments } = cache.readQuery({ query: GET_COMMENTS });
      cache.writeQuery({
        query: GET_COMMENTS,
        data: { comments: comments.concat([createComment]) },
      });
    }}*/
  >
    {
      (mutate, {data}) => <SignUpForm mutate={mutate} />
    }
  </Mutation>
)
