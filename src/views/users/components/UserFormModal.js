// src/views/users/components/UserFormModal.js

import React, { useState, useEffect } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormFeedback,
  CSpinner
} from '@coreui/react';
import mockAuthService from '../../auth/services/mockAuthService';

const UserFormModal = ({ visible, onClose, onSave, user, isEditing, isSuperAdmin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(!isEditing);

  // Cargar roles disponibles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const availableRoles = await mockAuthService.getRoles();
        // Si no es super admin, filtrar el rol SUPER_ADMIN
        const filteredRoles = isSuperAdmin
          ? availableRoles
          : availableRoles.filter(role => role.id !== 'SUPER_ADMIN');
        setRoles(filteredRoles);
      } catch (error) {
        console.error('Error al cargar roles:', error);
      }
    };

    fetchRoles();
  }, [isSuperAdmin]);

  // Cargar datos del usuario si está en modo edición
  useEffect(() => {
    if (isEditing && user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
        role: user.role || ''
      });
      setShowPassword(false);
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
      });
      setShowPassword(true);
    }
  }, [isEditing, user, visible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error específico cuando el usuario corrige el campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (showPassword) {
      if (!formData.password) {
        newErrors.password = 'La contraseña es requerida';
      } else if (formData.password.length < 6) {
        newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    if (!formData.role) {
      newErrors.role = 'El rol es requerido';
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
      // Si no se está editando o si se proporcionó una nueva contraseña
      const userData = {
        name: formData.name,
        email: formData.email,
        role: formData.role
      };

      // Solo incluir contraseña si se está creando un nuevo usuario o si se proporcionó una nueva
      if (showPassword && formData.password) {
        userData.password = formData.password;
      }

      await onSave(userData);
      onClose();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      setErrors(prev => ({
        ...prev,
        form: error.message || 'Error al guardar usuario'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <CModal visible={visible} onClose={onClose} backdrop="static">
      <CModalHeader>
        <CModalTitle>{isEditing ? 'Editar Usuario' : 'Nuevo Usuario'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {errors.form && (
          <div className="alert alert-danger" role="alert">
            {errors.form}
          </div>
        )}

        <CForm onSubmit={handleSubmit}>
          <div className="mb-3">
            <CFormLabel htmlFor="name">Nombre</CFormLabel>
            <CFormInput
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              invalid={!!errors.name}
            />
            {errors.name && <CFormFeedback invalid>{errors.name}</CFormFeedback>}
          </div>

          <div className="mb-3">
            <CFormLabel htmlFor="email">Email</CFormLabel>
            <CFormInput
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              invalid={!!errors.email}
            />
            {errors.email && <CFormFeedback invalid>{errors.email}</CFormFeedback>}
          </div>

          {isEditing && (
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label" htmlFor="showPassword">
                Cambiar contraseña
              </label>
            </div>
          )}

          {showPassword && (
            <>
              <div className="mb-3">
                <CFormLabel htmlFor="password">Contraseña</CFormLabel>
                <CFormInput
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  invalid={!!errors.password}
                />
                {errors.password && <CFormFeedback invalid>{errors.password}</CFormFeedback>}
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="confirmPassword">Confirmar Contraseña</CFormLabel>
                <CFormInput
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  invalid={!!errors.confirmPassword}
                />
                {errors.confirmPassword && <CFormFeedback invalid>{errors.confirmPassword}</CFormFeedback>}
              </div>
            </>
          )}

          <div className="mb-3">
            <CFormLabel htmlFor="role">Rol</CFormLabel>
            <CFormSelect
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              invalid={!!errors.role}
            >
              <option value="">Seleccione un rol</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </CFormSelect>
            {errors.role && <CFormFeedback invalid>{errors.role}</CFormFeedback>}
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <CSpinner size="sm" /> : isEditing ? 'Actualizar' : 'Guardar'}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default UserFormModal;
