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
