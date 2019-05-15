import Router from 'next/router'
import * as Yup from 'yup'
import { Formik, Field, Form } from 'formik'
import {ManagedMutation} from "../lib/hocs"
import {CREATE_USER} from "../lib/queries"
import TextInput from "./TextInput"
import {getUserInputError} from "../lib/utils"

const CommentSchema = Yup.object().shape({
  email: Yup.string()
    .required("Required"),
  password: Yup.string()
    .required("Required"),
  password2: Yup.string()
    .required("Required"),
})



const SignUpForm = (props) => {
  return (
  <Formik
    initialValues={props.initialValues}
    onSubmit={
      (values, fvals) => {
        const { setSubmitting, resetForm, setErrors } = fvals
        props.mutate({ variables: values })
          .then(() => {
            setSubmitting(false)
            if (props.postSubmit) props.postSubmit()
            else resetForm()
            Router.push('/')
          })
          .catch((error) => {
            setErrors(getUserInputError(error))
            setSubmitting(false)
          })
      }
    }
    validationSchema={CommentSchema}
  >
    {
      ({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting}) => {
        return (
          <Form>
            <Field className="input" name="email" type="text" placeholder="Email" label="Email" component={TextInput} />
            <Field className="input" name="password" type="password" placeholder="Password" label="Password" component={TextInput} />
            <Field className="input" name="password2" type="password" placeholder="Confirm password" label="Confirm Password" component={TextInput} />
            <input className="button" disabled={isSubmitting} type="submit" value="Submit" />
          </Form>
        )
      }
    }
  </Formik>
)}

export default (props) => (
  <ManagedMutation mutation={CREATE_USER}>
    {
      (mutate) => {return <SignUpForm mutate={mutate}/>}
    }
  </ManagedMutation>
)

