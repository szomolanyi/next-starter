
import Router from 'next/router';
import React, { useState } from 'react';
import { ManagedMutation } from '../lib/hocs';
import { LOGIN_USER } from '../lib/queries';
import LoginForm from './ui/LoginForm';


const Login = ({ mutate, client }) => {
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
      ({ mutate, result }) => <Login mutate={mutate} client={result.client} />
    }
  </ManagedMutation>
);
