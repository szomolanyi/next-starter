// eslint-disable-next-line
import { withApollo } from '../lib/apollo';
import Layout from '../components/ui/layout';
import Comments from '../components/comments/Comments';

const CommentsPage = () => (
  <Layout>
    <Comments />
  </Layout>
);

export default withApollo(CommentsPage);
