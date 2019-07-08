import { compose, graphql, withApollo } from 'react-apollo';
import { LOGOUT_USER } from '../lib/queries';

const LogoutButton = ({ logout, client }) => (
  <button
    type="button"
    className="button is-light"
    onClick={() => logout().then(() => client.resetStore())}
  >
      Logout
  </button>
);

export default compose(
  withApollo,
  graphql(LOGOUT_USER, {
    props: ({ mutate, ownProps }) => ({
      logout: mutate,
      ...ownProps,
    }),
  }),
)(LogoutButton);
