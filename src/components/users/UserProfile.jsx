// eslint-disable-next-line
import UserProfileForm from './UserProfileForm';
import UserImageUpload from './ImageUpload';

const UserProfile = () => (
  <>
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
  </>
);

export default UserProfile;
