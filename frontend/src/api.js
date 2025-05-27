// frontend/src/api.js

const API_BASE_URL = 'http://127.0.0.1:8000/api';

function getAuthHeaders() {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
}

export async function fetchPrefeituras() {
  const response = await fetch(`${API_BASE_URL}/prefeituras/`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao buscar prefeituras');
  return response.json();
}

export async function fetchSecretarias(prefeituraId) {
  const response = await fetch(`${API_BASE_URL}/secretarias/?prefeitura=${prefeituraId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao buscar secretarias');
  return response.json();
}

export async function fetchDepartamentos(secretariaId) {
  const response = await fetch(`${API_BASE_URL}/departamentos/?secretaria=${secretariaId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao buscar departamentos');
  return response.json();
}

export async function fetchServicos(departamentoId) {
  const response = await fetch(`${API_BASE_URL}/servicos/?departamento=${departamentoId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao buscar serviços');
  return response.json();
}

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
  return response.json(); // retorna { access, refresh }
}

export function logoutUser() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}
