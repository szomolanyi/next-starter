
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
        <div key={comment._id} className={columnSizer(comment.text)}>
          <div className="card">
            <div className="card-header">
              <div className="card-header-title">{comment.title}</div>
              <button className="button" onClick={() => props.openEditModal({comment})}>Edit</button>
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

export default (props) => (
  <Query query={GET_COMMENTS}>
    {({ loading, error, data }) => {
      if (error) {
        console.log(error) //todo: handle errors
        return null
      }
      if (loading) return null
      return (
        <CommentsList comments={data.comments} {...props}/>
      )
    }}
  </Query>
)
