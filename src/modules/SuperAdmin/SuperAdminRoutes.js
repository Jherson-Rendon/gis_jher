import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CSpinner } from '@coreui/react';

// Importar páginas del módulo SuperAdmin
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const IPSManagement = React.lazy(() => import('./pages/IPSManagement'));
const UserManagement = React.lazy(() => import('./pages/UserManagement'));
const GlobalSettings = React.lazy(() => import('./pages/GlobalSettings'));

const SuperAdminRoutes = () => {
  return (
    <Suspense fallback={<CSpinner color="primary" />}>
      <Routes>
        <Route path="/" element={<Navigate to="/super-admin/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ips-management" element={<IPSManagement />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/global-settings" element={<GlobalSettings />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};

export default SuperAdminRoutes;
