// frontend/src/App.js

import React, { useState } from 'react';
import PrefeituraList from './components/PrefeituraList';
import SecretariaList from './components/SecretariaList';
import DepartamentoList from './components/DepartamentoList';
import ServicoList from './components/ServicoList';
import ServicoDetalhes from './components/ServicoDetalhes';

function App() {
  const [selectedPrefeitura, setSelectedPrefeitura] = useState(null);
  const [selectedSecretaria, setSelectedSecretaria] = useState(null);
  const [selectedDepartamento, setSelectedDepartamento] = useState(null);
  const [selectedServico, setSelectedServico] = useState(null);

  const resetToPrefeitura = () => {
    setSelectedPrefeitura(null);
    setSelectedSecretaria(null);
    setSelectedDepartamento(null);
    setSelectedServico(null);
  };

  const resetToSecretaria = () => {
    setSelectedSecretaria(null);
    setSelectedDepartamento(null);
    setSelectedServico(null);
  };

  const resetToDepartamento = () => {
    setSelectedDepartamento(null);
    setSelectedServico(null);
  };

  const resetToServico = () => {
    setSelectedServico(null);
  };

  return (
    <div className="App container my-4">
      <h1 className="text-center mb-4">Municipal Dashboard</h1>

      {!selectedPrefeitura && (
        <PrefeituraList onSelect={setSelectedPrefeitura} />
      )}

      {selectedPrefeitura && !selectedSecretaria && (
        <>
          <button className="btn btn-link mb-3" onClick={resetToPrefeitura}>Voltar às prefeituras</button>
          <SecretariaList prefeituraId={selectedPrefeitura.id} onSelect={setSelectedSecretaria} />
        </>
      )}

      {selectedSecretaria && !selectedDepartamento && (
        <>
          <button className="btn btn-link mb-3" onClick={resetToSecretaria}>Voltar às secretarias</button>
          <DepartamentoList secretariaId={selectedSecretaria.id} onSelect={setSelectedDepartamento} />
        </>
      )}

      {selectedDepartamento && !selectedServico && (
        <>
          <button className="btn btn-link mb-3" onClick={resetToDepartamento}>Voltar aos departamentos</button>
          <ServicoList departamentoId={selectedDepartamento.id} onSelect={setSelectedServico} />
        </>
      )}

      {selectedServico && (
        <ServicoDetalhes servico={selectedServico} onBack={resetToServico} />
      )}
    </div>
  );
}

export default App;