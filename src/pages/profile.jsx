// eslint-disable-next-line
import { withApollo } from '../apollo';
import Layout from '../components/ui/layout';
import UserProfileForm from '../components/users/UserProfileForm';
import AvatarUpload from '../components/users/AvatarUpload';

const UserProfilePage = () => (
  <Layout>
    <section className="section">
      <h1 className="title">User profile</h1>
      <UserProfileForm />
      <hr />
      <AvatarUpload />
    </section>
  </Layout>
);

export default withApollo(UserProfilePage);
