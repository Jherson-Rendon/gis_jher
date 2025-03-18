// src/views/dashboard/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CContainer,
  CWidgetStatsF,
  CLink,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilPeople,
  cilHospital,
  cilSettings,
  cilNotes,
  cilSpeedometer,
  cilBriefcase,
  cilBeaker,
  cilDollar,
  cilCalendar,
} from '@coreui/icons';

const Dashboard = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // Mapeo de módulos a sus nombres, descripciones e iconos
  const modules = {
    SUPER_ADMIN: [
      {
        title: 'Gestión de IPS',
        description: 'Administre todas las IPS registradas en el sistema',
        icon: cilHospital,
        route: '/super-admin/ips-management',
        color: 'primary',
        count: '15',
        subtitle: 'IPS activas',
      },
      {
        title: 'Usuarios',
        description: 'Gestione todos los usuarios del sistema',
        icon: cilPeople,
        route: '/super-admin/users',
        color: 'danger',
        count: '87',
        subtitle: 'usuarios registrados',
      },
      {
        title: 'Configuración Global',
        description: 'Configure parámetros globales del sistema',
        icon: cilSettings,
        route: '/super-admin/global-settings',
        color: 'info',
        count: '3',
        subtitle: 'configuraciones pendientes',
      },
    ],
    ADMIN: [
      {
        title: 'Gestión de Usuarios',
        description: 'Administre los usuarios de su IPS',
        icon: cilPeople,
        route: '/admin-ips/users',
        color: 'primary',
        count: '24',
        subtitle: 'usuarios en su IPS',
      },
      {
        title: 'Configuración de IPS',
        description: 'Configure los parámetros de su IPS',
        icon: cilSettings,
        route: '/admin-ips/settings',
        color: 'success',
        count: '5',
        subtitle: 'módulos configurables',
      },
    ],
    // Puedes agregar más roles aquí según sea necesario
  };

  // Si el usuario no tiene un rol reconocido, mostrar mensaje de error
  if (!user || !user.role || !modules[user.role]) {
    return (
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="mb-4">
              <CCardHeader>
                <h4>Acceso no disponible</h4>
              </CCardHeader>
              <CCardBody>
                <p>
                  No se ha podido determinar su rol en el sistema o no tiene acceso a ningún módulo.
                  Por favor contacte al administrador.
                </p>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    );
  }

  // Mostrar los módulos disponibles para el rol del usuario
  return (
    <CContainer fluid className="p-3">
      <CCard className="mb-4">
        <CCardBody>
          <h2 className="mb-0">Bienvenido, {user.name}</h2>
          <p className="text-medium-emphasis">
            Panel de control - {user.role === 'SUPER_ADMIN' ? 'Super Administrador' : 'Administrador'}
          </p>
        </CCardBody>
      </CCard>

      <CRow>
        {modules[user.role].map((module, index) => (
          <CCol key={index} sm={12} md={6} lg={4} className="mb-4">
            <CWidgetStatsF
              className="mb-3 widget-stats-f"
              color={module.color}
              icon={<CIcon icon={module.icon} height={24} />}
              title={module.title}
              value={module.count}
              footer={
                <CLink
                  className="font-weight-bold font-xs text-medium-emphasis"
                  onClick={() => navigate(module.route)}
                  rel="noopener norefferer"
                  style={{ cursor: 'pointer' }}
                >
                  Ver detalles
                  <CIcon icon={cilSpeedometer} className="float-end" width={16} />
                </CLink>
              }
            >
              <div className="mt-3 mb-0">
                <span className="fs-6">{module.subtitle}</span>
              </div>
            </CWidgetStatsF>
          </CCol>
        ))}
      </CRow>

      <CRow>
        <CCol md={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <h4>Accesos rápidos</h4>
            </CCardHeader>
            <CCardBody>
              <CRow>
                {modules[user.role].map((module, index) => (
                  <CCol key={index} md={4} className="mb-3">
                    <CButton
                      color={module.color}
                      className="w-100 d-flex align-items-center justify-content-start p-3"
                      onClick={() => navigate(module.route)}
                    >
                      <CIcon icon={module.icon} className="me-3" />
                      {module.title}
                    </CButton>
                  </CCol>
                ))}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Dashboard;
