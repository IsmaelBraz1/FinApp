import React, { useState } from "react";
import { supabase } from "../api/supabaseClient";
import { useAuth } from "../contexts/authContext";
import "../styles/FormularioTransacao.css";

function FormularioTransacao({ onAdicionar }) {
  const { user } = useAuth();
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);
  const [tipo, setTipo] = useState("expense");
  const [categoria, setCategoria] = useState("Alimentação");
  const [erro, setErro] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!descricao || !valor || !data || !tipo || !categoria) {
      setErro("Todos os campos são obrigatórios");
      return;
    }

    if (!user) {
      setErro("Usuário não autenticado");
      return;
    }

    try {
      const { data: transacao, error } = await supabase
        .from("transactions")
        .insert([
          {
            user_id: user.id,
            descricao: descricao,
            amount: parseFloat(valor),
            date: data,
            type: tipo,
            category: categoria,
          },
        ])
        .select(); // Retorna os dados inseridos

      if (error) throw error;

      // Limpa o formulário e notifica o componente pai
      setDescricao("");
      setValor("");
      setData(new Date().toISOString().split("T")[0]);
      setTipo("expense");
      setCategoria("Alimentação");
      setErro("");

      if (onAdicionar) {
        onAdicionar(transacao[0]);
      }
    } catch (error) {
      console.error("Erro ao criar transação:", error);
      setErro(error.message || "Erro ao salvar transação");
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      {erro && <div className="error-message">{erro}</div>}

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
        <label htmlFor="valor">Valor (R$)</label>
        <input
          type="number"
          id="valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="0,00"
          step="0.01"
          min="0.01"
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
        <select
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        >
          <option value="expense">Despesa</option>
          <option value="income">Receita</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="categoria">Categoria</label>
        <select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Moradia">Moradia</option>
          <option value="Transporte">Transporte</option>
          <option value="Lazer">Lazer</option>
          <option value="Saúde">Saúde</option>
          <option value="Outros">Outros</option>
        </select>
      </div>

      <button type="submit" className="submit-button">
        Adicionar Transação
      </button>
    </form>
  );
}

export default FormularioTransacao;
