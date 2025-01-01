//Componente de protecao das rotas com login;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn !== true) {
    // Redireciona para a página de login se o usuário não estiver logado
    return <Navigate to="/login" />;
  }

  // Renderiza a página protegida se o usuário estiver logado
  return children;
}

export default ProtectedRoute;

