// src/reports/reportService.js
import { supabase } from "../utils/supabaseClient.js";
import { jsPDF } from "jspdf";
import "chart.js";

export const ReportService = {
  async generateFinancialReport(userId, period = "month") {
    // Obter dados para o relatório
    const transactionSummary = await TransactionService.getTransactionSummary(
      userId,
      period
    );
    const goals = await GoalService.getGoals(userId);

    // Criar um objeto com todos os dados do relatório
    const reportData = {
      summary: {
        netBalance: transactionSummary.netBalance,
        totalIncome: transactionSummary.totalIncome,
        totalExpenses: transactionSummary.totalExpenses,
        expenseByCategory: transactionSummary.byCategory,
      },
      goals: goals.map((goal) => ({
        name: goal.name,
        progress: (goal.current_amount / goal.target_amount) * 100,
        targetDate: goal.target_date,
      })),
      generatedAt: new Date().toISOString(),
    };

    return reportData;
  },

  async generatePDFReport(userId, period = "month") {
    const reportData = await this.generateFinancialReport(userId, period);

    // Criar PDF
    const doc = new jsPDF();

    // Adicionar título
    doc.setFontSize(20);
    doc.text("Relatório Financeiro", 105, 20, { align: "center" });

    // Adicionar data de geração
    doc.setFontSize(12);
    doc.text(
      `Gerado em: ${new Date(reportData.generatedAt).toLocaleDateString()}`,
      105,
      30,
      { align: "center" }
    );

    // Adicionar resumo financeiro
    doc.setFontSize(16);
    doc.text("Resumo Financeiro", 14, 45);

    doc.setFontSize(12);
    doc.text(
      `Saldo Total: R$ ${reportData.summary.netBalance.toFixed(2)}`,
      14,
      55
    );
    doc.text(
      `Receitas Totais: R$ ${reportData.summary.totalIncome.toFixed(2)}`,
      14,
      65
    );
    doc.text(
      `Despesas Totais: R$ ${reportData.summary.totalExpenses.toFixed(2)}`,
      14,
      75
    );

    // Adicionar despesas por categoria
    doc.setFontSize(16);
    doc.text("Despesas por Categoria", 14, 90);

    let yPosition = 100;
    Object.entries(reportData.summary.expenseByCategory).forEach(
      ([category, amount]) => {
        doc.text(`${category}: R$ ${amount.toFixed(2)}`, 14, yPosition);
        yPosition += 10;
      }
    );

    // Adicionar metas
    if (reportData.goals.length > 0) {
      doc.setFontSize(16);
      doc.text("Metas Financeiras", 14, yPosition + 10);

      reportData.goals.forEach((goal) => {
        yPosition += 20;
        doc.setFontSize(12);
        doc.text(`Meta: ${goal.name}`, 14, yPosition);
        doc.text(`Progresso: ${goal.progress.toFixed(1)}%`, 14, yPosition + 10);
        doc.text(
          `Data Alvo: ${new Date(goal.targetDate).toLocaleDateString()}`,
          14,
          yPosition + 20
        );
      });
    }

    // Salvar o PDF
    const pdfOutput = doc.output("arraybuffer");
    return pdfOutput;
  },

  async getChartData(userId, period = "month") {
    const reportData = await this.generateFinancialReport(userId, period);

    // Preparar dados para gráficos
    const chartData = {
      expenseDistribution: {
        labels: Object.keys(reportData.summary.expenseByCategory),
        datasets: [
          {
            data: Object.values(reportData.summary.expenseByCategory),
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
            ],
          },
        ],
      },
      incomeVsExpense: {
        labels: ["Receitas", "Despesas"],
        datasets: [
          {
            data: [
              reportData.summary.totalIncome,
              reportData.summary.totalExpenses,
            ],
            backgroundColor: ["#4BC0C0", "#FF6384"],
          },
        ],
      },
      goalsProgress: reportData.goals.map((goal) => ({
        name: goal.name,
        progress: goal.progress,
      })),
    };

    return chartData;
  },
};
