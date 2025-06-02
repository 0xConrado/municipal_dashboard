// frontend/src/pages/Servico.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

// ===============================
// 📄 Página Serviço: para listar e cadastrar serviços
// ===============================
const Servico = () => {
  const { id, departamentoId } = useParams();  
  // id = id do serviço (quando for visualizar ou editar)
// departamentoId = id do departamento para cadastro

  const navigate = useNavigate();
  const location = useLocation();

  const [servico, setServico] = useState(null);      // Estado do serviço para visualizar/editar
  const [nome, setNome] = useState('');              // Nome do serviço no formulário
  const [descricao, setDescricao] = useState('');    // Descrição do serviço no formulário
  const [isCadastrar, setIsCadastrar] = useState(false); // Define se está na tela de cadastro
  const [servicosList, setServicosList] = useState([]);  // Lista dos serviços para listagem (quando for listar)

  // Função para buscar um serviço pelo ID para exibir detalhes
  const fetchServico = async () => {
    try {
      const res = await fetch(`/api/servicos/${id}/`);
      const data = await res.json();
      setServico(data);
      setNome(data.nome);
      setDescricao(data.descricao || '');
    } catch (error) {
      console.error('Erro ao buscar serviço:', error);
    }
  };

  // Função para buscar lista de serviços de um departamento
  const fetchServicosDepartamento = async () => {
    try {
      const res = await fetch(`/api/departamentos/${departamentoId}/servicos/`);
      const data = await res.json();
      setServicosList(data);
    } catch (error) {
      console.error('Erro ao buscar serviços do departamento:', error);
    }
  };

  // Detecta se a rota é para cadastrar serviço
  useEffect(() => {
    if (location.pathname.includes('cadastrar')) {
      setIsCadastrar(true);
      fetchServicosDepartamento();
    } else if (id) {
      fetchServico();
    }
  }, [id, departamentoId, location.pathname]);

  // Função para enviar o formulário de cadastro
  const handleCadastrar = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/servicos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          descricao,
          departamento: departamentoId,  // Associa serviço ao departamento
        }),
      });

      if (res.ok) {
        alert('Serviço cadastrado com sucesso!');
        navigate(`/departamento/${departamentoId}`); // Volta para página do departamento
      } else {
        alert('Erro ao cadastrar serviço.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar serviço:', error);
    }
  };

  // Renderiza a tela de cadastro ou de detalhes conforme o contexto
  if (isCadastrar) {
    return (
      <div className="container mt-4">
        <h2>Cadastrar Novo Serviço</h2>
        <form onSubmit={handleCadastrar}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome do Serviço</label>
            <input
              type="text"
              id="nome"
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="descricao" className="form-label">Descrição</label>
            <textarea
              id="descricao"
              className="form-control"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={4}
            />
          </div>

          <button type="submit" className="btn btn-primary">Cadastrar</button>
        </form>
      </div>
    );
  }

  // Tela de visualização do serviço
  if (servico) {
    return (
      <div className="container mt-4">
        <h2>Detalhes do Serviço</h2>
        <h3>{servico.nome}</h3>
        <p>{servico.descricao || 'Sem descrição disponível.'}</p>

        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Voltar
        </button>
      </div>
    );
  }

  // Caso nenhum serviço carregado ainda
  return <div className="container mt-4">Carregando...</div>;
};

export default Servico;
