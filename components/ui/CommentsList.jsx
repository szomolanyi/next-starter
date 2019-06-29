import CommentDetail from './CommentDetail';

const CommentsList = ({ data: { comments, loading, error }, editComment, deleteComment }) => {
  if (error) {
    console.log(error); // todo: handle errors
    return null;
  }
  if (loading) return null;
  return (
    <div className="columns is-multiline">
      {
        comments.map(comment => (
          <CommentDetail
            key={comment._id}
            comment={comment}
            editComment={editComment}
            deleteComment={deleteComment}
          />
        ))
      }
    </div>
  );
};

export default CommentsList;
