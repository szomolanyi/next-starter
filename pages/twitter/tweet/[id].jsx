import { useRouter } from 'next/router';
// eslint-disable-next-line
import { withApollo } from '../../../client/apollo';

import Layout from '../../../client/components/ui/TwitterLayout';
import Tweet from '../../../client/components/tweets/Tweet';

const TweetPage = () => {
  const router = useRouter();
  return (
    <Layout title="Tweet">
      <Tweet tweetId={router.query.id} />
    </Layout>
  );
};

export default withApollo(TweetPage);
