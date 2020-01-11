// eslint-disable-next-line
import { withApollo } from '../apollo';
import Layout from '../components/ui/layout';
import Comments from '../components/comments/Comments';

const CommentsPage = () => (
  <Layout>
    <Comments />
  </Layout>
);

export default withApollo(CommentsPage);
