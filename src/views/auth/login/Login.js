import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useAuth } from '../../../contexts/AuthContext'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!email || !password) {
        throw new Error('Por favor ingrese email y contraseña')
      }

      const userData = await login({ email, password })
      console.log('Login exitoso:', userData)

      // Redireccionar según el rol del usuario
      if (userData.role === 'SUPER_ADMIN') {
        navigate('/super-admin/dashboard')
      } else if (userData.role === 'ADMIN') {
        navigate('/admin-ips/dashboard')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      console.error('Error en login:', err)
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-dark min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}> {/* Cambiado de md={6} a md={5} para hacer el card más pequeño */}
            <CCard className="p-4 shadow-lg"> {/* Agregado shadow-lg para mejor apariencia */}
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <h1 className="text-center mb-4">Login</h1> {/* Agregado text-center y mb-4 */}
                  <p className="text-medium-emphasis text-center mb-4">Sign In to your account</p>
                  {error && <CAlert color="danger">{error}</CAlert>}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton type="submit" color="primary" className="px-4 w-100" disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
                      </CButton>
                    </CCol>
                    <CCol xs={6} className="text-right">
                      <Link to="/auth/forgot-password">
                        <CButton color="link" className="px-0 w-100">
                          Forgot password?
                        </CButton>
                      </Link>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
