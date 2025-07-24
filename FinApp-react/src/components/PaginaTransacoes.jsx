import React, { useState, useEffect } from "react";
import MenuLateral from "./MenuLateral";
import ListaTransacoes from "./ListaTransacoes";
import Filtros from "./Filtros";
import { supabase } from "../api/supabaseClient";
import { useAuth } from "../contexts/authContext";
import "../styles/Painel.css";

function PaginaTransacoes() {
  const { user } = useAuth();
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [filtroMesAno, setFiltroMesAno] = useState("");

  // Buscar transações do banco de dados
  useEffect(() => {
    const fetchTransacoes = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .eq("user_id", user.id)
          .order("date", { ascending: false });

        if (error) throw error;
        setTransacoes(data || []);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransacoes();
  }, [user]);

  const limparFiltros = () => {
    setFiltroTexto("");
    setFiltroTipo("todos");
    setFiltroCategoria("todas");
    setFiltroMesAno("");
  };

  // Função de filtro segura
  const transacoesFiltradas = transacoes.filter((transacao) => {
    // Verifica se a transação e suas propriedades existem
    if (!transacao) return false;

    const descricao = transacao.descricao || "";
    const tipo = transacao.type || "";
    const categoria = transacao.category || "";
    const data = transacao.date || "";

    // Aplica os filtros
    const buscaTexto = descricao
      .toLowerCase()
      .includes(filtroTexto.toLowerCase());
    const buscaTipo = filtroTipo === "todos" || tipo === filtroTipo;
    const buscaCategoria =
      filtroCategoria === "todas" || categoria === filtroCategoria;
    const buscaMesAno = !filtroMesAno || data.startsWith(filtroMesAno);

    return buscaTexto && buscaTipo && buscaCategoria && buscaMesAno;
  });

  if (loading) {
    return <div className="painel-container">Carregando transações...</div>;
  }

  return (
    <div className="painel-container">
      <MenuLateral />
      <header>
        <h1>Todas as Transações</h1>
        <p>Aqui está o histórico completo de suas movimentações.</p>
      </header>
      <main>
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
