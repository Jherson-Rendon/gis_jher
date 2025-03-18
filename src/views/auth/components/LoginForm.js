import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CAlert,
  CInputGroup,
  CInputGroupText,
  CFormFeedback,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

const LoginForm = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      onSubmit({ email, password });
    }

    setValidated(true);
  };

  return (
    <CForm
      className="needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      {error && <CAlert color="danger">{error}</CAlert>}

      <CInputGroup className="mb-3">
        <CInputGroupText>
          <CIcon icon={cilUser} />
        </CInputGroupText>
        <CFormInput
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          disabled={loading}
        />
        <CFormFeedback invalid>
          Por favor ingrese un email válido.
        </CFormFeedback>
      </CInputGroup>

      <CInputGroup className="mb-4">
        <CInputGroupText>
          <CIcon icon={cilLockLocked} />
        </CInputGroupText>
        <CFormInput
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          disabled={loading}
        />
        <CFormFeedback invalid>
          Por favor ingrese su contraseña.
        </CFormFeedback>
      </CInputGroup>

      <div className="d-flex justify-content-between mb-4">
        <Link to="/auth/forgot-password" className="text-decoration-none">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <CButton
        color="primary"
        className="w-100"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </CButton>
    </CForm>
  );
};

export default LoginForm;
