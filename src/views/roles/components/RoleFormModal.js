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
} from '@coreui/react';

const RoleFormModal = ({ visible, onClose, onSave, role }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [],
  });

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
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // Lista de permisos disponibles (esto podría venir de una API)
  const availablePermissions = [
    'users_view',
    'users_create',
    'users_edit',
    'users_delete',
    'roles_view',
    'roles_create',
    'roles_edit',
    'roles_delete',
    'settings_view',
    'settings_edit',
  ];

  return (
    <CModal visible={visible} onClose={onClose} size="lg">
      <CModalHeader onClose={onClose}>
        {role ? 'Editar Rol' : 'Crear Nuevo Rol'}
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          <div className="mb-3">
            <CFormLabel htmlFor="name">Nombre del Rol</CFormLabel>
            <CFormInput
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
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
            <div className="row">
              {availablePermissions.map((permission) => (
                <div className="col-md-6 mb-2" key={permission}>
                  <CFormCheck
                    id={`permission-${permission}`}
                    label={permission.replace('_', ' ').toUpperCase()}
                    checked={formData.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                  />
                </div>
              ))}
            </div>
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          Guardar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default RoleFormModal;
