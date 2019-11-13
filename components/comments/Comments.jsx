import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { EDIT_COMMENT, GET_COMMENTS, ADD_COMMENT } from '../../lib/queries';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';
import EditModal from '../ui/EditModal';
import { useModal } from '../../lib/hooks';

const updateCacheAfterCreate = (cache, { data }) => {
  const { createComment } = data;
  const { comments } = cache.readQuery({ query: GET_COMMENTS });
  cache.writeQuery({
    query: GET_COMMENTS,
    data: {
      comments: {
        cursor: comments.cursor,
        comments: [createComment, ...comments.comments],
        __typename: 'CommentsFeed',
      },
    },
  });
};

const Comments = () => {
  const {
    modalOpened, hideModal, openModal, modalData,
  } = useModal(false);
  const [edit] = useMutation(EDIT_COMMENT);
  const [create] = useMutation(ADD_COMMENT, {
    update: updateCacheAfterCreate,
  });

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
