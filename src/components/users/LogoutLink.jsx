import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useErrorHandler } from '../../hooks';
import { LOGOUT_USER } from '../../queries';

const LogoutLink = () => {
  const client = useApolloClient();
  const handleErrors = useErrorHandler();
  const [logout] = useMutation(LOGOUT_USER);
  const logoutFunc = () => {
    logout().then(() => client.resetStore()).catch((error) => handleErrors(error));
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
