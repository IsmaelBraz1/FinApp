// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import PaginaInicio from './components/PaginaInicio';
import PaginaLogin from './components/PaginaLogin';
import PaginaCadastro from './components/PaginaCadastro'; // 1. Importe o novo componente
import Painel from './components/Painel';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicio />} />
      <Route path="/login" element={<PaginaLogin />} />
      <Route path="/cadastro" element={<PaginaCadastro />} /> {/* 2. Adicione a nova rota */}
       <Route path="/dashboard" element={<Painel />} /> {/* 2. Adicione a nova rota */}
    </Routes>
  );
}

export default App;