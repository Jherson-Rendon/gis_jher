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
import UserFormModal from "./components/UserFormModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { toast } from "react-toastify";
import userService from '../../services/api/userService';
import roleService from '../../services/api/roleService';

const UserManagement = () => {
  const { isDark } = useTheme();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('name');
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Cargar usuarios y roles al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersData, rolesData] = await Promise.all([
          userService.getUsers(),
          roleService.getRoles()
        ]);
        setUsers(usersData);
        setRoles(rolesData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        toast.error('Error al cargar los usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar usuarios según el término de búsqueda
  const filteredUsers = users.filter(user => {
    if (!searchTerm) return true;

    const term = searchTerm.toLowerCase();
    switch (filterBy) {
      case 'name':
        return `${user.firstName} ${user.lastName}`.toLowerCase().includes(term);
      case 'email':
        return user.email.toLowerCase().includes(term);
      case 'document':
        return user.documentNumber.includes(term);
      default:
        return true;
    }
  });

  const handleOpenModal = (user = null) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const handleOpenDeleteModal = (user) => {
    setSelectedUser(user);
    setDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalVisible(false);
    setSelectedUser(null);
  };

  const handleSaveUser = async (formData) => {
    try {
      setLoading(true);

      if (selectedUser) {
        // Actualizar usuario existente
        const updatedUser = await userService.updateUser(selectedUser.id, formData);
        setUsers(users.map(user => user.id === selectedUser.id ? updatedUser : user));
        toast.success('Usuario actualizado correctamente');
      } else {
        // Crear nuevo usuario
        const newUser = await userService.createUser(formData);
        setUsers([...users, newUser]);
        toast.success('Usuario creado correctamente');
      }

      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      toast.error('Error al guardar el usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      if (selectedUser) {
        setDeleteLoading(true);
        await userService.deleteUser(selectedUser.id);
        setUsers(users.filter(user => user.id !== selectedUser.id));
        toast.success('Usuario eliminado correctamente');
        handleCloseDeleteModal();
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      toast.error('Error al eliminar el usuario');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <CCard className={isDark ? 'bg-dark text-white' : ''}>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Gestión de Usuarios</h4>
        <CButton color="primary" onClick={() => handleOpenModal()}>
          <CIcon icon={cilPlus} className="me-2" />
          Nuevo Usuario
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
              <option value="email">Email</option>
              <option value="document">Documento</option>
            </CFormSelect>
            <CFormInput
              placeholder="Buscar usuarios..."
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
                <CTableHeaderCell>Documento</CTableHeaderCell>
                <CTableHeaderCell>Nombre</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Rol</CTableHeaderCell>
                <CTableHeaderCell>Estado</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <CTableRow key={user.id}>
                    <CTableDataCell>{user.documentType} {user.documentNumber}</CTableDataCell>
                    <CTableDataCell>{user.firstName} {user.lastName}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>
                      {roles.find(r => r.id === user.roleId)?.name || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={user.isActive ? 'success' : 'danger'}>
                        {user.isActive ? 'Activo' : 'Inactivo'}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="info"
                        size="sm"
                        className="me-2"
                        onClick={() => handleOpenModal(user)}
                      >
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton
                        color="danger"
                        size="sm"
                        onClick={() => handleOpenDeleteModal(user)}
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan="6" className="text-center">
                    No se encontraron usuarios
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        )}
      </CCardBody>

      {/* Modal para crear/editar usuarios */}
      <UserFormModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        user={selectedUser}
        roles={roles}
      />

      {/* Modal de confirmación para eliminar */}
      <DeleteConfirmationModal
        visible={deleteModalVisible}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteUser}
        title="Confirmar eliminación"
        message={selectedUser ? `¿Está seguro que desea eliminar el usuario "${selectedUser.firstName} ${selectedUser.lastName}"?` : ''}
        loading={deleteLoading}
      />
    </CCard>
  );
};

export default UserManagement;
