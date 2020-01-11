export const isKnownError = (error) => (
  [
    'BAD_USER_INPUT',
    'EMAIL_NOT_VERIFIED',
    'NOT_AUTHENTICATED',
  ].indexOf(error.extensions.code) !== -1
  || [
    'IncorrectPasswordError',
    'IncorrectUsernameError',
    'UserExistsError',
  ].indexOf(error.extensions.exception.name) !== -1
);

export const graphQlErrorFilter = (error) => {
  const errors = [];
  if (error.networkError) {
    errors.push(new Error('Unexpected network error has occured. Try to refresh page and retry operation.'));
  }
  let unexpectedGraphql = false;
  if (error.graphQLErrors) {
    error.graphQLErrors.forEach((err) => {
      if (isKnownError(err)) {
        errors.push(err);
      } else {
        unexpectedGraphql = true;
      }
    });
    if (unexpectedGraphql) {
      errors.push(new Error('Unexpected error has occured. Try to refresh page and retry operation'));
    }
  }
  return errors;
};
