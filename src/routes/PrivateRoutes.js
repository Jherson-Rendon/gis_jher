import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoutes = ({ children, requiredRole }) => {
  const { user, isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated()) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/auth/login" />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    // Redirigir al dashboard principal si no tiene el rol requerido
    return <Navigate to={`/${user.role.toLowerCase()}`} />;
  }

  return children;
};

export default PrivateRoutes;
