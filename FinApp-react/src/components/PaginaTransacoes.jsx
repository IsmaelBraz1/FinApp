// src// src/components/PaginaTransacoes.jsx
import React, { useState } from 'react';
import MenuLateral from './MenuLateral';
import ListaTransacoes from './ListaTransacoes';
import Filtros from './Filtros';
import '../styles/Painel.css';

function PaginaTransacoes({ transacoes }) {
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [filtroMesAno, setFiltroMesAno] = useState(''); // NOVO ESTADO para o filtro de data

  // NOVA FUNÇÃO para limpar todos os filtros
  const limparFiltros = () => {
    setFiltroTexto('');
    setFiltroTipo('todos');
    setFiltroCategoria('todas');
    setFiltroMesAno('');
  };

  const transacoesFiltradas = transacoes.filter(transacao => {
    // NOVA CONDIÇÃO para o filtro de Mês/Ano
    // Verifica se a data da transação (ex: "2025-07-09") começa com o filtro (ex: "2025-07")
    const buscaMesAno = !filtroMesAno || transacao.data.startsWith(filtroMesAno);

    const buscaTexto = transacao.descricao.toLowerCase().includes(filtroTexto.toLowerCase());
    const buscaTipo = filtroTipo === 'todos' || transacao.tipo === filtroTipo;
    const buscaCategoria = filtroCategoria === 'todas' || transacao.categoria === filtroCategoria;

    // A transação só aparece se passar em TODAS as condições, incluindo a nova de data
    return buscaTexto && buscaTipo && buscaCategoria && buscaMesAno;
  });

  return (
    <div className="painel-container">
      <MenuLateral />
      <header>
        <h1>Todas as Transações</h1>
        <p>Aqui está o histórico completo de suas movimentações.</p>
      </header>
      <main>
        {/* Passando os novos estados e a função de limpar para o componente Filtros */}
        <Filtros
          filtroTexto={filtroTexto}
          onFiltroTextoChange={setFiltroTexto}
          filtroTipo={filtroTipo}
          onFiltroTipoChange={setFiltroTipo}
          filtroCategoria={filtroCategoria}
          onFiltroCategoriaChange={setFiltroCategoria}
          filtroMesAno={filtroMesAno}
          onFiltroMesAnoChange={setFiltroMesAno}
          onLimparFiltros={limparFiltros}
        />
        
        <ListaTransacoes transacoes={transacoesFiltradas} />
      </main>
    </div>
  );
}

export default PaginaTransacoes;