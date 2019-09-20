import { useState } from 'react';
//import { useQuery } from '@apollo/react-hooks';
//import { compose, graphql } from 'react-apollo';
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
  return null;
  if (loading) return null;
  if (!appMessage) {
    // appMessage cache value is not initialized
    // it can happen if store is reset
    mutate({ variables: { id: null } });
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
/*
export default compose(
  graphql(APP_MESSAGE),
  graphql(SET_APP_MESSAGE),
)(AppMessage);
*/
