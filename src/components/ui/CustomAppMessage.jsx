const CustomAppMessage = ({ appMessage, closeAppMessage }) => (
  <div>
    {
      closeAppMessage && <button type="button" className="delete" aria-label="delete" onClick={() => closeAppMessage()} />
    }
    {appMessage.message}
  </div>
);

export default CustomAppMessage;
