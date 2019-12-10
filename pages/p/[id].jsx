import { useRouter } from 'next/router';
// eslint-disable-next-line
import { withApollo } from '../../lib/apollo';
import Layout from '../../components/ui/layout';

const ProfilePage = () => {
  const router = useRouter();
  return (
    <Layout>
      <section className="section">
        <h1 className="title">
          User profile
          {` ${router.query.id}`}
        </h1>
      </section>
    </Layout>
  );
};

export default withApollo(ProfilePage);
