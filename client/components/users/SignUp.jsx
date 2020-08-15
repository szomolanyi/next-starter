import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../queries';
import SignUpForm from './SignUpForm';
import Loading from '../ui/Loading';
import { useUser } from '../../hooks';

const SignUp = ({ postSubmit }) => {
  const [signUp] = useMutation(CREATE_USER, {
    refetchQueries: [
      'CurrentUser',
    ],
  });
  const { loading, currentUser } = useUser();
  if (loading) {
    return <Loading size="large" />;
  }
  if (currentUser) {
    return (
      <p>
        Welcome. We have sent you email to confirm your identity.
        Please click on link to confirm your account.
      </p>
    );
  }
  return <SignUpForm signUp={signUp} postSubmit={postSubmit} />;
};

export default SignUp;
