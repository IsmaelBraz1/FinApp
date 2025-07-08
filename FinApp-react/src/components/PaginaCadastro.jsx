// src/components/PaginaCadastro.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PaginaLogin.css'; // 1. Reutilizando o mesmo CSS! Não precisamos criar outro.

function PaginaCadastro() {
  // 2. Criamos estados para os três campos do formulário e para o erro.
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 3. Função para lidar com o envio do formulário de cadastro
  const handleCadastro = (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    // Validação dos campos
    if (!nome || !email || !password) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    setError(''); // Limpa o erro se a validação passar

    // Aqui viria a lógica para enviar os dados para o seu "backend" ou API
    console.log('Nova conta criada com:');
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Senha:', password);
  };

  return (
    <div className="login-page-container">
      <div className="logo">
        <img src="/img/logo_name_finapp.svg" alt="FinApp Logo" id="logo-do-finapp" />
      </div>

      <div className="login-container">
        <h2>Crie sua conta no FinApp</h2>
        <p>Se cadastre no FinApp e aproveite tudo o que ele oferece.</p>

        <form className="login-form" onSubmit={handleCadastro}>
          {error && <p className="error-message">{error}</p>}

          <label htmlFor="nome">Nome</label>
          <input
            type="text" // Tipo de input corrigido para 'text'
            id="nome"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email_c"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha_c"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button type="submit" id="botao-criar">CRIAR CONTA</button>

          {/* 4. O link agora aponta de volta para a página de login */}
          <Link to="/login" id="cadastro">Já possui conta? Clique aqui para entrar.</Link>
        </form>
      </div>
    </div>
  );
}

export default PaginaCadastro;