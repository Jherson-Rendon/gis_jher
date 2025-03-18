// src/views/pages/page403/Page403.js

import React from 'react';
import {
  CButton,
  CCol,
  CContainer,
  CRow
} from '@coreui/react';
import { Link } from 'react-router-dom';

const Page403 = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">403</h1>
              <h4 className="pt-3">¡Acceso Denegado!</h4>
              <p className="text-medium-emphasis float-start">
                No tienes permisos para acceder a esta página.
              </p>
            </div>
            <Link to="/dashboard">
              <CButton color="info">Volver al Dashboard</CButton>
            </Link>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Page403;
