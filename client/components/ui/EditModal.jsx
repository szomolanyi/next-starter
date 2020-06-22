import React from 'react';

const EditModal = ({ children, isOpen, close }) => (
  <div className={`modal ${isOpen ? 'is-active' : ''}`}>
    <div className="modal-background" />
    <div className="modal-content">
      <div className="box">
        {
          children()
        }
      </div>
    </div>
    <button type="button" className="modal-close is-large" aria-label="close" onClick={close} />
  </div>
);


export default EditModal;
