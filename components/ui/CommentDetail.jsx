
const columnSizer = (text) => {
  if (text.length > 200) return 'column is-6';
  if (text.length > 100) return 'column is-4';
  if (text.length > 100) return 'column is-2';
  return 'column';
};


const CommentDetail = ({ comment, editComment, deleteComment }) => (
  <div className={columnSizer(comment.text)}>
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">{comment.title}</div>
        <button type="button" className="button" onClick={() => editComment({ comment })}>Edit</button>
        <button type="button" className="button" onClick={() => deleteComment({ variables: { _id: comment._id } })}>Delete</button>
      </div>
      <div className="card-content">
        <div className="content">{comment.text}</div>
      </div>
    </div>
  </div>
);

export default CommentDetail;
