import React from 'react';
import './comunidademain.css';
import TopComunidadeMain from './topcomunidademain';
import BottomComunidadeMain from './bottomcomunidademain';


interface MainComunidadeProps {
  title: string; 
  comunidadeId: number;
}

const MainComunidade: React.FC<MainComunidadeProps> = ({ title, comunidadeId }) => {
  return (
    <div className='main_community'>
      <h2>{title}</h2>
      <TopComunidadeMain comunidadeId={comunidadeId}/>
      <BottomComunidadeMain comunidadeId={comunidadeId}/>
    </div>
  );
};

export default MainComunidade;
