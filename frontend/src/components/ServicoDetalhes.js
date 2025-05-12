// frontend/src/components/ServicoDetalhes.js

import React from 'react';
import { Card, Container, Button } from 'react-bootstrap';

function ServicoDetalhes({ servico, onBack }) {
  if (!servico) return null;

  return (
    <Container>
      <Button variant="secondary" className="mb-3" onClick={onBack}>Voltar</Button>
      <Card>
        <Card.Body>
          <Card.Title>{servico.nome}</Card.Title>
          <Card.Text>{servico.descricao}</Card.Text>
          {/* Aqui você pode adicionar as ações específicas do serviço */}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ServicoDetalhes;