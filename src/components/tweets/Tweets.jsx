import TweetForm from './TweetForm';
import TweetsFeed from './TweetsFeed';

const Tweets = () => (
  <div className="box">
    <TweetForm
      initialValues={{
        text: '',
      }}
    />
    <TweetsFeed />
  </div>
);

export default Tweets;
