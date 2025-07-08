// src/components/Painel.jsx
import React, { useState } from 'react';
import MenuLateral from './MenuLateral';       // Importando os componentes que criamos
import CardResumo from './CardResumo';
import '../styles/Painel.css';                // Importando o CSS do painel

function Painel() {
  // Estado para controlar a visibilidade do modal de adicionar
  const [modalVisivel, setModalVisivel] = useState(false);

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
      </main>

      {/* Botão de Adicionar - ao clicar, muda o estado para true */}
      <div id="mais" onClick={() => setModalVisivel(true)}>+</div>

      {/* Renderização condicional do Modal: só aparece se modalVisivel for true */}
      {modalVisivel && (
        <div id="adicionar">
          {/* Botão de fechar - ao clicar, muda o estado para false */}
          <div id="fechar" onClick={() => setModalVisivel(false)}>x</div>
          <h2>Adicionar Transação</h2>
          {/* Formulário de adição viria aqui */}
        </div>
      )}
    </div>
  );
}

export default Painel;