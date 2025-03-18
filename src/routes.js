import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Titular = React.lazy(() => import('./views/titular/Titular'));
const TitularProfile = React.lazy(() => import('./views/titular/TitularProfile'));
const UserManagement = React.lazy(() => import('./views/users/UserManagement'));

// SuperAdmin modules
const SuperAdminDashboard = React.lazy(() => import('./modules/SuperAdmin/pages/Dashboard'));
const IPSManagement = React.lazy(() => import('./modules/SuperAdmin/pages/IPSManagement'));
const SuperAdminUserManagement = React.lazy(() => import('./modules/SuperAdmin/pages/UserManagement'));
const GlobalSettings = React.lazy(() => import('./modules/SuperAdmin/pages/GlobalSettings'));

// Páginas de error
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page403 = React.lazy(() => import('./views/pages/page403/Page403'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/titular', name: 'Titular', element: Titular },
  { path: '/titular/profile/:id', name: 'Perfil de Titular', element: TitularProfile },
  { path: '/users', name: 'Gestión de Usuarios', element: UserManagement },

  // SuperAdmin routes
  { path: '/super-admin', name: 'Super Admin', exact: true },
  { path: '/super-admin/dashboard', name: 'Dashboard SuperAdmin', element: SuperAdminDashboard },
  { path: '/super-admin/ips-management', name: 'Gestión de IPS', element: IPSManagement },
  { path: '/super-admin/users', name: 'Usuarios SuperAdmin', element: SuperAdminUserManagement },
  { path: '/super-admin/global-settings', name: 'Configuración Global', element: GlobalSettings },

  // Admin IPS routes
  { path: '/admin-ips', name: 'Admin IPS', exact: true },
  { path: '/admin-ips/users', name: 'Gestión de Usuarios IPS', element: UserManagement },
  { path: '/admin-ips/settings', name: 'Configuración de IPS', element: GlobalSettings },

  // Páginas de error
  { path: '/404', name: 'Página no encontrada', element: Page404 },
  { path: '/403', name: 'Acceso denegado', element: Page403 },
];

export default routes;
