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
  CFormTextarea,
  CFormCheck,
  CSpinner,
  CFormFeedback,
  CRow,
  CCol
} from '@coreui/react';

const RoleFormModal = ({ visible, onClose, onSave, role, availablePermissions = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [],
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Actualizar el formulario cuando cambia el rol seleccionado
  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name || '',
        description: role.description || '',
        permissions: role.permissions || [],
      });
    } else {
      // Resetear el formulario si no hay rol seleccionado (modo creación)
      setFormData({
        name: '',
        description: '',
        permissions: [],
      });
    }
    // Limpiar errores al abrir el modal
    setErrors({});
  }, [role, visible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Limpiar error específico cuando el usuario corrige el campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handlePermissionChange = (permission) => {
    const updatedPermissions = formData.permissions.includes(permission)
      ? formData.permissions.filter((p) => p !== permission)
      : [...formData.permissions, permission];

    setFormData({
      ...formData,
      permissions: updatedPermissions,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del rol es requerido';
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
    } catch (error) {
      console.error('Error al guardar rol:', error);
      setErrors(prev => ({
        ...prev,
        form: error.message || 'Error al guardar el rol'
      }));
    } finally {
      setLoading(false);
    }
  };

  // Agrupar permisos por categoría
  const groupPermissions = () => {
    const groups = {};

    availablePermissions.forEach(permission => {
      const category = permission.split('_')[0];
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(permission);
    });

    return groups;
  };

  const permissionGroups = groupPermissions();

  return (
    <CModal visible={visible} onClose={onClose} size="lg">
      <CModalHeader onClose={onClose}>
        {role ? 'Editar Rol' : 'Crear Nuevo Rol'}
      </CModalHeader>
      <CModalBody>
        {errors.form && (
          <div className="alert alert-danger" role="alert">
            {errors.form}
          </div>
        )}

        <CForm onSubmit={handleSubmit}>
          <div className="mb-3">
            <CFormLabel htmlFor="name">Nombre del Rol</CFormLabel>
            <CFormInput
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              invalid={!!errors.name}
            />
            {errors.name && <CFormFeedback invalid>{errors.name}</CFormFeedback>}
          </div>

          <div className="mb-3">
            <CFormLabel htmlFor="description">Descripción</CFormLabel>
            <CFormTextarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="mb-3">
            <CFormLabel>Permisos</CFormLabel>

            {Object.entries(permissionGroups).map(([category, permissions]) => (
              <div key={category} className="mb-3">
                <h6 className="text-capitalize">{category}</h6>
                <CRow>
                  {permissions.map((permission) => (
                    <CCol md={6} key={permission} className="mb-2">
                      <CFormCheck
                        id={`permission-${permission}`}
                        label={permission.replace('_', ' ').toUpperCase()}
                        checked={formData.permissions.includes(permission)}
                        onChange={() => handlePermissionChange(permission)}
                      />
                    </CCol>
                  ))}
                </CRow>
              </div>
            ))}

            {availablePermissions.length === 0 && (
              <div className="text-muted">No hay permisos disponibles</div>
            )}
          </div>
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

export default RoleFormModal;
