import React, { useState } from 'react';
import './profilesettings.css'; // Importar o arquivo de estilo CSS
import Banner from '../InfoBanner/Banner';
import TextField from '@mui/material/TextField';

interface ProfileSettingsProps {
  userEmail: string;
  onUpdateProfile: (newEmail: string, newPassword: string) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ userEmail, onUpdateProfile }) => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Chame a função de atualização do perfil com os novos dados
    onUpdateProfile(newEmail, newPassword);
    // Limpe os campos após o envio
    setNewEmail('');
    setNewPassword('');
  };

  return (
           <div className="settingsperfil"> {/* Aplicar a classe CSS 'container' */}
              <div className='top-profile'>
                <Banner/>
              </div>
              <div className='bottom-profile'>
                  <form onSubmit={handleSubmit} className='form-profile'>
                  <h3>Alterar Dados Cadastrados</h3>
                  <div className='change-data'>
                       <div className='change-email'>
                         <label htmlFor="email"> Email:</label>
                         <TextField
                          id="Email"
                          type="email"
                          label="Email"
                          variant="outlined"
                          value={newEmail}
                          onChange={handleEmailChange}
                          required
                        />
                       </div>
                       <div className='change-password'>
                         <label htmlFor="newPassword">Nova Senha:</label>
                         <TextField
                           type="password"
                           id="newPassword"
                           label="Nova Senha"
                           variant="outlined"
                           value={newPassword}
                           onChange={handlePasswordChange}
                           required
                         />
                       </div>
                       <div className='confirm-password'>
                         <label htmlFor="confirmPassword">Confirmar Nova Senha:</label>
                         <TextField
                           type="password"
                           id="confirmPassword"
                           label="Confirmar Nova Senha"
                           variant="outlined"
                           value={newPassword}
                           onChange={handlePasswordChange}
                           required
                         />
                       </div>
                    </div>
                    <button className="mudarDadosButton" type="submit">
      Salvar Alterações
      <i>
        <span></span>
        <span></span>
      </i>
    </button>
                   
                  </form>
             </div>
           </div>
  );
};

export default ProfileSettings;