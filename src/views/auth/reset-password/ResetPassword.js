// ResetPassword.js
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CRow,
  CForm,
  CFormInput,
  CButton,
  CAlert,
  CInputGroup,
  CInputGroupText,
  CFormFeedback,
} from '@coreui/react'
import { cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import AuthHeader from '../components/AuthHeader'
import mockAuthService from '../services/mockAuthService'

// Componente para el candado personalizado que alterna entre mostrar y ocultar
const LockToggleIcon = ({ isLocked, onClick }) => (
  <span
    title={isLocked ? 'Ocultar contraseña' : 'Mostrar contraseña'}
    style={{ cursor: 'pointer' }}
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="icon"
      role="img"
      aria-hidden="true"
    >
      <path
        fill="var(--ci-primary-color, currentColor)"
        d="M384,200V144A128,128,0,0,0,166.418,52.57l22.4,22.855A96,96,0,0,1,352,144v56H88V328c0,92.636,75.364,168,168,168s168-75.364,168-168V200Zm8,128c0,74.99-61.009,136-136,136s-136-61.01-136-136V232H392Z"
      />
    </svg>
  </span>
)

const ResetPassword = () => {
  const { token } = useParams()
  console.log('Token recibido:', token)

  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [validated, setValidated] = useState(false)
  const [tokenValid, setTokenValid] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        console.log('No hay token')
        setTokenValid(false)
        setError('El enlace de restablecimiento no es válido.')
        return
      }

      try {
        await mockAuthService.validateResetToken(token)
        setTokenValid(true)
      } catch (err) {
        console.log('Error validando token:', err)
        setTokenValid(false)
        setError(err.message || 'El enlace de restablecimiento no es válido o ha expirado.')
      }
    }
    validateToken()
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    // Requisitos mínimos de contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!passwordRegex.test(password)) {
      setError('La contraseña no cumple con los requisitos mínimos.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await mockAuthService.resetPassword(token, password)
      navigate('/auth/login', {
        state: {
          message: 'Tu contraseña ha sido restablecida exitosamente. Ahora puedes iniciar sesión.',
        },
      })
    } catch (err) {
      setError(err.message || 'Error al restablecer la contraseña. Intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  if (!tokenValid) {
    return (
      <div className="bg-dark min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8} lg={6} xl={5}>
              <CCard className="mb-4">
                <AuthHeader title="Enlace Inválido" />
                <CCardBody className="p-4">
                  <CAlert color="danger">
                    {error || 'El enlace de restablecimiento no es válido o ha expirado.'}
                  </CAlert>
                </CCardBody>
                <CCardFooter className="p-4 text-center">
                  <Link to="/auth/forgot-password" className="text-decoration-none">
                    Solicitar un nuevo enlace
                  </Link>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }

  return (
    <div className="bg-dark min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8} lg={6} xl={5}>
            <CCard className="mb-4">
              <AuthHeader title="Restablecer Contraseña" />
              <CCardBody className="p-4">
                <p className="text-medium-emphasis mb-4">Ingresa tu nueva contraseña.</p>

                {error && <CAlert color="danger">{error}</CAlert>}

                <CForm
                  className="needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  {/* Campo para nueva contraseña */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Nueva contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="8"
                      disabled={loading}
                    />
                    <CInputGroupText
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: 'pointer' }}
                    >
                      <LockToggleIcon
                        isLocked={!showPassword}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </CInputGroupText>
                    <CFormFeedback invalid>
                      La contraseña debe tener al menos 8 caracteres.
                    </CFormFeedback>
                  </CInputGroup>

                  {/* Campo para confirmar contraseña */}
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirmar contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                    <CInputGroupText
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{ cursor: 'pointer' }}
                    >
                      <LockToggleIcon
                        isLocked={!showConfirmPassword}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      />
                    </CInputGroupText>
                    <CFormFeedback invalid>
                      Por favor confirma tu contraseña.
                    </CFormFeedback>
                  </CInputGroup>

                  <CButton color="primary" className="w-100" type="submit" disabled={loading}>
                    {loading ? 'Procesando...' : 'Restablecer Contraseña'}
                  </CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4 text-center">
                <Link to="/auth/login" className="text-decoration-none">
                  Volver al inicio de sesión
                </Link>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ResetPassword;
