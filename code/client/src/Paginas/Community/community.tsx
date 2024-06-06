import React from 'react';
import './community.css';
import SideBar from '../../Componentes/SideBar/BarraLateral';
import Comunidade from '../../Componentes/comunidadecontent/comunidadecontent';

const Community: React.FC = () => {
  return (
    <div className='dashboard'>
      <SideBar />
      <div className='dashboard-content'>
         <Comunidade/>
      </div>
    </div>
  );
};

export default Community;
