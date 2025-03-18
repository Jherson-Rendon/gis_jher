import React from 'react';
import { CContainer } from '@coreui/react';

const SuperAdminLayout = ({ children }) => {
  return (
    <div className="super-admin-layout">
      <CContainer fluid className="p-3">
        {children}
      </CContainer>
    </div>
  );
};

export default SuperAdminLayout;
