import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { PersonCircle, BoxArrowLeft, ArrowLeft, Moon, Sun } from 'react-bootstrap-icons';

// ==========================================
// 🧠 Função utilitária: retorna título com base na rota atual
// ==========================================
const getPageTitle = (pathname) => {
  if (pathname.startsWith('/dashboard')) return 'Dashboard';
  if (pathname.startsWith('/secretaria')) return 'Secretaria';
  if (pathname.startsWith('/departamento')) return 'Departamento';
  if (pathname.startsWith('/servico')) return 'Serviço';
  if (pathname.startsWith('/login')) return 'Login';
  if (pathname.startsWith('/perfil')) return 'Perfil';
  return 'Municipal Dashboard';
};

// ==========================================
// 🔲 Componente Layout padrão
// ==========================================
const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useUser();

  // Estado do tema claro/escuro
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Aplica as classes do tema ao body sempre que mudar
  useEffect(() => {
    document.body.classList.remove('bg-light', 'bg-dark', 'text-light', 'text-dark');
    if (theme === 'dark') {
      document.body.classList.add('bg-dark', 'text-light');
    } else {
      document.body.classList.add('bg-light', 'text-dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Alterna entre tema claro e escuro
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  // Logout: limpa tokens e redireciona para login
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  // Botão voltar
  const handleBack = () => navigate(-1);

  // Mostra botão voltar se não estiver nas rotas principais
  const showBackButton = !['/dashboard', '/login'].includes(location.pathname);

  // Cor dos ícones depende do tema
  const btnColor = theme === 'dark' ? '#fff' : '#000';

  return (
    <div className="d-flex flex-column min-vh-100 position-relative">
      {/* =============================== */}
      {/* 🔼 Header */}
      {/* =============================== */}
      <header
        className={`d-flex justify-content-between align-items-center p-3 shadow-sm ${
          theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'
        }`}
        style={{ minHeight: '56px' }}
      >
        {/* Botão Voltar no canto esquerdo */}
        <div style={{ width: '100px' }}>
          {showBackButton && (
            <button
              onClick={handleBack}
              className="btn btn-link p-0"
              aria-label="Voltar"
              title="Voltar"
              style={{ fontSize: '1.5rem', color: btnColor }}
            >
              <ArrowLeft />
            </button>
          )}
        </div>

        {/* Título centralizado da página atual */}
        <div style={{ flexGrow: 1, textAlign: 'center', fontWeight: '600', fontSize: '1.25rem' }}>
          {getPageTitle(location.pathname)}
        </div>

        {/* Perfil e Logout no canto direito */}
        <div className="d-flex align-items-center gap-3" style={{ justifyContent: 'flex-end' }}>
          {/* Botão Perfil com nome em uma linha só */}
          <button
            onClick={() => navigate('/perfil')}
            className="btn btn-link d-flex align-items-center gap-1 p-0"
            aria-label="Perfil"
            title="Perfil"
            style={{
              fontSize: '1.25rem',
              color: btnColor,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '200px',
              textDecoration: 'none', // 👈 remove o sublinhado
            }}
            disabled={loading}
          >
            <PersonCircle />
            {user ? `${user.first_name} ${user.last_name}` : 'Carregando...'}
          </button>

          {/* Botão Logout */}
          <button
            onClick={handleLogout}
            className="btn btn-link p-0"
            aria-label="Logout"
            title="Logout"
            style={{ fontSize: '1.5rem', color: btnColor }}
          >
            <BoxArrowLeft />
          </button>
        </div>
      </header>

      {/* =============================== */}
      {/* 🧱 Conteúdo principal (rotas filhas) */}
      {/* =============================== */}
      <main
        className={`flex-grow-1 container py-3 ${
          theme === 'dark' ? 'text-light' : 'text-dark'
        }`}
      >
        <Outlet />
      </main>

      {/* =============================== */}
      {/* 📌 Rodapé */}
      {/* =============================== */}
      <footer
        className={`text-center p-3 mt-auto shadow-sm ${
          theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'
        }`}
      >
        © 2025 Municipal Dashboard
      </footer>

      {/* =============================== */}
      {/* 🌓 Botão de alternância de tema (fixo no canto inferior esquerdo) */}
      {/* =============================== */}
      <button
        onClick={toggleTheme}
        aria-label="Alternar tema claro/escuro"
        title="Alternar tema claro/escuro"
        style={{
          position: 'fixed',
          bottom: '1rem',
          left: '1rem',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: theme === 'dark' ? '#444' : '#ddd',
          color: btnColor,
          width: '48px',
          height: '48px',
          fontSize: '1.5rem',
          cursor: 'pointer',
          boxShadow: '0 0 6px rgba(0,0,0,0.2)',
          zIndex: 1000,
        }}
      >
        {theme === 'light' ? <Moon /> : <Sun />}
      </button>
    </div>
  );
};

export default Layout;
