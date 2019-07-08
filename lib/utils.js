import Router from 'next/router';

export const isKnownError = error => (
  error.extensions.code === 'BAD_USER_INPUT'
  || [
    'IncorrectPasswordError',
    'IncorrectUsernameError',
    'UserExistsError',
  ].indexOf(error.extensions.exception.name) !== -1
);

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
};
