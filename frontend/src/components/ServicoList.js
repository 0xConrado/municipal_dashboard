// frontend/src/components/ServicoList.js

import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { fetchServicos } from '../api';

function ServicoList({ departamentoId, onSelect }) {
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    if (departamentoId) {
      fetchServicos(departamentoId).then(data => setServicos(data));
    }
  }, [departamentoId]);

  return (
    <Container>
      <Row>
        {servicos.map(servico => (
          <Col key={servico.id} md={4} className="mb-3">
            <Card onClick={() => onSelect(servico)} style={{ cursor: 'pointer' }}>
              <Card.Body>
                <Card.Title>{servico.nome}</Card.Title>
                <Card.Text>{servico.descricao}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ServicoList;