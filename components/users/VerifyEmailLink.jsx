import { useMutation } from '@apollo/react-hooks';
import { useErrorHandler } from '../../lib/hooks';
import { SEND_VERIFY_EMAIL, SET_APP_MESSAGE } from '../../lib/queries';

const VerifyEmailLink = () => {
  const [setAppMessage] = useMutation(SET_APP_MESSAGE);
  const [sendVerifyEmail] = useMutation(SEND_VERIFY_EMAIL);
  const handleErrors = useErrorHandler();
  const sendVerifyEmail2 = () => {
    sendVerifyEmail()
      .then(() => {
        setAppMessage({ variables: { messages: ['Verification email was sent. Please check your email and click verification link.'] } });
      })
      .catch(error => handleErrors(error));
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
