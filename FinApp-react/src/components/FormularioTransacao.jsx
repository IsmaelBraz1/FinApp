// src/components/FormularioTransacao.jsx
import React, { useState } from 'react';
import '../styles/FormularioTransacao.css'; // Importando o CSS que vamos criar

function FormularioTransacao(props) {
  // Estados para cada campo do formulário
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [tipo, setTipo] = useState('despesa'); // Valor padrão
  const [categoria, setCategoria] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o recarregamento da página
    
    // Aqui vamos montar o objeto da transação
    const novaTransacao = {
      descricao,
      valor: parseFloat(valor), // Converte o valor para número
      data,
      tipo,
      categoria,
    };
    props.onAdicionar(novaTransacao);
    //console.log('Nova Transação Submetida:', novaTransacao);
    // 3. Limpar o formulário (opcional, mas recomendado)
    setDescricao('');
    setValor('');
    setData('');
    setTipo('despesa');
    setCategoria('');
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="descricao">Descrição</label>
        <input
          type="text"
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Ex: Almoço no restaurante"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="valor">Valor</label>
        <input
          type="number"
          id="valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="0,00"
          step="0.01" // Permite casas decimais
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="data">Data</label>
        <input
          type="date"
          id="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="tipo">Tipo</label>
        <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="despesa">Despesa</option>
          <option value="receita">Receita</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="categoria">Categoria</label>
        <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
          <option value="" disabled>Selecione...</option>
          <option value="alimentacao">Alimentação</option>
          <option value="moradia">Moradia</option>
          <option value="transporte">Transporte</option>
          <option value="lazer">Lazer</option>
          <option value="saude">Saúde</option>
          <option value="salario">Salário</option>
          <option value="outros">Outros</option>
        </select>
      </div>

      <button type="submit" className="submit-button">Adicionar Transação</button>
    </form>
  );
}

export default FormularioTransacao;