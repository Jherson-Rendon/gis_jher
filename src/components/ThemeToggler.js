// src/components/ThemeToggler.js
import React from 'react';
import { CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMoon, cilSun } from '@coreui/icons';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggler = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <CButton
      color={isDark ? 'light' : 'dark'}
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="me-2"
      title={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
    >
      <CIcon icon={isDark ? cilSun : cilMoon} size="lg" />
    </CButton>
  );
};

export default ThemeToggler;
