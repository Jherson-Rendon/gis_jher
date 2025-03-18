import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CSpinner } from '@coreui/react';
import FacturacionLayout from './components/FacturacionLayout';

// Lazy loading de las páginas del módulo
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Facturas = lazy(() => import('./pages/Facturas'));
const Cobros = lazy(() => import('./pages/Cobros'));
const Reportes = lazy(() => import('./pages/Reportes'));

const FacturacionRoutes = () => {
  return (
    <FacturacionLayout>
      <Suspense fallback={<div className="text-center pt-3"><CSpinner color="primary" /></div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/facturas" element={<Facturas />} />
          <Route path="/cobros" element={<Cobros />} />
          <Route path="/reportes" element={<Reportes />} />
        </Routes>
      </Suspense>
    </FacturacionLayout>
  );
};

export default FacturacionRoutes;
