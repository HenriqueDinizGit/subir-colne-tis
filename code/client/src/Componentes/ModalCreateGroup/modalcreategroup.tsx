import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './modalcreategroup.css';
import instance from "../../axios/custom";

interface CreateGroupModalProps {
    show: boolean;
    onClose: () => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ show, onClose }) => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFinal, setDataFinal] = useState('');

    const createComunidade = async () => {
        console.log(nome, descricao, dataInicio, dataFinal);
        try {
            const response = await instance.post('/comunidade/', {
                nome,
                descricao,
                dataDeInicio: dataInicio, // Corrigido para dataDeInicio
                dataDeFim: dataFinal // Corrigido para dataDeFim
            });
            console.log(response.data);
            onClose(); 
        } catch (error) {
            console.error("Erro ao criar comunidade:", error);
        }
    }

    return (
        show ? (
            <div className="modal-overlay">
                <div className="group-popup">
                    <form className="form-group" onSubmit={createComunidade}>
                        <div className="top-form">
                            <h3 className="personal-title">Criar Novo Grupo</h3>
                            <div className="cancel" onClick={onClose}>
                                <FontAwesomeIcon icon={faXmark} className="cancel-icon" />
                            </div>
                        </div>
                        <input
                            type="text"
                            placeholder="Nome do Grupo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Descrição (opcional)"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                        <span className="date-placeholder">Digite a data de início</span>
                        <input
                            type="date"
                            placeholder="Data Inicial"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                        />
                        <span className="date-placeholder">Digite a data final</span>
                        <input
                            type="date"
                            placeholder="Data Final"
                            value={dataFinal}
                            onChange={(e) => setDataFinal(e.target.value)}
                        />
                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </div>
        ) : null
    );
};

export default CreateGroupModal;
