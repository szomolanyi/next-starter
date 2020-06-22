import Layout from '../../client/components/ui/TwitterLayout';
import Tweets from '../../client/components/tweets/Tweets';
// eslint-disable-next-line
import { withApollo } from '../../client/apollo';

const PostsPage = () => (
  <Layout title="Home">
    <Tweets />
  </Layout>
);

export default withApollo(PostsPage);
