// src/layout/DefaultLayout.js
import React from 'react';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';
import { useTheme } from '../contexts/ThemeContext';

const DefaultLayout = () => {
  const { isDark } = useTheme();

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className={`body flex-grow-1 px-3 ${isDark ? 'bg-dark' : ''}`}>
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
