// eslint-disable-next-line
import { withApollo } from '../apollo';
import Layout from '../components/ui/layout';
import UserProfileForm from '../components/users/UserProfileForm';
import UserImageUpload from '../components/users/ImageUpload';

const UserProfilePage = () => (
  <Layout>
    <section className="section">
      <h1 className="title">User profile</h1>
      <UserProfileForm />
      <hr />
      <UserImageUpload
        type="avatar"
        transformations="w_200,h_200,g_face,c_fill"
        title="Upload your avatar"
        imageClassName="is-128x128"
      />
      <hr />
      <UserImageUpload
        type="banner"
        transformations="g_auto,c_fill,ar_3"
        title="Upload banner"
        imageClassName="is-3by1"
      />
    </section>
  </Layout>
);

export default withApollo(UserProfilePage);
