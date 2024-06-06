import React, { useEffect, useState } from 'react';
import './infocards.css'; 
import instance from '../../axios/custom';

const InfoCards: React.FC = () => {
  const [cards, setCards] = useState([
    {
      name: "Treinos Finalizados",
      total: 0,
      description: "Treinos",
      more: "Nunca subestime o poder da consistência.",
    },
    {
      name: "Maior Sequência de Treinos",
      total: 0,
      description: "Dias",
      more: "Você é capaz de superar qualquer desafio.",
    },
    {
      name: "Sequência de Treino Atual",
      total: 0,
      description: "Dias",
      more: "Continue focado, grandes resultados virão.",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [treinosFinalizados, maiorSequencia, sequenciaAtual] = await Promise.all([
          instance.get('dashboard/treinos-finalizados'),
          instance.get('dashboard/maior-sequencia'),
          instance.get('dashboard/sequencia-atual')
        ]);

        setCards([
          {
            name: "Treinos Finalizados",
            total: treinosFinalizados.data.treinosFinalizadosTotal || 0,
            description: "Treinos",
            more: "Nunca subestime o poder da consistência.",
          },
          {
            name: "Maior Sequência de Treinos",
            total: maiorSequencia.data.maiorSequenciaDeTreinos || 0,
            description: "Dias",
            more: "Você é capaz de superar qualquer desafio.",
          },
          {
            name: "Sequência de Treino Atual",
            total: sequenciaAtual.data.sequenciaAtualdeTreinos || 0,
            description: "Dias",
            more: "Continue focado, grandes resultados virão.",
          },
        ]);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="page card-1-page">
      <div className="cards">
        {cards.map((card, index) => (
          <label key={index} id={card.name}>
            <input type="checkbox" />
            <div className="card">
              <div className="front">
                <header>
                  <h2>{card.name}</h2>
                </header>
                <var className={`total-${index}`}>{card.total}</var>
                <h3>{card.description}</h3>
              </div>
              <div className="back">
                <header>
                  <h2>{card.name}</h2>
                </header>
                <p>{card.more}</p>
              </div>
            </div>
          </label>
        ))}
      </div>
    </section>
  );
};

export default InfoCards;
