import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Link from 'next/link';
import { VERIFY_EMAIL } from '../../queries';
import { useErrorHandler, useUser } from '../../hooks';
import createResult from '../../../lib/result-codes';
import LoadingSection from '../ui/LoadingSection';

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
  const handleErrors = useErrorHandler();
  const [verifyEmailFunc] = useMutation(VERIFY_EMAIL, {
    refetchQueries: [
      'CurrentUser',
    ],
  });
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (currentUser && currentUser.isVerified) {
      setResult(createResult('ALREADY_VERIFIED'));
      return;
    }
    verifyEmailFunc({ variables: { token } })
      .then(({ data: { verifyEmail } }) => {
        setResult(verifyEmail);
      })
      .catch((err) => {
        handleErrors(err);
      });
  }, []);
  return <VerifyResult result={result} currentUser={currentUser} />;
};

const EmailVerify = (props) => {
  const { loading, currentUser } = useUser();
  if (loading) return <LoadingSection size="large" />;
  return <EmailVerify2 {...props} currentUser={currentUser} />;
};

export default EmailVerify;
