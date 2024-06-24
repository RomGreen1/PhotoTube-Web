import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ show, onClose, onConfirm, name }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay-delete">
      <div className="modal-content-delete">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this {name}?</p>
        <div className="modal-buttons-delete">
          <button className="btn-confirm-delete" onClick={onConfirm}>Yes</button>
          <button className="btn-cancel-delete" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
