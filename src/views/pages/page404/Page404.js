// src/views/pages/page404/Page404.js
import React from 'react';
import {
  CButton,
  CCol,
  CContainer,
  CRow
} from '@coreui/react';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className="bg-dark min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4 text-light">404</h1>
              <h4 className="pt-3 text-light">¡Oops! Estás perdido.</h4>
              <p className="text-medium-emphasis float-start">
                La página que estás buscando no existe.
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

export default Page404;
