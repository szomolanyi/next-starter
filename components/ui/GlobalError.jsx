const GlobalError = ({ appMessage, closeAppMessage }) => (
  <div className="notification is-danger">
    {
      closeAppMessage && <button type="button" className="delete" aria-label="delete" onClick={() => closeAppMessage()} />
    }
    {appMessage.messages.map(message => <p>{message}</p>)}
  </div>
);

export default GlobalError;
