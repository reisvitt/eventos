import React from "react";
import "./styles.css";

const Modal = ({ id = "modal", onClose = () => {}, children }) => {
  const handleOutSideClick = (e) => {
    if (e.target.id == id) onClose();
  };

  return (
    //vai deixar a tela escura
    <div id="modal" className="modal" onClick={handleOutSideClick}>
      <h1>Modal</h1>
    </div>
  );
};

export default Modal;
