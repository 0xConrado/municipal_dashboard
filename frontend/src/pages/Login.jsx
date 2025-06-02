// frontend/src/pages/Login.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ===============================
// 🛂 Página de Login que chama a API para obter tokens JWT
// ===============================
const Login = () => {
  const navigate = useNavigate();

  // Estados para armazenar os valores de usuário, senha e erro
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // ===============================
  // 🔍 Verifica existência de token ao montar o componente
  // ===============================
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Se já existe token válido no localStorage, redireciona diretamente para o dashboard
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  // ===============================
  // 📤 Função chamada no submit do formulário
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpa mensagem de erro anterior

    try {
      // Faz requisição ao endpoint de obtenção de tokens JWT
      // ❗ Usa /api/token/ porque o proxy está configurado para apontar ao Django em localhost:8000
      const response = await fetch('/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      // Se a resposta não for OK (status 2xx), lança erro para o catch
      if (!response.ok) {
        throw new Error('Usuário ou senha inválidos');
      }

      // Converte resposta JSON em objeto JavaScript
      const data = await response.json();

      // Salva tokens de acesso e refresh no localStorage
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      // Redireciona para o dashboard após login bem-sucedido
      navigate('/dashboard', { replace: true });
    } catch (err) {
      // Em caso de falha, atualiza estado de erro para exibir mensagem
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="card-title mb-4 text-center">Login</h3>

        {/* Exibe mensagem de erro se existir */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Formulário de login */}
        <form onSubmit={handleSubmit}>
          {/* Campo Usuário */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Usuário
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>

          {/* Campo Senha */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Botão Entrar */}
          <button type="submit" className="btn btn-primary w-100">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;