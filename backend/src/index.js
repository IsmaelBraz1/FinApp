// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AuthService } from "./auth/authService.js";
import { TransactionService } from "./transactions/transactionService.js";
import { GoalService } from "./goals/goalService.js";
import { ReportService } from "./reports/reportService.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Middleware de autenticação
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Token de autenticação não fornecido" });
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    if (error) {
      return res.status(401).json({ error: "Token inválido" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Erro na autenticação" });
  }
};

// Rotas de Autenticação
app.post("/auth/signup", async (req, res) => {
  try {
    const { email, password, nome } = req.body;
    const data = await AuthService.signUp(email, password, nome);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/auth/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await AuthService.signIn(email, password);
    res.json(data);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.get("/profile", authenticate, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", req.user.id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/auth/reset-password", async (req, res) => {
  try {
    const { email } = req.body;
    const data = await AuthService.resetPassword(email);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/auth/update-password", authenticate, async (req, res) => {
  try {
    const { newPassword } = req.body;
    const data = await AuthService.updatePassword(newPassword);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rotas de Transações
app.post("/transactions", authenticate, async (req, res) => {
  try {
    const transaction = await TransactionService.createTransaction(
      req.user.id,
      req.body
    );
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/transactions", authenticate, async (req, res) => {
  try {
    const transactions = await TransactionService.getTransactions(
      req.user.id,
      req.query
    );
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/transactions/summary", authenticate, async (req, res) => {
  try {
    const summary = await TransactionService.getTransactionSummary(
      req.user.id,
      req.query.period
    );
    res.json(summary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/transactions/:id", authenticate, async (req, res) => {
  try {
    await TransactionService.deleteTransaction(req.user.id, req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rotas de Metas
app.post("/goals", authenticate, async (req, res) => {
  try {
    const goal = await GoalService.createGoal(req.user.id, req.body);
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/goals", authenticate, async (req, res) => {
  try {
    const goals = await GoalService.getGoals(req.user.id);
    res.json(goals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/goals/:id/progress", authenticate, async (req, res) => {
  try {
    const goal = await GoalService.updateGoalProgress(
      req.user.id,
      req.params.id,
      req.body.amount
    );
    res.json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/goals/:id", authenticate, async (req, res) => {
  try {
    await GoalService.deleteGoal(req.user.id, req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rotas de Relatórios
app.get("/reports/financial", authenticate, async (req, res) => {
  try {
    const report = await ReportService.generateFinancialReport(
      req.user.id,
      req.query.period
    );
    res.json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/reports/pdf", authenticate, async (req, res) => {
  try {
    const pdfBuffer = await ReportService.generatePDFReport(
      req.user.id,
      req.query.period
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=relatorio-financeiro.pdf"
    );
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/reports/charts", authenticate, async (req, res) => {
  try {
    const chartData = await ReportService.getChartData(
      req.user.id,
      req.query.period
    );
    res.json(chartData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
