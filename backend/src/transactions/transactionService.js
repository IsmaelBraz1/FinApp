// src/transactions/transactionService.js
import { supabase } from "../utils/supabaseClient.js";

export const TransactionService = {
  async createTransaction(userId, transactionData) {
    const { data, error } = await supabase
      .from("transactions")
      .insert([
        {
          user_id: userId,
          amount: transactionData.amount,
          type: transactionData.type, // 'income' or 'expense'
          category: transactionData.category,
          descricao: transactionData.description, // Note o campo 'descricao'
          date: transactionData.date || new Date(),
        },
      ])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  },

  async getTransactions(userId, filters = {}) {
    let query = supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (filters.type) {
      query = query.eq("type", filters.type);
    }

    if (filters.category) {
      query = query.eq("category", filters.category);
    }

    if (filters.startDate && filters.endDate) {
      query = query.gte("date", filters.startDate).lte("date", filters.endDate);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  async getTransactionSummary(userId, period = "month") {
    const currentDate = new Date();
    let startDate;

    if (period === "month") {
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
    } else if (period === "year") {
      startDate = new Date(currentDate.getFullYear(), 0, 1);
    } else {
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 30
      );
    }

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .gte("date", startDate.toISOString())
      .lte("date", currentDate.toISOString());

    if (error) {
      throw new Error(error.message);
    }

    const summary = {
      totalIncome: 0,
      totalExpenses: 0,
      byCategory: {},
    };

    data.forEach((transaction) => {
      if (transaction.type === "income") {
        summary.totalIncome += transaction.amount;
      } else {
        summary.totalExpenses += transaction.amount;

        if (!summary.byCategory[transaction.category]) {
          summary.byCategory[transaction.category] = 0;
        }
        summary.byCategory[transaction.category] += transaction.amount;
      }
    });

    summary.netBalance = summary.totalIncome - summary.totalExpenses;

    return summary;
  },

  async deleteTransaction(userId, transactionId) {
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("user_id", userId)
      .eq("id", transactionId);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  },
};
