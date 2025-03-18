import React, { useState } from 'react';
import {
  CForm,
  CFormInput,
  CFormLabel,
  CFormFeedback,
  CButton,
  CSpinner,
  CAlert
} from '@coreui/react';

const RegisterForm = ({ onSubmit, loading, error }) => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'confirmPassword' || name === 'password') {
      const match = name === 'confirmPassword'
        ? value === formData.password
        : formData.confirmPassword === value;
      setPasswordMatch(match || formData.confirmPassword === '');
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false || !passwordMatch) {
      event.stopPropagation();
    } else {
      onSubmit({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
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

      <div className="mb-3">
        <CFormLabel htmlFor="name">Nombre completo</CFormLabel>
        <CFormInput
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Ingrese su nombre completo"
        />
        <CFormFeedback invalid>Por favor ingrese su nombre.</CFormFeedback>
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="email">Correo electrónico</CFormLabel>
        <CFormInput
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="nombre@ejemplo.com"
        />
        <CFormFeedback invalid>Por favor ingrese un correo electrónico válido.</CFormFeedback>
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="password">Contraseña</CFormLabel>
        <CFormInput
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="8"
          placeholder="Mínimo 8 caracteres"
        />
        <CFormFeedback invalid>La contraseña debe tener al menos 8 caracteres.</CFormFeedback>
      </div>

      <div className="mb-4">
        <CFormLabel htmlFor="confirmPassword">Confirmar contraseña</CFormLabel>
        <CFormInput
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          isInvalid={validated && !passwordMatch}
          placeholder="Repita su contraseña"
        />
        {!passwordMatch && (
          <CFormFeedback invalid>Las contraseñas no coinciden.</CFormFeedback>
        )}
      </div>

      <div className="d-grid gap-2">
        <CButton color="primary" type="submit" disabled={loading}>
          {loading ? <><CSpinner size="sm" /> Registrando...</> : 'Registrarse'}
        </CButton>
      </div>
    </CForm>
  );
};

export default RegisterForm;
