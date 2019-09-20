//import { compose, graphql, withApollo } from 'react-apollo';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { SEND_VERIFY_EMAIL, SET_APP_MESSAGE } from '../lib/queries';

const VerifyEmail = () => {
  const [setAppMessage] = useMutation(SET_APP_MESSAGE);
  const [sendVerifyEmail] = useQuery(SEND_VERIFY_EMAIL);
  const sendVerifyEmail2 = () => {
    sendVerifyEmail()
      .then(() => {
        setAppMessage({ variables: { id: 'SEND_VERIFY_EMAIL_OK' } });
      });
  };
  return (
    <a
      className="navbar-item"
      onClick={() => sendVerifyEmail2()}
      onKeyPress={() => sendVerifyEmail2()}
      role="link"
      tabIndex={0}
    >
      Verify email
    </a>
  );
};

export default VerifyEmail;

