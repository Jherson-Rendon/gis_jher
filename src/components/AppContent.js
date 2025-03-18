// src/components/AppContent.js
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import routes from '../routes';
import { useAuth } from '../contexts/AuthContext';

const AppContent = () => {
  const { user } = useAuth();
  console.log('AppContent - Usuario actual:', user);

  // Redirección inicial basada en el rol
  const getInitialRedirect = () => {
    if (user?.role === 'SUPER_ADMIN') {
      return <Navigate to="/super-admin/dashboard" replace />;
    } else if (user?.role === 'ADMIN') {
      return <Navigate to="/admin-ips/dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  };

  return (
    <>
      <Routes>
        {/* Mapear todas las rutas definidas en routes.js */}
        {routes.map((route, idx) => {
          return (
            route.element && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={<route.element />}
              />
            )
          );
        })}

        {/* Redirección de la ruta raíz según el rol */}
        <Route path="/" element={getInitialRedirect()} />

        {/* Redirecciones específicas para dashboards */}
        <Route
          path="/super-admin"
          element={<Navigate to="/super-admin/dashboard" replace />}
        />

        <Route
          path="/admin-ips"
          element={<Navigate to="/admin-ips/dashboard" replace />}
        />

        {/* Capturar rutas no definidas */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
};

export default React.memo(AppContent);
