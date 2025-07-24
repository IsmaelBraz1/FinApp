import React from "react";
import {
  FaShoppingCart,
  FaBriefcase,
  FaFileInvoiceDollar,
  FaUsers,
  FaHeartbeat,
  FaQuestionCircle,
} from "react-icons/fa";
import "../styles/ItemTransacao.css";

const formatarValor = (valor) => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const formatarData = (dataString) => {
  try {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  } catch {
    return dataString; // Retorna o original se falhar a conversão
  }
};

const getEstiloCategoria = (categoria = "") => {
  const catLower = categoria.toLowerCase();

  switch (catLower) {
    case "alimentação":
    case "alimentacao":
      return { icone: <FaShoppingCart />, cor: "#ffadad" };
    case "salário":
    case "salario":
      return { icone: <FaBriefcase />, cor: "#a0e4a0" };
    case "contas":
      return { icone: <FaFileInvoiceDollar />, cor: "#a0c4ff" };
    case "lazer":
      return { icone: <FaUsers />, cor: "#ffd6a5" };
    case "saúde":
    case "saude":
      return { icone: <FaHeartbeat />, cor: "#ffc6ff" };
    default:
      return { icone: <FaQuestionCircle />, cor: "#e5e5e5" };
  }
};

function ItemTransacao({ transacao = {} }) {
  const {
    descricao = "",
    categoria = "Outros",
    valor = 0,
    tipo = "expense",
    date = "",
  } = transacao;
  const { icone, cor } = getEstiloCategoria(categoria);

  return (
    <div className="item-transacao">
      <div className="icone-container" style={{ backgroundColor: cor }}>
        {icone}
      </div>
      <div className="info-transacao">
        <span className="descricao">{descricao}</span>
        <span className="categoria">{categoria}</span>
      </div>
      <div className="valor-transacao">
        <span className={tipo === "income" ? "valor-receita" : "valor-despesa"}>
          {tipo === "income" ? "+" : "-"} {formatarValor(valor)}
        </span>
        <span className="data">{formatarData(date)}</span>
      </div>
    </div>
  );
}

export default ItemTransacao;
