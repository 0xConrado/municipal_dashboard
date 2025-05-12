// frontend/src/components/DepartamentoList.js

import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { fetchDepartamentos } from '../api';

function DepartamentoList({ secretariaId, onSelect }) {
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    if (secretariaId) {
      fetchDepartamentos(secretariaId).then(data => setDepartamentos(data));
    }
  }, [secretariaId]);

  return (
    <Container>
      <Row>
        {departamentos.map(departamento => (
          <Col key={departamento.id} md={4} className="mb-3">
            <Card onClick={() => onSelect(departamento)} style={{ cursor: 'pointer' }}>
              <Card.Body>
                <Card.Title>{departamento.nome}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DepartamentoList;