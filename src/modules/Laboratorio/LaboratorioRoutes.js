import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CSpinner } from '@coreui/react';
import LaboratorioLayout from './components/LaboratorioLayout';

// Lazy loading de las páginas del módulo
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Examenes = lazy(() => import('./pages/Examenes'));
const Resultados = lazy(() => import('./pages/Resultados'));

const LaboratorioRoutes = () => {
  return (
    <LaboratorioLayout>
      <Suspense fallback={<div className="text-center pt-3"><CSpinner color="primary" /></div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/examenes" element={<Examenes />} />
          <Route path="/resultados" element={<Resultados />} />
        </Routes>
      </Suspense>
    </LaboratorioLayout>
  );
};

export default LaboratorioRoutes;
