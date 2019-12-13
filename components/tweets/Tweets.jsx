import TweetForm from './TweetForm';
import TweetsFeed from './TweetsFeed';

import { useUser } from '../../lib/hooks';

const Tweets = () => {
  const { currentUser } = useUser();
  return (
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
};

export default Tweets;
