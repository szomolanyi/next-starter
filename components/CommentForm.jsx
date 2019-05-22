import { Mutation } from 'react-apollo';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';

import { GET_COMMENTS, ADD_COMMENT, EDIT_COMMENT } from '../lib/queries';

const CommentSchema = Yup.object().shape({
  title: Yup.string()
    .required('Required'),
  text: Yup.string()
    .required('Required'),
});

const CommentForm = ({ initialValues, mutate, postSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={
      (values, fvals) => {
        const { setSubmitting, resetForm } = fvals;
        mutate({ variables: values })
          .then(() => {
            setSubmitting(false);
            if (postSubmit) postSubmit();
            else resetForm();
          });
      }
    }
    validationSchema={CommentSchema}
  >
    {
      ({ errors, touched, isSubmitting }) => (
        <Form>
          <Field className="input" name="title" type="text" placeholder="Title" />
          {errors.title && touched.title && <p className="help is-danger">{errors.title}</p>}
          <Field className="textarea" name="text" component="textarea" placeholder="Write your comment" />
          {errors.text && touched.text && <p className="help is-danger">{errors.text}</p>}
          <input className="button" disabled={isSubmitting} type="submit" value="Submit" />
        </Form>
      )
    }
  </Formik>
);

const CreateComment = () => (
  <Mutation
    mutation={ADD_COMMENT}
    update={(cache, { data: { createComment } }) => {
      const { comments } = cache.readQuery({ query: GET_COMMENTS });
      cache.writeQuery({
        query: GET_COMMENTS,
        data: { comments: comments.concat([createComment]) },
      });
    }}
  >
    {
      create => <CommentForm mutate={create} initialValues={{ text: '', title: '' }} />
    }
  </Mutation>
);

const EditComment = ({ initialValues, ...props }) => (
  <Mutation mutation={EDIT_COMMENT} key={initialValues._id}>
    {
      (update) => {
        const mutate = (mutateData) => {
          const updateData = mutateData;
          updateData.variables._id = props.initialValues._id;
          return update(updateData);
        };
        return <CommentForm mutate={mutate} {...props} initialValues={initialValues} />;
      }
    }
  </Mutation>
);

export default ({ initialValues, ...props }) => (
  initialValues ? <EditComment {...props} initialValues={initialValues} /> : <CreateComment />);
