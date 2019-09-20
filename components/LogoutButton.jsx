import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { LOGOUT_USER } from '../lib/queries';

const LogoutButton = () => {
  const [logout] = useMutation(LOGOUT_USER);
  const client = useApolloClient();
  return (
    <button
      type="button"
      className="button is-light"
      onClick={() => logout().then(() => client.resetStore())}
    >
        Logout
    </button>
  );
};

export default LogoutButton;
