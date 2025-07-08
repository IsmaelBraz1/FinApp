// src/components/PaginaLogin.jsx - VERSÃO FINAL

import React, { useState } from 'react';
import { Link } from 'react-router-dom';   
import {useNavigate } from 'react-router-dom';
import '../styles/PaginaLogin.css';


function PaginaLogin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
   const navigate = useNavigate(); // 2. Inicialize o hook

  // 4. Esta função será chamada quando o formulário for enviado
  const handleLogin = (event) => {
    event.preventDefault(); // Impede que a página recarregue

    // Validação simples
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // Se a validação passar, limpamos o erro
    setError('');

    // Lógica de login viria aqui (ex: chamada para uma API)
    console.log('Tentativa de login com:');
    console.log('Email:', email);
    console.log('Senha:', password);

     navigate('/dashboard');
  };

  return (
    <div className="login-page-container">
      <div className="logo">
        <img src="/img/logo_name_finapp.svg" alt="FinApp Logo" id="logo-do-finapp" />
      </div>
      <div className="login-container">
        <h1>Bem-vindo de volta!</h1>
        <p>Estamos muito felizes por ter você de volta ao FinApp</p>

        {/* 5. Conectamos nossa função ao 'onSubmit' do formulário */}
        <form className="login-form" onSubmit={handleLogin}>
          
          {/* 6. A mensagem de erro agora aparece se o estado 'error' não estiver vazio */}
          {error && <p className="error-message">{error}</p>}

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            value={email} // 7. O valor do input é controlado pelo estado 'email'
            onChange={(e) => setEmail(e.target.value)} // 8. Quando você digita, o estado é atualizado
          />

          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            placeholder="Digite sua senha"
            value={password} // O mesmo para a senha
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link to="/esqueci-senha" className="forgot-password">Esqueceu a senha?</Link>

          <button type="submit" id="botao-entrar">ENTRAR</button>
          
          {/* 9. O link de cadastro agora usa o <Link> do React Router */}
          <Link to="/cadastro" id="cadastro">Não possui conta? Clique aqui para se cadastrar.</Link>
        </form>
      </div>
    </div>
  );
}

export default PaginaLogin;