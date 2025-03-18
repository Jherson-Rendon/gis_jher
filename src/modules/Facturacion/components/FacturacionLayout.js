import React from 'react';
import { CContainer } from '@coreui/react';

const FacturacionLayout = ({ children }) => {
  return (
    <div className="facturacion-layout">
      <CContainer fluid className="p-3">
        {children}
      </CContainer>
    </div>
  );
};

export default FacturacionLayout;
