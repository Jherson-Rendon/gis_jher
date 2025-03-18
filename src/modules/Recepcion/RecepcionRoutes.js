import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CSpinner } from '@coreui/react';
import RecepcionLayout from './components/RecepcionLayout';

// Lazy loading de las páginas del módulo
const Dashboard = lazy(() => import('./pages/Dashboard'));
const RegistroPacientes = lazy(() => import('./pages/RegistroPacientes'));
const Agendamiento = lazy(() => import('./pages/Agendamiento'));

const RecepcionRoutes = () => {
  return (
    <RecepcionLayout>
      <Suspense fallback={<div className="text-center pt-3"><CSpinner color="primary" /></div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pacientes" element={<RegistroPacientes />} />
          <Route path="/agendamiento" element={<Agendamiento />} />
        </Routes>
      </Suspense>
    </RecepcionLayout>
  );
};

export default RecepcionRoutes;
