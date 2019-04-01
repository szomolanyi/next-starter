
const CommentModal = (props) => {
  console.log(props)
  return (
    <div className={`modal ${props.isOpen?"is-active":""}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        {
          props.data && 
          <p>Toto je modal, editujeme {props.data?props.data._id:""}</p>
        }
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={props.hide}></button>
    </div>
  )
}

export default CommentModal
