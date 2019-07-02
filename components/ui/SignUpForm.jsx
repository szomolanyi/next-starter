import * as Yup from 'yup';
import React from 'react';
import { Formik, Field, Form } from 'formik';
import TextInput from './TextInput';
import { handleErrorUI } from '../../lib/hocs';

const CommentSchema = Yup.object().shape({
  email: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
  password2: Yup.string()
    .required('Required'),
});


const SignUpForm = ({
 signUp, postSubmit, signUpError 
}) => (
  <Formik
    initialValues={{
      email: '',
      password: '',
      password2: '',
    }}
    initialStatus={{
      errors: [],
    }}
    onSubmit={
      (values, fvals) => {
        const { setSubmitting, setStatus } = fvals;
        signUp({ variables: values })
          .then(() => {
            setSubmitting(false);
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
      ({ isSubmitting, status }) => (
        <React.Fragment>
          <Form>
            <Field className="input" name="email" type="text" placeholder="Email" label="Email" component={TextInput} />
            <Field className="input" name="password" type="password" placeholder="Password" label="Password" component={TextInput} />
            <Field className="input" name="password2" type="password" placeholder="Confirm password" label="Confirm Password" component={TextInput} />
            <input className="button" disabled={isSubmitting} type="submit" value="Submit" />
          </Form>
          { status.errors.map(error => <div className="has-text-danger has-text-centered">{error.message}</div>)
          }
        </React.Fragment>
      )
    }
  </Formik>
);

export default SignUpForm;
