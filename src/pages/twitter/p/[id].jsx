import { useRouter } from 'next/router';
// eslint-disable-next-line
import { withApollo } from '../../../apollo';
import Layout from '../../../components/ui/TwitterLayout';
import TwitterUserProfile from '../../../components/users/TwitterUserProfile';

const ProfilePage = () => {
  const router = useRouter();
  return (
    <Layout title="User profile">
      <TwitterUserProfile _id={router.query.id} />
    </Layout>
  );
};

export default withApollo(ProfilePage);
