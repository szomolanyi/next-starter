import { useMutation } from '@apollo/client';
import { useUser } from '../../hooks';
import { FOLLOW_USER, UNFOLLOW_USER, GET_TWEETS } from '../../queries';
import MutateButton from '../ui/MutateButton';

const FollowButton = ({ user }) => {
  const [followUser] = useMutation(FOLLOW_USER);
  const [unFollowUser] = useMutation(UNFOLLOW_USER);
  const { currentUser } = useUser();
  const isFollowing = currentUser && currentUser.follows.map((u) => u._id).includes(user._id);
  if (!currentUser) {
    return null;
  }
  const mutateOpts = {
    variables: { _id: user._id },
    refetchQueries: [{
      query: GET_TWEETS,
    }],
  };
  return (
    isFollowing
      ? (
        <MutateButton
          mutateOpts={mutateOpts}
          mutateFunc={unFollowUser}
          title="Stop following"
        />
      )
      : (
        <MutateButton
          mutateOpts={mutateOpts}
          mutateFunc={followUser}
          title="Follow"
        />
      )
  );
};

export default FollowButton;
