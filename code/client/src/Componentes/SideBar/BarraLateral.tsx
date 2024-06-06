import React from "react";
import './BarraLateral.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faHouse, faDumbbell, faRightToBracket, faShare } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logopreta.png';

const SideBar: React.FC = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redireciona para a página de login
    };

    return (
        <div className="menu">
            <div className="logoname">
                <img src={logo} alt="MuscleUUUP Logo" className="logo-img" />
                <h3 className="sitename">MuscleUUUP</h3>
            </div>
            <div className="menu-list">
                <a href="/info" className="item active">
                    <FontAwesomeIcon icon={faHouse} className="icon" />
                    Dashboard
                </a>
                <a href="/perfil" className="item">
                    <FontAwesomeIcon icon={faDumbbell} className="icon" />
                    Meus Treinos
                </a>
                <a href="/user" className="item">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    Usuário
                </a>
                <a href="/community" className="item">
                    <FontAwesomeIcon icon={faUsers} className="icon" />
                    Comunidade
                </a>
                <a href="/treinoscompartilhados" className="item">
                    <FontAwesomeIcon icon={faShare} className="icon" />
                    Treinos Compartilhados
                </a>
                <a href="#" className="item" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faRightToBracket} className="icon" />
                    Log out
                </a>
            </div>
        </div>
    );
}

export default SideBar;
