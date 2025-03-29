// src/contexts/ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorModes } from '@coreui/react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Usar el hook de CoreUI para manejar el tema
  const { colorMode, setColorMode } = useColorModes();
  const [isDark, setIsDark] = useState(false);

  // Función para establecer el tema y guardarlo en localStorage
  const setTheme = (theme) => {
    // Guardar en localStorage para persistencia entre sesiones
    localStorage.setItem('user-theme-preference', theme);
    // Actualizar el tema en CoreUI
    setColorMode(theme);
    // Actualizar el estado local
    setIsDark(theme === 'dark');
    // Aplicar clase al body para temas globales
    document.body.classList.toggle('dark-theme', theme === 'dark');
  };

  // Función para alternar entre temas claro y oscuro
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  // Cargar la preferencia de tema al iniciar
  useEffect(() => {
    const savedTheme = localStorage.getItem('user-theme-preference');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Proporcionar valores y funciones del tema
  const value = {
    theme: colorMode,
    setTheme,
    toggleTheme,
    isDark,
    isLight: !isDark,
    isAuto: colorMode === 'auto',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
