import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { supabase } from "../api/supabaseClient";
import { useAuth } from "../contexts/authContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChartFinanceiro = () => {
  const { user } = useAuth();
  const [dadosGrafico, setDadosGrafico] = useState({
    labels: ["Receitas", "Despesas"],
    datasets: [
      {
        label: "Valores",
        data: [0, 0],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  });

  useEffect(() => {
    const buscarDadosFinanceiros = async () => {
      if (!user) return;

      const inicioMes = new Date();
      inicioMes.setDate(1);

      try {
        const { data: receitas } = await supabase
          .from("transactions")
          .select("amount")
          .eq("user_id", user.id)
          .eq("type", "income")
          .gte("date", inicioMes.toISOString());

        const { data: despesas } = await supabase
          .from("transactions")
          .select("amount")
          .eq("user_id", user.id)
          .eq("type", "expense")
          .gte("date", inicioMes.toISOString());

        const totalReceitas =
          receitas?.reduce((sum, t) => sum + t.amount, 0) || 0;
        const totalDespesas =
          despesas?.reduce((sum, t) => sum + t.amount, 0) || 0;

        setDadosGrafico({
          labels: ["Receitas", "Despesas"],
          datasets: [
            {
              label: "Valores",
              data: [totalReceitas, totalDespesas],
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(255, 99, 132, 0.6)",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    buscarDadosFinanceiros();
  }, [user]);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `R$ ${context.raw.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={dadosGrafico} options={options} />;
};

export default BarChartFinanceiro;
