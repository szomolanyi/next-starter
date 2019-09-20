import { useQuery, useMutation } from '@apollo/react-hooks';
import { APP_MESSAGE, SET_APP_MESSAGE } from '../../lib/queries';

const MessageSendVerifyEmailOk = () => (
  <div>Verification email was sent. Please check your email and click verification link.</div>
);
const Message = ({ id }) => {
  if (id === 'SEND_VERIFY_EMAIL_OK') return <MessageSendVerifyEmailOk />;
  switch (id) {
    case 'SEND_VERIFY_EMAIL_OK': return <MessageSendVerifyEmailOk />;
    default: return null;
  }
};

const AppMessage = () => {
  const { loading, error, data: { appMessage } } = useQuery(APP_MESSAGE);
  const [setAppMessage] = useMutation(SET_APP_MESSAGE);
  if (loading) return null;
  if (!appMessage) {
    // appMessage cache value is not initialized
    // it can happen if store is reset
    setAppMessage({ variables: { id: null } });
    return null;
  }
  if (!appMessage.isOpened) return null;
  return (
    <article className="message">
      <div className="message-header">
        <p>Hello World</p>
        <button type="button" className="delete" aria-label="delete" onClick={() => mutate({ variables: { id: null } })} />
      </div>
      <div className="message-body">
        <Message id={appMessage.messageId} />
      </div>
    </article>
  );
};

export default AppMessage;
