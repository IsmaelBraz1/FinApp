import React, { useState, useEffect } from "react";
import "../styles/PaginaMetas.css";
import MenuLateral from "../components/MenuLateral";

function PaginaMetas() {
  const [metas, setMetas] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  useEffect(() => {
    const salvas = JSON.parse(localStorage.getItem("metas")) || [];
    setMetas(salvas);
  }, []);

  useEffect(() => {
    localStorage.setItem("metas", JSON.stringify(metas));
  }, [metas]);

  const adicionarMeta = () => {
    if (!descricao || !valor || parseFloat(valor) <= 0) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    const novaMeta = {
      descricao,
      valor: parseFloat(valor),
      atual: 0,
      completa: false,
    };

    setMetas([...metas, novaMeta]);
    setDescricao("");
    setValor("");
  };

  const atualizarValor = (index, novoValor) => {
    const atualizadas = [...metas];
    atualizadas[index].atual = parseFloat(novoValor);
    atualizadas[index].completa = atualizadas[index].atual >= atualizadas[index].valor;
    setMetas(atualizadas);
  };

  const removerMeta = (index) => {
    const novas = metas.filter((_, i) => i !== index);
    setMetas(novas);
  };

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
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <input
            type="number"
            placeholder="Valor alvo (R$)"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
          <button onClick={adicionarMeta}>Adicionar</button>
        </div>

        <div className="lista-metas-padrao">
          {metas.length === 0 ? (
            <p className="nenhuma-meta">Nenhuma meta adicionada ainda.</p>
          ) : (
            metas.map((meta, index) => {
              const porcentagem = Math.min((meta.atual / meta.valor) * 100, 100).toFixed(0);
              return (
                <div
                  key={index}
                  className={`card-meta ${meta.completa ? "completa" : ""}`}
                >
                  <div className="info-principal">
                    <strong>{meta.descricao}</strong>
                    <span
                      className={`status ${
                        meta.completa ? "completo" : "andamento"
                      }`}
                    >
                      {meta.completa ? "✔ Concluída" : "Em andamento"}
                    </span>
                  </div>
                  <p className="valor-meta">
                    Valor alvo: R${meta.valor.toFixed(2)} <br />
                    Progresso: R${meta.atual.toFixed(2)} ({porcentagem}%)
                  </p>

                  <input
                    type="number"
                    placeholder="Atualizar valor"
                    onChange={(e) => atualizarValor(index, e.target.value)}
                  />

                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${porcentagem}%` }}></div>
                  </div>

                  <button className="botao-remover" onClick={() => removerMeta(index)}>
                    Remover
                  </button>
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
