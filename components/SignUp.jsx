import { useQuery, useMutation } from '@apollo/react-hooks';
import { CREATE_USER, CURRENT_USER } from '../lib/queries';
import SignUpForm from './ui/SignUpForm';
import Loading from './ui/Loading';

const SignUp = ({ postSubmit }) => {
  const [signUp] = useMutation(CREATE_USER, {
    refetchQueries: [
      'CurrentUser',
    ],
  });
  const { loading, error, data } = useQuery(CURRENT_USER);
  if (error) {
    return null; /* error is handled and show in header component already */
  }
  if (loading) {
    return <Loading size="large" />;
  }
  const { currentUser } = data;
  if (currentUser) {
    return (
      <p>
        Welcome. We have sent you email to confirm your identity. Please click on link to confirm your account.
      </p>
    );
  }
  return <SignUpForm signUp={signUp} postSubmit={postSubmit} />;
};

export default SignUp;
