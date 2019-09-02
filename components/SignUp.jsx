import Router from 'next/router';
import { graphql, compose } from 'react-apollo';
import { CREATE_USER, CURRENT_USER } from '../lib/queries';
import SignUpForm from './ui/SignUpForm';

const SignUp = ({
  signUp, postSubmit, data: { currentUser },
}) => {
  if (currentUser) return (<p>Welcome. We have sent you email, please click confirmation link to confirm your account.</p>);
  return <SignUpForm signUp={signUp} postSubmit={postSubmit} />;
};

export default compose(
  graphql(CREATE_USER, {
    props: ({ mutate, ownProps }) => ({
      signUp: mutate,
      ...ownProps,
    }),
    options: {
      refetchQueries: [
        'CurrentUser',
      ],
    },
  }),
  graphql(CURRENT_USER),
)(SignUp);
