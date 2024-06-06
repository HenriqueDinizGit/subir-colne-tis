import React from "react";
import './HeaderMenu.css';
import logo from '../../assets/logo.png';

const HeaderMenu: React.FC = () => {
    return (
        <div className="menu-content">
          <div className="logo-container">
             <img className="logoimg" src={logo} alt="Logo" /> 
             <h1 className="logo">MuscleUUUP</h1>
          </div>
          <nav className="header-menu">
            <ul className="list-itens">
                    <li><a href="#">home</a></li>
                    <li><a href="#">serviços</a></li>
                    <li><a href="#">projeto</a></li>
                    <li><a href="/perfil">sobre nós</a></li>
                    <li><a href="/login">entrar</a></li>
            </ul>
          </nav>
        </div>  
    );
}

export default HeaderMenu;
