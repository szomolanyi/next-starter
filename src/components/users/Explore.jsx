import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import Link from 'next/link';
import { useDebounce } from 'use-lodash-debounce-throttle';
import moment from 'moment';
import { USERS } from '../../queries';
import Loading from '../ui/Loading';
import AppError from '../ui/AppError';
import TweetsFeed from '../tweets/TweetsFeed';
import A from '../ui/A';

const UserBox = ({ user }) => (
  <div className="box UserBox">
    <article className="media">
      <div className="media-left">
        <figure className="image is-64x64">
          <img
            src={user.avatar ? user.avatar : 'https://bulma.io/images/placeholders/128x128.png'}
            alt="Placeholder"
          />
        </figure>
      </div>
      <div className="media-content">
        <div className="content">
          {
            user.displayName
            && <div className="has-text-weight-bold">{`${user.displayName}`}</div>
          }
          <div>{user.email}</div>
          <div className="is-size-7">{moment(user.createdAt).format('LL')}</div>
          <div>{user.about}</div>
        </div>
      </div>
    </article>
    <style jsx>
      {`
      .UserBox {
        margin-bottom: 1.5rem;
      }
    `}
    </style>
  </div>
);


const SearchUsers = ({ pattern }) => {
  const { loading, error, data } = useQuery(USERS, {
    variables: { pattern },
  });
  if (loading) return <Loading />;
  if (error) return <AppError error={error} />;
  return (
    <>
      {
        data.users.map((user) => (
          <div key={user._id}>
            <Link href="/twitter/p/[id]" as={`/twitter/p/${user._id}`}>
              <a><UserBox user={user} /></a>
            </Link>
          </div>
        ))
      }
    </>
  );
};

const SearchTweets = ({ pattern }) => (
  <TweetsFeed filter={{ pattern }} />
);

const Explore = () => {
  const [searchType, setSearchType] = useState('USERS');
  const [pattern, setPattern] = useState('');
  const debouncePattern = useDebounce((p) => {
    setPattern(p);
  }, 500);
  const onChangeHandler = (e) => {
    debouncePattern(e.target.value);
  };
  return (
    <>
      <input className="input" type="input" placeholder="Search" onChange={onChangeHandler} />
      <div className="tabs is-centered">
        <ul>
          <li className={searchType === 'USERS' ? 'is-active' : ''}>
            <A onClick={() => setSearchType('USERS')}>Users</A>
          </li>
          <li className={searchType === 'TWEETS' ? 'is-active' : ''}>
            <A onClick={() => setSearchType('TWEETS')}>Tweets</A>
          </li>
        </ul>
      </div>
      {
        searchType === 'USERS' ? <SearchUsers pattern={pattern} /> : <SearchTweets pattern={pattern} />
      }
    </>
  );
};

export default Explore;
