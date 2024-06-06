import React, { useState } from 'react';
import SignUp from '../../Componentes/SignUp/SignUp';
import SignIn from '../../Componentes/SignIn/SignIn';
import Overlay from '../../Componentes/OverLayLogin/OverLay';
import './Login.css';

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const handleToggleOverlay = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className='login-container'>
      <div className={`container-login ${isSignUp ? 'right-panel-active' : ''}`}>

          <SignUp />


          <SignIn />

        <Overlay isSignUp={isSignUp} onToggleOverlay={handleToggleOverlay} />
      </div>
    </div>
  );
}

export default Login;
