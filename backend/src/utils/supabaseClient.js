// src/utils/supabaseClient.js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente
dotenv.config();

// Verifica se as variáveis estão definidas
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error("Supabase URL e Key devem ser definidas no arquivo .env");
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
