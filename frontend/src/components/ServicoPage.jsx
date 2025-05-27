import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchServico } from '../api';

function ServicoPage() {
  const { id } = useParams(); // id do serviço
  const navigate = useNavigate();
  const [servico, setServico] = useState(null);

  useEffect(() => {
    fetchServico(id)
      .then(setServico)
      .catch(console.error);
  }, [id]);

  if (!servico) return <p>Carregando serviço...</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Voltar</button>
      <h1>{servico.nome}</h1>
      <p>{servico.descricao}</p>
    </div>
  );
}

export default ServicoPage;
