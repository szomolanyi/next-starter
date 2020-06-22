import { useRouter } from 'next/router';
// eslint-disable-next-line
import { withApollo } from '../../../client/apollo';
import Layout from '../../../client/components/ui/TwitterLayout';
import TwitterUserProfile from '../../../client/components/users/TwitterUserProfile';

const ProfilePage = () => {
  const router = useRouter();
  return (
    <Layout title="User profile">
      <TwitterUserProfile _id={router.query.id} />
    </Layout>
  );
};

export default withApollo(ProfilePage);
