// eslint-disable-next-line
import { withApollo } from '../../client/apollo';
import Layout from '../../client/components/ui/TwitterLayout';
import UserProfile from '../../client/components/users/UserProfile';

const UserProfilePage = () => (
  <Layout title="My profile">
    <UserProfile />
  </Layout>
);

export default withApollo(UserProfilePage);
