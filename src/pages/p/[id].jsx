import { useRouter } from 'next/router';
// eslint-disable-next-line
import { withApollo } from '../../apollo';
import Layout from '../../components/ui/layout';
import UserProfile from '../../components/users/UserProfile';

const ProfilePage = () => {
  const router = useRouter();
  return (
    <Layout>
      <section className="section">
        <UserProfile _id={router.query.id} />
      </section>
    </Layout>
  );
};

export default withApollo(ProfilePage);
