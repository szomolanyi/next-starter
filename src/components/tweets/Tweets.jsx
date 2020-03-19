import TweetForm from './TweetForm';
import TweetsFeed from './TweetsFeed';

import { useUser } from '../../hooks';

const Tweets = () => {
  const user = useUser();
  const userId = user.currentUser ? user.currentUser._id : null;
  return (
    <>
      <TweetForm
        initialValues={{
          text: '',
        }}
      />
      <TweetsFeed userId={userId} />
    </>
  );
};

export default Tweets;
