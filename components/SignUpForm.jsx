import {Mutation} from "react-apollo"
import * as Yup from 'yup'
import { Formik, Field, Form } from 'formik'
import {CREATE_USER} from "../lib/queries"
import TextInput from "./TextInput"

const CommentSchema = Yup.object().shape({
  email: Yup.string()
    .required("Required"),
  password: Yup.string()
    .required("Required"),
  password2: Yup.string()
    .required("Required"),
})

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
            <Field className="input" name="password" type="password" placeholder="Password" label="Password" component={TextInput} />
            <Field className="input" name="password2" type="password" placeholder="Confirm password" label="Confirm Password" component={TextInput} />
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
