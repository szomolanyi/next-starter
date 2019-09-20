import { useQuery, useMutation } from '@apollo/react-hooks';
import { CREATE_USER, CURRENT_USER } from '../lib/queries';
import SignUpForm from './ui/SignUpForm';

const SignUp = ({ postSubmit }) => {
  const [signUp] = useMutation(CREATE_USER, {
    refetchQueries: [
      'CurrentUser',
    ],
  });
  const { loading, error, data: { currentUser } } = useQuery(CURRENT_USER);
  if (currentUser) {
    return (
      <p>
        Welcome. We have sent you email, please click confirmation link to confirm your account.
      </p>
    );
  }
  return <SignUpForm signUp={signUp} postSubmit={postSubmit} />;
};

export default SignUp;
