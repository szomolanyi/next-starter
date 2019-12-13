import gql from 'graphql-tag';

export const GET_COMMENTS = gql`
  query Comments($cursor: String, $limit: Int) {
    comments(cursor: $cursor, limit: $limit) @connection(key: "comments") {
      cursor
      comments {
        _id
        text
        title
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation CreateComment($text: String!, $title: String!) {
    createComment(text: $text, title: $title) {
      _id
      text
      title
    }
  }
`;

export const EDIT_COMMENT = gql`
mutation EditComment($_id: String!, $text: String!, $title: String!) {
  editComment(_id: $_id, text: $text, title: $title) {
    _id
    text
    title
  }
}
`;

export const DELETE_COMMENT = gql`
mutation DeleteComment($_id: String!) {
  deleteComment(_id:$_id)
}
`;

const USER_FRAGMENT = gql`
fragment UserFragment on User {
  _id
  email
  firstName
  lastName
  isVerified
}
`;

export const CREATE_USER = gql`
mutation CreateUser($email: String!, $password: String!) {
  createUser(email: $email, password: $password) {
    ...UserFragment
  }
}
${USER_FRAGMENT}
`;

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...UserFragment
  }
}
${USER_FRAGMENT}
`;

export const LOGOUT_USER = gql`
mutation Logout {
  logout 
}
`;

export const CURRENT_USER = gql`
query CurrentUser {
  currentUser {
    ...UserFragment
  }
}
${USER_FRAGMENT}
`;

export const USERS = gql`
query Users {
  users {
    ...UserFragment
  }
}
${USER_FRAGMENT}
`;

export const GET_USER = gql`
query User($_id: ID!) {
  user(_id: $_id) {
    ...UserFragment
  }
}
${USER_FRAGMENT}
`;

export const FOLLOW_USER = gql`
mutation followUser($_id: ID!) {
  followUser(_id: $_id) {
    ...UserFragment
  }
}
${USER_FRAGMENT}
`;

export const EDIT_USER_PROFILE = gql`
mutation editUserProfile($firstName: String, $lastName: String) {
  editUserProfile(firstName: $firstName, lastName: $lastName) {
    firstName
    lastName
    email
  }
}
`;

export const SEND_VERIFY_EMAIL = gql`
mutation SendVerifyEmail {
  sendVerifyEmail
}
`;

export const VERIFY_EMAIL = gql`
mutation VerifyEmail($token: String!) {
  verifyEmail(token: $token) {
    code
    message
  }
}
`;

export const APP_MESSAGE = gql`
query appMessage {
  appMessage @client {
    isOpened
    component
    messages
    severity
  }
}
`;

export const SET_APP_MESSAGE = gql`
mutation setAppMessage($messages: [String], $component: String, $severity: String) {
  setAppMessage(messages: $messages, component: $component, severity: $severity) @client {
    isOpened
  }
}
`;

export const CLOSE_APP_MESSAGE = gql`
mutation closeAppMessage {
  closeAppMessage @client {
    isOpened
  }
}
`;

const TWEET_FRAGMENT = gql`
  fragment TweetParts on Tweet {
    _id
      text
      author {
        email
      }
      likers {
        _id
        email
      }
      edited
      createdAt
      retweeted {
        _id
        email
      }
  }
`;

export const GET_TWEETS = gql`
  query Tweets($cursor: String, $limit: Int, $filter: TweetFeedInput) {
    tweetsFeed(cursor: $cursor, limit: $limit, filter: $filter) @connection(key: "tweetsFeed", filter: ["filter"]) {
      cursor
      tweets {
        ...TweetParts
      }
    }
  }
  ${TWEET_FRAGMENT}
`;

export const ADD_TWEET = gql`
  mutation CreateTweet($text: String!) {
    createTweet(text: $text) {
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
