// src/modules/SuperAdmin/pages/GlobalSettings.js
import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CButton
} from '@coreui/react';
import { useTheme } from '../../../contexts/ThemeContext';

const GlobalSettings = () => {
  const { isDark } = useTheme();

  return (
    <CCard className={isDark ? 'bg-dark text-white' : ''}>
      <CCardHeader>
        <h4>Configuración Global</h4>
      </CCardHeader>
      <CCardBody>
        <CForm>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="siteName">Nombre del Sitio</CFormLabel>
              <CFormInput
                type="text"
                id="siteName"
                defaultValue="GisoSalud"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="siteUrl">URL del Sitio</CFormLabel>
              <CFormInput
                type="text"
                id="siteUrl"
                defaultValue="https://gisosalud.com"
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="adminEmail">Email de Administración</CFormLabel>
              <CFormInput
                type="email"
                id="adminEmail"
                defaultValue="admin@gisosalud.com"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="timezone">Zona Horaria</CFormLabel>
              <CFormSelect id="timezone">
                <option value="America/Bogota">América/Bogotá</option>
                <option value="America/Mexico_City">América/Ciudad de México</option>
                <option value="America/Lima">América/Lima</option>
                <option value="America/Santiago">América/Santiago</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="maintenanceMode">Modo de Mantenimiento</CFormLabel>
              <CFormSelect id="maintenanceMode">
                <option value="0">Desactivado</option>
                <option value="1">Activado</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CButton color="primary" type="submit">
            Guardar Configuración
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default GlobalSettings;
