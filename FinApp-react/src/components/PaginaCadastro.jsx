import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/PaginaLogin.css";
import { supabase } from "../api/supabaseClient";
import { useAuth } from "../contexts/authContext";

function PaginaCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (event) => {
    event.preventDefault();

    // Validação dos campos
    if (!nome || !email || !password) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      // 1. Registrar o usuário no Auth do Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome: nome,
          },
        },
      });

      if (authError) {
        throw authError;
      }

      // 2. Criar o perfil na tabela profiles
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: authData.user.id,
          email: email,
          nome: nome,
          created_at: new Date().toISOString(),
        },
      ]);

      if (profileError) throw profileError;

      // Redirecionar após cadastro bem-sucedido
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      setError(
        error.message || "Erro ao criar conta. Por favor, tente novamente."
      );
    }
  };

  return (
    <div className="login-page-container">
      <div className="logo">
        <img
          src="/img/logo_name_finapp.svg"
          alt="FinApp Logo"
          id="logo-do-finapp"
        />
      </div>

      <div className="login-container">
        <h2>Crie sua conta no FinApp</h2>
        <p>Se cadastre no FinApp e aproveite tudo o que ele oferece.</p>

        <form className="login-form" onSubmit={handleCadastro}>
          {error && <p className="error-message">{error}</p>}

          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email_c"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha_c"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
            required
          />

          <button type="submit" id="botao-criar">
            CRIAR CONTA
          </button>

          <Link to="/login" id="cadastro">
            Já possui conta? Clique aqui para entrar.
          </Link>
        </form>
      </div>
    </div>
  );
}

export default PaginaCadastro;
