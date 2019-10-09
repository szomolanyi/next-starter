export const isKnownError = error => (
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
  const knownErrors = [];
  let unknownError = null;
  if (error.networkError) {
    unknownError = new Error('Unexpected network error has occured. Try to refresh page and retry operation.');
  }
  let unexpectedGraphql = false;
  if (error.graphQLErrors) {
    error.graphQLErrors.forEach((err) => {
      if (isKnownError(err)) {
        knownErrors.push(err);
      } else {
        unexpectedGraphql = true;
      }
    });
    if (unexpectedGraphql && !unknownError) {
      unknownError = new Error('Unexpected error has occured. Try to refresh page and retry operation');
    }
  }
  return {
    knownErrors, unknownError,
  };
};
