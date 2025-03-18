import React from 'react';
import { CContainer } from '@coreui/react';

const RecepcionLayout = ({ children }) => {
  return (
    <div className="recepcion-layout">
      <CContainer fluid className="p-3">
        {children}
      </CContainer>
    </div>
  );
};

export default RecepcionLayout;
