// frontend/src/pages/Departamento.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// ===============================
// 📄 Página Departamento: lista todos os serviços do departamento selecionado
// ===============================
const Departamento = () => {
  const { id } = useParams();                  // Pega o ID do departamento da URL
  const [servicos, setServicos] = useState([]); // Estado para serviços
  const [departamentoNome, setDepartamentoNome] = useState(''); // Nome do departamento
  const navigate = useNavigate();

  // Função para buscar serviços do departamento
  const fetchServicos = async () => {
    try {
      // Buscar departamento para pegar o nome
      const resDep = await fetch(`/api/departamentos/${id}/`);
      const dataDep = await resDep.json();
      setDepartamentoNome(dataDep.nome);

      // Buscar serviços do departamento
      const res = await fetch(`/api/departamentos/${id}/servicos/`);
      const data = await res.json();
      setServicos(data);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  };

  useEffect(() => {
    fetchServicos();
  }, [id]);

  return (
    <div className="container mt-4">
      <h1>Departamento: {departamentoNome}</h1>
      <div className="row">
        {servicos.length === 0 && <p>Nenhum serviço cadastrado.</p>}
        {servicos.map((serv) => (
          <div className="col-md-4 mb-3" key={serv.id}>
            {/* Card clicável que redireciona para página do serviço */}
            <div
              className="card h-100"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/servico/${serv.id}`)}
            >
              <div className="card-body text-center">
                <h5 className="card-title">{serv.nome}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botão para criar um novo serviço */}
      <div className="mt-4">
        <button 
          className="btn btn-success"
          onClick={() => navigate(`/servico/cadastrar/${id}`)}
        >
          Cadastrar Novo Serviço
        </button>
      </div>
    </div>
  );
};

export default Departamento;
