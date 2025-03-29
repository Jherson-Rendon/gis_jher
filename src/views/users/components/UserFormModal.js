import React, { useState, useEffect } from 'react';
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormFeedback,
  CRow,
  CCol,
  CSpinner
} from '@coreui/react';

const UserFormModal = ({ visible, onClose, onSave, user, roles = [] }) => {
  const [formData, setFormData] = useState({
    documentType: '',
    documentNumber: '',
    nationality: '',
    firstName: '',
    middleName: '',
    lastName: '',
    secondLastName: '',
    email: '',
    employmentType: '',
    userType: '',
    roleId: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Actualizar el formulario cuando cambia el usuario seleccionado
  useEffect(() => {
    if (user) {
      setFormData({
        documentType: user.documentType || '',
        documentNumber: user.documentNumber || '',
        nationality: user.nationality || '',
        firstName: user.firstName || '',
        middleName: user.middleName || '',
        lastName: user.lastName || '',
        secondLastName: user.secondLastName || '',
        email: user.email || '',
        employmentType: user.employmentType || '',
        userType: user.userType || '',
        roleId: user.roleId || '',
        password: '' // No incluir contraseña en edición
      });
    } else {
      // Resetear el formulario si no hay usuario seleccionado (modo creación)
      setFormData({
        documentType: '',
        documentNumber: '',
        nationality: '',
        firstName: '',
        middleName: '',
        lastName: '',
        secondLastName: '',
        email: '',
        employmentType: '',
        userType: '',
        roleId: '',
        password: ''
      });
    }
    // Limpiar errores al abrir el modal
    setErrors({});
  }, [user, visible]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    // Limpiar error específico cuando el usuario corrige el campo
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['documentType', 'documentNumber', 'firstName', 'lastName', 'email', 'roleId'];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'Este campo es requerido';
      }
    });

    if (!user && !formData.password) {
      newErrors.password = 'La contraseña es requerida para nuevos usuarios';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      setErrors(prev => ({
        ...prev,
        form: error.message || 'Error al guardar el usuario'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <CModal visible={visible} onClose={onClose} size="lg">
      <CModalHeader onClose={onClose}>
        {user ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
      </CModalHeader>
      <CModalBody>
        {errors.form && (
          <div className="alert alert-danger" role="alert">
            {errors.form}
          </div>
        )}

        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel htmlFor="documentType">Tipo de Documento*</CFormLabel>
                <CFormSelect
                  id="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                  invalid={!!errors.documentType}
                >
                  <option value="">Seleccione...</option>
                  <option value="cc">Cédula de Ciudadanía</option>
                  <option value="ce">Cédula de Extranjería</option>
                  <option value="passport">Pasaporte</option>
                </CFormSelect>
                {errors.documentType && (
                  <CFormFeedback invalid>{errors.documentType}</CFormFeedback>
                )}
              </div>
            </CCol>
            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel htmlFor="documentNumber">Número de Documento*</CFormLabel>
                <CFormInput
                  type="text"
                  id="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleChange}
                  invalid={!!errors.documentNumber}
                />
                {errors.documentNumber && (
                  <CFormFeedback invalid>{errors.documentNumber}</CFormFeedback>
                )}
              </div>
            </CCol>
          </CRow>

          <CRow>
            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel htmlFor="firstName">Primer Nombre*</CFormLabel>
                <CFormInput
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  invalid={!!errors.firstName}
                />
                {errors.firstName && (
                  <CFormFeedback invalid>{errors.firstName}</CFormFeedback>
                )}
              </div>
            </CCol>
            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel htmlFor="middleName">Segundo Nombre</CFormLabel>
                <CFormInput
                  type="text"
                  id="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </div>
            </CCol>
          </CRow>

          <CRow>
            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel htmlFor="lastName">Primer Apellido*</CFormLabel>
                <CFormInput
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  invalid={!!errors.lastName}
                />
                {errors.lastName && (
                  <CFormFeedback invalid>{errors.lastName}</CFormFeedback>
                )}
              </div>
            </CCol>
            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel htmlFor="secondLastName">Segundo Apellido</CFormLabel>
                <CFormInput
                  type="text"
                  id="secondLastName"
                  value={formData.secondLastName}
                  onChange={handleChange}
                />
              </div>
            </CCol>
          </CRow>

          <CRow>
            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel htmlFor="email">Email*</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  invalid={!!errors.email}
                />
                {errors.email && (
                  <CFormFeedback invalid>{errors.email}</CFormFeedback>
                )}
              </div>
            </CCol>
            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel htmlFor="roleId">Rol*</CFormLabel>
                <CFormSelect
                  id="roleId"
                  value={formData.roleId}
                  onChange={handleChange}
                  invalid={!!errors.roleId}
                >
                  <option value="">Seleccione...</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </CFormSelect>
                {errors.roleId && (
                  <CFormFeedback invalid>{errors.roleId}</CFormFeedback>
                )}
              </div>
            </CCol>
          </CRow>

          <CRow>
            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel htmlFor="employmentType">Tipo de Empleo</CFormLabel>
                <CFormSelect
                  id="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                >
                  <option value="">Seleccione...</option>
                  <option value="fullTime">Tiempo Completo</option>
                  <option value="partTime">Medio Tiempo</option>
                  <option value="contractor">Contratista</option>
                </CFormSelect>
              </div>
            </CCol>
            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel htmlFor="userType">Tipo de Usuario</CFormLabel>
                <CFormSelect
                  id="userType"
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <option value="">Seleccione...</option>
                  <option value="internal">Interno</option>
                  <option value="external">Externo</option>
                </CFormSelect>
              </div>
            </CCol>
          </CRow>

          {!user && (
            <CRow>
              <CCol md={12}>
                <div className="mb-3">
                  <CFormLabel htmlFor="password">Contraseña*</CFormLabel>
                  <CFormInput
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    invalid={!!errors.password}
                  />
                  {errors.password && (
                    <CFormFeedback invalid>{errors.password}</CFormFeedback>
                  )}
                </div>
              </CCol>
            </CRow>
          )}
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <CSpinner size="sm" /> : 'Guardar'}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default UserFormModal;
