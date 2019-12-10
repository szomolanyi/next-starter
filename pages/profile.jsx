// eslint-disable-next-line
import { withApollo } from '../lib/apollo';
import Layout from '../components/ui/layout';
import UserProfileForm from '../components/users/UserProfileForm';

const UserProfilePage = () => (
  <Layout>
    <section className="section">
      <h1 className="title">User profile</h1>
      <UserProfileForm />
    </section>
  </Layout>
);

export default withApollo(UserProfilePage);
