// frontend/src/components/Login.jsx

import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { loginUser } from '../api';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { access, refresh } = await loginUser(username, password);
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      onLoginSuccess(); // esta função deve ser passada do App.js
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Usuário</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Entrar
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
