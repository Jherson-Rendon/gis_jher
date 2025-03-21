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

const INITIAL_ROLES = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Acceso completo a todas las funcionalidades del sistema',
    permissions: ['users_view', 'users_create', 'users_edit', 'users_delete', 'roles_view', 'roles_create', 'roles_edit', 'roles_delete', 'settings_view', 'settings_edit'],
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
  },
  {
    id: 2,
    name: 'Admin',
    description: 'Administrador de IPS con acceso a la mayoría de funcionalidades',
    permissions: ['users_view', 'users_create', 'users_edit', 'roles_view', 'settings_view'],
    createdAt: '2023-01-02',
    updatedAt: '2023-01-02',
  },
  {
    id: 3,
    name: 'Médico',
    description: 'Acceso a funcionalidades médicas',
    permissions: ['users_view'],
    createdAt: '2023-01-03',
    updatedAt: '2023-01-03',
  },
];

const RoleManagement = () => {
  const { isDark } = useTheme();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('name');

  // Simular carga de datos
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        // Aquí iría la llamada a la API
        // const response = await api.get('/roles');
        // setRoles(response.data);

        // Simulamos una carga con datos de ejemplo
        setTimeout(() => {
          setRoles(INITIAL_ROLES);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error al cargar roles:', error);
        toast.error('Error al cargar los roles');
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  // Filtrar roles según el término de búsqueda
  const filteredRoles = roles.filter(role => {
    if (!searchTerm) return true;

    const term = searchTerm.toLowerCase();
    if (filterBy === 'name') {
      return role.name.toLowerCase().includes(term);
    } else if (filterBy === 'description') {
      return role.description.toLowerCase().includes(term);
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

  const handleSaveRole = (formData) => {
    try {
      if (selectedRole) {
        // Actualizar rol existente
        const updatedRoles = roles.map(role =>
          role.id === selectedRole.id ? { ...role, ...formData, updatedAt: new Date().toISOString() } : role
        );
        setRoles(updatedRoles);
        toast.success('Rol actualizado correctamente');
      } else {
        // Crear nuevo rol
        const newRole = {
          id: roles.length + 1, // En una aplicación real, el ID vendría del backend
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setRoles([...roles, newRole]);
        toast.success('Rol creado correctamente');
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar rol:', error);
      toast.error('Error al guardar el rol');
    }
  };

  const handleDeleteRole = () => {
    try {
      if (selectedRole) {
        const updatedRoles = roles.filter(role => role.id !== selectedRole.id);
        setRoles(updatedRoles);
        toast.success('Rol eliminado correctamente');
        handleCloseDeleteModal();
      }
    } catch (error) {
      console.error('Error al eliminar rol:', error);
      toast.error('Error al eliminar el rol');
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
              startContent={<CIcon icon={cilSearch} />}
            />
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
                      {role.permissions.slice(0, 3).map((permission) => (
                        <CBadge color="info" className="me-1 mb-1" key={permission}>
                          {permission}
                        </CBadge>
                      ))}
                      {role.permissions.length > 3 && (
                        <CBadge color="secondary">
                          +{role.permissions.length - 3} más
                        </CBadge>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {new Date(role.createdAt).toLocaleDateString()}
                    </CTableDataCell>
                    <CTableDataCell>
                      {new Date(role.updatedAt).toLocaleDateString()}
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
      />

      {/* Modal de confirmación para eliminar */}
      <DeleteConfirmationModal
        visible={deleteModalVisible}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteRole}
        itemName={selectedRole ? `el rol "${selectedRole.name}"` : ''}
      />
    </CCard>
  );
};

export default RoleManagement;
