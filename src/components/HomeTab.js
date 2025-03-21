// src/components/HomeTab.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useModule } from '../contexts/ModuleContext';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import SubsystemCards from '../views/dashboard/SubsystemCards';
import { MODULES } from '../views/dashboard/SubsystemCards';

const HomeTab = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { activeModule } = useModule();

  // Si no hay módulo activo, mostrar mensaje
  if (!activeModule) {
    return (
      <CCard className={`mb-4 ${isDark ? 'bg-dark text-white border-dark' : ''}`}>
        <CCardBody className="text-center py-4">
          <h4>Seleccione un módulo del menú lateral para comenzar</h4>
        </CCardBody>
      </CCard>
    );
  }

  // Obtener información del módulo activo
  const module = MODULES[activeModule];
  if (!module) {
    return (
      <CCard className={`mb-4 ${isDark ? 'bg-dark text-white border-dark' : ''}`}>
        <CCardBody className="text-center py-4">
          <h4>Módulo no encontrado</h4>
        </CCardBody>
      </CCard>
    );
  }

  return (
    <>
      {/* Tarjeta de bienvenida al módulo */}
      <CCard className={`mb-3 ${isDark ? 'bg-dark text-white border-dark' : ''}`}>
        <CCardHeader className="d-flex align-items-center">
          <CIcon icon={module.icon} className="me-2" />
          <h4 className="mb-0">{module.title}</h4>
        </CCardHeader>
        <CCardBody className="py-3">
          <p>
            Bienvenido al módulo de <strong>{module.title}</strong>.
            Seleccione uno de los subsistemas disponibles para comenzar a trabajar.
          </p>

          {/* Mostrar las tarjetas de subsistemas */}
          <SubsystemCards />
        </CCardBody>
      </CCard>
    </>
  );
};

export default HomeTab;
