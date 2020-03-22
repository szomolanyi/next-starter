import { useQuery } from '@apollo/react-hooks';

import { GET_TWEET } from '../../queries';
import TweetDetail from './TweetDetail';
import AppError from '../ui/AppError';

const Tweet = ({ tweetId }) => {
  const { loading, error, data } = useQuery(GET_TWEET, {
    variables: {
      _id: tweetId,
    },
  });
  if (loading) return null;
  if (error) return <AppError error={error} />;
  return (
    <>
      <TweetDetail key={data.tweet._id} tweet={data.tweet} />
      {
        data.tweet.replies
        && data.tweet.replies.map((tweet) => <TweetDetail key={tweet._id} tweet={tweet} />)
      }
    </>
  );
};

export default Tweet;
