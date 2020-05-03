import TweetForm from './TweetForm';
import TweetsFeed from './TweetsFeed';

import { useUser } from '../../hooks';

const Tweets = () => {
  const { currentUserId } = useUser();
  return (
    <>
      <TweetForm
        initialValues={{
          text: '',
        }}
      />
      <TweetsFeed userId={currentUserId} />
    </>
  );
};

export default Tweets;
