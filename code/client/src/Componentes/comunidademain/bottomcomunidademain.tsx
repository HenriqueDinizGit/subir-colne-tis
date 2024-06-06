import React, { useEffect, useState } from 'react';
import './bottomcomunidademain.css'; 
import avatar from '../../assets/avatar.jpg';
import img2 from '../../assets/musculaçao.webp';
import instance from '../../axios/custom';

interface ChatData {
  id: number;
  descricao: string;
  foto: string;
  treino_finalizado: Date;
  usuario: Usuario; // O usuário pode ser nulo
}

interface Usuario {
  id: number;
  nome: string;
  foto: string;
}

interface BottomComunidadeMainProps {
  comunidadeId: number;
}

// Função para gerar uma data relativa com base na diferença de dias
const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

const BottomComunidadeMain: React.FC<BottomComunidadeMainProps> = ({ comunidadeId }) => {
  const [chatData, setChatData] = useState<ChatData[]>([]);

  useEffect(() => {
    const fetchComunidade = async () => {
      if (comunidadeId === 0) {
        return;
      }
      try {
        const response = await instance.get(`treino-realizado/comunidade/${comunidadeId}`);
        if (Array.isArray(response.data)) {
          setChatData(response.data.map((item: ChatData) => ({
            id: item.id,
            descricao: item.descricao,
            foto: item.foto.length === 0 ? img2 : item.foto,
            treino_finalizado: new Date(item.treino_finalizado), // Converter para Date
            usuario: item.usuario,
          })));
        } else {
          console.error("Dados recebidos não são um array:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar comunidades:", error);
      }
    };

    fetchComunidade();
  }, [comunidadeId]);

  return (
    <div className='bottom-community'>
      <div className='more-chat'>
        <h3 className="chat-title">Treinos Realizados Durante A Existência dessa Comunidade</h3>
      </div>
      <ul className="conversations">
        {chatData.map((chat) => (
          <li className="chat" key={chat.id}>
            <img src={chat.foto} alt="Posted" className="posted-picture" />
            <div className="chat-info">
              <p className='chat-message'>{chat.descricao}</p>
              <div className='chat-separation'>
                <div className='chat-user'>
                  <img src={chat.usuario.foto.length === 0 ? avatar : chat.usuario.foto} alt="Profile" className="profile-picture" />
                  <span className="chat-name">{chat.usuario.nome}</span>
                </div>
                <span className="chat-time">{formatDate(chat.treino_finalizado)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default BottomComunidadeMain;
