import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav } from 'react-bootstrap';
import { fetchSecretarias } from '../api';
import { Building } from 'react-bootstrap-icons'; // Ícone SVG do Bootstrap

function Dashboard({ onLogout, onSelectSecretaria }) {
  const [secretarias, setSecretarias] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Token não encontrado. Por favor, faça login novamente.');
      return;
    }

    fetchSecretarias()
      .then(setSecretarias)
      .catch(err => {
        console.error("Erro ao carregar secretarias", err);
        setError('Erro ao carregar secretarias. Verifique sua autenticação.');
      });
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>Municipal Dashboard</Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="outline-light" onClick={onLogout}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <h2 className="mb-4">Secretarias</h2>

        {/* Exibe erro, se houver */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <Row>
          {secretarias.map((secretaria) => (
            <Col key={secretaria.id} md={4} className="mb-4">
              <Card
                onClick={() => onSelectSecretaria(secretaria)}
                style={{ cursor: 'pointer', textAlign: 'center' }}
              >
                <Card.Body>
                  <Building size={64} className="mb-3 text-primary" />
                  <Card.Title>{secretaria.nome}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
