import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import moment from 'moment';
import TweetsFeed from '../tweets/TweetsFeed';
import AppError from '../ui/AppError';
import Loading from '../ui/Loading';

// eslint-disable-next-line
import { withApollo } from '../../apollo';
import { GET_USER } from '../../queries';
import FollowButton from './FollowButton';


const UserProfile = ({ _id }) => {
  const { loading, error, data } = useQuery(GET_USER, { variables: { _id } });
  const [activeTab, setActiveTab] = useState('tweets');
  if (loading) return <Loading />;
  if (error) return <AppError error={error} />;
  return (
    <div>
      <div className="card">
        <div className="card-image">
          <figure className="image is-3by1">
            <img
              src={data.user.banner ? data.user.banner : 'https://bulma.io/images/placeholders/1280x960.png'}
              alt="Placeholder"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  src={data.user.avatar ? data.user.avatar : 'https://bulma.io/images/placeholders/96x96.png'}
                  alt="Placeholder"
                />
              </figure>
            </div>
            <div className="media-content">
              { data.user.displayName
                && <p className="title is-4">{`${data.user.displayName}`}</p>}
              <p className="subtitle is-6">{data.user.email}</p>
            </div>
          </div>

          <div className="content">
            {data.user.about}
            <p>{`Joined: ${moment(data.user.createdAt).format('LL')}`}</p>
            <FollowButton user={data.user} />
          </div>
        </div>
      </div>
      <br />
      <div className="tabs is-centered is-fullwidth">
        <ul>
          <li className={activeTab === 'tweets' ? 'is-active' : ''}>
            <a href="#" onClick={() => setActiveTab('tweets')}>Tweets</a>
          </li>
          <li className={activeTab === 'likes' ? 'is-active' : ''}>
            <a href="#" onClick={() => setActiveTab('likes')}>Likes</a>
          </li>
        </ul>
      </div>
      {
        activeTab === 'tweets' && <TweetsFeed filter={{ author: data.user._id }} />
      }
      {
        activeTab === 'likes' && <TweetsFeed filter={{ likers: data.user._id }} />
      }
    </div>
  );
};

export default withApollo(UserProfile);
