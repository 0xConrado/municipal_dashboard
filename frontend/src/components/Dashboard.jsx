// frontend/src/components/Dashboard.jsx

import React from 'react';
import { Button, Container, Navbar, Nav } from 'react-bootstrap';

function Dashboard({ token, onLogout }) {
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
        <h2>Bem-vindo ao Dashboard</h2>
        {/* Aqui você coloca seus componentes que listam prefeituras, secretarias, etc */}
      </Container>
    </>
  );
}

export default Dashboard;
