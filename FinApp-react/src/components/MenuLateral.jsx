// src/components/MenuLateral.jsx
import React from 'react';
import '../styles/Painel.css';   
import { useNavigate } from 'react-router-dom'; // Para a navegação programática

function MenuLateral() {
  const navigate = useNavigate(); // Inicializa o hook de navegação

  const handleSair = () => {
    console.log('Usuário deslogado.');
    navigate('/login'); // Redireciona o usuário para a página de login
  };

  return (
    <div id="later">
      <div id="detalhe">
        <img className="ima" src="/img/logofinapp.svg" alt="logofin" width="150" height="145" />
      </div>
      <div id="opcao">
        <div id="topo">
          <img src="/img/logo_name_finapp.svg" alt="logo" width="150" height="100" />
        </div>
        <button className="b_lat">Painel</button>
        <button className="b_lat">Transações</button>
        <button className="b_lat">Metas</button>
        <button className="b_lat">Configurações</button>
        <button className="b_lat" onClick={handleSair}>Sair</button>
      </div>
    </div>
  );
}

export default MenuLateral;