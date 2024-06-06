import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import '../Profile/Profile.css';

const ProfileHeader: React.FC = () => {

    const [showForm, setShowForm] = useState(false); // controla a visibilidade do formulário

    const toggleForm = () => {
        setShowForm(!showForm); // Inverte o estado para mostrar ou ocultar o formulário
    };

    const closeForm = () => {
        setShowForm(false); // Fecha o formulário
    };

    return (
        <div className="profile-header">
            <h2 className="header-title">Perfil</h2>
            <div className="edit" onClick={toggleForm}> 
                <FontAwesomeIcon icon={faPenToSquare} className="icon"/>
            </div>
            {/* Renderiza o formulário apenas se showForm for true */}
            {showForm && (
                <div className="form-popup">
                    <form className="form">
                        <div className="top-form">
                             <h3 className="personal-title">Alterar Dados</h3>
                             <div className="cancel" onClick={closeForm}>
                                  <FontAwesomeIcon icon={faXmark} className="cancel-icon"/>
                             </div>
                        </div>
                        <input type="text" placeholder="Nome" />
                        <input type="text" placeholder="Profissão" />
                        <input type="number" placeholder="Idade" />
                        <input type="text" placeholder="Altura" />
                        <input type="text" placeholder="Peso" />
                        <input type="text" placeholder="Tempo de treino" />
                        <input type="text" placeholder="Objetivo" />
                        <button type="submit">Salvar</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ProfileHeader;
