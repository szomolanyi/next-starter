
import CommentForm from './CommentForm'

const CommentModal = (props) => {
  const {data}=props
  console.log(props)
  return (
    <div className={`modal ${props.isOpen?"is-active":""}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        {
          data && 
          <div className="box">
            <CommentForm initialValues={data.comment} postSubmit={props.hide}/>
          </div>
        }
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={props.hide}></button>
    </div>
  )
}

export default CommentModal
