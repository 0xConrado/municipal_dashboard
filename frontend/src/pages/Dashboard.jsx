// frontend/src/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axiosConfig'; // Importa instância do Axios

// ===============================
// 📄 Página Dashboard: Lista todas as Secretarias cadastradas
// ===============================
const Dashboard = () => {
  // Estado para armazenar lista de secretarias vinda da API
  const [secretarias, setSecretarias] = useState([]);
  // Estado para armazenar possíveis erros ao buscar secretarias
  const [error, setError] = useState(null);

  // Hook para navegação programática
  const navigate = useNavigate();

  // ===============================
  // 🔍 Função que busca as secretarias da API backend
  // ===============================
  const fetchSecretarias = async () => {
    try {
      // Faz requisição GET para /api/secretarias/ usando Axios
      const response = await api.get('secretarias/');

      // response.data deve ser um array de secretarias
      if (!Array.isArray(response.data)) {
        throw new Error('Resposta inesperada da API');
      }

      // Atualiza o estado com as secretarias recebidas
      setSecretarias(response.data);
    } catch (err) {
      // Se o erro tiver response e status 401, o interceptor do Axios já deve ter tratado o logout
      // Basta capturar outros erros
      setError(err.message);
    }
  };

  // ===============================
  // useEffect para chamar a busca quando o componente montar
  // ===============================
  useEffect(() => {
    fetchSecretarias();
  }, []); // Executa uma vez ao montar

  // ===============================
  // Renderização
  // ===============================
  return (
    <div className="container mt-4">
      <h1>Dashboard - Secretarias</h1>

      {/* Se ocorrer erro, exibe mensagem */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="row">
        {/* Mapeia as secretarias para cards somente se for array */}
        {Array.isArray(secretarias) && secretarias.length > 0 ? (
          secretarias.map((sec) => (
            <div key={sec.id} className="col-md-4 mb-3">
              {/* Card clicável que direciona para a página da Secretaria */}
              <div
                className="card h-100"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/secretaria/${sec.id}`)}
              >
                {/* Imagem do card: usa a URL do campo imagem_url ou um placeholder */}
                <img
                  src={sec.imagem_url || 'https://via.placeholder.com/300x150?text=Secretaria'}
                  className="card-img-top"
                  alt={`Imagem da secretaria ${sec.nome}`}
                />

                {/* Corpo do card */}
                <div className="card-body">
                  <h5 className="card-title text-center">{sec.nome}</h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Se não houver secretarias e não houver erro, mostra mensagem
          !error && <p>Nenhuma secretaria cadastrada.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
