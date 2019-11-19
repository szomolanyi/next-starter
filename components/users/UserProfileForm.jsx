import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { graphQlErrorFilter } from '../../lib/utils';
import { EDIT_USER_PROFILE, CURRENT_USER } from '../../lib/queries';
import TextInput from '../ui/TextInput';

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
});

const UserProfileForm = ({
  postSubmit,
}) => {
  const client = useApolloClient();
  const { currentUser } = client.readQuery({ query: CURRENT_USER });
  const [updateProfile] = useMutation(EDIT_USER_PROFILE);
  return (
    <Formik
      initialValues={{
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
      }}
      initialStatus={{}}
      onSubmit={
          (values, fvals) => {
            const { setSubmitting, setStatus } = fvals;
            updateProfile({ variables: values })
              .then(() => {
                setSubmitting(false);
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
      validationSchema={ProfileSchema}
    >
      {
          ({
            errors, touched, isSubmitting, status,
          }) => (
            <Form>
              <Field className="input" name="firstName" type="test" placeholder="First name" label="First name" component={TextInput} />
              {errors.firstName && touched.firstName && <p className="help is-danger">{errors.firstName}</p>}
              <Field className="input" name="lastName" type="text" placeholder="Last name" label="Last name" component={TextInput} />
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

export default UserProfileForm;
