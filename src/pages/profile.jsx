// eslint-disable-next-line
import { withApollo } from '../apollo';
import Layout from '../components/ui/layout';
import UserProfile from '../components/users/UserProfile';

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
