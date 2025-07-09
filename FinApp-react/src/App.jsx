// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import PaginaInicio from './components/PaginaInicio';
import PaginaLogin from './components/PaginaLogin';
import PaginaCadastro from './components/PaginaCadastro'; // 1. Importe o novo componente
import PaginaTransacoes from './components/PaginaTransacoes';
import Painel from './components/Painel';

 // Dados de exemplo para começar
const DADOS_INICIAIS = [
  { id: 4, descricao: 'Jantar com Amigos', valor: 120.00, data: '2025-07-08', tipo: 'despesa', categoria: 'Lazer' },
  { id: 3, descricao: 'Supermercado Compras', valor: 185.50, data: '2025-07-07', tipo: 'despesa', categoria: 'Alimentação' },
  { id: 2, descricao: 'Conta de Internet', valor: 99.90, data: '2025-06-10', tipo: 'despesa', categoria: 'Contas' },
  { id: 1, descricao: 'Salário Mensal', valor: 5800.00, data: '2025-06-05', tipo: 'receita', categoria: 'Salário' },
];

function App() {
 

  // 1. NOVO ESTADO: Lista de Transações
  const [transacoes, setTransacoes] = useState(DADOS_INICIAIS);
 // 2. NOVA FUNÇÃO: Adiciona uma nova transação à lista
  const adicionarTransacao = (novaTransacao) => {
    // Adiciona um ID único (simplificado para o exemplo)
    const transacaoComId = { ...novaTransacao, id: Date.now() };
    // Atualiza o estado com a nova transação no início da lista
    setTransacoes([transacaoComId, ...transacoes]);
    
  };


return (
  <Routes>
    <Route path="/" element={<PaginaInicio />} />
    <Route path="/login" element={<PaginaLogin />} />
    <Route path="/cadastro" element={<PaginaCadastro />} />

    {/* Passamos a lista e a função para o Painel */}
    <Route 
      path="/dashboard" 
      element={<Painel transacoes={transacoes} onAdicionarTransacao={adicionarTransacao} />} 
    />

    {/* Passamos a lista completa para a nova página de transações */}
    <Route 
      path="/transacoes" 
      element={<PaginaTransacoes transacoes={transacoes} />} 
    />
  </Routes>
);
}

export default App;