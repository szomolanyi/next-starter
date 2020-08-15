import { useQuery } from '@apollo/client';
import { useState, useEffect, useRef } from 'react';

import LoadingSection from '../ui/LoadingSection';
import AppError from '../ui/AppError';

import { GET_TWEETS } from '../../queries';

import TweetDetail from './TweetDetail';

const TweetsFeed = ({ userId, feedType, pattern }) => {
  const initialRender = useRef(true);
  const {
    loading,
    error,
    data,
    fetchMore,
    refetch,
  } = useQuery(GET_TWEETS, {
    variables: {
      limit: 10,
      userId,
      feedType,
      pattern,
    },
  });
  const [doRefetch, setRefetch] = useState(false);
  useEffect(() => {
    if (doRefetch === true) {
      fetchMore({
        query: GET_TWEETS,
        variables: {
          cursor: data.tweetsFeed.cursor,
          limit: 10,
          userId,
          feedType,
          pattern,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          setRefetch(false);
          return {
            tweetsFeed: {
              cursor: fetchMoreResult.tweetsFeed.cursor,
              tweets: [
                ...previousResult.tweetsFeed.tweets,
                ...fetchMoreResult.tweetsFeed.tweets],
              __typename: previousResult.tweetsFeed.__typename,
            },
          };
        },
      });
    }
  }, [doRefetch]);
  const scrollListener = () => {
    const tweetDiv = document.getElementById('tweet-feed-id');
    if (tweetDiv
      && window.scrollY + window.innerHeight >= tweetDiv.clientHeight + tweetDiv.offsetTop) {
      setRefetch(true);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      refetch({
        cursor: null,
        limit: 10,
        userId,
        feedType,
        pattern,
      });
    }
  }, [pattern]);
  if (loading) return <LoadingSection />;
  if (error) return <AppError error={error} />;
  return (
    <>
      <div id="tweet-feed-id">
        {
          data.tweetsFeed.tweets.map((tweet) => (
            <TweetDetail key={tweet._id} tweet={tweet} />
          ))
        }
      </div>
    </>
  );
};

/* TODO: pridanie LoagingSection pri refetchi sposobilo,
ze sa vygeneroval scroll event a znova sa pustil refetch a cyklilo sa to , asi ... preskumaj
      {
        doRefetch && <LoadingSection />
      }
console.log(`scroll event, scrollY: ${window.scrollY}, scrollHeight:
${tweetDiv.scrollHeight}, innerHeight: ${window.innerHeight}, clientHeight:
${tweetDiv.clientHeight} offsetTop: ${tweetDiv.offsetTop} scrollTop: ${tweetDiv.scrollTop}`);
console.log(`scroll event, v1: ${window.scrollY + window.innerHeight},
v2: ${tweetDiv.clientHeight + tweetDiv.offsetTop}`);
*/

export default TweetsFeed;
