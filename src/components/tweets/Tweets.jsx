import TweetForm from './TweetForm';
import TweetsFeed from './TweetsFeed';

const Tweets = () => (
  <section className="section">
    <div className="box">
      <TweetForm
        initialValues={{
          text: '',
        }}
      />
    </div>
    <TweetsFeed />
  </section>
);

export default Tweets;
