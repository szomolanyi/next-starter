import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import TextInput from './TextInput';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
  password2: Yup.string()
    .required('Required'),
});

const LoginForm = ({ initialValues, postSubmit, mutate }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={
      (values, fvals) => {
        const { setSubmitting, resetForm } = fvals;
        mutate({ variables: values })
          .then(() => {
            setSubmitting(false);
            if (postSubmit) postSubmit();
            else resetForm();
          });
      }
    }
    validationSchema={LoginSchema}
  >
    {
      ({ isSubmitting }) => (
        <Form action="/login">
          <Field className="input" name="email" type="text" placeholder="Email" label="Email" component={TextInput} />
          <Field className="input" name="password" type="password" placeholder="Password" label="Password" component={TextInput} />
          <input className="button" disabled={isSubmitting} type="submit" value="Submit" />
        </Form>
      )
    }
  </Formik>
);

export default LoginForm;
