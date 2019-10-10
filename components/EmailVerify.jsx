import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Link from 'next/link';
import { VERIFY_EMAIL, CURRENT_USER } from '../lib/queries';
import createResult from '../lib/result-codes';
import Loading from '../components/ui/Loading';

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

const EmailVerify2 = ({ token, currentUser }) => {
  const [verifyEmailFunc] = useMutation(VERIFY_EMAIL, {
    refetchQueries: [
      'CurrentUser',
    ],
  });
  // TODO osetri error
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
  return <VerifyResult result={result} currentUser={currentUser} />;
};

const EmailVerify = (props) => {
  const { loading, error, data } = useQuery(CURRENT_USER);
  if (loading) return <Loading size="large" />;
  if (error) return null; /* error handled is header */
  const currentUser = data ? data.currentUser : null;
  return <EmailVerify2 {...props} currentUser={currentUser} />;
};

export default EmailVerify;
