
import {Query} from "react-apollo"
import gql from "graphql-tag"


const CommentsList = (props) => (
  <ul>
    {props.comments.map((comment)=>(
      <li key={comment._id}>{comment.text}</li>
    ))}
  </ul>
)


export default () => (
  <Query query={gql`
  {
  comments {
    _id
    text
    title
  }
}
  `}>
    {({ loading, error, data }) => {
      console.log(`loading=${loading}`)
      console.log(data)
      console.log(error)
      if (loading) return null
      return (
        <CommentsList comments={data.comments}/>
      )
    }}
  </Query>
)
