import * as Yup from 'yup';
import React from 'react';
import { Formik, Field, Form } from 'formik';
import TextInput from './TextInput';

const CommentSchema = Yup.object().shape({
  email: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
  password2: Yup.string()
    .required('Required'),
});


const SignUpForm = ({ signUp, signUpError }) => (
  <Formik
    initialValues={{
      email: '',
      password: '',
      password2: '',
    }}
    onSubmit={
      (values, fvals) => {
        const { setSubmitting } = fvals;
        signUp({ variables: values })
          .then(() => {
            setSubmitting(false);
          });
      }
    }
    validationSchema={CommentSchema}
  >
    {
      ({ isSubmitting }) => (
        <React.Fragment>
          <Form>
            <Field className="input" name="email" type="text" placeholder="Email" label="Email" component={TextInput} />
            <Field className="input" name="password" type="password" placeholder="Password" label="Password" component={TextInput} />
            <Field className="input" name="password2" type="password" placeholder="Confirm password" label="Confirm Password" component={TextInput} />
            <input className="button" disabled={isSubmitting} type="submit" value="Submit" />
          </Form>
          { signUpError
            && <div className="has-text-danger has-text-centered">{signUpError}</div>
          }
        </React.Fragment>
      )
    }
  </Formik>
);

export default SignUpForm;
