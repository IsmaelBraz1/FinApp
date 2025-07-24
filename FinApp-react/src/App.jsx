// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/authContext";
import { supabase } from "./api/supabaseClient";
import Painel from "./components/Painel";
import PaginaLogin from "./components/PaginaLogin";
import PaginaCadastro from "./components/PaginaCadastro";
import PaginaTransacoes from "./components/PaginaTransacoes";
import PaginaInicio from "./components/PaginaInicio";
import PaginaServicos from "./components/PaginaServicos";
import PaginaSobreNos from "./components/PaginaSobreNos";
import PaginaContatos from "./components/PaginaContatos";
import PaginaMetas from "./components/PaginaMetas";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/servicos" element={<PaginaServicos />} />
        <Route path="/sobre_nos" element={<PaginaSobreNos />} />
        <Route path="/contatos" element={<PaginaContatos />} />
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/cadastro" element={<PaginaCadastro />} />
        <Route path="/metas" element={<PaginaMetas />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardWrapper />
            </PrivateRoute>
          }
        />
        <Route
          path="/transacoes"
          element={
            <PrivateRoute>
              <TransacoesWrapper />
            </PrivateRoute>
          }
        />
        <Route
          path="/metas"
          element={
            <PrivateRoute>
              <PaginaMetas />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

function DashboardWrapper() {
  const { user } = useAuth();
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    const fetchTransacoes = async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (error) console.error("Erro ao buscar transações:", error);
      else setTransacoes(data);
    };

    fetchTransacoes();
  }, [user]);

  const handleAdicionarTransacao = async (transacao) => {
    const { data, error } = await supabase
      .from("transactions")
      .insert([
        {
          user_id: user.id,
          amount: transacao.valor,
          type: transacao.tipo === "receita" ? "income" : "expense",
          category: transacao.categoria,
          description: transacao.descricao,
          created_at: transacao.data || new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Erro ao adicionar transação:", error);
      return;
    }

    setTransacoes([data[0], ...transacoes]);
  };

  return (
    <Painel
      transacoes={transacoes.map((t) => ({
        id: t.id,
        descricao: t.description,
        categoria: t.category,
        valor: t.amount,
        tipo: t.type === "income" ? "receita" : "despesa",
        data: t.date.split("T")[0],
      }))}
      onAdicionarTransacao={handleAdicionarTransacao}
    />
  );
}

function TransacoesWrapper() {
  const { user } = useAuth();
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    const fetchTransacoes = async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (error) console.error("Erro ao buscar transações:", error);
      else setTransacoes(data);
    };

    fetchTransacoes();
  }, [user]);

  return (
    <PaginaTransacoes
      transacoes={transacoes.map((t) => ({
        id: t.id,
        descricao: t.description,
        categoria: t.category,
        valor: t.amount,
        tipo: t.type === "income" ? "receita" : "despesa",
        data: t.date.split("T")[0],
      }))}
    />
  );
}

export default App;
