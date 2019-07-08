import * as Yup from 'yup';
import React from 'react';
import { Formik, Field, Form } from 'formik';
import TextInput from './TextInput';
import { handleErrorUI } from '../../lib/hocs';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});


const LoginForm = ({
  login, postSubmit, client,
}) => (
  <Formik
    initialValues={{
      email: '',
      password: '',
    }}
    initialStatus={{
      errors: [],
    }}
    onSubmit={
      (values, fvals) => {
        const { setSubmitting, resetForm, setStatus } = fvals;
        login({ variables: values })
          .then(() => {
            setSubmitting(false);
            resetForm();
            client.resetStore();
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
    validationSchema={LoginSchema}
  >
    {
      ({ isSubmitting, status }) => (
        <React.Fragment>
          <Form>
            <Field className="input" name="email" type="text" placeholder="Email" label="Email" component={TextInput} />
            <Field className="input" name="password" type="password" placeholder="Password" label="Password" component={TextInput} />
            <input className="button" disabled={isSubmitting} type="submit" value="Submit" />
          </Form>
          { status.errors.map((error, i) => <div key={i} className="has-text-danger has-text-centered">{error.message}</div>)
          }
        </React.Fragment>
      )
    }
  </Formik>
);

export default LoginForm;
