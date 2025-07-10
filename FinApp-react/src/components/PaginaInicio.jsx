import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/PaginaInicio.css';

function PaginaInicio() {
  return (
    <div className="splash-container">
      <div className="content">
        <h1 className="logo-text">FinApp</h1>
        <p className="tagline">Controle suas finanças de forma simples e inteligente.</p>
        <Link to="/login" className="cta-button">Acessar Plataforma</Link>
      </div>
    </div>
  );
}

export default PaginaInicio;