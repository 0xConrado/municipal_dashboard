// frontend/src/components/RequireAuth.jsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// ===============================
// 🔒 Componente de proteção de rota
// Verifica se existe token antes de renderizar o filho.
// Se não existir, redireciona para /login.
// ===============================
const RequireAuth = ({ children }) => {
  // Pega o token armazenado no localStorage
  const token = localStorage.getItem('access_token');
  
  // Guarda a localização atual (para, depois do login, poder voltar, se desejar)
  const location = useLocation();

  // Se não tiver token, redireciona para login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se tiver token, permite acesso à rota filha
  return children;
};

export default RequireAuth;
