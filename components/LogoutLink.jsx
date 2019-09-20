// import { compose, graphql, withApollo } from 'react-apollo';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { LOGOUT_USER } from '../lib/queries';

const LogoutLink = () => {
  const client = useApolloClient();
  const [logout] = useMutation(LOGOUT_USER);
  return (
    <a
      className="navbar-item"
      onClick={() => logout().then(() => client.resetStore())}
      onKeyPress={() => logout().then(() => client.resetStore())}
      role="link"
      tabIndex={0}
    >
      Logout
    </a>
  );
};

export default LogoutLink;

