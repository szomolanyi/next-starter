import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import {
  GET_COMMENTS, DELETE_COMMENT, ADD_COMMENT, EDIT_COMMENT,
} from '../../lib/queries';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';
import EditModal from '../ui/EditModal';
import AppError from '../ui/AppError';
import Loading from '../ui/Loading';
import { useModal } from '../../lib/hooks';

/*
const updateCacheAfterDelete = (cache, { data }) => {
  console.log(data);
  const { deleteComment } = data;
  if (deleteComment) {
    const { comments } = cache.readQuery({ query: GET_COMMENTS });
    cache.writeQuery({
      query: GET_COMMENTS,
      data: { comments: comments.filter(comment => comment._id !== deleteComment) },
    });
  }
};
*/

const updateCacheAfterCreate = (cache, { data }) => {
  const { createComment } = data;
  const { comments } = cache.readQuery({ query: GET_COMMENTS });
  cache.writeQuery({
    query: GET_COMMENTS,
    data: { comments: comments.concat([createComment]) },
  });
};


const Comments = () => {
  const {
    modalOpened, hideModal, openModal, modalData,
  } = useModal(false);
  const { loading, error, data } = useQuery(GET_COMMENTS);
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    // update: updateCacheAfterDelete,
    refetchQueries: ['Comments'], // TODO, ktory sposob je lepsi, napr. v suvislosti sa pageing ?
  });
  const [create] = useMutation(ADD_COMMENT, {
    update: updateCacheAfterCreate,
  });
  const [edit] = useMutation(EDIT_COMMENT);
  if (loading) {
    return <Loading size="large" />;
  }
  if (error) {
    return <AppError error={error} />;
  }
  return (
    <>
      <section className="section">
        <h1 className="title">Comments</h1>
        <CommentForm
          mutate={create}
          initialValues={{
            _id: '',
            text: '',
            title: '',
          }}
        />
      </section>
      <section className="section">
        <CommentsList
          editComment={openModal}
          comments={data.comments}
          deleteComment={deleteComment}
        />
      </section>
      <EditModal isOpen={modalOpened} close={hideModal}>
        {
          () => modalData
          && (
            <CommentForm
              mutate={edit}
              initialValues={modalData.comment}
              postSubmit={hideModal}
            />
          )
        }
      </EditModal>
    </>
  );
};

export default Comments;
