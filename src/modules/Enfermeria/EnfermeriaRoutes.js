import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CSpinner } from '@coreui/react';
import EnfermeriaLayout from './components/EnfermeriaLayout';

// Lazy loading de las páginas del módulo
const Dashboard = lazy(() => import('./pages/Dashboard'));
const SignosVitales = lazy(() => import('./pages/SignosVitales'));
const SeguimientoPacientes = lazy(() => import('./pages/SeguimientoPacientes'));

const EnfermeriaRoutes = () => {
  return (
    <EnfermeriaLayout>
      <Suspense fallback={<div className="text-center pt-3"><CSpinner color="primary" /></div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signos-vitales" element={<SignosVitales />} />
          <Route path="/seguimiento" element={<SeguimientoPacientes />} />
        </Routes>
      </Suspense>
    </EnfermeriaLayout>
  );
};

export default EnfermeriaRoutes;
