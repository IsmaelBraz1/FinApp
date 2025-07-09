// src/components/ItemTransacao.jsx
import React from 'react';
import '../styles/ItemTransacao.css';

// Importando os ícones que vamos usar da biblioteca 'react-icons'
import { FaShoppingCart, FaBriefcase, FaFileInvoiceDollar, FaUsers, FaHeartbeat, FaQuestionCircle } from 'react-icons/fa';

// Função auxiliar para formatar o valor
const formatarValor = (valor) => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// Função para escolher o ícone e a cor baseada na categoria
const getEstiloCategoria = (categoria) => {
  switch (categoria.toLowerCase()) {
    case 'alimentação':
      return { icone: <FaShoppingCart />, cor: '#ffadad' };
    case 'salário':
      return { icone: <FaBriefcase />, cor: '#a0e4a0' };
    case 'contas':
      return { icone: <FaFileInvoiceDollar />, cor: '#a0c4ff' };
    case 'lazer':
      return { icone: <FaUsers />, cor: '#ffd6a5' };
    case 'saúde':
      return { icone: <FaHeartbeat />, cor: '#ffc6ff' };
    default:
      return { icone: <FaQuestionCircle />, cor: '#e5e5e5' };
  }
};

function ItemTransacao({ transacao }) {
  const { icone, cor } = getEstiloCategoria(transacao.categoria);

  return (
    <div className="item-transacao">
      <div className="icone-container" style={{ backgroundColor: cor }}>
        {icone}
      </div>
      <div className="info-transacao">
        <span className="descricao">{transacao.descricao}</span>
        <span className="categoria">{transacao.categoria}</span>
      </div>
      <div className="valor-transacao">
        <span className={transacao.tipo === 'receita' ? 'valor-receita' : 'valor-despesa'}>
          {transacao.tipo === 'receita' ? '+' : '-'} {formatarValor(transacao.valor)}
        </span>
        <span className="data">{transacao.data}</span>
      </div>
    </div>
  );
}

export default ItemTransacao;