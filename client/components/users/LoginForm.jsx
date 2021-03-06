import * as Yup from 'yup';
import { useMutation, useApolloClient } from '@apollo/client';
import { Formik, Field, Form } from 'formik';
import React from 'react';
import Router from 'next/router';
import { LOGIN_USER } from '../../queries';
import { graphQlErrorFilter } from '../../utils';
import TextInput from '../ui/TextInput';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

const LoginForm = ({ redirectTo }) => {
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
              Router.push(redirectTo || '/');
            })
            .catch((error) => {
              setSubmitting(false);
              const errors = graphQlErrorFilter(error);
              setStatus({ errors });
            });
        }
      }
      validationSchema={LoginSchema}
    >
      {
        ({ isSubmitting, status }) => (
          <>
            <Form>
              <Field className="input" name="email" type="text" placeholder="Email" label="Email" component={TextInput} />
              <Field className="input" name="password" type="password" placeholder="Password" label="Password" component={TextInput} />
              <input className="button" disabled={isSubmitting} type="submit" value="Submit" />
            </Form>
            {
              // eslint-disable-next-line react/no-array-index-key
              status.errors.map((error, i) => <div key={i} className="has-text-danger has-text-centered">{error.message}</div>)
            }
          </>
        )
      }
    </Formik>
  );
};

export default LoginForm;
