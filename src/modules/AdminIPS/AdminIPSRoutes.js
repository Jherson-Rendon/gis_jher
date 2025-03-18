import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CSpinner } from '@coreui/react';
import AdminIPSLayout from './components/AdminIPSLayout';

// Lazy loading de las páginas del módulo
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UserManagement = lazy(() => import('./pages/UserManagement'));
const IPSSettings = lazy(() => import('./pages/IPSSettings'));

const AdminIPSRoutes = () => {
  return (
    <AdminIPSLayout>
      <Suspense fallback={<div className="text-center pt-3"><CSpinner color="primary" /></div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/settings" element={<IPSSettings />} />
        </Routes>
      </Suspense>
    </AdminIPSLayout>
  );
};

export default AdminIPSRoutes;
