// frontend/src/api.js

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function fetchPrefeituras() {
  const response = await fetch(`${API_BASE_URL}/prefeituras/`);
  if (!response.ok) throw new Error('Erro ao buscar prefeituras');
  return response.json();
}

export async function fetchSecretarias(prefeituraId) {
  const response = await fetch(`${API_BASE_URL}/secretarias/?prefeitura=${prefeituraId}`);
  if (!response.ok) throw new Error('Erro ao buscar secretarias');
  return response.json();
}

export async function fetchDepartamentos(secretariaId) {
  const response = await fetch(`${API_BASE_URL}/departamentos/?secretaria=${secretariaId}`);
  if (!response.ok) throw new Error('Erro ao buscar departamentos');
  return response.json();
}

export async function fetchServicos(departamentoId) {
  const response = await fetch(`${API_BASE_URL}/servicos/?departamento=${departamentoId}`);
  if (!response.ok) throw new Error('Erro ao buscar serviços');
  return response.json();
}