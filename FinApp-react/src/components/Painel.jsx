import React, { useState } from 'react';
import MenuLateral from './MenuLateral';       
import CardResumo from './CardResumo';
import FormularioTransacao from './FormularioTransacao';
import ListaTransacoes from './ListaTransacoes';
import BarChartFinanceiro from "./Graficos";
import '../styles/Painel.css';  


function Painel({ transacoes, onAdicionarTransacao }) {
  // Estado para controlar a visibilidade do modal de adicionar
  const [modalVisivel, setModalVisivel] = useState(false);

//  lista com apenas as 6 transações mais recentes
  const transacoesRecentes = transacoes.slice(0, 6);
  return (
    <div className="painel-container">
      <MenuLateral />

      <header>
        <h1>Painel Financeiro</h1>
        <p>Bem-vindo de volta, Usuário</p>
      </header>

      <main>
        <section id="grups">
          <CardResumo titulo="Saldo Total" valor="R$ 12.345,67" descricao="+2.5% desde o último mês" idValor="valor1" />
          <CardResumo titulo="Renda Mensal" valor="R$ 5.800,00" descricao="Atualizado hoje" idValor="valor2" />
          <CardResumo titulo="Despesas Mensais" valor="R$ 2.150,75" descricao="75% da meta atingida" idValor="valor3" />
        </section>

        <section className="grafico">
          <BarChartFinanceiro />
        </section>

         <ListaTransacoes transacoes={transacoesRecentes} />
      </main>

      {/* Botão de Adicionar - ao clicar, muda o estado para true */}
      <div id="mais" onClick={() => setModalVisivel(true)}>+</div>

      {/* Renderização condicional do Modal: só aparece se modalVisivel for true */}
      {modalVisivel && (
        <div className="modal-backdrop">
          <div id="adicionar">
            <div id="fechar" onClick={() => setModalVisivel(false)}>x</div>
            <FormularioTransacao onAdicionar={onAdicionarTransacao} /> 
          </div>
        </div>
      )}
    </div>
  );
}

export default Painel;