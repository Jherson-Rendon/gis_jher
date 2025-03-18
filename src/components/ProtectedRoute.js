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
