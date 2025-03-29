// src/layout/DefaultLayout.js
import React from 'react';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';
import { useTheme } from '../contexts/ThemeContext';
import TabNavigation from '../components/TabNavigation';

const DefaultLayout = () => {
  const { isDark } = useTheme();

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className={`body flex-grow-1 px-2 ${isDark ? 'bg-dark' : ''}`}>
          {/* Agregar el componente de pestañas con menos margen inferior */}
          <div className="mt-2">
            <TabNavigation />
          </div>

          {/* Contenido de la aplicación */}
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  );
};

export default DefaultLayout;
