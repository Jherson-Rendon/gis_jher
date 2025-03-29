// src/components/ApiModeToggler.js
import React from 'react';
import { CButton, CBadge } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCloudDownload, cilStorage } from '@coreui/icons';
import { useApiMode } from '../contexts/ApiModeContext';

const ApiModeToggler = () => {
  const { useMockApi, toggleApiMode } = useApiMode();

  return (
    <CButton
      color={useMockApi ? 'warning' : 'success'}
      variant="ghost"
      size="sm"
      onClick={toggleApiMode}
      className="me-2"
      title={useMockApi ? 'Usando datos de prueba (mock)' : 'Usando API real'}
    >
      <CIcon icon={useMockApi ? cilStorage : cilCloudDownload} size="lg" className="me-1" />
      <CBadge color={useMockApi ? 'warning' : 'success'} shape="rounded-pill">
        {useMockApi ? 'MOCK' : 'API'}
      </CBadge>
    </CButton>
  );
};

export default ApiModeToggler;
