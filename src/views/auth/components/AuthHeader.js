import React from 'react';
import { CCardHeader, CCardTitle } from '@coreui/react';

const AuthHeader = ({ title }) => {
  return (
    <CCardHeader className="text-center bg-primary">
      <CCardTitle className="text-white mb-0">
        {title}
      </CCardTitle>
    </CCardHeader>
  );
};

export default AuthHeader;
