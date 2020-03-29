import { useMutation } from '@apollo/react-hooks';
import { useContext } from 'react';
import Link from 'next/link';
import moment from 'moment';

import { GET_TWEETS, LIKE_TWEET, RETWEET, DELETE_TWEET } from '../../queries';
import { useUser } from '../../hooks';

import TwitterContext from '../../context';

const updateCacheAfterDelete = (userId) => (cache, { data }) => {
  const { deleteTweet } = data;
  if (deleteTweet) {
    const data1 = cache.readQuery({
      query: GET_TWEETS,
      variables: { userId },
    });
    const { tweetsFeed } = data1;
    cache.writeQuery({
      query: GET_TWEETS,
      variables: { userId },
      data: {
        tweetsFeed: {
          cursor: tweetsFeed.cursor,
          tweets: tweetsFeed.tweets.filter((tweet) => tweet._id !== deleteTweet),
          __typename: tweetsFeed.__typename,
        },
      },
    });
  }
};

const TweetDetail = ({ tweet }) => {
  const [likeTweet] = useMutation(LIKE_TWEET);
  const [retweet] = useMutation(RETWEET);
  const { currentUser } = useUser();
  const [deleteTweet] = useMutation(DELETE_TWEET, {
    update: updateCacheAfterDelete(currentUser._id),
  });
  const { openNewTweetModal } = useContext(TwitterContext);
  const likeTweetFunc = (e) => {
    e.stopPropagation();
    likeTweet({
      variables: {
        _id: tweet._id,
        userId: currentUser._id,
      },
    });
  };
  const retweetFunc = (e) => {
    e.stopPropagation();
    retweet({
      variables: {
        _id: tweet._id,
      },
    });
  };
  const openModalFunc = (e) => {
    e.stopPropagation();
    openNewTweetModal(tweet._id);
  };
  const deleteTweetFunc = (e) => {
    e.stopPropagation();
    deleteTweet({
      variables: {
        _id: tweet._id,
      },
    });
  };
  const likedByMe = tweet.likers.reduce((prev, like) => prev
    || (currentUser && like._id === currentUser._id), false);
  const likers = tweet.likers.reduce((prev, like, i) => (i === 0 ? like.email : `${prev}\n${like.email}`), '');
  const retweetedByMe = tweet.retweetedBy.reduce((prev, rby) => prev
    || (currentUser && rby._id === currentUser._id), false);
  return (
    <div className="box">
      <Link href="/twitter/tweet/[id]" as={`/twitter/tweet/${tweet._id}`}>
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src={tweet.author.avatar ? tweet.author.avatar : 'https://bulma.io/images/placeholders/128x128.png'}
                alt="Avatar"
              />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              {
                tweet.retweetedBy && tweet.retweetedBy.length > 0
                && (
                  <div className="is-size-7 has-text-grey is-italic">
                    {
                      tweet.retweetedBy.map((rby, i) => (
                        i === 0 ? rby.email : `, ${rby.email}`
                      ))
                    }
                    &nbsp;
                    retweeted
                  </div>
                )
              }
              <p>
                <Link href="/twitter/p/[id]" as={`/twitter/p/${tweet.author._id}`}>
                  <span><strong>{tweet.author.email}</strong></span>
                </Link>
                &nbsp;
                <small>{moment(tweet.createdAt).fromNow()}</small>
                {
                  tweet.replyOn && (
                    <>
                      <br />
                      <Link href="/twitter/p/[id]" as={`/twitter/p/${tweet.replyOn.author._id}`}>
                        <span>
                          <small>
                            reply on
                            &nbsp;
                            {tweet.replyOn.author.email}
                          </small>
                        </span>
                      </Link>
                    </>
                  )
                }
                <br />
                {tweet.text}
              </p>
            </div>
            <nav className="level is-mobile">
              <div className="level-item">
                <a aria-label="reply" onClick={openModalFunc} onKeyPress={openModalFunc} role="button" tabIndex={0}>
                  <span className="icon is-small">
                    <i className="fas fa-reply" aria-hidden="true" />
                  </span>
                </a>
                &nbsp;
                <span>{tweet.repliesCount}</span>
              </div>
              <div className="level-item">
                <a aria-label="retweet" onClick={retweetFunc} onKeyPress={retweetFunc} role="button" tabIndex={0}>
                  <span className={`icon is-small ${retweetedByMe ? 'has-text-danger' : 'has-text-info'}`}>
                    <i className="fas fa-retweet" aria-hidden="true" />
                  </span>
                </a>
                &nbsp;
                <span>{tweet.retweetersCount}</span>
              </div>
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
          <div className="media-right">
            {
              tweet.author._id === currentUser._id
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              && <button type="button" className="delete" onClick={deleteTweetFunc} />
            }
          </div>
        </article>
      </Link>
      <style jsx>
        {`
          article:hover {
            cursor: pointer;
            cursor: hand;
          }
        `}
      </style>
    </div>
  );
};

export default TweetDetail;
