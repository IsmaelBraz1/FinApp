import React, { useState, useEffect } from "react";
import { supabase } from "../api/supabaseClient";
import { useAuth } from "../contexts/authContext";
import MenuLateral from "../components/MenuLateral";
import "../styles/PaginaMetas.css";

function PaginaMetas() {
  const { user } = useAuth();
  const [metas, setMetas] = useState([]);
  const [nomeMeta, setNomeMeta] = useState("");
  const [valorAlvo, setValorAlvo] = useState("");
  const [dataAlvo, setDataAlvo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar metas do Supabase
  useEffect(() => {
    const fetchMetas = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("goals")
          .select("*")
          .eq("user_id", user.id)
          .order("target_date", { ascending: true });

        if (error) throw error;
        setMetas(data || []);
      } catch (err) {
        console.error("Erro ao buscar metas:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetas();

    const subscription = supabase
      .channel("goals-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "goals",
        },
        fetchMetas
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, [user]);

  const adicionarMeta = async () => {
    if (!nomeMeta || !valorAlvo || !dataAlvo || parseFloat(valorAlvo) <= 0) {
      setError("Preencha todos os campos corretamente!");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("goals")
        .insert([
          {
            user_id: user.id,
            name: nomeMeta,
            target_amount: parseFloat(valorAlvo),
            current_amount: 0,
            is_completed: false,
            target_date: dataAlvo,
          },
        ])
        .select();

      if (error) throw error;

      setMetas([data[0], ...metas]);
      setNomeMeta("");
      setValorAlvo("");
      setDataAlvo("");
      setError(null);
    } catch (err) {
      console.error("Erro ao adicionar meta:", err);
      setError(err.message);
    }
  };

  const atualizarMeta = async (id, novoValor) => {
    try {
      const valorNumerico = parseFloat(novoValor);
      if (isNaN(valorNumerico)) return;

      const metaAtual = metas.find((m) => m.id === id);
      if (!metaAtual) return;

      const isCompleted = valorNumerico >= metaAtual.target_amount;

      const { error } = await supabase
        .from("goals")
        .update({
          current_amount: valorNumerico,
          is_completed: isCompleted,
        })
        .eq("id", id);

      if (error) throw error;

      setMetas(
        metas.map((meta) =>
          meta.id === id
            ? {
                ...meta,
                current_amount: valorNumerico,
                is_completed: isCompleted,
              }
            : meta
        )
      );
    } catch (err) {
      console.error("Erro ao atualizar meta:", err);
      setError(err.message);
    }
  };

  const removerMeta = async (id) => {
    try {
      const { error } = await supabase.from("goals").delete().eq("id", id);

      if (error) throw error;

      setMetas(metas.filter((meta) => meta.id !== id));
    } catch (err) {
      console.error("Erro ao remover meta:", err);
      setError(err.message);
    }
  };

  const formatarData = (dataString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dataString).toLocaleDateString("pt-BR", options);
  };

  const calcularDiasRestantes = (dataString) => {
    const hoje = new Date();
    const dataAlvo = new Date(dataString);
    const diffTime = dataAlvo - hoje;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} dias restantes` : "Prazo expirado";
  };

  if (loading) {
    return (
      <div style={{ display: "flex" }}>
        <MenuLateral />
        <div className="pagina-metas-padrao">
          <p>Carregando metas...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <MenuLateral />
      <div className="pagina-metas-padrao">
        <header className="cabecalho-metas">
          <h1>Minhas Metas</h1>
          <p>Organize e acompanhe suas metas financeiras aqui.</p>
        </header>

        <div className="formulario-metas">
          <input
            type="text"
            placeholder="Descrição da meta"
            value={nomeMeta}
            onChange={(e) => setNomeMeta(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Valor alvo (R$)"
            value={valorAlvo}
            onChange={(e) => setValorAlvo(e.target.value)}
            min="0.01"
            step="0.01"
            required
          />
          <input
            type="date"
            value={dataAlvo}
            onChange={(e) => setDataAlvo(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            required
          />
          <button onClick={adicionarMeta}>Adicionar</button>
          {error && <p className="erro-formulario">{error}</p>}
        </div>

        <div className="lista-metas-padrao">
          {metas.length === 0 ? (
            <p className="nenhuma-meta">Nenhuma meta adicionada ainda.</p>
          ) : (
            metas.map((meta) => {
              const porcentagem = Math.min(
                (meta.current_amount / meta.target_amount) * 100,
                100
              ).toFixed(0);

              return (
                <div
                  key={meta.id}
                  className={`card-meta ${
                    meta.is_completed ? "completa" : ""
                  } ${
                    new Date(meta.target_date) < new Date() &&
                    !meta.is_completed
                      ? "atrasada"
                      : ""
                  }`}
                >
                  <div className="info-principal">
                    <strong>{meta.name}</strong>
                    <span
                      className={`status ${
                        meta.is_completed ? "completo" : "andamento"
                      }`}
                    >
                      {meta.is_completed ? "✔ Concluída" : "Em andamento"}
                    </span>
                  </div>

                  <div className="info-meta">
                    <p>
                      Valor alvo: <span>R${meta.target_amount.toFixed(2)}</span>
                    </p>
                    <p>
                      Progresso:{" "}
                      <span>
                        R${meta.current_amount.toFixed(2)} ({porcentagem}%)
                      </span>
                    </p>
                    <p>
                      Data alvo: <span>{formatarData(meta.target_date)}</span>
                    </p>
                    <p className="dias-restantes">
                      {calcularDiasRestantes(meta.target_date)}
                    </p>
                  </div>

                  <div className="controles-meta">
                    <input
                      type="number"
                      placeholder="Valor atual"
                      min="0"
                      step="0.01"
                      max={meta.target_amount}
                      onChange={(e) => atualizarMeta(meta.id, e.target.value)}
                    />

                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${porcentagem}%` }}
                      ></div>
                    </div>

                    <button
                      className="botao-remover"
                      onClick={() => removerMeta(meta.id)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default PaginaMetas;
