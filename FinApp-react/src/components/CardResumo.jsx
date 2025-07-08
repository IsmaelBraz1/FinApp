// src/components/CardResumo.jsx
import React from 'react';
import '../styles/Painel.css';   
// Note que a função recebe 'props' como argumento
function CardResumo(props) {
  return (
   
<div className="graf">
      <h2>{props.titulo}</h2>
      <h2 id={props.idValor}>{props.valor}</h2>
      <p>{props.descricao}</p>
    </div>

    
  );
}

export default CardResumo;