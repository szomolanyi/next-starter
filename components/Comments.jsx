import React from 'react';
import { graphql, compose } from 'react-apollo';

import {
  GET_COMMENTS, DELETE_COMMENT, ADD_COMMENT, EDIT_COMMENT,
} from '../lib/queries';
import CommentsList from './ui/CommentsList';
import CommentForm from './ui/CommentForm';
import EditModal from './ui/EditModal';
import { useModal } from '../lib/hooks';

const Comments = ({
  data, create, edit, deleteComment,
}) => {
  const {
    modalOpened, hideModal, openModal, modalData,
  } = useModal(false);
  return (
    <React.Fragment>
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
        <CommentsList editComment={openModal} data={data} deleteComment={deleteComment} />
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
    </React.Fragment>
  );
};

export default compose(
  graphql(GET_COMMENTS),
  graphql(DELETE_COMMENT, {
    options: {
      update: (cache, { data: { deleteComment } }) => {
        if (deleteComment) {
          const { comments } = cache.readQuery({ query: GET_COMMENTS });
          cache.writeQuery({
            query: GET_COMMENTS,
            data: { comments: comments.filter(comment => comment._id !== deleteComment) },
          });
        }
      },
    },
    props: ({ mutate, ownProps }) => ({
      deleteComment: mutate,
      ...ownProps,
    }),
  }),
  graphql(ADD_COMMENT, {
    props: ({ mutate, ownProps }) => ({
      create: mutate,
      initialValues: {
        _id: '',
        text: '',
        title: '',
      },
      ...ownProps,
    }),
    options: {
      update: (cache, { data: { createComment } }) => {
        const { comments } = cache.readQuery({ query: GET_COMMENTS });
        cache.writeQuery({
          query: GET_COMMENTS,
          data: { comments: comments.concat([createComment]) },
        });
      },
    },
  }),
  graphql(EDIT_COMMENT, {
    props: ({ mutate, ownProps }) => ({
      edit: mutate,
      ...ownProps,
    }),
  }),
)(Comments);
