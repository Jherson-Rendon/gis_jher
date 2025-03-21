// src/components/AppContent.js
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CContainer, CSpinner } from '@coreui/react';
import routes from '../routes';

const AppContent = () => {
  return (
    // Cambiamos de CContainer lg a CContainer fluid para usar el ancho completo
    <CContainer fluid className="px-2">
      <Suspense fallback={<CSpinner color="primary" />}>
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

          {/* Redirección de la ruta raíz */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Capturar rutas no definidas */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
