// frontend/src/hooks/useUser.js

import { useState, useEffect } from 'react';
import api from '../axiosConfig'; // Importa a instância do Axios configurada

// ===============================
// 📡 Hook para buscar dados do usuário autenticado da API
// ===============================
const useUser = () => {
  const [user, setUser] = useState(null);       // Estado para armazenar os dados do usuário
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(null);     // Estado para armazenar erro

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('access_token');  // Pega token JWT do localStorage
        if (!token) {
          setLoading(false);
          return;
        }

        // Faz a requisição para /api/user/ utilizando a instância do Axios (que já insere token)
        const response = await api.get('user/');

        // Salva os dados do usuário no estado (sem logar no console)
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Retorna os estados para o componente consumir
  return { user, loading, error };
};

export default useUser;
