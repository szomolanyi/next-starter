import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { graphQlErrorFilter } from '../../lib/utils';
import {
  GET_COMMENTS, ADD_COMMENT,
} from '../../lib/queries';

const CommentSchema = Yup.object().shape({
  title: Yup.string()
    .required('Required'),
  text: Yup.string()
    .required('Required'),
});

const updateCacheAfterCreate = (cache, { data }) => {
  const { createComment } = data;
  const { comments } = cache.readQuery({ query: GET_COMMENTS });
  cache.writeQuery({
    query: GET_COMMENTS,
    data: {
      comments: {
        cursor: comments.cursor,
        comments: [createComment, ...comments.comments],
        __typename: 'CommentsFeed',
      },
    },
  });
};

const CommentForm = ({
  initialValues, postSubmit,
}) => {
  const [create] = useMutation(ADD_COMMENT, {
    update: updateCacheAfterCreate,
  });
  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{}}
      onSubmit={
        (values, fvals) => {
          const { setSubmitting, resetForm, setStatus } = fvals;
          create({ variables: values })
            .then(() => {
              resetForm(initialValues);
              if (postSubmit) {
                postSubmit();
              }
            })
            .catch((error) => {
              setSubmitting(false);
              const errors = graphQlErrorFilter(error);
              setStatus({ errors });
            });
        }
      }
      validationSchema={CommentSchema}
    >
      {
        ({
          errors, touched, isSubmitting, status,
        }) => (
          <Form>
            <Field className="input" name="title" type="text" placeholder="Title" />
            {errors.title && touched.title && <p className="help is-danger">{errors.title}</p>}
            <Field className="textarea" name="text" component="textarea" placeholder="Write your comment" />
            {errors.text && touched.text && <p className="help is-danger">{errors.text}</p>}
            <button className={`button ${isSubmitting ? 'is-loading' : ''}`} disabled={isSubmitting} type="submit" value="Submit">
              Submit
            </button>
            { status.errors
              // eslint-disable-next-line react/no-array-index-key
              && status.errors.map((error, i) => <p className="help is-danger" key={i}>{ error.message }</p>)
            }
          </Form>
        )
      }
    </Formik>
  );
};

export default CommentForm;
