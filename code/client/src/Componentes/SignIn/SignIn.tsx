import React, { useState } from 'react';
import './SignIn.css';
import logo from '../../assets/logopreta.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {  useNavigate  } from 'react-router';
import instance from '../../axios/custom';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();


  const handleLogin = async () => {
    try {

      const response = await instance.post('/auth/login', { email, senha: password });

      const  loginData = response.data;
      
      localStorage.setItem('token', loginData.token);

      console.log('Login realizado com sucesso!');

      history('/perfil');
    } catch (error) {
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form>
        <img className="imagemlogo" src={logo} alt="Logo" />
        <h1>Log in</h1>
        {/*<div className="social-container">
          <a href="#" className="social"><FontAwesomeIcon icon={faGoogle} /></a>
        </div>
         <span className='loginspan'>ou use sua conta</span>*/}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='btnlogin' onClick={(e) => {e.preventDefault(); handleLogin();}}>Log In</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default SignIn;
