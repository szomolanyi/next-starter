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

export const CREATE_USER = gql`
mutation CreateUser($email: String!, $password: String!) {
  createUser(email: $email, password: $password) {
    _id
    email
  }
}
`;

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    email
    isVerified
  }
}
`;

export const LOGOUT_USER = gql`
mutation Logout {
  logout 
}
`;

export const CURRENT_USER = gql`
query CurrentUser {
  currentUser {
    email
    isVerified
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

export const GET_POSTS = gql`
  query Posts($cursor: String, $limit: Int) {
    postsFeed(cursor: $cursor, limit: $limit) @connection(key: "postsFeed") {
      cursor
      posts {
        _id
        text
        author {
          email
        }
        likes
        edited
        createdAt
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation CreatePost($text: String!) {
    createPost(text: $text) {
      _id
      text
      author {
        email
      }
      likes
      edited
      createdAt
    }
  }
`;
