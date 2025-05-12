// frontend/src/components/PrefeituraList.js

import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { fetchPrefeituras } from '../api';

function PrefeituraList({ onSelect }) {
  const [prefeituras, setPrefeituras] = useState([]);

  useEffect(() => {
    fetchPrefeituras().then(data => setPrefeituras(data));
  }, []);

  return (
    <Container>
      <Row>
        {prefeituras.map(prefeitura => (
          <Col key={prefeitura.id} md={4} className="mb-3">
            <Card onClick={() => onSelect(prefeitura)} style={{ cursor: 'pointer' }}>
              <Card.Body>
                <Card.Title>{prefeitura.nome}</Card.Title>
                <Card.Text>Endereço: {prefeitura.endereco}</Card.Text>
                <Card.Text>Telefone: {prefeitura.telefone}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PrefeituraList;