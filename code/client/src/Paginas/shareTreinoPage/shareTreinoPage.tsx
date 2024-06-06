import React, { useEffect } from 'react';
import {  useNavigate ,useParams } from 'react-router';
import instance from "../../axios/custom";


const ShareTreinoPage: React.FC = () => {
    const history = useNavigate();
    const { token } = useParams<string>();

    useEffect(() => {
        const copyTreino = async () => {
            try {
                const response = await instance.post(`/share-treino/aceitar-compartilhamento/${token}`);
                if (response.status >= 200 && response.status < 300) {
                    history('/perfil');
                } else {
                    throw new Error('Falha ao copiar o treino');
                }
            } catch (error) {
                console.error('Erro ao copiar o treino:', error);
            }
        };

        copyTreino();
    }, [token, history]);

    return <h1>Carregando...</h1>;
};

export default ShareTreinoPage;
