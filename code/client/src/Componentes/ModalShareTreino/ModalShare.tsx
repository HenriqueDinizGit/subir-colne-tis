import React from "react";
import './modal.css';

interface ModalProps {
  onClose: () => void;
  onShare: () => void;
}

const ModalShare: React.FC<ModalProps> = ({ onClose, onShare }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>Compartilhar Treino</h2>
        <p>Deseja compartilhar este treino?</p>
        <div className="modal-buttons">
          <button onClick={onShare} className="confirm-share">Compartilhar</button>
          <button onClick={onClose} className="cancel-share">Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalShare;
