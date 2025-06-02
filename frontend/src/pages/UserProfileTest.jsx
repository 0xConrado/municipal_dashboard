import React from 'react';
import useUser from '../hooks/useUser'; // Importa seu hook customizado para pegar dados do usuário

// ===============================
// 🧪 Componente para testar exibição dos dados do usuário autenticado
// ===============================
const UserProfileTest = () => {
  // Chama o hook para pegar usuário, loading e erro
  const { user, loading, error } = useUser();

  // Se estiver carregando os dados, exibe mensagem
  if (loading) {
    return <p>Carregando dados do usuário...</p>;
  }

  // Se ocorreu erro na requisição, mostra o erro
  if (error) {
    return <p>Erro: {error}</p>;
  }

  // Se não tem usuário (token provavelmente ausente), informa
  if (!user) {
    return <p>Nenhum usuário autenticado. Faça login primeiro.</p>;
  }

  // Exibe dados do usuário em formato amigável
  return (
    <div>
      <h2>Dados do Usuário Autenticado</h2>
      <ul>
        <li><strong>ID:</strong> {user.id}</li>
        <li><strong>Usuário:</strong> {user.username}</li>
        <li><strong>Nome:</strong> {user.first_name} {user.last_name}</li>
        <li><strong>Email:</strong> {user.email}</li>
      </ul>
    </div>
  );
};

export default UserProfileTest;
    