import React from 'react';
import './treinoscompartilhados.css';
import SideBar from '../../Componentes/SideBar/BarraLateral';
import GerenciarTreinosCompartilhados from '../../Componentes/gerenciarTreinosCompartilhados/gerenciarTreinosCompartilhados';


const TreinosCompartilhados: React.FC = () => {
  return (
    <div className='dashboard'>
      <SideBar />
      <div className='dashboard-content'>
        <GerenciarTreinosCompartilhados/>
      </div>
    </div>
  );
};

export default TreinosCompartilhados;
