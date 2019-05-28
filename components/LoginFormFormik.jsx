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

const LoginForm = ({ initialValues, postSubmit, mutate }) => {
  const [globalError, setGlobalError] = useState(null);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={
        (values, fvals) => {
          const { setSubmitting, resetForm } = fvals;
          mutate({ variables: values })
            .then(() => {
              setSubmitting(false);
              setGlobalError(null);
              if (postSubmit) postSubmit();
              else resetForm();
              Router.push('/');
            })
            .catch((error) => {
              setSubmitting(false);
              setGlobalError(error.graphQLErrors[0].extensions.exception.message);
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
            { globalError
              && <div className="has-text-danger has-text-centered">{globalError}</div>
            }
          </React.Fragment>
        )
      }
    </Formik>
  );
};

export default () => (
  <ManagedMutation mutation={LOGIN_USER}>
    {
      ({ mutate }) => <LoginForm mutate={mutate} />
    }
  </ManagedMutation>
);
