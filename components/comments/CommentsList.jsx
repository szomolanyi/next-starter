import CommentDetail from './CommentDetail';

const CommentsList = ({ comments, editComment, deleteComment }) => (
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

export default CommentsList;
