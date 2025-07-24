import React, { useState, useEffect } from "react";
import MenuLateral from "./MenuLateral";
import CardResumo from "./CardResumo";
import FormularioTransacao from "./FormularioTransacao";
import ListaTransacoes from "./ListaTransacoes";
import BarChartFinanceiro from "./Graficos";
import Filtros from "./Filtros";
import { supabase } from "../api/supabaseClient";
import { useAuth } from "../contexts/authContext";
import "../styles/Painel.css";

function Painel() {
  const { user } = useAuth();
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [transacoes, setTransacoes] = useState([]);
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [rendaMensal, setRendaMensal] = useState(0);
  const [despesasMensais, setDespesasMensais] = useState(0);
  const [variacaoSaldo, setVariacaoSaldo] = useState(0);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [filtros, setFiltros] = useState({
    texto: "",
    tipo: "todos",
    categoria: "todas",
    mesAno: "",
  });

  // Buscar dados iniciais
  useEffect(() => {
    if (user) {
      buscarTransacoes();
      buscarResumoFinanceiro();
    }
  }, [user]);

  // Configurar subscription para atualizações em tempo real
  useEffect(() => {
    if (!user) return;

    const subscription = supabase
      .channel("transacoes-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transactions",
        },
        () => {
          buscarTransacoes();
          buscarResumoFinanceiro();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user]);

  const buscarTransacoes = async () => {
    setCarregando(true);

    let query = supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    // Aplicar filtros
    if (filtros.tipo !== "todos") {
      query = query.eq("type", filtros.tipo);
    }
    if (filtros.categoria !== "todas") {
      query = query.eq("category", filtros.categoria);
    }
    if (filtros.texto) {
      query = query.ilike("descricao", `%${filtros.texto}%`);
    }
    if (filtros.mesAno) {
      const [ano, mes] = filtros.mesAno.split("-");
      query = query
        .gte("date", `${ano}-${mes}-01`)
        .lte("date", `${ano}-${mes}-31`);
    }

    const { data, error } = await query;

    if (!error) {
      setTransacoes(data);
    }
    setCarregando(false);
  };

  const buscarResumoFinanceiro = async () => {
    // Mês atual
    const inicioMes = new Date();
    inicioMes.setDate(1);

    // Mês anterior para cálculo da variação
    const inicioMesAnterior = new Date();
    inicioMesAnterior.setMonth(inicioMesAnterior.getMonth() - 1);
    inicioMesAnterior.setDate(1);

    // Busca receitas do mês atual
    const { data: receitasAtual } = await supabase
      .from("transactions")
      .select("amount")
      .eq("user_id", user.id)
      .eq("type", "income")
      .gte("date", inicioMes.toISOString());

    // Busca despesas do mês atual
    const { data: despesasAtual } = await supabase
      .from("transactions")
      .select("amount")
      .eq("user_id", user.id)
      .eq("type", "expense")
      .gte("date", inicioMes.toISOString());

    // Busca saldo do mês anterior
    const { data: transacoesAnterior } = await supabase
      .from("transactions")
      .select("amount, type")
      .eq("user_id", user.id)
      .gte("date", inicioMesAnterior.toISOString())
      .lte("date", inicioMes.toISOString());

    // Cálculos
    const totalReceitas =
      receitasAtual?.reduce((sum, t) => sum + t.amount, 0) || 0;
    const totalDespesas =
      despesasAtual?.reduce((sum, t) => sum + t.amount, 0) || 0;

    const saldoAtual = totalReceitas - totalDespesas;

    const saldoAnterior =
      transacoesAnterior?.reduce((sum, t) => {
        return t.type === "income" ? sum + t.amount : sum - t.amount;
      }, 0) || 0;

    const variacao = saldoAnterior
      ? ((saldoAtual - saldoAnterior) / saldoAnterior) * 100
      : 0;

    // Busca saldo total (todas as transações)
    const { data: todasTransacoes } = await supabase
      .from("transactions")
      .select("amount, type")
      .eq("user_id", user.id);

    const saldoGeral =
      todasTransacoes?.reduce((sum, t) => {
        return t.type === "income" ? sum + t.amount : sum - t.amount;
      }, 0) || 0;

    // Atualiza estados
    setRendaMensal(totalReceitas);
    setDespesasMensais(totalDespesas);
    setSaldoTotal(saldoGeral);
    setVariacaoSaldo(variacao);
  };

  const adicionarTransacao = async (transacao) => {
    const { error } = await supabase.from("transactions").insert([
      {
        user_id: user.id,
        descricao: transacao.descricao,
        amount: parseFloat(transacao.valor),
        date: transacao.data,
        type: transacao.tipo,
        category: transacao.categoria,
      },
    ]);

    if (!error) {
      setModalVisivel(false);
    }
  };

  const aplicarFiltros = (novosFiltros) => {
    setFiltros(novosFiltros);
  };

  const limparFiltros = () => {
    setFiltros({
      texto: "",
      tipo: "todos",
      categoria: "todas",
      mesAno: "",
    });
  };

  // Transações recentes (6 primeiras)
  const transacoesRecentes = transacoes.slice(0, 6);

  return (
    <div className="painel-container">
      <MenuLateral />

      <main className="painel-conteudo">
        <header className="painel-header">
          <h1>Painel Financeiro</h1>
          <p>Bem-vindo de volta, {nomeUsuario}!</p>
        </header>

        <section className="resumo-financeiro">
          <CardResumo
            titulo="Saldo Total"
            valor={`R$ ${saldoTotal.toFixed(2)}`}
            descricao={`${variacaoSaldo >= 0 ? "+" : ""}${variacaoSaldo.toFixed(
              2
            )}% desde o último mês`}
            idValor="saldo-total"
          />

          <CardResumo
            titulo="Renda Mensal"
            valor={`R$ ${rendaMensal.toFixed(2)}`}
            descricao="Atualizado hoje"
            idValor="renda-mensal"
          />

          <CardResumo
            titulo="Despesas Mensais"
            valor={`R$ ${despesasMensais.toFixed(2)}`}
            descricao={`${
              rendaMensal
                ? ((despesasMensais / rendaMensal) * 100).toFixed(0)
                : "0"
            }% da renda`}
            idValor="despesas-mensais"
          />
        </section>

        <section className="grafico-section">
          <h2>Visão Geral</h2>
          <BarChartFinanceiro />
        </section>

        <section className="transacoes-section">
          <div className="transacoes-header">
            <h2>Transações Recentes</h2>
            <button
              className="botao-primario"
              onClick={() => setModalVisivel(true)}
            >
              + Nova Transação
            </button>
          </div>

          <Filtros
            filtroTexto={filtros.texto}
            onFiltroTextoChange={(valor) =>
              aplicarFiltros({ ...filtros, texto: valor })
            }
            filtroTipo={filtros.tipo}
            onFiltroTipoChange={(valor) =>
              aplicarFiltros({ ...filtros, tipo: valor })
            }
            filtroCategoria={filtros.categoria}
            onFiltroCategoriaChange={(valor) =>
              aplicarFiltros({ ...filtros, categoria: valor })
            }
            filtroMesAno={filtros.mesAno}
            onFiltroMesAnoChange={(valor) =>
              aplicarFiltros({ ...filtros, mesAno: valor })
            }
            onLimparFiltros={limparFiltros}
          />

          {carregando ? (
            <div className="carregando">Carregando transações...</div>
          ) : (
            <ListaTransacoes transacoes={transacoesRecentes} />
          )}
        </section>
      </main>

      {/* Modal para adicionar transação */}
      <div id="mais" onClick={() => setModalVisivel(true)}>
        +
      </div>
      {modalVisivel && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <button
              className="modal-fechar"
              onClick={() => setModalVisivel(false)}
            >
              ×
            </button>

            <h2>Adicionar Transação</h2>
            <FormularioTransacao onAdicionar={adicionarTransacao} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Painel;
