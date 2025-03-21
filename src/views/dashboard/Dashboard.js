// src/views/dashboard/Dashboard.js
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useModule } from '../../contexts/ModuleContext';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CContainer,
  CButton,
  CCardFooter,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilArrowRight, cilHospital, cilLaptop } from '@coreui/icons';
import SubsystemCards from './SubsystemCards';
import { MODULES } from './SubsystemCards';
import HomeTab from '../../components/HomeTab';

const Dashboard = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { activeModule, setActiveModule } = useModule();

  // Si el usuario no tiene un rol reconocido, mostrar mensaje de error
  if (!user || !user.role) {
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

  // Si no hay módulo activo, mostrar pantalla de bienvenida
  if (!activeModule) {
    return (
      <CContainer fluid className="p-2">
        <CCard className={`mb-4 ${isDark ? 'bg-dark text-white border-dark' : ''}`}>
          <CCardBody className="text-center py-5">
            <div className="mb-4">
              <CIcon icon={cilHospital} size="3xl" className="text-primary mb-3" />
              <h1 className="display-5 fw-bold mb-3">¡Bienvenido a GisoSalud!</h1>
              <p className="lead mb-4">
                Sistema Integral de Gestión para Instituciones de Salud
              </p>
              <hr className="my-4" />
              <p className="mb-4">
                Para comenzar, seleccione uno de los módulos disponibles en el menú lateral.
                Cada módulo contiene herramientas específicas para diferentes áreas de su institución.
              </p>
            </div>

            <CRow className="justify-content-center g-4 mt-3">
              {Object.keys(MODULES).map(moduleId => {
                const module = MODULES[moduleId];
                // Verificar si el usuario tiene acceso a este módulo según su rol
                const hasAccess = module.subsystems.some(
                  subsystem => subsystem.roles.includes(user.role)
                );

                if (hasAccess) {
                  return (
                    <CCol xs={12} sm={6} md={4} lg={3} key={moduleId}>
                      <CCard
                        color={module.color}
                        className="h-100 cursor-pointer shadow"
                        onClick={() => setActiveModule(moduleId)}
                        style={{
                          cursor: 'pointer',
                          transition: 'transform 0.2s',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <CCardBody className="d-flex flex-column align-items-center justify-content-center p-4">
                          <CIcon icon={module.icon} size="3xl" className="mb-3" />
                          <h4 className="text-center mb-3">{module.title}</h4>
                          <p className="text-center small">
                            {module.subsystems.length} subsistemas disponibles
                          </p>
                        </CCardBody>
                        <CCardFooter className="text-center border-0 bg-transparent">
                          <CButton
                            color="light"
                            variant="outline"
                            className="mt-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveModule(moduleId);
                            }}
                          >
                            Acceder <CIcon icon={cilArrowRight} className="ms-1" />
                          </CButton>
                        </CCardFooter>
                      </CCard>
                    </CCol>
                  );
                }
                return null;
              })}
            </CRow>
          </CCardBody>
          <CCardFooter className={`text-center py-3 ${isDark ? 'bg-dark text-white border-dark' : ''}`}>
            <p className="mb-0">
              <CIcon icon={cilLaptop} className="me-2" />
              Sesión iniciada como <strong>{user.name}</strong> | Rol: <strong>{user.role}</strong>
            </p>
          </CCardFooter>
        </CCard>
      </CContainer>
    );
  }

  // Si hay un módulo activo, mostrar el HomeTab que contiene las tarjetas de subsistemas
  return <HomeTab />;
};

export default Dashboard;
