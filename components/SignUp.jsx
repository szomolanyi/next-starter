import Router from 'next/router';
//import React, { useState } from 'react';
import { graphql, compose } from 'react-apollo';
import { errorHandler } from '../lib/hocs';

//import { ManagedMutation } from '../lib/hocs';
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

/*
const SignUp = ({ mutate }) => {
  const [mutationError, setMutationError] = useState(null);
  const enhancedMutate = data => mutate(data)
    .then(() => {
      Router.push('/');
    })
    .catch((error) => {
      if (error.graphQLErrors) {
        setMutationError(error.graphQLErrors[0].extensions.exception.message);
      } else {
        throw error;
      }
    });
  return <SignUpForm signUp={enhancedMutate} signUpError={mutationError} />;
};

export default () => (
  <ManagedMutation mutation={CREATE_USER}>
    {
      ({ mutate }) => <SignUp mutate={mutate} />
    }
  </ManagedMutation>
);
*/
