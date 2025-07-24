// src/auth/authService.js
import { supabase } from "../utils/supabaseClient.js";

export const AuthService = {
  async signUp(email, password, nome) {
    // Adicionado parâmetro 'nome'
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.FRONTEND_URL}/welcome`,
        data: { nome }, // Adiciona o nome ao perfil do usuário
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    // Criar perfil do usuário na tabela profiles
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: data.user.id,
        email: data.user.email,
        nome: nome,
        created_at: new Date(),
      },
    ]);

    if (profileError) {
      throw new Error(profileError.message);
    }

    return data;
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    return { success: true };
  },

  async resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/reset-password`,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  async updatePassword(newPassword) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw new Error(error.message);
    }
    return data.session;
  },
};
