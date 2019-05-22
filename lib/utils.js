
/* extract BAD_USER_INPUT errors from Apollo error
if other error occures, rethrows */
const getUserInputError = (error) => {
  if (!error || !error.graphQLErrors) return error;
  if (error.networkError) throw error;
  if (!error.graphQLErrors) return error;
  return error.graphQLErrors.reduce((res, v) => {
    if (v.extensions.code !== 'BAD_USER_INPUT') throw error;
    return { ...res, ...v.extensions.exception };
  }, {});
};

module.exports = { getUserInputError };
