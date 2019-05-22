
import CommentForm from './CommentForm';

const CommentModal = (props) => {
  const { data, isOpen, hide } = props;
  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" />
      <div className="modal-content">
        {
          data
          && (
            <div className="box">
              <CommentForm initialValues={data.comment} postSubmit={hide} />
            </div>
          )
        }
      </div>
      <button type="button" className="modal-close is-large" aria-label="close" onClick={hide} />
    </div>
  );
};

export default CommentModal;
