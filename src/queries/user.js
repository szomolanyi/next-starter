import gql from 'graphql-tag';

const USER_FRAGMENT = gql`
fragment UserFragment on User {
  _id
  email
  firstName
  lastName
  displayName
  about
  isVerified
  follows {
    _id
    email
  }
  createdAt
  avatar
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

export const UNFOLLOW_USER = gql`
mutation unFollowUser($_id: ID!) {
  unFollowUser(_id: $_id) {
    ...UserFragment
  }
}
${USER_FRAGMENT}
`;

export const EDIT_USER_PROFILE = gql`
mutation editUserProfile($firstName: String, $lastName: String, $about: String) {
  editUserProfile(firstName: $firstName, lastName: $lastName, about: $about) {
    firstName
    lastName
    about
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

export const SET_IMAGE_URL = gql`
mutation SetImageUrl($url: String!, $type: String!) {
  setImageUrl(url: $url, type: $type) {
    ...UserFragment
  }
}
${USER_FRAGMENT}
`;

export const SIGN_CLOUDINARY_UPLOAD = gql`
mutation SignCloudinaryUpload($data: String!) {
  signCloudinaryUpload(data: $data)
}
`;
