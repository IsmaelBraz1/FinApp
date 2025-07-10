import React from 'react';
import '../styles/Filtros.css';

// Este componente recebe os valores atuais dos filtros e as funções para atualizá-los
function Filtros({ 
  filtroTexto, onFiltroTextoChange, 
  filtroTipo, onFiltroTipoChange, 
  filtroCategoria, onFiltroCategoriaChange,
  filtroMesAno, onFiltroMesAnoChange,
  onLimparFiltros
}) {
  return (
    <div className="filtros-container">
      <input
        type="text"
        className="filtro-input"
        placeholder="Buscar por descrição..."
        value={filtroTexto}
        onChange={(e) => onFiltroTextoChange(e.target.value)}
      />

      <input 
        type="month"
        className="filtro-select"
        value={filtroMesAno}
        onChange={(e) => onFiltroMesAnoChange(e.target.value)}
      />
      <select className="filtro-select" value={filtroTipo} onChange={(e) => onFiltroTipoChange(e.target.value)}>
        <option value="todos">Todos os Tipos</option>
        <option value="receita">Receitas</option>
        <option value="despesa">Despesas</option>
      </select>

      <select className="filtro-select" value={filtroCategoria} onChange={(e) => onFiltroCategoriaChange(e.target.value)}>
        <option value="todas">Todas as Categorias</option>
        <option value="Alimentação">Alimentação</option>
        <option value="Moradia">Moradia</option>
        <option value="Transporte">Transporte</option>
        <option value="Lazer">Lazer</option>
        <option value="Saúde">Saúde</option>
        <option value="Salário">Salário</option>
        <option value="Contas">Contas</option>
        <option value="Outros">Outros</option>
      </select>
       <button className="limpar-button" onClick={onLimparFiltros}>Limpar Filtros</button>
    </div>
  );
}

export default Filtros;