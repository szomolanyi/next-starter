import Layout from '../../components/ui/TwitterLayout';
import Tweets from '../../components/tweets/Tweets';
// eslint-disable-next-line
import { withApollo } from '../../apollo';

const PostsPage = () => (
  <Layout title="Home">
    <Tweets />
  </Layout>
);

export default withApollo(PostsPage);
