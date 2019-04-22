import gql from "graphql-tag"

export const GET_COMMENTS = gql`
  query Comments {
    comments {
      _id
      text
      title
    }
  }
`
export const ADD_COMMENT = gql`
  mutation CreateComment($text: String!, $title: String!) {
    createComment(text: $text, title: $title) {
      _id
      text
      title
    }
  }
`

export const EDIT_COMMENT = gql`
mutation EditComment($_id: String!, $text: String!, $title: String!) {
  editComment(_id: $_id, text: $text, title: $title) {
    _id
    text
    title
  }
}
`