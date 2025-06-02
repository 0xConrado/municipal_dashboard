// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importa páginas
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Secretaria from './pages/Secretaria';
import Departamento from './pages/Departamento';
import Servico from './pages/Servico';
import UserProfileTest from './pages/UserProfileTest';

// Importa o layout com header/footer/botões etc
import Layout from './components/Layout';

// Importa o componente de proteção de rota
import RequireAuth from './components/RequireAuth';

// ===============================
// ⚙️ Componente App com rotas principais usando Layout e RequireAuth
// ===============================
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rota padrão que redireciona para /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Se já estiver logado, a própria página de login fará redirecionamento */}
        <Route path="/login" element={<Login />} />

        {/* Todas as rotas que precisam de autenticação ficam dentro de RequireAuth e Layout */}
        <Route
          path="/"
          element={
            // Primeiro, verifica se está autenticado; se sim, renderiza o Layout
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          {/* Rotas filhas a partir daqui só são renderizadas se o usuário for autenticado */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="secretaria/:id" element={<Secretaria />} />
          <Route path="departamento/:id" element={<Departamento />} />
          <Route path="servico/:id" element={<Servico />} />
          <Route path="servico/cadastrar/:departamentoId" element={<Servico />} />

          {/* Rota de teste de perfil (também protegida) */}
          <Route path="teste-usuario" element={<UserProfileTest />} />

          {/* Futuro perfil */}
          {/* <Route path="perfil" element={<Perfil />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
