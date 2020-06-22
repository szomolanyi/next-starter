// eslint-disable-next-line
import { withApollo } from '../client/apollo';
import Layout from '../client/components/ui/layout';
import Comments from '../client/components/comments/Comments';

const CommentsPage = () => (
  <Layout>
    <Comments />
  </Layout>
);

export default withApollo(CommentsPage);
