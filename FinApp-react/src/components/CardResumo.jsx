import React from "react";
import "../styles/Painel.css";

function CardResumo({ titulo, valor, descricao = "" }) {
  return (
    <div className="card-resumo">
      <h3>{titulo}</h3>
      <h2>{valor}</h2>
      {descricao && <p>{descricao}</p>}
    </div>
  );
}

export default CardResumo;
