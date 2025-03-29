import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CSpinner,
  CBadge,
  CInputGroup,
  CFormInput,
  CFormSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash, cilPlus, cilSearch } from '@coreui/icons';
import { useTheme } from '../../contexts/ThemeContext';
import RoleFormModal from "./components/RoleFormModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { toast } from "react-toastify";
import roleService from '../../services/api/roleService';

const RoleManagement = () => {
  const { isDark } = useTheme();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('name');
  const [permissions, setPermissions] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Cargar roles y permisos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [rolesData, permissionsData] = await Promise.all([
          roleService.getRoles(),
          roleService.getPermissions()
        ]);
        setRoles(rolesData);
        setPermissions(permissionsData || [
          'users_view', 'users_create', 'users_edit', 'users_delete',
          'roles_view', 'roles_create', 'roles_edit', 'roles_delete',
          'settings_view', 'settings_edit'
        ]);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        toast.error('Error al cargar los roles');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar roles según el término de búsqueda
  const filteredRoles = roles.filter(role => {
    if (!searchTerm) return true;

    const term = searchTerm.toLowerCase();
    if (filterBy === 'name') {
      return role.name.toLowerCase().includes(term);
    } else if (filterBy === 'description') {
      return role.description?.toLowerCase().includes(term);
    }
    return true;
  });

  const handleOpenModal = (role = null) => {
    setSelectedRole(role);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedRole(null);
  };

  const handleOpenDeleteModal = (role) => {
    setSelectedRole(role);
    setDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalVisible(false);
    setSelectedRole(null);
  };

  const handleSaveRole = async (formData) => {
    try {
      setLoading(true);

      if (selectedRole) {
        // Actualizar rol existente
        const updatedRole = await roleService.updateRole(selectedRole.id, formData);
        setRoles(roles.map(role => role.id === selectedRole.id ? updatedRole : role));
        toast.success('Rol actualizado correctamente');
      } else {
        // Crear nuevo rol
        const newRole = await roleService.createRole(formData);
        setRoles([...roles, newRole]);
        toast.success('Rol creado correctamente');
      }

      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar rol:', error);
      toast.error('Error al guardar el rol');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async () => {
    try {
      if (selectedRole) {
        setDeleteLoading(true);
        await roleService.deleteRole(selectedRole.id);
        setRoles(roles.filter(role => role.id !== selectedRole.id));
        toast.success('Rol eliminado correctamente');
        handleCloseDeleteModal();
      }
    } catch (error) {
      console.error('Error al eliminar rol:', error);
      toast.error('Error al eliminar el rol');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <CCard className={isDark ? 'bg-dark text-white' : ''}>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Gestión de Roles</h4>
        <CButton color="primary" onClick={() => handleOpenModal()}>
          <CIcon icon={cilPlus} className="me-2" />
          Nuevo Rol
        </CButton>
      </CCardHeader>
      <CCardBody>
        {/* Barra de búsqueda y filtros */}
        <div className="mb-4">
          <CInputGroup>
            <CFormSelect
              style={{ maxWidth: '150px' }}
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="name">Nombre</option>
              <option value="description">Descripción</option>
            </CFormSelect>
            <CFormInput
              placeholder="Buscar roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CButton color="primary" variant="outline">
              <CIcon icon={cilSearch} />
            </CButton>
          </CInputGroup>
        </div>

        {loading ? (
          <div className="text-center my-4">
            <CSpinner color="primary" />
          </div>
        ) : (
          <CTable hover responsive className={isDark ? 'table-dark' : ''}>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nombre</CTableHeaderCell>
                <CTableHeaderCell>Descripción</CTableHeaderCell>
                <CTableHeaderCell>Permisos</CTableHeaderCell>
                <CTableHeaderCell>Fecha de Creación</CTableHeaderCell>
                <CTableHeaderCell>Última Actualización</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredRoles.length > 0 ? (
                filteredRoles.map((role) => (
                  <CTableRow key={role.id}>
                    <CTableDataCell>{role.name}</CTableDataCell>
                    <CTableDataCell>{role.description}</CTableDataCell>
                    <CTableDataCell>
                      {role.permissions && role.permissions.slice(0, 3).map((permission) => (
                        <CBadge color="info" className="me-1 mb-1" key={permission}>
                          {permission}
                        </CBadge>
                      ))}
                      {role.permissions && role.permissions.length > 3 && (
                        <CBadge color="secondary">
                          +{role.permissions.length - 3} más
                        </CBadge>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {role.createdAt ? new Date(role.createdAt).toLocaleDateString() : 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {role.updatedAt ? new Date(role.updatedAt).toLocaleDateString() : 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="info"
                        size="sm"
                        className="me-2"
                        onClick={() => handleOpenModal(role)}
                      >
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton
                        color="danger"
                        size="sm"
                        onClick={() => handleOpenDeleteModal(role)}
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan="6" className="text-center">
                    No se encontraron roles
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        )}
      </CCardBody>

      {/* Modal para crear/editar roles */}
      <RoleFormModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveRole}
        role={selectedRole}
        availablePermissions={permissions}
      />

      {/* Modal de confirmación para eliminar */}
      <DeleteConfirmationModal
        visible={deleteModalVisible}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteRole}
        title="Confirmar eliminación"
        message={selectedRole ? `¿Está seguro que desea eliminar el rol "${selectedRole.name}"?` : ''}
        loading={deleteLoading}
      />
    </CCard>
  );
};

export default RoleManagement;
