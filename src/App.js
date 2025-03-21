import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'
import ProtectedRoute from './components/ProtectedRoute'
import DebugInfo from './components/DebugInfo'
import { TabProvider } from './contexts/TabContext'
import { ModuleProvider } from './contexts/ModuleContext'
// Importar ToastContainer y los estilos de react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/auth/login/Login'))
const Register = React.lazy(() => import('./views/auth/register/Register'))
const ForgotPassword = React.lazy(() => import('./views/auth/forgot-password/ForgotPassword'))
const ResetPassword = React.lazy(() => import('./views/auth/reset-password/ResetPassword'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* Agregar ToastContainer para las notificaciones */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Suspense fallback={loading}>
          <Routes>
            {/* Ruta raíz redirige a login */}
            <Route path="/" element={<Navigate to="/auth/login" replace />} />

            {/* Rutas de autenticación */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password/:token" element={<ResetPassword />} />

            {/* Páginas de error */}
            <Route path="/404" element={<Page404 />} />
            <Route path="/500" element={<Page500 />} />

            {/* Rutas protegidas - DefaultLayout contiene el AppContent que renderiza las rutas */}
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <ModuleProvider>
                    <TabProvider>
                      <DefaultLayout />
                    </TabProvider>
                  </ModuleProvider>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
        <DebugInfo />
      </BrowserRouter>
    )
  }
}

export default App
