// src/components/ListaTransacoes.jsx
import React from 'react';
import ItemTransacao from './ItemTransacao'; // Importando nosso novo componente de item
import '../styles/ListaTransacoes.css';

function ListaTransacoes({ transacoes }) {
  return (
    <section className="lista-transacoes">
      <header className="lista-header">
        <h2>Transações Recentes</h2>
        <a href="#" className="ver-todas">Ver todas</a>
      </header>
      <div className="itens-container">
        {transacoes.map((transacao) => (
          // Usando nosso novo componente para cada item da lista
          <ItemTransacao key={transacao.id} transacao={transacao} />
        ))}
      </div>
    </section>
  );
}

export default ListaTransacoes;