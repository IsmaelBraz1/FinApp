// src/goals/goalService.js
import { supabase } from "../utils/supabaseClient.js";

export const GoalService = {
  async createGoal(userId, goalData) {
    const { data, error } = await supabase
      .from("goals")
      .insert([
        {
          user_id: userId,
          name: goalData.name,
          target_amount: goalData.targetAmount,
          current_amount: goalData.currentAmount || 0,
          target_date: goalData.targetDate,
          category: goalData.category,
        },
      ])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  },

  async getGoals(userId) {
    const { data, error } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", userId)
      .order("target_date", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  async updateGoalProgress(userId, goalId, amount) {
    // Primeiro obtemos a meta atual
    const { data: goalData, error: fetchError } = await supabase
      .from("goals")
      .select("current_amount")
      .eq("user_id", userId)
      .eq("id", goalId)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    const newAmount = goalData.current_amount + amount;

    // Atualizamos a meta
    const { data, error } = await supabase
      .from("goals")
      .update({ current_amount: newAmount })
      .eq("user_id", userId)
      .eq("id", goalId)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  },

  async deleteGoal(userId, goalId) {
    const { error } = await supabase
      .from("goals")
      .delete()
      .eq("user_id", userId)
      .eq("id", goalId);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  },
};
