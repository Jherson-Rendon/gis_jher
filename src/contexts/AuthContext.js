// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import mockAuthService from '../views/auth/services/mockAuthService';
import authServices from '../views/auth/services/authServices';
import { useApiMode } from './ApiModeContext';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { useMockApi } = useApiMode(); // Usar el contexto de API

  // Determinar el servicio a usar basado en el contexto
  const service = useMockApi ? mockAuthService : authServices;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = service.getCurrentUser();
        console.log('Usuario actual:', currentUser);

        if (currentUser && !useMockApi) {
          // Verificar si el token es válido
          const isValid = await service.validateToken();
          if (!isValid) {
            service.logout();
            setUser(null);
            return;
          }
        }

        setUser(currentUser);
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [service, useMockApi]);

  const login = async (credentials) => {
    try {
      const userData = await service.login(credentials);
      console.log('Login exitoso, datos de usuario:', userData);
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const logout = () => {
    service.logout();
    setUser(null);
    // Redireccionar a login después de logout
    window.location.href = '/auth/login';
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: () => !!user,
    hasRole: (role) => user?.role === role,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
