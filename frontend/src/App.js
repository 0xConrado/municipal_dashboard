// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SecretariaPage from './components/SecretariaPage';
import DepartamentoPage from './components/DepartamentoPage';  // Import novo
import ServicoPage from './components/ServicoPage';  // importe o componente
import { logoutUser } from './api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              // Passa wrapper para injetar onSelectSecretaria com navegação
              <DashboardWrapper onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />
          }
        />
        <Route
          path="/secretaria/:id"
          element={
            isAuthenticated ? (
              <SecretariaPageWrapper onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/departamento/:id"
          element={
            isAuthenticated ? (
              <DepartamentoPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/servico/:id"
          element={
            isAuthenticated ? (
              <ServicoPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

// Wrapper para Dashboard para adicionar navegação ao clicar na secretaria
function DashboardWrapper({ onLogout }) {
  const navigate = useNavigate();

  const handleSelectSecretaria = (secretaria) => {
    navigate(`/secretaria/${secretaria.id}`);
  };

  return <Dashboard onLogout={onLogout} onSelectSecretaria={handleSelectSecretaria} />;
}

// Wrapper para SecretariaPage para adicionar navegação ao clicar em departamento (se quiser)
function SecretariaPageWrapper({ onLogout }) {
  const navigate = useNavigate();

  // Supondo que você passe onSelectDepartamento para SecretariaPage para navegar para departamento
  const handleSelectDepartamento = (departamento) => {
    navigate(`/departamento/${departamento.id}`);
  };

  return (
    <SecretariaPage
      onLogout={onLogout}
      onSelectDepartamento={handleSelectDepartamento}
    />
  );
}

export default App;
