import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CSpinner } from '@coreui/react';
import MedicoLayout from './components/MedicoLayout';

// Lazy loading de las páginas del módulo
const Dashboard = lazy(() => import('./pages/Dashboard'));
const HistoriasClinicas = lazy(() => import('./pages/HistoriasClinicas'));
const Consultas = lazy(() => import('./pages/Consultas'));
const Diagnosticos = lazy(() => import('./pages/Diagnosticos'));

const MedicoRoutes = () => {
  return (
    <MedicoLayout>
      <Suspense fallback={<div className="text-center pt-3"><CSpinner color="primary" /></div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/historias-clinicas" element={<HistoriasClinicas />} />
          <Route path="/consultas" element={<Consultas />} />
          <Route path="/diagnosticos" element={<Diagnosticos />} />
        </Routes>
      </Suspense>
    </MedicoLayout>
  );
};

export default MedicoRoutes;
