// eslint-disable-next-line
import { withApollo } from '../../apollo';
import Layout from '../../components/ui/layout';
import Explore from '../../components/users/Explore';

const ExplorePage = () => (
  <Layout>
    <section className="section">
      <h1 className="title">Explore</h1>
      <Explore />
    </section>
  </Layout>
);

export default withApollo(ExplorePage);
