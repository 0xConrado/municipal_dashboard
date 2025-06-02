// frontend/src/axiosConfig.js

import axios from 'axios';

// ===============================
// 🛠️ Instância do Axios configurada para o backend Django
// ===============================
// A URL base '/api/' vai ser encaminhada via proxy para http://localhost:8000/api/
const api = axios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===============================
// 🔐 Interceptor de requisição
//
// Antes de cada requisição, insere o access_token no header Authorization, se existir.
// ===============================
api.interceptors.request.use(
  (config) => {
    // Busca o token de acesso no localStorage
    const token = localStorage.getItem('access_token');
    if (token) {
      // Adiciona o header Authorization: Bearer <token>
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// ♻️ Interceptor de resposta
//
// Se a resposta retornar 401 (access_token expirado ou inválido), tentamos renovar o token.
// ===============================
api.interceptors.response.use(
  (response) => {
    // Se a resposta estiver OK (2xx), retorna normalmente
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Se o status for 401 e ainda não temos um retry marcado
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Marcar que já tentamos renovar

      // Tenta renovar o access_token usando o refresh_token
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          // Chama o endpoint /api/token/refresh/ para obter novo access_token
          const res = await axios.post(
            '/api/token/refresh/',
            { refresh: refreshToken },
            {
              baseURL: '/api/', // Mesma baseURL para proxy encaminhar a http://localhost:8000
              headers: { 'Content-Type': 'application/json' },
            }
          );

          // Se obtivemos um novo access_token, atualiza no localStorage
          const newAccessToken = res.data.access;
          localStorage.setItem('access_token', newAccessToken);

          // Atualiza o header Authorization na requisição original
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Refaz a requisição original (com o novo token)
          return api(originalRequest);
        } catch (refreshError) {
          // Se falhar ao renovar (refresh_token expirou ou inválido), faz logout completo
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login'; // Redireciona para login
          return Promise.reject(refreshError);
        }
      }

      // Se não tiver refresh_token, redireciona para login
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }

    // Se não for 401 ou já tentamos renovar, rejeita o erro
    return Promise.reject(error);
  }
);

export default api;
