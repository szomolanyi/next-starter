import { useQuery, useMutation, useState } from '@apollo/react-hooks';
import { useDebounce } from 'use-lodash-debounce-throttle';

import CommentDetail from './CommentDetail';
import AppError from '../ui/AppError';
import LoadingSection from '../ui/LoadingSection';
import {
  GET_COMMENTS, DELETE_COMMENT,
} from '../../queries';

const updateCacheAfterDelete = (cache, { data }) => {
  const { deleteComment } = data;
  if (deleteComment) {
    const { comments } = cache.readQuery({ query: GET_COMMENTS });
    cache.writeQuery({
      query: GET_COMMENTS,
      data: {
        comments: {
          cursor: comments.cursor,
          comments: comments.comments.filter((comment) => comment._id !== deleteComment),
          __typename: comments.__typename,
        },
      },
    });
  }
};

const CommentsListInternal = ({
  loading,
  error,
  data,
  editComment,
  fetchMore,
  searchPattern,
}) => {
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    update: updateCacheAfterDelete,
    // refetchQueries: ['Comments'], // TODO, ktory sposob je lepsi, napr. v suvislosti sa pageing ?
  });
  if (loading) {
    return <LoadingSection size="large" />;
  }
  if (error) {
    return <AppError error={error} />;
  }
  return (
    <>
      <div className="columns is-multiline">
        {
          data.comments.comments.map((comment) => (
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
              searchPattern,
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

const CommentsList = ({ editComment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    loading,
    error,
    data,
    fetchMore,
    refetch,
  } = useQuery(GET_COMMENTS, {
    variables: {
      limit: 4,
    },
  });
  const debouncedSearchHandler = useDebounce((searchPattern) => {
    setSearchTerm(searchPattern);
    refetch({
      limit: 4,
      searchPattern,
    });
  }, 200);
  return (
    <>
      <input
        type="text"
        className="input"
        placeholder="Filter comments"
        onChange={(event) => debouncedSearchHandler(event.target.value)}
      />
      <hr />
      <CommentsListInternal
        loading={loading}
        error={error}
        data={data}
        editComment={editComment}
        fetchMore={fetchMore}
        searchPattern={searchTerm}
      />
    </>
  );
};

export default CommentsList;
