
import { compose, graphql, withApollo } from 'react-apollo';
import Router from 'next/router';
import { LOGIN_USER } from '../lib/queries';
import LoginForm from './ui/LoginForm';

export default compose(
  withApollo,
  graphql(LOGIN_USER, {
    props: ({ mutate, ownProps }) => ({
      login: mutate,
      ...ownProps,
      postSubmit: () => Router.push('/'),
    }),
  }),
)(LoginForm);
