// eslint-disable-next-line
import { withApollo } from '../../apollo';
import Layout from '../../components/ui/TwitterLayout';
import UserProfile from '../../components/users/UserProfile';

const UserProfilePage = () => (
  <Layout>
    <UserProfile />
  </Layout>
);

export default withApollo(UserProfilePage);
