import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import Router from 'next/router';
import React, { useState } from 'react';
import { ManagedMutation } from '../lib/hocs';
import TextInput from './TextInput';
import { LOGIN_USER } from '../lib/queries';

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

const LoginController = ({ mutate, client }) => {
  const [mutationError, setMutationError] = useState(null);
  const enhancedMutation = data => mutate(data)
    .then(() => {
      client.resetStore();
      setMutationError(null);
      Router.push('/');
    })
    .catch((error) => {
      if (error.graphQLErrors) {
        setMutationError(error.graphQLErrors[0].extensions.exception.message);
      } else {
        throw error;
      }
    });
  return <LoginForm mutate={enhancedMutation} mutationError={mutationError} />;
};


export default () => (
  <ManagedMutation mutation={LOGIN_USER}>
    {
      ({ mutate, result }) => <LoginController mutate={mutate} client={result.client} />
    }
  </ManagedMutation>
);
