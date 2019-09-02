import { useEffect, useState } from 'react';
import { compose, graphql } from 'react-apollo';
import Link from 'next/link';
import Layout from '../components/layout';
import { VERIFY_EMAIL, CURRENT_USER } from '../lib/queries';
import createResult from '../lib/result-codes';
import { handleErrorUI } from '../lib/utils';

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

const EmailVerify = ({ token, mutate, data: { currentUser, loading } }) => {
  if (loading) return null; // TODO: vyries lepsie
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (currentUser && currentUser.isVerified) {
      setResult(createResult('ALREADY_VERIFIED'));
      return;
    }
    console.log('verify: sending token');
    mutate({ variables: { token } })
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

EmailVerify.getInitialProps = async ({ req }) => {
  if (req) {
    return {
      token: req.query.token,
    };
  }
  return {
    token: '',
  };
};

export default compose(
  graphql(VERIFY_EMAIL, {
    options: {
      refetchQueries: [
        'CurrentUser',
      ],
    },
  }),
  graphql(CURRENT_USER),
)(EmailVerify);
