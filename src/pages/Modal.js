import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  return ReactDOM.createPortal(
    <div className="Modal">
        <div className="modal-content">
            <p>Some text in the Modal..</p>
        </div>
      
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;