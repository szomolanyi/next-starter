import * as Yup from 'yup';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { Formik, Field, Form } from 'formik';
import React from 'react';
import Router from 'next/router';
import { LOGIN_USER } from '../lib/queries';
import { handleErrorUI } from '../lib/utils';
import TextInput from './ui/TextInput';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});


const LoginForm = () => {
  const [login] = useMutation(LOGIN_USER);
  const client = useApolloClient();
  return (
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
              Router.push('/');
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
            {
              // eslint-disable-next-line react/no-array-index-key
              status.errors.map((error, i) => <div key={i} className="has-text-danger has-text-centered">{error.message}</div>)
            }
          </React.Fragment>
        )
      }
    </Formik>
  );
};

export default LoginForm;

