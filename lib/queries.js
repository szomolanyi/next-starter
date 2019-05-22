import gql from 'apollo-server-express';

export const GET_COMMENTS = gql`
  query Comments {
    comments {
      _id
      text
      title
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
    password
  }
}
`;
