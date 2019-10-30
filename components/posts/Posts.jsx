import { useQuery } from '@apollo/react-hooks';

import Loading from '../ui/Loading';
import AppError from '../ui/AppError';

import { GET_POSTS } from '../../lib/queries';

import PostForm from './PostForm';
import PostDetail from './PostDetail';

const Posts = () => {
  const {
    loading,
    error,
    data,
    fetchMore,
  } = useQuery(GET_POSTS, {
    variables: {
      limit: 10,
    },
  });
  if (loading) return <Loading />;
  if (error) return <AppError error={error} />;
  return (
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box">
            <PostForm />
          </div>
        </div>
      </div>
      {
        data.postsFeed.posts.map(post => (
          <div className="columns is-centered" key={post._id}>
            <div className="column is-half">
              <PostDetail post={post} />
            </div>
          </div>
        ))
      }
    </section>
  );
};

export default Posts;
