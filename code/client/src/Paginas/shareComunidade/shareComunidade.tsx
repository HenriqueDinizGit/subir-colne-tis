import React, { useEffect } from 'react';
import {  useNavigate ,useParams } from 'react-router';
import instance from "../../axios/custom";


const ShareComunidadePage: React.FC = () => {
    const history = useNavigate();
    const { token } = useParams<string>();

    useEffect(() => {
        const acceptInviteComunidade = async () => {
            try {
                const response = await instance.post(`/comunidade/shared-comunidade/${token}`);
                if (response.status >= 200 && response.status < 300) {
                    history('/community');
                } else {
                    throw new Error('Falha ao aceitar convite de uma comunidade');
                }
            } catch (error) {
                console.error('Erro ao aceitar convite de uma comunidade:', error);
            }
        };

        acceptInviteComunidade();
    }, [token, history]);

    return <h1>Carregando...</h1>;
};

export default ShareComunidadePage;
