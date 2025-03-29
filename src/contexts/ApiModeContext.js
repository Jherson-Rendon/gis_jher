// src/contexts/ApiModeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ApiModeContext = createContext();

export const useApiMode = () => useContext(ApiModeContext);

export const ApiModeProvider = ({ children }) => {
  // Obtener el modo inicial desde localStorage o usar mock por defecto
  const [useMockApi, setUseMockApi] = useState(() => {
    const savedMode = localStorage.getItem('use-mock-api');
    return savedMode !== null ? savedMode === 'true' : true; // Por defecto usar mock
  });

  // Guardar el modo en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('use-mock-api', useMockApi);
  }, [useMockApi]);

  // Función para cambiar entre modo mock y API real
  const toggleApiMode = () => {
    setUseMockApi(prev => !prev);
  };

  // Función para establecer un modo específico
  const setApiMode = (useMock) => {
    setUseMockApi(useMock);
  };

  return (
    <ApiModeContext.Provider value={{
      useMockApi,
      toggleApiMode,
      setApiMode,
      isMockMode: useMockApi,
      isApiMode: !useMockApi
    }}>
      {children}
    </ApiModeContext.Provider>
  );
};

export default ApiModeContext;
