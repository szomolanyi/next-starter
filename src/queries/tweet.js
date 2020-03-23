import gql from 'graphql-tag';

export const TWEET_FRAGMENT = gql`
  fragment TweetParts on Tweet {
    _id
    text
    author {
      _id
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
      author {
        _id
        email
      }
    }
    repliesCount
  }
`;

export const TWEET_DETAIL_FRAGMENT = gql`
  fragment TweetDetailParts on Tweet {
    _id
    text
    author {
      _id
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
      author {
        email
      }
    }
    repliesCount
    replies {
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
        author {
          email
        }
      }
      repliesCount
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

export const GET_TWEET = gql`
  query Tweet($_id: ID) {
    tweet(_id: $_id) {
      ...TweetDetailParts
    }
  }
  ${TWEET_DETAIL_FRAGMENT}
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
