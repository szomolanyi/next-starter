import { useQuery, useMutation } from '@apollo/react-hooks';
import { APP_MESSAGE, CLOSE_APP_MESSAGE } from '../../lib/queries';
import { RegisteredComponent } from '../../lib/hocs';


const clsName = (severity) => {
  switch (severity) {
    case 'error':
      return 'notification is-danger';
    default:
      return 'notification is-info';
  }
};

const AppMessage = ({ appMessage, closeAppMessage }) => (
  <div className={clsName(appMessage.severity)}>
    {
      closeAppMessage && <button type="button" className="delete" aria-label="delete" onClick={() => closeAppMessage()} />
    }
    {appMessage.messages.map(message => <p>{message}</p>)}
  </div>
);

const AppMessageModal = () => {
  const { loading, error, data: { appMessage } } = useQuery(APP_MESSAGE);
  const [closeAppMessage] = useMutation(CLOSE_APP_MESSAGE);
  if (loading) return null;
  if (!appMessage) {
    // appMessage cache value is not initialized
    // it can happen if store is reset
    closeAppMessage();
    return null;
  }
  if (!appMessage.isOpened) return null;
  if (appMessage.component) {
    return (
      <RegisteredComponent
        componentName={appMessage.component}
        appMessage={appMessage}
        closeAppMessage={closeAppMessage}
      />
    );
  }
  return <AppMessage appMessage={appMessage} closeAppMessage={closeAppMessage} />;
};

export default AppMessageModal;
