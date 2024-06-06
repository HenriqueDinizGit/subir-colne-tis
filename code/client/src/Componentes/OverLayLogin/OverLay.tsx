import React from 'react';
import './OverLay.css';

interface OverlayProps {
  isSignUp: boolean;
  onToggleOverlay: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ isSignUp, onToggleOverlay }) => {
  return (
    <div className="overlay-container">
      <div className="overlay">
        <div className={`overlay-panel overlay-left ${isSignUp ? '' : 'overlay-panel-active'}`}>
          <h1>Bem Vindo de volta!</h1>
          <p>Para se manter conectado conosco, faça login com suas informações</p>
          <button className="btn" onClick={onToggleOverlay}>Log In</button>
        </div>
        <div className={`overlay-panel overlay-right ${isSignUp ? 'overlay-panel-active' : ''}`}>
          <h1>Olá Amigo!</h1>
          <p>Insira seus dados pessoais e comece sua jornada conosco</p>
          <button className="btn" onClick={onToggleOverlay}>Cadastro</button>
        </div>
      </div>
    </div>
  );
}

export default Overlay;
