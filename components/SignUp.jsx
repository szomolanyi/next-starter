import Router from 'next/router';
import { graphql, compose } from 'react-apollo';
import { CREATE_USER } from '../lib/queries';
import SignUpForm from './ui/SignUpForm';


export default compose(
  graphql(CREATE_USER, {
    props: ({ mutate, ownProps }) => ({
      signUp: mutate,
      ...ownProps,
      postSubmit: () => Router.push('/'),
    }),
  }),
)(SignUpForm);
