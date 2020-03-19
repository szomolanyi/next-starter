import gql from 'graphql-tag';

export const TWEET_FRAGMENT = gql`
  fragment TweetParts on Tweet {
    _id
      text
      author {
        email
        avatar
      }
      likers {
        _id
        email
      }
      edited
      createdAt
      retweetedBy {
        _id
        email
      }
      retweetersCount
      replyOn {
        _id
      }
      repliesCount
      replies {
        _id
      }
  }
`;

export const GET_TWEETS = gql`
  query Tweets($cursor: String, $limit: Int, $userId: ID, $feedType: String, $pattern: String) {
    tweetsFeed(cursor: $cursor, limit: $limit, userId: $userId, feedType: $feedType, pattern: $pattern) @connection(key: "tweetsFeed", filter: ["userId", "feedType"]) {
      cursor
      tweets {
        ...TweetParts
      }
    }
  }
  ${TWEET_FRAGMENT}
`;

export const ADD_TWEET = gql`
  mutation CreateTweet($text: String!, $replyOn: ID) {
    createTweet(text: $text, replyOn: $replyOn) {
      ...TweetParts
    }
  }
  ${TWEET_FRAGMENT}
`;

export const LIKE_TWEET = gql`
  mutation likeTweet($_id: ID!, $userId: ID!) {
    likeTweet(_id: $_id, userId: $userId) {
      ...TweetParts
    }
  }
  ${TWEET_FRAGMENT}
`;

export const RETWEET = gql`
  mutation retweet($_id: ID!) {
    retweet(_id: $_id) {
      ...TweetParts
    }
  }
  ${TWEET_FRAGMENT}
`;
