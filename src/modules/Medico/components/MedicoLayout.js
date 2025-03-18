import React from 'react';
import { CContainer } from '@coreui/react';

const MedicoLayout = ({ children }) => {
  return (
    <div className="medico-layout">
      <CContainer fluid className="p-3">
        {children}
      </CContainer>
    </div>
  );
};

export default MedicoLayout;
