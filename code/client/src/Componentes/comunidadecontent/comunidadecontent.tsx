import React, { useEffect, useState } from 'react';
import './comunidadecontent.css';
import img1 from '../../assets/tcosta.webp';

import SideComunidade from '../comunidadeside/comunidadeside';
import MainComunidade from '../comunidademain/comunidademain';
import instance from '../../axios/custom';

export interface CardData {
  id: number;
  nome: string;
  descricao: string;
  bannerImage: string;
}

const Comunidade: React.FC = () => {
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [selectedComunidadeId, setSelectedComunidadeId] = useState<number | null>(null);
  const [cardData, setCardData] = useState<CardData[]>([]);

  useEffect(() => {
    const fetchComunidade = async () => {
      try {
        const response = await instance.get("/comunidade/");
        if (Array.isArray(response.data)) {
          setCardData(response.data.map((item: CardData) => ({
            id: item.id,
            nome: item.nome,
            descricao: item.descricao,
            bannerImage: item.bannerImage === null ? item.bannerImage : img1,
          })));
        } else {
          console.error("Dados recebidos não são um array:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar comunidades:", error);
      }
    };

    fetchComunidade();
  }, []);

  const handleCardClick = (title: string) => {
    setSelectedTitle(title);
    setSelectedComunidadeId(cardData.find((item) => item.nome === title)?.id || null);
  };

  return (
    <div className='content_community'>
      {selectedComunidadeId == null ? <h2 className='no-comunity' >Escolha uma comunidade para ver suas informações</h2> : <MainComunidade title={selectedTitle} comunidadeId={selectedComunidadeId || 0} />}
      <SideComunidade cards={cardData} onCardClick={handleCardClick} />
    </div>
  );
}

export default Comunidade;
