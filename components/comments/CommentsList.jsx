import { useQuery, useMutation } from '@apollo/react-hooks';
import CommentDetail from './CommentDetail';
import AppError from '../ui/AppError';
import Loading from '../ui/Loading';
import {
  GET_COMMENTS, DELETE_COMMENT,
} from '../../lib/queries';


const updateCacheAfterDelete = (cache, { data }) => {
  const { deleteComment } = data;
  if (deleteComment) {
    const { comments } = cache.readQuery({ query: GET_COMMENTS });
    cache.writeQuery({
      query: GET_COMMENTS,
      data: {
        comments: {
          cursor: comments.cursor,
          comments: comments.comments.filter(comment => comment._id !== deleteComment),
          __typename: comments.__typename,
        },
      },
    });
  }
};


const CommentsList = ({ editComment }) => {
  const {
    loading,
    error,
    data,
    fetchMore,
  } = useQuery(GET_COMMENTS, {
    variables: {
      limit: 4,
    },
  });
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    update: updateCacheAfterDelete,
    // refetchQueries: ['Comments'], // TODO, ktory sposob je lepsi, napr. v suvislosti sa pageing ?
  });
  if (loading) {
    return <Loading size="large" />;
  }
  if (error) {
    return <AppError error={error} />;
  }
  return (
    <>
      <div className="columns is-multiline">
        {
          data.comments.comments.map(comment => (
            <CommentDetail
              key={comment._id}
              comment={comment}
              editComment={editComment}
              deleteComment={deleteComment}
            />
          ))
        }
      </div>
      <button
        className="button"
        type="button"
        onClick={() => {
          fetchMore({
            query: GET_COMMENTS,
            variables: {
              cursor: data.comments.cursor,
              limit: 4,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => ({
              comments: {
                cursor: fetchMoreResult.comments.cursor,
                comments: [
                  ...previousResult.comments.comments,
                  ...fetchMoreResult.comments.comments],
                __typename: previousResult.comments.__typename,
              },
            }),
          });
        }}
      >
        More comments
      </button>
    </>
  );
};

export default CommentsList;
