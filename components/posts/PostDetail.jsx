import { useMutation, useApolloClient } from '@apollo/react-hooks';
import moment from 'moment';

import { LIKE_POST, CURRENT_USER } from '../../lib/queries';



const PostDetail = ({ post }) => {
  const [likePost] = useMutation(LIKE_POST);
  const client = useApolloClient();
  const { currentUser } = client.readQuery({ query: CURRENT_USER });
  console.log(currentUser);
  const likePostFunc = () => likePost({
    variables: {
      _id: post._id,
      userId: currentUser._id,
    },
  });
  const likedByMe = post.likes.reduce((prev, like) => prev || like._id === currentUser._id, false);
  return (
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
            <div className="level-item">
              <a aria-label="like" onClick={likePostFunc} onKeyPress={likePostFunc} role="button" tabIndex={0}>
                <span className={`icon is-small ${likedByMe ? 'has-text-danger' : 'has-text-info'}`}>
                  <i className="fas fa-heart" aria-hidden="true" />
                </span>
              </a>
              &nbsp;
              <span>{post.likes.length}</span>
            </div>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
