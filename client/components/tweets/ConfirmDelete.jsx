import { useMutation } from '@apollo/client';

import { GET_TWEETS, DELETE_TWEET } from '../../queries';
import { useUser } from '../../hooks';

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

const ConfirmDelete = ({ isOpen, _id, closeModal }) => {
  const { currentUserId } = useUser();
  const [deleteTweet] = useMutation(DELETE_TWEET, {
    update: updateCacheAfterDelete(currentUserId),
  });
  const deleteTweetFunc = () => {
    deleteTweet({
      variables: {
        _id,
      },
    });
    closeModal();
  };
  if (!currentUserId) return null;
  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" />
      <div className="modal-content">
        <div className="notification is-danger">
          <p>
            This step cannot be undone.
            Tweet will be removed from your profile,
            your feed and from feed of users which retweeted or liked it.
          </p>
          <br />
          <div className="level is-mobile">
            <div className="level-left">
              <button type="button" className="button" onClick={deleteTweetFunc}>Ok</button>
            </div>
            <div className="level-right">
              <button type="button" className="button" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
