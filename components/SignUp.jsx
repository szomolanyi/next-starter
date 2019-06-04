import Router from 'next/router';
import React, { useState } from 'react';
import { ManagedMutation } from '../lib/hocs';
import { CREATE_USER } from '../lib/queries';
import SignUpForm from './ui/SignUpForm';


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
