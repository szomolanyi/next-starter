import TweetForm from './TweetForm';
import TweetsFeed from './TweetsFeed';

const Tweets = () => (
  <>
    <TweetForm
      initialValues={{
        text: '',
      }}
    />
    <TweetsFeed />
  </>
);

export default Tweets;
