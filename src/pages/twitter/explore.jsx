// eslint-disable-next-line
import { withApollo } from '../../apollo';
import Layout from '../../components/ui/TwitterLayout';
import Explore from '../../components/users/Explore';

const ExplorePage = () => (
  <Layout title="Explore">
    <Explore />
  </Layout>
);

export default withApollo(ExplorePage);
