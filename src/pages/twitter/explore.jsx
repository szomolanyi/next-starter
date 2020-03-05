// eslint-disable-next-line
import { withApollo } from '../../apollo';
import Layout from '../../components/ui/TwitterLayout';
import Explore from '../../components/users/Explore';

const ExplorePage = () => (
  <Layout>
    <h1 className="title">Explore</h1>
    <Explore />
  </Layout>
);

export default withApollo(ExplorePage);
