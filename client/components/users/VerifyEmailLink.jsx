import { useMutation } from '@apollo/client';
import { useErrorHandler } from '../../hooks';
import { SEND_VERIFY_EMAIL, SET_APP_MESSAGE } from '../../queries';
import LinkWithLoader from '../ui/LinkWithLoader';

const VerifyEmailLink = () => {
  const onError = useErrorHandler();
  const [setAppMessage] = useMutation(SET_APP_MESSAGE);
  const [sendVerifyEmail] = useMutation(SEND_VERIFY_EMAIL, {
    onError,
    onCompleted: () => {
      setAppMessage({ variables: { messages: ['Verification email was sent. Please check your email and click verification link.'] } });
    },
  });
  return (
    <LinkWithLoader
      action={sendVerifyEmail}
      className="navbar-item"
    >
      Verify email
    </LinkWithLoader>
  );
};

export default VerifyEmailLink;
