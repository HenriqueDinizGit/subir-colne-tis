import React from 'react';
import './Treinos.css';
import SideBar from '../../Componentes/SideBar/BarraLateral';
import Content from '../../Componentes/Content/Content';
import RecentExercises from '../../Componentes/LastExercises/lastexercises';

const MeusTreinos: React.FC = () => {
  return (
    <div className='dashboard'>
      <SideBar />
      <div className='dashboard-content'>
          <Content />
          <RecentExercises/>
      </div>
    </div>
  );
};

export default MeusTreinos;
