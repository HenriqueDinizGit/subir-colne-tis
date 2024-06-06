import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './comunidadeside.css';
import CreateGroupModal from "../ModalCreateGroup/modalcreategroup";

const TopSideCommunity: React.FC = () => {
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false); // controla a visibilidade do modal de criar grupo


    const toggleCreateGroupModal = () => {
        setShowCreateGroupModal(!showCreateGroupModal); // Inverte o estado para mostrar ou ocultar o modal de criar grupo
    };

    const closeModals = () => {
        setShowCreateGroupModal(false); // Fecha o modal de criar grupo
    };

    return (
        <div className="top-community">
            <h2 className="header-title">Meus Grupos</h2>
            <button className='more-btn' onClick={toggleCreateGroupModal}>
                 <FontAwesomeIcon className="teste-btn" icon={faPlus}/>
            </button>
            {showCreateGroupModal && (
                 <CreateGroupModal show={showCreateGroupModal} onClose={closeModals} />
            )}
        </div>
    );
}

export default TopSideCommunity;
