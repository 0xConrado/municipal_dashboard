// frontend/src/components/SecretariaPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Navbar, Nav } from 'react-bootstrap';
import { fetchDepartamentos, fetchSecretarias } from '../api';
import { Building } from 'react-bootstrap-icons';

function SecretariaPage({ onLogout }) {
  const { id } = useParams(); // ID da secretaria na URL
  const navigate = useNavigate();
  const [departamentos, setDepartamentos] = useState([]);
  const [secretariaNome, setSecretariaNome] = useState('');

  useEffect(() => {
    // Busca os departamentos
    fetchDepartamentos(id)
      .then(setDepartamentos)
      .catch((err) => console.error('Erro ao buscar departamentos:', err));

    // Busca o nome da secretaria
    fetchSecretarias()
      .then((secretarias) => {
        const secretaria = secretarias.find((s) => s.id === parseInt(id));
        if (secretaria) {
          setSecretariaNome(secretaria.nome);
        }
      })
      .catch((err) => console.error('Erro ao buscar secretarias:', err));
  }, [id]);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>{secretariaNome || 'Secretaria'}</Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="outline-light" onClick={() => navigate(-1)} className="me-2">
              Voltar
            </Button>
            <Button variant="outline-light" onClick={onLogout}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <h2 className="mb-4">Departamentos</h2>
       <Row>
            {departamentos.map((departamento) => (
                <Col key={departamento.id} md={4} className="mb-4">
                <Card
                    style={{ textAlign: 'center', cursor: 'pointer' }}
                    onClick={() => navigate(`/departamento/${departamento.id}`)} // 👈 Aqui está a navegação!
                >
                    <Card.Body>
                    <Building size={48} className="mb-2 text-secondary" />
                    <Card.Title>{departamento.nome}</Card.Title>
                    </Card.Body>
                </Card>
                </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default SecretariaPage;
