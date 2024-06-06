import React, { useState } from "react";
import "./SignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import instance from "../../axios/custom";
import { useNavigate } from "react-router";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });
  const history = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCadastro = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await instance.post("auth/register", formData);

      if (response.status === 200) {
        const responseLogin = await instance.post("auth/login", {
          email: formData.email,
          senha: formData.senha,
        });
      localStorage.setItem('token', responseLogin.data.token);

        history("/perfil");
      } else {
        console.error("Erro ao cadastrar:", response.data.message);
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleCadastro}>
        <h1>Criar Conta</h1>
        {/*<div className="social-container">
          <a href="#" className="social">
            <FontAwesomeIcon icon={faGoogle} />
          </a>
        </div>
        <span className="spancadastro">ou use seu email para cadastro</span>*/}
        <input
          type="text"
          placeholder="Nome"
          name="nome"
          value={formData.nome}
          onChange={handleInputChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Senha"
          name="senha"
          value={formData.senha}
          onChange={handleInputChange}
        />
        {/* <input
          type="password"
          placeholder="Confirmar Senha"
          name="confirmarSenha"
          value={formData.confirmarSenha}
          onChange={handleInputChange}
        /> */}
        <button className="btncadastro" type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default SignUp;
