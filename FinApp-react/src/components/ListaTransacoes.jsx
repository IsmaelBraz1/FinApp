import React from 'react';
import ItemTransacao from './ItemTransacao'; 
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
          <ItemTransacao key={transacao.id} transacao={transacao} />
        ))}
      </div>
    </section>
  );
}

export default ListaTransacoes;