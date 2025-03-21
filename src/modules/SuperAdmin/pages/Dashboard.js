// src/modules/SuperAdmin/pages/Dashboard.js
import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CWidgetStatsF,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilHospital,
  cilPeople,
  cilUser,
  cilSettings,
} from '@coreui/icons';
import { useTheme } from '../../../contexts/ThemeContext';

const SuperAdminDashboard = () => {
  const { isDark } = useTheme();

  return (
    <>
      <CCard className={`mb-4 ${isDark ? 'bg-dark text-white' : ''}`}>
        <CCardHeader>
          <h4>Panel de Control - Super Administrador</h4>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                color="primary"
                icon={<CIcon icon={cilHospital} height={24} />}
                title="IPS Registradas"
                value="25"
              />
            </CCol>
            <CCol sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                color="info"
                icon={<CIcon icon={cilUser} height={24} />}
                title="Administradores"
                value="42"
              />
            </CCol>
            <CCol sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                color="warning"
                icon={<CIcon icon={cilPeople} height={24} />}
                title="Usuarios Totales"
                value="368"
              />
            </CCol>
            <CCol sm={6} lg={3}>
              <CWidgetStatsF
                className="mb-3"
                color="danger"
                icon={<CIcon icon={cilSettings} height={24} />}
                title="Configuraciones"
                value="15"
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CRow>
        <CCol md={6}>
          <CCard className={`mb-4 ${isDark ? 'bg-dark text-white' : ''}`}>
            <CCardHeader>
              <h5>IPS Recientes</h5>
            </CCardHeader>
            <CCardBody>
              <p>Aquí se mostrarían las IPS registradas recientemente.</p>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={6}>
          <CCard className={`mb-4 ${isDark ? 'bg-dark text-white' : ''}`}>
            <CCardHeader>
              <h5>Actividad Reciente</h5>
            </CCardHeader>
            <CCardBody>
              <p>Aquí se mostraría la actividad reciente del sistema.</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default SuperAdminDashboard;
