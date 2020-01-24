// eslint-disable-next-line
import { withApollo } from '../apollo';
import Layout from '../components/ui/layout';
import UserProfileForm from '../components/users/UserProfileForm';
import CloudinaryUpload from '../components/users/CloudinaryUpload';
import { cloudinaryAvatarUploadOptions } from '../utils';

const UserProfilePage = () => (
  <Layout>
    <section className="section">
      <h1 className="title">User profile</h1>
      <UserProfileForm />
      <hr />
      <CloudinaryUpload transformations="w_200,h_200,g_face,c_fill" options={cloudinaryAvatarUploadOptions} />
    </section>
  </Layout>
);

export default withApollo(UserProfilePage);
