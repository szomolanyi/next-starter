import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { handleErrorUI } from '../../lib/utils';

const CommentSchema = Yup.object().shape({
  title: Yup.string()
    .required('Required'),
  text: Yup.string()
    .required('Required'),
});

const CommentForm = ({
  initialValues, mutate, postSubmit,
}) => (
  <Formik
    initialValues={initialValues}
    initialStatus={{}}
    onSubmit={
      (values, fvals) => {
        const { setSubmitting, resetForm, setStatus } = fvals;
        mutate({ variables: values })
          .then(() => {
            setSubmitting(false);
            resetForm(initialValues);
            if (postSubmit) {
              postSubmit();
            }
          })
          .catch((error) => {
            setSubmitting(false);
            const errors = handleErrorUI(error);
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
          <input className="button" disabled={isSubmitting} type="submit" value="Submit" />
          { status.errors
            // eslint-disable-next-line react/no-array-index-key
            && status.errors.map((error, i) => <p className="help is-danger" key={i}>{ error.message }</p>)
          }
        </Form>
      )
    }
  </Formik>
);

export default CommentForm;
