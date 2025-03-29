// src/views/auth/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardFooter,
  CForm,
  CFormInput,
  CButton,
  CAlert,
  CFormFeedback,
  CLink
} from '@coreui/react';
import AuthHeader from '../components/AuthHeader';
import PasswordInput from '../components/PasswordInput';
// import { register } from '../services/authServices';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    // Validar email
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
      newErrors.password = 'La contraseña debe incluir mayúsculas, minúsculas, números y caracteres especiales';
    }

    // Validar confirmación de contraseña
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');

      // Redireccionar al login después de un registro exitoso
      setTimeout(() => {
        navigate('/auth/login', {
          state: { message: 'Registro exitoso. Por favor inicia sesión.' }
        });
      }, 2000);
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
        'Ocurrió un error durante el registro. Por favor intente nuevamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-dark min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8} lg={6} xl={5}>
            <CCard className="mb-4">
              <AuthHeader title="Crear una cuenta" />
              <CCardBody className="p-4">
                {apiError && <CAlert color="danger">{apiError}</CAlert>}
                {success && <CAlert color="success">{success}</CAlert>}

                <CForm onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nombre completo</label>
                    <CFormInput
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ingrese su nombre"
                      invalid={!!errors.name}
                      required
                    />
                    {errors.name && (
                      <CFormFeedback invalid>{errors.name}</CFormFeedback>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <CFormInput
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Ingrese su correo electrónico"
                      invalid={!!errors.email}
                      required
                    />
                    {errors.email && (
                      <CFormFeedback invalid>{errors.email}</CFormFeedback>
                    )}
                  </div>

                  <PasswordInput
                    label="Contraseña"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ingrese su contraseña"
                    error={errors.password}
                    required
                  />

                  <div className="mb-3">
                    <h6>Requisitos de contraseña:</h6>
                    <ul className="small text-muted">
                      <li>Mínimo 8 caracteres</li>
                      <li>Al menos una letra mayúscula</li>
                      <li>Al menos una letra minúscula</li>
                      <li>Al menos un número</li>
                      <li>Al menos un carácter especial (@$!%*?&)</li>
                    </ul>
                  </div>

                  <PasswordInput
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirme su contraseña"
                    error={errors.confirmPassword}
                    required
                  />

                  <CButton
                    color="primary"
                    type="submit"
                    className="w-100 mt-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Registrando...' : 'Registrarse'}
                  </CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4 text-center">
                <div>
                  ¿Ya tienes una cuenta?{' '}
                  <Link to="/auth/login" component={CLink}>
                    Iniciar sesión
                  </Link>
                </div>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
