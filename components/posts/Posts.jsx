import { useQuery } from '@apollo/react-hooks';

import moment from 'moment';

import Loading from '../ui/Loading';
import AppError from '../ui/AppError';

import { GET_POSTS } from '../../lib/queries';

import PostForm from './PostForm';

const Posts = () => {
  const {
    loading,
    error,
    data,
    fetchMore,
  } = useQuery(GET_POSTS, {
    variables: {
      limit: 10,
    },
  });
  if (loading) return <Loading />;
  if (error) return <AppError error={error} />;
  return (
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box">
            <PostForm />
          </div>
        </div>
      </div>
      {
        data.postsFeed.posts.map(post => (
          <div className="columns is-centered" key={post._id}>
            <div className="column is-half">
              <div className="box">
                <article className="media">
                  <div className="media-left">
                    <figure className="image is-64x64">
                      <img src="https://bulma.io/images/placeholders/128x128.png" alt="Avatar" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>{post.author.email}</strong>
                        &nbsp;
                        <small>@johnsmith</small>
                        &nbsp;
                        <small>{moment(post.createdAt).fromNow()}</small>
                        <br />
                        {post.text}
                      </p>
                    </div>
                    <nav className="level is-mobile">
                      <div className="level-left">
                        <a className="level-item" aria-label="reply">
                          <span className="icon is-small">
                            <i className="fas fa-reply" aria-hidden="true" />
                          </span>
                        </a>
                        <a className="level-item" aria-label="retweet">
                          <span className="icon is-small">
                            <i className="fas fa-retweet" aria-hidden="true" />
                          </span>
                        </a>
                        <a className="level-item" aria-label="like">
                          <span className="icon is-small">
                            <i className="fas fa-heart" aria-hidden="true" />
                          </span>
                        </a>
                      </div>
                    </nav>
                  </div>
                </article>
              </div>
            </div>
          </div>
        ))
      }
    </section>
  );
};

export default Posts;

/*
import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { EDIT_COMMENT } from '../../lib/queries';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';
import EditModal from '../ui/EditModal';
import { useModal } from '../../lib/hooks';

const Comments = () => {
  const {
    modalOpened, hideModal, openModal, modalData,
  } = useModal(false);
  const [edit] = useMutation(EDIT_COMMENT);
  return (
    <>
      <section className="section">
        <h1 className="title">Comments</h1>
        <CommentForm
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
*/