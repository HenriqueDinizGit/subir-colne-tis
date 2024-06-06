import React from 'react';
import './usuario.css';
import SideBar from '../../Componentes/SideBar/BarraLateral';
import Profile from '../../Componentes/Profile/Profile';
import ProfileSettings from '../../Componentes/ProfileSettings/profilesettings'; // Corrigindo o nome do arquivo

const Usuario: React.FC = () => {
  const userEmail = 'usuario@example.com'; // Simulando o email do usuário (pode ser obtido de um estado, contexto, etc.)

  const handleUpdateProfile = (newEmail: string, newPassword: string) => {
    // Aqui você implementaria a lógica para atualizar os dados do usuário
    console.log('Novo Email:', newEmail);
    console.log('Nova Senha:', newPassword);
    // Por exemplo: chamar uma função para atualizar os dados no backend
  };

  return (
    <div className='dashboard'>
      <SideBar />
      <div className='dashboard-content'>
        {/* Passando props para o componente ProfileSettings */}
        <ProfileSettings userEmail={userEmail} onUpdateProfile={handleUpdateProfile} />
        <Profile />
      </div>
    </div>
  );
};

export default Usuario;
