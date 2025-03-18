import React from 'react';
import { CContainer } from '@coreui/react';

const AdminIPSLayout = ({ children }) => {
  return (
    <div className="admin-ips-layout">
      <CContainer fluid className="p-3">
        {children}
      </CContainer>
    </div>
  );
};

export default AdminIPSLayout;
