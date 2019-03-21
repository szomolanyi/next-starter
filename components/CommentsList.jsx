
import {Query} from "react-apollo"
import { GET_COMMENTS } from "../lib/queries"


const columnSizer = (text) => {
  if (text.length > 200) return "column is-6"
  if (text.length > 100) return "column is-4"
  if (text.length > 100) return "column is-2"
  return "column"
}

const CommentsList = (props) => (
  <div className="columns is-multiline">
    {
      props.comments.map((comment)=>(
        <div className={columnSizer(comment.text)}>
          <div className="card" key={comment._id}>
            <div className="card-header">
              <div className="card-header-title">{comment.title}</div>
            </div>
            <div className="card-content">
              <div className="content">{comment.text}</div>
            </div>
          </div>
        </div>
      ))
    }
  </div>
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
