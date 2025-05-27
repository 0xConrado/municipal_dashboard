// Base da URL da sua API backend
const API_BASE_URL = 'http://127.0.0.1:8000/api';

/**
 * Retorna os headers padrão de requisições autenticadas.
 * Se o token estiver salvo no localStorage, inclui o Authorization.
 */
function getAuthHeaders() {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}), // Adiciona Authorization só se token existir
  };
}

/**
 * Busca todas as prefeituras.
 * Token será incluído se estiver disponível.
 */
export async function fetchPrefeituras() {
  const response = await fetch(`${API_BASE_URL}/prefeituras/`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao buscar prefeituras');
  return response.json();
}

/**
 * Busca secretarias. Pode filtrar por prefeitura.
 * @param {number} prefeituraId - ID da prefeitura para filtrar (opcional)
 */
export async function fetchSecretarias(prefeituraId) {
  let url = `${API_BASE_URL}/secretarias/`;
  if (prefeituraId) {
    url += `?prefeitura=${prefeituraId}`;
  }

  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error('Erro ao buscar secretarias');
  return response.json();
}

/**
 * Busca departamentos de uma secretaria específica.
 * @param {number} secretariaId - ID da secretaria
 */
export async function fetchDepartamentos(secretariaId) {
  const response = await fetch(`${API_BASE_URL}/departamentos/?secretaria=${secretariaId}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error('Erro ao buscar departamentos');
  return response.json();
}

/**
 * Busca serviços de um departamento específico.
 * @param {number} departamentoId - ID do departamento
 */
export async function fetchServicos(departamentoId) {
  const response = await fetch(`${API_BASE_URL}/servicos/?departamento=${departamentoId}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error('Erro ao buscar serviços');
  return response.json();
} 

// API opcional
export async function fetchDepartamento(id) {
  const response = await fetch(`${API_BASE_URL}/departamentos/${id}/`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao buscar departamento');
  return response.json();
}

/**
 * Busca um serviço específico pelo ID.
 * @param {number} id - ID do serviço
 */
export async function fetchServico(id) {
  const response = await fetch(`${API_BASE_URL}/servicos/${id}/`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error('Erro ao buscar serviço');
  return response.json();
}


/**
 * Autentica o usuário e salva os tokens no localStorage.
 * @param {string} username
 * @param {string} password
 */
export async function loginUser(username, password) {
  const response = await fetch(`${API_BASE_URL}/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Erro ao autenticar');
  }

  const data = await response.json();

  // Armazena os tokens para uso nas próximas requisições
  localStorage.setItem('access_token', data.access);
  localStorage.setItem('refresh_token', data.refresh);

  return data;
}

/**
 * Realiza logout limpando os tokens do localStorage.
 */
export function logoutUser() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}
