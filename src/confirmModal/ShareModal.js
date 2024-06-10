// Modal.js
import React from 'react';
import { FaWhatsapp, FaGoogleDrive } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { SiGmail } from 'react-icons/si';
import './ShareModal.css'; // You can style your modal using this CSS file

const ShareModal = ({ show, handleClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop-share">
      <div className="modal-content-share">
        <button className="close-button-share" onClick={handleClose}>
          <AiFillCloseCircle size={30} />
        </button>
        <div className="icon-container-share">
        <img src={require('../icons/gmail.png')}  alt="WhatsApp" className="icon-img-share" />
          <img src={require('../icons/whatsapp.png')}  alt="Gmail" className="icon-img-share" />
          <img src={require('../icons/drive.png')}  alt="Drive" className="icon-img-share" />
        </div>
      </div>
    </div>
  );
};

export default ShareModal;