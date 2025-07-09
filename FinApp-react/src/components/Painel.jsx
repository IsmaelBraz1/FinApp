// src/components/Painel.jsx
import React, { useState } from 'react';
import MenuLateral from './MenuLateral';       // Importando os componentes que criamos
import CardResumo from './CardResumo';
import FormularioTransacao from './FormularioTransacao';
import ListaTransacoes from './ListaTransacoes';
import '../styles/Painel.css';                // Importando o CSS do painel


// Dados de exemplo para começar
const DADOS_INICIAIS = [
  { id: 1, descricao: 'Salário Mensal', valor: 5800.00, data: 'Ontem', tipo: 'receita', categoria: 'Salário' },
  { id: 2, descricao: 'Conta de Internet', valor: 99.90, data: '20 Maio, 2024', tipo: 'despesa', categoria: 'Contas' },
  { id: 3, descricao: 'Supermercado Compras', valor: 185.50, data: 'Hoje, 14:30', tipo: 'despesa', categoria: 'Alimentação' },
  { id: 4, descricao: 'Jantar com Amigos', valor: 120.00, data: '18 Maio, 2024', tipo: 'despesa', categoria: 'Lazer' },
];

function Painel() {
  // Estado para controlar a visibilidade do modal de adicionar
  const [modalVisivel, setModalVisivel] = useState(false);

// 1. NOVO ESTADO: Lista de Transações
  const [transacoes, setTransacoes] = useState(DADOS_INICIAIS);
 // 2. NOVA FUNÇÃO: Adiciona uma nova transação à lista
  const adicionarTransacao = (novaTransacao) => {
    // Adiciona um ID único (simplificado para o exemplo)
    const transacaoComId = { ...novaTransacao, id: Date.now() };
    // Atualiza o estado com a nova transação no início da lista
    setTransacoes([transacaoComId, ...transacoes]);
    setModalVisivel(false);
  };

  return (
    <div className="painel-container">
      <MenuLateral /> {/* Nosso componente de menu lateral aqui */}

      <header>
        <h1>Painel Financeiro</h1>
        <p>Bem-vindo de volta, Usuário</p>
      </header>

      <main>
        <section id="grups">
          {/* Usando nosso componente reutilizável com props diferentes */}
          <CardResumo titulo="Saldo Total" valor="R$ 12.345,67" descricao="+2.5% desde o último mês" idValor="valor1" />
          <CardResumo titulo="Renda Mensal" valor="R$ 5.800,00" descricao="Atualizado hoje" idValor="valor2" />
          <CardResumo titulo="Despesas Mensais" valor="R$ 2.150,75" descricao="75% da meta atingida" idValor="valor3" />
        </section>
        <section className="grafico">
          {/* Espaço para o gráfico futuro */}
        </section>

         <ListaTransacoes transacoes={transacoes} />
      </main>

      {/* Botão de Adicionar - ao clicar, muda o estado para true */}
      <div id="mais" onClick={() => setModalVisivel(true)}>+</div>

      {/* Renderização condicional do Modal: só aparece se modalVisivel for true */}
      {modalVisivel && (
        <div className="modal-backdrop"> {/* Adicionamos o backdrop aqui */}
          <div id="adicionar">
            <div id="fechar" onClick={() => setModalVisivel(false)}>x</div>
            <FormularioTransacao onAdicionar={adicionarTransacao} /> 
          </div>
        </div>
      )}
    </div>
  );
}

export default Painel;