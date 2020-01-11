import Layout from '../components/ui/layout';
import Tweets from '../components/tweets/Tweets';
// eslint-disable-next-line
import { withApollo } from '../apollo';

const PostsPage = () => (
  <Layout>
    <Tweets />
  </Layout>
);

export default withApollo(PostsPage);
