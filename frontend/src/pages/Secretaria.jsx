// frontend/src/pages/Secretaria.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// ===============================
// 📄 Página Secretaria: lista todos os departamentos da secretaria selecionada
// ===============================
const Secretaria = () => {
  const { id } = useParams();                  // Pega o ID da secretaria da URL
  const [departamentos, setDepartamentos] = useState([]); // Estado dos departamentos
  const [secretariaNome, setSecretariaNome] = useState(''); // Nome da secretaria para mostrar no topo
  const navigate = useNavigate();

  // Função para buscar departamentos pela secretaria
  const fetchDepartamentos = async () => {
    try {
      // Buscar a secretaria para pegar o nome
      const resSec = await fetch(`/api/secretarias/${id}/`);
      const dataSec = await resSec.json();
      setSecretariaNome(dataSec.nome);

      // Buscar departamentos da secretaria
      const res = await fetch(`/api/secretarias/${id}/departamentos/`);
      const data = await res.json();
      setDepartamentos(data);
    } catch (error) {
      console.error('Erro ao buscar departamentos:', error);
    }
  };

  useEffect(() => {
    fetchDepartamentos();
  }, [id]);

  return (
    <div className="container mt-4">
      <h1>Secretaria: {secretariaNome}</h1>
      <div className="row">
        {departamentos.length === 0 && <p>Nenhum departamento cadastrado.</p>}
        {departamentos.map((dep) => (
          <div className="col-md-4 mb-3" key={dep.id}>
            {/* Card clicável que redireciona para página do departamento */}
            <div
              className="card h-100"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/departamento/${dep.id}`)}
            >
              <div className="card-body text-center">
                <h5 className="card-title">{dep.nome}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Secretaria;
