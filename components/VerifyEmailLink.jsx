import { useMutation } from '@apollo/react-hooks';
import { SEND_VERIFY_EMAIL, SET_APP_MESSAGE } from '../lib/queries';

const VerifyEmailLink = () => {
  const [setAppMessage] = useMutation(SET_APP_MESSAGE);
  const [sendVerifyEmail] = useMutation(SEND_VERIFY_EMAIL);
  const sendVerifyEmail2 = () => {
    sendVerifyEmail()
      .then(() => {
        setAppMessage({ variables: { message: 'Verification email was sent. Please check your email and click verification link.' } });
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

export default VerifyEmailLink;
