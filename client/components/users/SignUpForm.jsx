import * as Yup from 'yup';
import React from 'react';
import { Formik, Field, Form } from 'formik';
import TextInput from '../ui/TextInput';
import { graphQlErrorFilter } from '../../utils';

const FormSchema = Yup.object().shape({
  email: Yup.string()
    .required('Required')
    .email(),
  password: Yup.string()
    .required('Required')
    .min(6),
  password2: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const SignUpForm = ({
  signUp, postSubmit,
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
          const { setSubmitting, setStatus, resetForm } = fvals;
          signUp({ variables: values })
            .then(() => {
              setSubmitting(false);
              resetForm();
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
    validationSchema={FormSchema}
  >
    {
        ({ isSubmitting, status }) => (
          <>
            <Form>
              <Field className="input" name="email" type="text" placeholder="Email" label="Email" component={TextInput} />
              <Field className="input" name="password" type="password" placeholder="Password" label="Password" component={TextInput} />
              <Field className="input" name="password2" type="password" placeholder="Confirm password" label="Confirm Password" component={TextInput} />
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

export default SignUpForm;
