import React, { useState } from 'react';
import {
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CSpinner,
  CAlert
} from '@coreui/react';

const PasswordResetForm = ({ onSubmit, loading, error, success }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(email);
  };

  return (
    <CForm onSubmit={handleSubmit}>
      {error && <CAlert color="danger">{error}</CAlert>}
      {success && <CAlert color="success">{success}</CAlert>}

      <p className="text-medium-emphasis mb-4">
        Ingrese su correo electrónico y le enviaremos instrucciones para restablecer su contraseña.
      </p>

      <div className="mb-4">
        <CFormLabel htmlFor="email">Correo electrónico</CFormLabel>
        <CFormInput
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="nombre@ejemplo.com"
          disabled={loading || success}
        />
      </div>

      <div className="d-grid gap-2">
        <CButton color="primary" type="submit" disabled={loading || success}>
          {loading ? <><CSpinner size="sm" /> Enviando...</> : 'Enviar instrucciones'}
        </CButton>
      </div>
    </CForm>
  );
};

export default PasswordResetForm;
