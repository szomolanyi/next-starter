import { compose, graphql, withApollo } from 'react-apollo';
import { SEND_VERIFY_EMAIL, SET_APP_MESSAGE } from '../lib/queries';

const VerifyEmail = ({ mutate, setAppMessage }) => {
  const sendVerifyEmail = () => {
    mutate()
      .then(() => {
        setAppMessage({ variables: { id: 'SEND_VERIFY_EMAIL_OK' } });
      });
  };
  return (
    <a
      className="navbar-item"
      onClick={() => sendVerifyEmail()}
      onKeyPress={() => sendVerifyEmail()}
      role="link"
      tabIndex={0}
    >
      Verify email
    </a>
  );
};

export default compose(
  withApollo,
  graphql(SEND_VERIFY_EMAIL),
  graphql(SET_APP_MESSAGE, {
    props: ({ mutate, ownProps }) => ({
      setAppMessage: mutate,
      ...ownProps,
    }),
  }),
)(VerifyEmail);
