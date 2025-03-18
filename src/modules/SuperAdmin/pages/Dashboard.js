import React from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CButton } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilHospital, cilPeople, cilSettings } from '@coreui/icons';

const Dashboard = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: 'Gestión de IPS',
      description: 'Administre todas las IPS registradas en el sistema',
      icon: cilHospital,
      route: '/super-admin/ips-management',
      color: 'primary',
    },
    {
      title: 'Usuarios',
      description: 'Gestione todos los usuarios del sistema',
      icon: cilPeople,
      route: '/super-admin/users',
      color: 'danger',
    },
    {
      title: 'Configuración Global',
      description: 'Configure parámetros globales del sistema',
      icon: cilSettings,
      route: '/super-admin/global-settings',
      color: 'info',
    },
  ];

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <h4>Panel de Control - Super Administrador</h4>
        </CCardHeader>
        <CCardBody>
          <p>Bienvenido al panel de Super Administrador. Desde aquí puede gestionar todas las IPS y configuraciones globales del sistema.</p>
        </CCardBody>
      </CCard>

      <CRow>
        {modules.map((module, index) => (
          <CCol key={index} md={4} className="mb-4">
            <CCard className="h-100">
              <CCardHeader className={`bg-${module.color} text-white`}>
                <h5 className="mb-0">{module.title}</h5>
              </CCardHeader>
              <CCardBody className="d-flex flex-column">
                <div className="mb-3 text-center">
                  <CIcon icon={module.icon} size="3xl" />
                </div>
                <p>{module.description}</p>
                <div className="mt-auto">
                  <CButton
                    color={module.color}
                    className="w-100"
                    onClick={() => navigate(module.route)}
                  >
                    Acceder
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </>
  );
};

export default Dashboard;
