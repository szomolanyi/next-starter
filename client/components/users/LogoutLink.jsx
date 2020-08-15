import { useMutation, useApolloClient } from '@apollo/client';
import { useErrorHandler } from '../../hooks';
import { LOGOUT_USER } from '../../queries';

const LogoutLink = () => {
  const client = useApolloClient();
  const onError = useErrorHandler();
  const [logout] = useMutation(LOGOUT_USER, {
    onError,
    onCompleted: () => client.resetStore(),
  });
  return (
    <a
      className="navbar-item"
      onClick={logout}
      onKeyPress={logout}
      role="link"
      tabIndex={0}
    >
      Logout
    </a>
  );
};

export default LogoutLink;
