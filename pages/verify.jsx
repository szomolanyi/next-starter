import { useRouter } from 'next/router';
// eslint-disable-next-line
import { withApollo } from '../lib/apollo';
import Layout from '../components/ui/layout';
import EmailVerify from '../components/users/EmailVerify';

const EmailVerifyPage = () => {
  const router = useRouter();
  const token = router.query.token || '';
  console.log(`EmailVerifyPage token=${token}`);
  return (
    <Layout>
      <section className="hero">
        <div className="hero-head"><p className="is-size-2">Email verification</p></div>
        <div className="hero-body"><EmailVerify token={token} /></div>
      </section>
    </Layout>
  );
};
export default withApollo(EmailVerifyPage);
