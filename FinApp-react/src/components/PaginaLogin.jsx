import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/PaginaLogin.css";
import { useAuth } from "../contexts/authContext.jsx";

function PaginaLogin() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Inicialize o hook

  //função quando o formulário for enviado
  const handleLogin = async (event) => {
    event.preventDefault(); // Impede que a página recarregue

    // Validação
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setError("");

    // Lógica de login aqui (chamada da API)
    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError("E-mail ou senha incorretos");
      console.error("Erro no login:", error);
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
        <h1>Bem-vindo de volta!</h1>
        <p>Estamos muito felizes por ter você de volta ao FinApp</p>

        <form className="login-form" onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>

          <button type="submit" className="submit-button">
            ENTRAR
          </button>

          <div className="links-container">
            <Link to="/cadastro" className="link-text">
              Não tem conta? Cadastre-se
            </Link>
            <Link to="/esqueci-senha" className="link-text">
              Esqueceu a senha?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaginaLogin;
