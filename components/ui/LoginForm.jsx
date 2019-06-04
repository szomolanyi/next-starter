import * as Yup from 'yup';
import React from 'react';
import { Formik, Field, Form } from 'formik';
import TextInput from './TextInput';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});


const LoginForm = ({
  mutate, mutationError,
}) => (
  <Formik
    initialValues={{
      email: '',
      password: '',
    }}
    onSubmit={
      (values, fvals) => {
        const { setSubmitting, resetForm } = fvals;
        mutate({ variables: values })
          .then(() => {
            setSubmitting(false);
            resetForm();
          });
      }
    }
    validationSchema={LoginSchema}
  >
    {
      ({ isSubmitting }) => (
        <React.Fragment>
          <Form>
            <Field className="input" name="email" type="text" placeholder="Email" label="Email" component={TextInput} />
            <Field className="input" name="password" type="password" placeholder="Password" label="Password" component={TextInput} />
            <input className="button" disabled={isSubmitting} type="submit" value="Submit" />
          </Form>
          { mutationError
            && <div className="has-text-danger has-text-centered">{mutationError}</div>
          }
        </React.Fragment>
      )
    }
  </Formik>
);

export default LoginForm;
