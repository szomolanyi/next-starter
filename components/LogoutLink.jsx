import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useErrorHandler2 } from '../lib/hooks';
import { LOGOUT_USER } from '../lib/queries';

const LogoutLink = () => {
  const client = useApolloClient();
  const handleErrors = useErrorHandler2();
  const [logout] = useMutation(LOGOUT_USER);
  const logoutFunc = () => {
    logout().then(() => client.resetStore()).catch(error => handleErrors(error));
  };
  return (
    <a
      className="navbar-item"
      onClick={logoutFunc}
      onKeyPress={logoutFunc}
      role="link"
      tabIndex={0}
    >
      Logout
    </a>
  );
};

export default LogoutLink;
