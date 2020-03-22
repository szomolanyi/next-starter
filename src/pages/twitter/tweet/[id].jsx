import { useRouter } from 'next/router';
// eslint-disable-next-line
import { withApollo } from '../../../apollo';

import Layout from '../../../components/ui/TwitterLayout';
import Tweet from '../../../components/tweets/Tweet';

const TweetPage = () => {
  const router = useRouter();
  return (
    <Layout title="Tweet">
      <Tweet tweetId={router.query.id} />
    </Layout>
  );
};

export default withApollo(TweetPage);
