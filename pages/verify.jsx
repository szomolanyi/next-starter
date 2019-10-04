import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Link from 'next/link';
import Layout from '../components/layout';
import { VERIFY_EMAIL, CURRENT_USER } from '../lib/queries';
import createResult from '../lib/result-codes';

/* possible states:
- logged in:
  - verified : do nothing
  - not verified : verify, but check user (server side)
- not logged in
  - verified : check on server side
  - not verified : verify
*/

const YouCanLogIn = () => (
  <p>
    Great, your account has been verified. You can now
    {' '}
    <Link href="/login">log in</Link>
    .
  </p>
);

const VerifyResult = ({ result, currentUser }) => {
  console.log({ m: 'VerifyResult', result, currentUser });
  if (!result) return null;
  if (result.code === 'OK') {
    if (currentUser) {
      return <p>Great, your account has been verified.</p>;
    }
    return <YouCanLogIn />;
  }
  return <p>{result.message}</p>;
};

const EmailVerify = ({ token }) => {
  const { loading, error, data: { currentUser }} = useQuery(CURRENT_USER);
  const [verifyEmailFunc] = useMutation(VERIFY_EMAIL, {
    refetchQueries: [
      'CurrentUser',
    ],
  });
  // TODO osetri error
  if (loading) return null; // TODO: vyries lepsie
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (currentUser && currentUser.isVerified) {
      setResult(createResult('ALREADY_VERIFIED'));
      return;
    }
    console.log('verify: sending token');
    verifyEmailFunc({ variables: { token } })
      .then(({ data: { verifyEmail } }) => {
        console.log({ m: 'verfify called', verifyEmail });
        setResult(verifyEmail);
      })
      .catch((err) => {
        console.log({ m: 'verfify error', err });
      });
  }, []);
  return (
    <Layout>
      <section className="hero">
        <div className="hero-head"><p className="is-size-2">Email verification</p></div>
        <div className="hero-body"><VerifyResult result={result} currentUser={currentUser} /></div>
      </section>
    </Layout>
  );
};

EmailVerify.getInitialProps = async ({ query: { token } }) => {
  console.log({ m: 'EmailV', token });
  if (token) {
    return {
      token,
    };
  }
  return {
    token: '',
  };
};

export default EmailVerify;

