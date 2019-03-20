import gql from "graphql-tag"
import {Mutation} from "react-apollo"
import * as Yup from 'yup'
import { Formik, Field, Form } from 'formik'

import { GET_COMMENTS, ADD_COMMENT } from "../lib/queries"

const CommentSchema = Yup.object().shape({
  title: Yup.string()
    .required("Required"),
  text: Yup.string()
    .required("Required"),
})

const CommentForm = (props) => (
  <Formik
    initialValues={{text:'', title:''}}
    onSubmit={
      (values, fvals) => {
        const { setSubmitting } = fvals
        props.addComment({ variables: values })
          .then(() => {
            setSubmitting(false);
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
            <Field className="input" name="title" type="text" placeholder="Title" />
            {errors.title && touched.title && <p className="help is-danger">{errors.title}</p>}
            <Field className="textarea" name="text" component="textarea" placeholder="Write your comment" />
            {errors.text && touched.text && <p className="help is-danger">{errors.text}</p>}
            <input className="button" disabled={isSubmitting} type="submit" value="Submit" />
          </Form>
        )
      }
    }
  </Formik>
)


export default () => (
  <Mutation 
    mutation={ADD_COMMENT}
    update={(cache, { data: { createComment } } ) => {
      const { comments } = cache.readQuery({ query: GET_COMMENTS });
      cache.writeQuery({
        query: GET_COMMENTS,
        data: { comments: comments.concat([createComment]) },
      });
    }}
  >
    {
      (addComment, {data}) => (
        <CommentForm addComment={addComment} />
      )
    }

  </Mutation>
)
