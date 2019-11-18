import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { graphQlErrorFilter } from '../../lib/utils';
import { EDIT_USER_PROFILE } from '../../lib/queries';

const CommentSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required'),
});

const CommentForm = ({
  initialValues, postSubmit, mutate,
}) => {
  const [updateProfile] = useMutation(EDIT_USER_PROFILE);
  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{}}
      onSubmit={
          (values, fvals) => {
            const { setSubmitting, resetForm, setStatus } = fvals;
            mutate({ variables: values })
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
              <Field className="input" name="firstName" type="lastName" placeholder="firstName" />
              {errors.firstName && touched.firstName && <p className="help is-danger">{errors.firstName}</p>}
              <Field className="lastNamearea" name="lastName" component="lastNamearea" placeholder="Write your comment" />
              {errors.lastName && touched.lastName && <p className="help is-danger">{errors.lastName}</p>}
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
