import React from "react";
import "../styles/Painel.css";
import { Link, useNavigate } from "react-router-dom"; // Para a navegação
import { useAuth } from "../contexts/authContext";

function MenuLateral() {
  const navigate = useNavigate(); // Inicializa o hook de navegação
  const { signOut } = useAuth();

  const handleSair = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <div id="later">
      <div id="detalhe">
        <img
          className="ima"
          src="/img/logofinapp.svg"
          alt="logofin"
          width="150"
          height="145"
        />
      </div>
      <div id="opcao">
        <div id="topo">
          <img
            src="/img/logo_name_finapp.svg"
            alt="logo"
            width="150"
            height="100"
          />
        </div>
        <Link to="/dashboard" className="b_lat">
          Painel
        </Link>
        <Link to="/transacoes" className="b_lat">
          Transações
        </Link>
        <Link to="/metas" className="b_lat">
          Metas
        </Link>
        <button className="b_lat">Configurações</button>
        <button className="b_lat" onClick={handleSair}>
          Sair
        </button>
      </div>
    </div>
  );
}

export default MenuLateral;
