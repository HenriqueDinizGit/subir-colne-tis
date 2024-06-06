import React, { useEffect, useState } from 'react';
import './comunidadeside.css'; 
import TopSideCommunity from './topsidecomunidade';
import { CardData } from '../comunidadecontent/comunidadecontent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import instance from '../../axios/custom';

interface SideComunidadeProps {
  cards: CardData[];
  onCardClick: (title: string) => void;
}

const SideComunidade: React.FC<SideComunidadeProps> = ({ cards, onCardClick }) => {
  const [showButtons, setShowButtons] = useState<boolean>(false); // Estado para controlar a exibição dos botões
  const [currentCards, setCurrentCards] = useState<CardData[]>([]);
  
  useEffect(() => {
    setCurrentCards(cards);
  }
  , [cards]);

  const handleClick = (title: string) => {
    setShowButtons(true); 
    onCardClick(title);
  };

  const handleCopyLink = async (comunidadeId: number) => {  
    try {
      const response = instance.get(`/comunidade/compartilhar-comunidade/${comunidadeId}`)
      await navigator.clipboard.writeText((await response).data.linkCompartilhamento);
    } catch (error) {
      console.error("Erro ao copiar link da comunidade", error);
    }
  };

  const handleDeleteGroup = async (comunidadeId: number) => {
    try {
      instance.delete(`/comunidade/${comunidadeId}`);
      setCurrentCards(currentCards.filter(card => card.id !== comunidadeId));
    } catch (error) {
      console.error("Erro ao apagar comunidade", error);
    }
  };

  return (
    <div className="sidecommunity">
       <TopSideCommunity />  
      <div className="card_container">
        {currentCards.length === 0 ? (
          <p>Você não está em nenhuma comunidade ainda</p>
        ) : (
          currentCards.map((card, index) => (
            <div className='card_article' key={index} onClick={() => handleClick(card.nome)}>
              <div className="image-box">
                <img src={card.bannerImage} alt={card.nome} />
              </div>
              <div className="card_data"  onClick={() => setShowButtons(true)}>
                <div className='groups_name'>
                    <h2>{card.nome}</h2>
                    <p>{card.descricao}</p>
                </div>
                {showButtons && (
                  <div className="buttons-group">
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteGroup(card.id); }}>
                      <p>Apagar</p>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleCopyLink(card.id); }}>
                      <p>Compartilhar</p>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SideComunidade;
