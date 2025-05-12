// frontend/src/components/SecretariaList.js

import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { fetchSecretarias } from '../api';

function SecretariaList({ prefeituraId, onSelect }) {
  const [secretarias, setSecretarias] = useState([]);

  useEffect(() => {
    if (prefeituraId) {
      fetchSecretarias(prefeituraId).then(data => setSecretarias(data));
    }
  }, [prefeituraId]);

  return (
    <Container>
      <Row>
        {secretarias.map(secretaria => (
          <Col key={secretaria.id} md={4} className="mb-3">
            <Card onClick={() => onSelect(secretaria)} style={{ cursor: 'pointer' }}>
              <Card.Body>
                <Card.Title>{secretaria.nome}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SecretariaList;