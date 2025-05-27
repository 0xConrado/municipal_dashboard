// frontend/src/components/DepartamentoPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Navbar, Nav } from 'react-bootstrap';
import { fetchServicos, fetchDepartamentos } from '../api';
import { Archive } from 'react-bootstrap-icons';

function DepartamentoPage({ onLogout }) {
  const { id } = useParams(); // id do departamento atual
  const navigate = useNavigate();
  const [servicos, setServicos] = useState([]);
  const [departamentoNome, setDepartamentoNome] = useState('');

  useEffect(() => {
    // Busca serviços relacionados ao departamento
    fetchServicos(id)
      .then(setServicos)
      .catch((err) => console.error('Erro ao buscar serviços:', err));

    // Busca nome do departamento pelo id
    fetchDepartamentos()
      .then((departamentos) => {
        const departamento = departamentos.find((d) => d.id === parseInt(id));
        if (departamento) {
          setDepartamentoNome(departamento.nome);
        }
      })
      .catch((err) => console.error('Erro ao buscar departamentos:', err));
  }, [id]);

  const handleServicoClick = (servicoId) => {
    console.log("Navegando para serviço:", servicoId); // debug
    navigate(`/servico/${servicoId}`);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>{departamentoNome || 'Departamento'}</Navbar.Brand>
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
        <h2 className="mb-4">Serviços</h2>
        <Row>
          {servicos.map((servico) => (
            <Col key={servico.id} md={4} className="mb-4">
              <Card
                style={{ textAlign: 'center', cursor: 'pointer' }}
                onClick={() => handleServicoClick(servico.id)}
              >
                <Card.Body>
                  <Archive size={48} className="mb-2 text-secondary" />
                  <Card.Title>{servico.nome}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default DepartamentoPage;
