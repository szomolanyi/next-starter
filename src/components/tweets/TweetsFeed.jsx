import { useQuery } from '@apollo/react-hooks';

import Loading from '../ui/Loading';
import AppError from '../ui/AppError';

import { GET_TWEETS } from '../../queries';

import TweetDetail from './TweetDetail';

const TweetsFeed = ({ filter }) => {
  const {
    loading,
    error,
    data,
    fetchMore, //TODO add fetchMore
  } = useQuery(GET_TWEETS, {
    variables: {
      limit: 10,
      filter,
    },
  });
  if (loading) return <Loading />;
  if (error) return <AppError error={error} />;
  return (
    <>
      {
        data.tweetsFeed.tweets.map((tweet) => (
          <TweetDetail key={tweet._id} tweet={tweet} />
        ))
      }
    </>
  );
};

export default TweetsFeed;
