import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilEnvelopeClosed } from '@coreui/icons'
import AuthHeader from '../components/AuthHeader'
// import authService from './services/authServices';
import mockAuthService from '../services/mockAuthService'


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [validated, setValidated] = useState(false)

  const [generatedToken, setGeneratedToken] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.currentTarget;

  if (form.checkValidity() === false) {
    e.stopPropagation();
    setValidated(true);
    return;
  }

  setLoading(true);
  setError(null);
  setSuccess(false);
  setGeneratedToken(null);

  try {
    const response = await mockAuthService.forgotPassword(email);
    setSuccess(true);
    setGeneratedToken(response.token);
    setEmail('');
  } catch (err) {
    setError(err.message || 'Error al procesar la solicitud. Intente nuevamente.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-dark min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8} lg={6} xl={5}>
            <CCard className="mb-4">
              <AuthHeader title="Recuperar Contraseña" />
              <CCardBody className="p-4">
                {!success ? (
                  <>
                    <p className="text-medium-emphasis mb-4">
                      Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer
                      tu contraseña.
                    </p>

                    {error && <CAlert color="danger">{error}</CAlert>}

                    <CForm
                      className="needs-validation"
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                    >
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilEnvelopeClosed} />
                        </CInputGroupText>
                        <CFormInput
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </CInputGroup>

                      <CButton color="primary" className="w-100" type="submit" disabled={loading}>
                        {loading ? 'Enviando...' : 'Enviar instrucciones'}
                      </CButton>
                    </CForm>
                  </>
                ) : (
                  <CAlert color="success">
                    <h4>Instrucciones enviadas</h4>
                    <p>Se han enviado las instrucciones a tu correo electrónico.</p>
                    <div className="border p-3 mb-3 bg-light">
                      <small className="d-block mb-2">Para propósitos de prueba:</small>
                      <p className="mb-2">
                        Token generado: <strong>{generatedToken}</strong>
                      </p>
                      <CButton
                        color="primary"
                        onClick={() => {
                          console.log('Navegando a:', `/auth/reset-password/${generatedToken}`) // Para debugging
                          navigate(`/auth/reset-password/${generatedToken}`)
                        }}
                      >
                        Ir a restablecer contraseña
                      </CButton>
                    </div>
                  </CAlert>
                )}
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

export default ForgotPassword
