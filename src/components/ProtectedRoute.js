// src/components/ProtectedRoute.js
// import React, { useEffect, useState } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import authServices from '../views/auth/services/authServices';

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, loading, user } = useAuth();
//   const location = useLocation();
//   const [validatingToken, setValidatingToken] = useState(true);
//   const [tokenValid, setTokenValid] = useState(true);

//   useEffect(() => {
//     const validateToken = async () => {
//       if (isAuthenticated()) {
//         try {
//           const isValid = await authServices.validateToken();
//           setTokenValid(isValid);
//         } catch (error) {
//           setTokenValid(false);
//         }
//       }
//       setValidatingToken(false);
//     };

//     validateToken();
//   }, [isAuthenticated]);

//   // Mostrar spinner mientras se verifica la autenticación
//   if (loading || validatingToken) {
//     return (
//       <div className="pt-3 text-center">
//         <div className="sk-spinner sk-spinner-pulse"></div>
//       </div>
//     );
//   }

//   // Redireccionar a login si no está autenticado o el token no es válido
//   if (!isAuthenticated() || !tokenValid) {
//     console.log('Usuario no autenticado o token inválido, redirigiendo a login');
//     return <Navigate to="/auth/login" state={{ from: location }} replace />;
//   }

//   console.log('Usuario autenticado:', user);

//   // Verificar permisos para rutas específicas
//   if (location.pathname.startsWith('/super-admin') && user?.role !== 'superAdmin') {
//     console.log('Acceso denegado a ruta de super admin');
//     return <Navigate to="/dashboard" replace />;
//   }

//   if (
//     location.pathname.startsWith('/admin-ips') &&
//     user?.role !== 'Admin' &&
//     user?.role !== 'superAdmin'
//   ) {
//     console.log('Acceso denegado a ruta de admin');
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth()
  const location = useLocation()

  // Mostrar spinner mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
      </div>
    )
  }

  // Redireccionar a login si no está autenticado
  if (!isAuthenticated()) {
    console.log('Usuario no autenticado, redirigiendo a login')
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  console.log('Usuario autenticado:', user)

  // Verificar permisos para rutas específicas
  if (location.pathname.startsWith('/super-admin') && user?.role !== 'SUPER_ADMIN') {
    console.log('Acceso denegado a ruta de super admin')
    return <Navigate to="/dashboard" replace />
  }

  if (location.pathname.startsWith('/admin-ips') &&
      user?.role !== 'ADMIN' &&
      user?.role !== 'SUPER_ADMIN') {
    console.log('Acceso denegado a ruta de admin')
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default ProtectedRoute

