import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import { USERS } from '../../lib/queries';
import Loading from '../ui/Loading';

const Explore = () => {
  const { loading, data, error } = useQuery(USERS);
  if (loading) return <Loading />;
  return (
    <div>
      {
        data.users.map((user) => (
          <div key={user._id}>
            <Link href="/p/[id]" as={`/p/${user._id}`}>
              <a>{user.email}</a>
            </Link>
          </div>
        ))
      }
    </div>
  );
};

export default Explore;
