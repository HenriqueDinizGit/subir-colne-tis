import React, { useState } from 'react';
import './comunidademain.css';

interface Participant {
  usuarioId: number;
  nome: string;
  email: string;
  foto: string;
  pontos: number;
}

const ParticipantList: React.FC<{ participants: Participant[] }> = ({ participants }) => {
  const [sortedParticipants, setSortedParticipants] = useState<Participant[]>(participants);
  const [selectedOption, setSelectedOption] = useState<string>(''); // Opção selecionada (nome ou pontos)
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false); // Visibilidade do dropdown


  const sortParticipants = (option: string) => {
    if (option === 'nome') {
      const sorted = [...participants].sort((a, b) => a.nome.localeCompare(b.nome));
      setSortedParticipants(sorted);
    } else if (option === 'pontos') {
      const sorted = [...participants].sort((a, b) => b.pontos - a.pontos);
      setSortedParticipants(sorted);
    }
    setSelectedOption(option); // Atualiza a opção selecionada
    setDropdownVisible(false); // Fecha o dropdown após selecionar uma opção
  };


  return (
    <div className="participant-list">
      <div className="sort-dropdown">
        <button className="dropdown-button" onClick={() => setDropdownVisible(!dropdownVisible)}>
          <span>{selectedOption ? `Ordenar por ${selectedOption}` : 'Ordenar por'}</span>
        </button>
        {dropdownVisible && ( 
          <div className="participants-buttons">
            <button onClick={() => sortParticipants('nome')}>Nome</button>
            <button onClick={() => sortParticipants('pontos')}>Pontuação</button>
          </div>
        )}
      </div>
      <ul className='group-participants'>
        {sortedParticipants.map(participant => (
          <li key={participant.usuarioId} className='members-list'>
             <img src={participant.foto} alt={participant.nome} className="participant-avatar" />  
             <p>{participant.nome}</p>
             <p>Pontos: {participant.pontos}</p>
                 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;
