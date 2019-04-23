import { Mutation } from "react-apollo"
import { GET_COMMENTS, DELETE_COMMENT } from "../lib/queries";

const columnSizer = (text) => {
  if (text.length > 200) return "column is-6"
  if (text.length > 100) return "column is-4"
  if (text.length > 100) return "column is-2"
  return "column"
}


const Comment = ({comment, openEditModal, deleteComment}) => (
  <div key={comment._id} className={columnSizer(comment.text)}>
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">{comment.title}</div>
        <button className="button" onClick={() => openEditModal({comment})}>Edit</button>
        <button className="button" onClick={() => deleteComment({variables:{_id:comment._id}})}>Delete</button>
      </div>
      <div className="card-content">
        <div className="content">{comment.text}</div>
      </div>
    </div>
  </div>
)


export default (props) => (
  <Mutation 
    mutation={DELETE_COMMENT}
    update={(cache, { data: { deleteComment } }) => {
      if (deleteComment) {
        const { comments } = cache.readQuery({ query: GET_COMMENTS });
        cache.writeQuery({
          query: GET_COMMENTS,
          data: { comments: comments.filter( comment => comment._id != props.comment._id ) },
        })
      }
    }}
  >
    {
      (mutate, {data}) => {
        console.log({data})
        return (
        <Comment deleteComment={mutate} {...props} />
      )}
    }
  </Mutation>
)
