// eslint-disable-next-line
import { withApollo } from '../client/apollo';
import Layout from '../client/components/ui/layout';
import UserProfile from '../client/components/users/UserProfile';

const UserProfilePage = () => (
  <Layout>
    <section className="section">
      <h1 className="title">User profile</h1>
      <hr />
      <UserProfile />
    </section>
  </Layout>
);

export default withApollo(UserProfilePage);
