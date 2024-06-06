import './MainMenu.css';
import React, { useEffect, useState } from 'react';
import BtnMenu from '../BtnMenu/BtnMenu';

    const MainMenu: React.FC = () => {
        const [animate, setAnimate] = useState(false);
    
        useEffect(() => {
            // Ativa a animação após um pequeno atraso para permitir a renderização inicial
            const timer = setTimeout(() => {
                setAnimate(true);
            }, 100);
    
            return () => clearTimeout(timer);
        }, []);

    return (
        <div className="main-content">
             <h1 className="primary-text">Desperte seu potencial, fortaleça seu corpo, transforme sua vida!</h1>
             <h2 className={`second-text ${animate ? 'slide-in' : ''}`}>Se inscreva agora e comece sua mudança</h2>
             <BtnMenu/>   
        </div>
    );
}

export default MainMenu;
