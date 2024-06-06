import React, { useState, useRef, useEffect } from 'react';
import './comunidademain.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRankingStar, faUserGroup, faCalendar } from '@fortawesome/free-solid-svg-icons';
import ParticipantList from './participantlist';
import img1 from '../../assets/imgperfil.webp';
import instance from '../../axios/custom';

interface Participant {
  usuarioId: number;
  nome: string;
  email: string;
  foto: string;
  pontos: number;
}

interface TopComunidadeMainProps {
  comunidadeId: number;
}

const TopComunidadeMain: React.FC<TopComunidadeMainProps> = ({ comunidadeId }) => {
  const [expanded, setExpanded] = useState(false);
  const [expandedHeight, setExpandedHeight] = useState('8vh');
  const participantsIconRef = useRef<HTMLDivElement>(null);
  const [numParticipants, setNumParticipants] = useState(0);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [diasRestantes, setDiasRestantes] = useState<number | null>(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await instance.get(`/comunidade/ranking/${comunidadeId}`);
        if (Array.isArray(response.data)) {
          setParticipants(response.data.map((item: Participant) => ({
            usuarioId: item.usuarioId,
            foto: item.foto.length === 0 ? img1 : item.foto,
            nome: item.nome,
            email: item.email,
            pontos: item.pontos,
          })));
          setNumParticipants(response.data.length);
          console.log(participants);
        } else {
          console.error("Dados recebidos não são um array:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar participantes:", error);
      }
    };

    const fetchDiasRestantes = async () => {
      try {
        const response = await instance.get(`/comunidade/diasRestantes/${comunidadeId}`);
        setDiasRestantes(response.data.diasRestantes); // Extraia o valor específico
      } catch (error) {
        console.error("Erro ao buscar dias restantes:", error);
      }
    };

    fetchParticipants();
    fetchDiasRestantes();
  }, [comunidadeId]);

  const handleExpandClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (participantsIconRef.current && participantsIconRef.current.contains(event.target as Node)) {
      if (expanded) {
        setExpanded(false);
        setExpandedHeight('8vh');
      } else {
        setExpanded(true);
        setExpandedHeight('36vh');
      }
    }
  };
  return (
    <main
      className={`topcommunity_info ${expanded ? 'expanded' : ''}`}
      style={{ height: expandedHeight }} // Aplicar altura dinâmica
    >
      <div className='community-infos'>
        <div className='ranking'>
          <FontAwesomeIcon icon={faRankingStar} className="community_icon" />
          Ranking
        </div>
        <div className='ranking' ref={participantsIconRef} onClick={handleExpandClick}>
          <FontAwesomeIcon icon={faUserGroup} className="community_icon" />
          Participantes: ({numParticipants})
        </div>
        <div className='ranking'>
          <FontAwesomeIcon icon={faCalendar} className="community_icon" />
          Dias Restantes: 
          {diasRestantes !== null 
            ? (diasRestantes < 0 ? 'Essa comunidade já acabou' : diasRestantes) 
            : 'Carregando...'}
        </div>
      </div>

      {expanded && (
        <ParticipantList participants={participants} />
      )}
    </main>
  );
};

export default TopComunidadeMain;