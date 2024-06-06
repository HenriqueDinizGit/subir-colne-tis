import './LandingPage.css';
import React from 'react';
import HeaderMenu from '../../Componentes/HeaderMenu/HeaderMenu';
import MainMenu from '../../Componentes/MainMenu/MainMenu';

const LandingPage: React.FC = () => {
  return (
    <div className="landingpage" id='lp'>
      <header>
        <HeaderMenu />  
      </header>
      <main>
        <MainMenu />
      </main> 
    </div>
  );
}

export default LandingPage;
