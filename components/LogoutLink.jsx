import { compose, graphql, withApollo } from 'react-apollo';
import { LOGOUT_USER } from '../lib/queries';

const LogoutLink = ({ logout, client }) => (
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

export default compose(
  withApollo,
  graphql(LOGOUT_USER, {
    props: ({ mutate, ownProps }) => ({
      logout: mutate,
      ...ownProps,
    }),
  }),
)(LogoutLink);
