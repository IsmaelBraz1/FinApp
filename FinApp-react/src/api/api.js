// src/api/api.js
import axios from "axios";
import { supabase } from "./supabaseClient";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
});

// Interceptor para adicionar o token JWT às requisições
api.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

export default api;
