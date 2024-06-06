
import React from 'react';
import './teste.css';
import SideBar from '../../Componentes/SideBar/BarraLateral';
import InfoMainContent from '../../Componentes/InfoMainContent/InfoMainContent';
import InfoSideContent from '../../Componentes/InfoSideContent/InfoSideContent';
import InfoCards from '../../Componentes/InfoCards/infocards';

const Info: React.FC = () => {
  return (
    <div className='dashboard'>
      <SideBar />
      <div className='dashboard-content'>
        <div className='dashpage'>
          <h2>Dashboard</h2>
             <div className='topcontent'>
                  <InfoMainContent/>
                  <InfoSideContent/>
             </div>
             <div className='bottomcontent'>
                  <InfoCards/>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
