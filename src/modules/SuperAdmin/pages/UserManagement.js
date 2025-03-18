import React from 'react';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import UserManagementComponent from '../../../views/users/UserManagement';

const UserManagement = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <h4>Gestión de Usuarios</h4>
        </CCardHeader>
        <CCardBody>
          <UserManagementComponent />
        </CCardBody>
      </CCard>
    </>
  );
};

export default UserManagement;
