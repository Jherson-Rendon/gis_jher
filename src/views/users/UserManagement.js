// src/views/users/UserManagement.js

import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CSpinner,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CBadge,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilSearch, cilPencil, cilTrash, cilUser } from '@coreui/icons';
import { useAuth } from '../../contexts/AuthContext';
import mockAuthService from '../auth/services/mockAuthService';
import UserFormModal from './components/UserFormModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';

const UserManagement = () => {
  const { user, hasRole } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const isSuperAdmin = hasRole('SUPER_ADMIN');

  // Cargar usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await mockAuthService.getUsers(user.id);
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Error al cargar usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user.id]);

  // Filtrar usuarios por término de búsqueda
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.roleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejar creación/edición de usuario
  const handleSaveUser = async (userData) => {
    try {
      setLoading(true);

      if (isEditing && currentUser) {
        // Actualizar usuario existente
        const result = await mockAuthService.updateUser(currentUser.id, userData, user.id);
        setUsers(prevUsers =>
          prevUsers.map(u => u.id === currentUser.id ? result.user : u)
        );
      } else {
        // Crear nuevo usuario
        const result = await mockAuthService.createUser(userData, user.id);
        setUsers(prevUsers => [...prevUsers, result.user]);
      }

      setShowUserModal(false);
      setCurrentUser(null);
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Error al guardar usuario');
    } finally {
      setLoading(false);
    }
  };

  // Manejar eliminación de usuario
  const handleDeleteUser = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      await mockAuthService.deleteUser(currentUser.id, user.id);
      setUsers(prevUsers => prevUsers.filter(u => u.id !== currentUser.id));
      setShowDeleteModal(false);
      setCurrentUser(null);
    } catch (err) {
      setError(err.message || 'Error al eliminar usuario');
    } finally {
      setLoading(false);
    }
  };

  // Preparar para editar usuario
  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setShowUserModal(true);
  };

  // Preparar para eliminar usuario
  const handleDeleteClick = (user) => {
    setCurrentUser(user);
    setShowDeleteModal(true);
  };

  // Función para obtener color de badge según rol
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'danger';
      case 'ADMIN':
        return 'primary';
      case 'MEDICO':
        return 'success';
      case 'ENFERMERA':
        return 'info';
      case 'LABORATORIO':
        return 'warning';
      case 'CONTABILIDAD':
        return 'dark';
      case 'RECEPCION':
        return 'secondary';
      default:
        return 'light';
    }
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <h4>Gestión de Usuarios</h4>
        </CCardHeader>
        <CCardBody>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <CRow className="mb-3">
            <CCol md={6}>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon icon={cilSearch} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                              </CInputGroup>
            </CCol>
            <CCol md={6} className="d-flex justify-content-end">
              <CButton color="primary" onClick={() => {
                setCurrentUser(null);
                setIsEditing(false);
                setShowUserModal(true);
              }}>
                <CIcon icon={cilPlus} className="me-2" />
                Nuevo Usuario
              </CButton>
            </CCol>
          </CRow>

          {loading ? (
            <div className="text-center my-5">
              <CSpinner color="primary" />
            </div>
          ) : (
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Rol</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <CTableRow key={user.id}>
                      <CTableHeaderCell scope="row">{user.id}</CTableHeaderCell>
                      <CTableDataCell>{user.name}</CTableDataCell>
                      <CTableDataCell>{user.email}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={getRoleBadgeColor(user.role)}>
                          {user.roleName}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="info"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditUser(user)}
                          disabled={user.role === 'SUPER_ADMIN' && !isSuperAdmin}
                        >
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton
                          color="danger"
                          size="sm"
                          onClick={() => handleDeleteClick(user)}
                          disabled={user.role === 'SUPER_ADMIN' && !isSuperAdmin}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="5" className="text-center">
                      No se encontraron usuarios
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
          )}
        </CCardBody>
      </CCard>

      {/* Modal para crear/editar usuario */}
      <UserFormModal
        visible={showUserModal}
        onClose={() => {
          setShowUserModal(false);
          setCurrentUser(null);
          setIsEditing(false);
        }}
        onSave={handleSaveUser}
        user={currentUser}
        isEditing={isEditing}
        isSuperAdmin={isSuperAdmin}
      />

      {/* Modal de confirmación para eliminar */}
      <DeleteConfirmationModal
        visible={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setCurrentUser(null);
        }}
        onConfirm={handleDeleteUser}
        title="Eliminar Usuario"
        message={`¿Está seguro que desea eliminar al usuario ${currentUser?.name}?`}
      />
    </>
  );
};

export default UserManagement;

