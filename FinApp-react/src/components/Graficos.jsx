import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Registro dos módulos do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChartFinanceiro = () => {
  // 🔹 Estado com dados manuais inicialmente
  const [dadosFinanceiros] = useState([
    { tipo: "Renda Mensal", valor: 5800 },
    { tipo: "Despesas Mensais", valor: 2150.75 },
  ]);

  // INTEGRAÇÃO COM API FUTURA (EXEMPLO):
  /*
  useEffect(() => {
    const buscarDadosFinanceiros = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/api/financeiro");
        const dados = await resposta.json();
        
        // Esperado: [{ tipo: "Renda Mensal", valor: 5800 }, ...]
        setDadosFinanceiros(dados);
      } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
      }
    };

    buscarDadosFinanceiros();
  }, []);
  */

  const data = {
    labels: dadosFinanceiros.map((item) => item.tipo),
    datasets: [
      {
        label: "Financeiro",
        data: dadosFinanceiros.map((item) => item.valor),
        backgroundColor: ["rgba(76, 175, 80, 0.7)", "rgba(244, 67, 54, 0.7)"],
        hoverBackgroundColor: ["rgba(76, 175, 80, 1)", "rgba(244, 67, 54, 1)"],
        borderRadius: 10,
        barThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const valor = context.raw;
            return `R$ ${valor.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 14 } },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `R$ ${value.toLocaleString("pt-BR")}`,
          font: { size: 12 },
        },
        grid: { color: "#eee" },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChartFinanceiro;
