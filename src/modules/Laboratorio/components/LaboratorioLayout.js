import React from 'react';
import { CContainer } from '@coreui/react';

const LaboratorioLayout = ({ children }) => {
  return (
    <div className="laboratorio-layout">
      <CContainer fluid className="p-3">
        {children}
      </CContainer>
    </div>
  );
};

export default LaboratorioLayout;
