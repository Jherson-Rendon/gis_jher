// src/contexts/ThemeContext.js
import React, { createContext, useContext, useEffect } from 'react';
import { useColorModes } from '@coreui/react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');

  // Proporcionar valores y funciones del tema
  const value = {
    theme: colorMode,
    setTheme: setColorMode,
    isDark: colorMode === 'dark',
    isLight: colorMode === 'light',
    isAuto: colorMode === 'auto',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
