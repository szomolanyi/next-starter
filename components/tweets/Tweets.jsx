import { useQuery } from '@apollo/react-hooks';

import Loading from '../ui/Loading';
import AppError from '../ui/AppError';

import { GET_TWEETS } from '../../lib/queries';

import TweetForm from './TweetForm';
import TweetDetail from './TweetDetail';

const Tweets = () => {
  const {
    loading,
    error,
    data,
    fetchMore,
  } = useQuery(GET_TWEETS, {
    variables: {
      limit: 10,
    },
  });
  if (loading) return <Loading />;
  if (error) return <AppError error={error} />;
  return (
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box">
            <TweetForm
              initialValues={{
                text: '',
              }}
            />
          </div>
        </div>
      </div>
      {
        data.tweetsFeed.tweets.map(tweet => (
          <div className="columns is-centered" key={tweet._id}>
            <div className="column is-half">
              <TweetDetail tweet={tweet} />
            </div>
          </div>
        ))
      }
    </section>
  );
};

export default Tweets;
