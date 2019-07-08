import { Mutation, Query } from 'react-apollo';
import Router from 'next/router';

const isKnownError = error => (
  error.extensions.code === 'BAD_USER_INPUT'
  || [
    'IncorrectPasswordError',
    'IncorrectUsernameError',
    'UserExistsError',
  ].indexOf(error.extensions.exception.name) !== -1
);

/*
Not used know
*/
const handleError = (error) => {
  console.log({ error });
  if (error.networkError) {
    Router.push('/_error');
  }
  const errors = [];
  if (error.graphQLErrors) {
    error.graphQLErrors.forEach((err) => {
      if (!isKnownError(err)) {
        Router.push('/_error');
      }
      errors.push(err);
    });
  } else Router.push('/_error');
  if (errors.length > 0) {
    throw errors;
  } else {
    throw new Error('Internal Error');
  }
};

export const handleErrorUI = (error) => {
  console.log({ error });
  if (error.networkError) {
    Router.push('/_error');
  }
  const errors = [];
  if (error.graphQLErrors) {
    error.graphQLErrors.forEach((err) => {
      if (!isKnownError(err)) {
        Router.push('/_error');
      }
      errors.push(err);
    });
  } else Router.push('/_error');
  return errors;
}

export const errorHandler = mutate => params => mutate(params)
  .catch((error) => {
    handleError(error);
  });


/* checks error,
errors other than BAD_USER_INPUT are thrown */
const checkError = (error) => {
  if (!error) return;
  if (error.networkError) throw error;
  if (error.graphQLErrors) {
    error.graphQLErrors.forEach((e) => {
      if (!isKnownError(e)) throw error;
    });
  }
};

/* manages Mutation errors,
errors other than BAD_USER_INPUT are thrown and are catched in Error Boundary component */
export const ManagedMutation = ({ children, ...rest }) => (
  <Mutation {...rest}>
    {
      (mutate, result) => {
        checkError(result.error);
        return children({ mutate, result });
      }
    }
  </Mutation>
);

export const ManagedQuery = ({ children, ...rest }) => (
  <Query {...rest}>
    {
      ({ loading, error, data }) => {
        checkError(error);
        return children({ loading, error, data });
      }
    }
  </Query>
);
