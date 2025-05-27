import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { fetchSecretarias } from '../api';

function SecretariaList() {
  const [secretarias, setSecretarias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSecretarias()
      .then(data => {
        setSecretarias(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Erro ao buscar secretarias');
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner animation="border" />;

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <h2 className="mb-4">Secretarias Cadastradas</h2>
      <Row>
        {secretarias.length === 0 && <p>Nenhuma secretaria cadastrada.</p>}
        {secretarias.map(sec => (
          <Col md={4} key={sec.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{sec.nome}</Card.Title>
                <Card.Text>Prefeitura: {sec.prefeitura_nome || '—'}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SecretariaList;
