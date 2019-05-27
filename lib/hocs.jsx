import { Mutation } from 'react-apollo';


const isKnownError = error => (
  error.extensions.code === 'BAD_USER_INPUT' ||
  [
    'IncorrectPasswordError',
    'IncorrectUsernameError',
  ].indexOf(error.extensions.exception.name) !== -1
);

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
        return children(mutate, result);
      }
    }
  </Mutation>
);

export const eslintFix = () => null;
