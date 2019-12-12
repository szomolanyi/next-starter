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
      <TweetsFeed filter={
        currentUser && {
          author: currentUser._id,
        }
      }
      />
    </section>
  );
};

export default Tweets;
