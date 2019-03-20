
import {Query} from "react-apollo"
import { GET_COMMENTS } from "../lib/queries"


const CommentsList = (props) => (
  <ul>
    {props.comments.map((comment)=>(
      <li key={comment._id}>{comment.title}:{comment.text}</li>
    ))}
  </ul>
)

export default () => (
  <Query query={GET_COMMENTS}>
    {({ loading, error, data }) => {
      if (loading) return null
      return (
        <CommentsList comments={data.comments}/>
      )
    }}
  </Query>
)
