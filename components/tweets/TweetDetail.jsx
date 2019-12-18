import { useMutation, useApolloClient } from '@apollo/react-hooks';
import moment from 'moment';

import { LIKE_TWEET, CURRENT_USER, RETWEET, GET_TWEETS } from '../../lib/queries';
import { useUser } from '../../lib/hooks';

const TweetDetail = ({ tweet }) => {
  const [likeTweet] = useMutation(LIKE_TWEET);
  const [retweet] = useMutation(RETWEET);
  const client = useApolloClient();
  const { currentUser } = useUser();
  const likeTweetFunc = () => likeTweet({
    variables: {
      _id: tweet._id,
      userId: currentUser._id,
    },
  });
  const retweetFunc = () => retweet({
    variables: {
      _id: tweet._id,
    },
  });
  const likedByMe = tweet.likers.reduce((prev, like) => prev || (currentUser && like._id === currentUser._id), false);
  const likers = tweet.likers.reduce((prev, like, i) => (i === 0 ? like.email : `${prev}\n${like.email}`), '');
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
            {
              tweet.retweeted
              && (
                <div className="is-size-7 has-text-grey is-italic">
                  {tweet.retweeted.email}
                  &nbsp;
                  retweeted
                </div>
              )
            }
            <p>
              <strong>{tweet.author.email}</strong>
              &nbsp;
              <small>{moment(tweet.createdAt).fromNow()}</small>
              <br />
              {tweet.text}
            </p>
          </div>
          <nav className="level is-mobile">
            <a className="level-item" aria-label="reply">
              <span className="icon is-small">
                <i className="fas fa-reply" aria-hidden="true" />
              </span>
            </a>
            <a className="level-item" aria-label="retweet" onClick={retweetFunc} onKeyPress={retweetFunc} role="button" tabIndex={0}>
              <span className="icon is-small">
                <i className="fas fa-retweet" aria-hidden="true" />
              </span>
            </a>
            <div className="level-item">
              <a aria-label="like" onClick={likeTweetFunc} onKeyPress={likeTweetFunc} role="button" tabIndex={-1} data-tooltip={likers}>
                <span className={`icon is-small ${likedByMe ? 'has-text-danger' : 'has-text-info'}`}>
                  <i className="fas fa-heart" aria-hidden="true" />
                </span>
              </a>
              &nbsp;
              <span>{tweet.likers.length}</span>
            </div>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default TweetDetail;
