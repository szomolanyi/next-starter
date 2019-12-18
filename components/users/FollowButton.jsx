import { useMutation } from '@apollo/react-hooks';
import { useUser, useErrorHandler } from '../../lib/hooks';
import { FOLLOW_USER, UNFOLLOW_USER } from '../../lib/queries';

const FollowButton = ({ user }) => {
  const handleErrors = useErrorHandler();
  const [followUser] = useMutation(FOLLOW_USER);
  const [unFollowUser] = useMutation(UNFOLLOW_USER);
  const { currentUser } = useUser();
  const isFollowing = currentUser && currentUser.follows.map((u) => u._id).includes(user._id);
  const followFunc = () => {
    followUser({ variables: { _id: user._id } }).catch((error) => handleErrors(error));
  };
  const unFollowFunc = () => {
    unFollowUser({ variables: { _id: user._id } }).catch((error) => handleErrors(error));
  };
  if (!currentUser) {
    return null;
  }
  return (
    isFollowing
      ? (
        <button
          className="button"
          type="button"
          onClick={unFollowFunc}
        >
      Stop following
        </button>
      ) : (
        <button
          className="button"
          type="button"
          onClick={followFunc}
        >
        Follow
        </button>
      )
  );
};

export default FollowButton;
