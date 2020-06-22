// eslint-disable-next-line
import { withApollo } from '../../client/apollo';
import Layout from '../../client/components/ui/TwitterLayout';
import Explore from '../../client/components/users/Explore';

const ExplorePage = () => (
  <Layout title="Explore">
    <Explore />
  </Layout>
);

export default withApollo(ExplorePage);
