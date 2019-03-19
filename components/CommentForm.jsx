import gql from "graphql-tag"
import {Mutation} from "react-apollo"

const CommentForm = (props) => {
  let title
  let text

  return (
    <form onSubmit={ e => {
    e.preventDefault()
    props.addComment({ variables: { title: title.value, text: text.value  } })
    title.value = ""
    text.value = ""
    }}>
      <input className="input" type="text" placeholder="Title" ref={node => {
        title = node;
      }}/>
      <textarea className="textarea" placeholder="Write your comment" ref={node => {
        text = node;
      }}></textarea>
      <input className="button" type="submit" value="Submit" />
    </form>)
}


const ADD_COMMENT = gql`
  mutation CreateComment($text: String!, $title: String!) {
    createComment(text: $text, title: $title) {
      text
      title
    }
  }
`

export default () => (
  <Mutation mutation={ADD_COMMENT}>
    {
      (addComment, {data}) => (
        <CommentForm addComment={addComment} />
      )
    }

  </Mutation>
)
