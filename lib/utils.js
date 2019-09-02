import Router from 'next/router';

export const isKnownError = error => (
  [
    'BAD_USER_INPUT',
    'EMAIL_NOT_VERIFIED',
  ].indexOf(error.extensions.code) !== -1
  || [
    'IncorrectPasswordError',
    'IncorrectUsernameError',
    'UserExistsError',
  ].indexOf(error.extensions.exception.name) !== -1
);

export const handleErrorUI = (error) => {
  console.log({ error });
  if (error.networkError) {
    throw error;
    // Router.push('/_error');
  }
  const errors = [];
  if (error.graphQLErrors) {
    error.graphQLErrors.forEach((err) => {
      if (!isKnownError(err)) {
        throw error;
        // Router.push('/_error');
      }
      errors.push(err);
    });
  } else throw error;// Router.push('/_error');
  return errors;
};
