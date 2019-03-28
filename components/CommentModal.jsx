
const CommentModal = (props) => {
  
  return (
    <div className={`modal ${props.isOpen?"is-active":""}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <p>Toto je modal</p>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={props.hide}></button>
    </div>
  )
}

export default CommentModal
