import React from 'react';
import { CCard, CCardBody, CCardTitle, CRow, CCol } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilSettings,
  cilHospital,
  cilPeople,
  cilUser,
  cilLockLocked,
  cilBriefcase,
  cilHeart,
  cilBeaker,
  cilDollar,
  cilCalendar,
  cilNotes,
  cilCalculator
} from '@coreui/icons';
import { useTabs } from '../../contexts/TabContext';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useModule } from '../../contexts/ModuleContext';

// Definición de los módulos y sus subsistemas
const MODULES = {
  'super-admin': {
    id: 'super-admin',
    title: 'Super Administrador',
    icon: cilSettings,
    color: 'primary',
    path: '/super-admin/dashboard',
    subsystems: [
      {
        id: 'global-config',
        title: 'Configuración Global',
        icon: cilSettings,
        path: '/super-admin/global-settings',
        color: 'primary',
        roles: ['SUPER_ADMIN']
      },
      {
        id: 'ips-management',
        title: 'Gestión de IPS',
        icon: cilHospital,
        path: '/super-admin/ips-management',
        color: 'success',
        roles: ['SUPER_ADMIN']
      },
      {
        id: 'users',
        title: 'Usuarios',
        icon: cilUser,
        path: '/super-admin/users',
        color: 'info',
        roles: ['SUPER_ADMIN']
      },
      {
        id: 'roles',
        title: 'Roles',
        icon: cilLockLocked,
        path: '/super-admin/roles',
        color: 'warning',
        roles: ['SUPER_ADMIN']
      }
    ]
  },
  'admin-ips': {
    id: 'admin-ips',
    title: 'Administrador IPS',
    icon: cilHospital,
    color: 'success',
    path: '/admin-ips/dashboard',
    subsystems: [
      {
        id: 'users-ips',
        title: 'Usuarios IPS',
        icon: cilUser,
        path: '/admin-ips/users',
        color: 'info',
        roles: ['SUPER_ADMIN', 'ADMIN']
      },
      {
        id: 'roles-ips',
        title: 'Roles IPS',
        icon: cilLockLocked,
        path: '/admin-ips/roles',
        color: 'warning',
        roles: ['SUPER_ADMIN', 'ADMIN']
      },
      {
        id: 'settings-ips',
        title: 'Configuración IPS',
        icon: cilSettings,
        path: '/admin-ips/settings',
        color: 'primary',
        roles: ['SUPER_ADMIN', 'ADMIN']
      }
    ]
  },
  'medico': {
    id: 'medico',
    title: 'Médicos',
    icon: cilBriefcase,
    color: 'danger',
    path: '/medico/dashboard',
    subsystems: [
      {
        id: 'pacientes-medico',
        title: 'Pacientes',
        icon: cilPeople,
        path: '/medico/pacientes',
        color: 'info',
        roles: ['SUPER_ADMIN', 'MEDICO']
      },
      {
        id: 'consultas-medico',
        title: 'Consultas',
        icon: cilNotes,
        path: '/medico/consultas',
        color: 'primary',
        roles: ['SUPER_ADMIN', 'MEDICO']
      }
    ]
  },
  'enfermeria': {
    id: 'enfermeria',
    title: 'Enfermería',
    icon: cilHeart,
    color: 'danger',
    path: '/enfermera/dashboard',
    subsystems: [
      {
        id: 'pacientes-enfermeria',
        title: 'Pacientes',
        icon: cilPeople,
        path: '/enfermera/pacientes',
        color: 'info',
        roles: ['SUPER_ADMIN', 'ENFERMERA']
      }
    ]
  },
  'laboratorio': {
    id: 'laboratorio',
    title: 'Laboratorio',
    icon: cilBeaker,
    color: 'info',
    path: '/laboratorio/dashboard',
    subsystems: [
      {
        id: 'examenes-lab',
        title: 'Exámenes',
        icon: cilNotes,
        path: '/laboratorio/examenes',
        color: 'primary',
        roles: ['SUPER_ADMIN', 'LABORATORIO']
      }
    ]
  },
  'contabilidad': {
    id: 'contabilidad',
    title: 'Contabilidad',
    icon: cilDollar,
    color: 'success',
    path: '/contabilidad/dashboard',
    subsystems: [
      {
        id: 'facturacion',
        title: 'Facturación',
        icon: cilCalculator,
        path: '/contabilidad/facturacion',
        color: 'warning',
        roles: ['SUPER_ADMIN', 'CONTABILIDAD']
      }
    ]
  },
  'recepcion': {
    id: 'recepcion',
    title: 'Recepción',
    icon: cilCalendar,
    color: 'warning',
    path: '/recepcion/dashboard',
    subsystems: [
      {
        id: 'citas',
        title: 'Citas',
        icon: cilCalendar,
        path: '/recepcion/citas',
        color: 'primary',
        roles: ['SUPER_ADMIN', 'RECEPCION']
      },
      {
        id: 'pacientes-recepcion',
        title: 'Pacientes',
        icon: cilPeople,
        path: '/recepcion/pacientes',
        color: 'info',
        roles: ['SUPER_ADMIN', 'RECEPCION']
      }
    ]
  }
};

export const getModuleByPath = (path) => {
  if (!path) return null;

  // Extraer el primer segmento de la ruta después de la barra
  const pathSegment = path.split('/')[1];

  // Buscar el módulo correspondiente
  return Object.values(MODULES).find(module =>
    module.path.includes(`/${pathSegment}/`) ||
    module.id === pathSegment
  );
};

const SubsystemCards = () => {
  const { openTab } = useTabs();
  const { user, hasRole } = useAuth();
  const { isDark } = useTheme();
  const { activeModule, setActiveModule } = useModule();

  // Si no hay módulo activo, mostrar mensaje
  if (!activeModule) {
    return (
      <div className={`text-center py-3 ${isDark ? 'text-light' : ''}`}>
        <h4>Seleccione un módulo del menú lateral para ver sus subsistemas</h4>
      </div>
    );
  }

  // Obtener el módulo actual
  const currentModule = MODULES[activeModule];

  // Si el módulo no existe, mostrar mensaje
  if (!currentModule) {
    return (
      <div className="alert alert-warning">
        Módulo no encontrado. Por favor, seleccione otro módulo.
      </div>
    );
  }

  // Filtrar subsistemas según los roles del usuario
  const availableSubsystems = currentModule.subsystems.filter(
    subsystem => subsystem.roles.some(role => hasRole(role))
  );

// src/views/dashboard/SubsystemCards.js (solo la función handleCardClick)

const handleCardClick = (subsystem) => {
  openTab({
    id: subsystem.id,
    title: subsystem.title,
    path: subsystem.path,
    closable: true,
    module: activeModule
  });
};



  // Si no hay subsistemas disponibles para el usuario en este módulo
  if (availableSubsystems.length === 0) {
    return (
      <div className="alert alert-warning">
        No tiene acceso a ningún subsistema en este módulo. Contacte al administrador.
      </div>
    );
  }

  return (
    <>
      {/* Título del módulo actual */}
      <h4 className={`mb-3 ${isDark ? 'text-light' : ''}`}>
        <CIcon icon={currentModule.icon} className="me-2" />
        {currentModule.title}
      </h4>

      {/* Tarjetas de subsistemas del módulo actual - Tamaño reducido */}
      <CRow className="g-3">
        {availableSubsystems.map(subsystem => (
          <CCol xs={6} sm={4} md={3} lg={2} key={subsystem.id}>
            <CCard
              color={subsystem.color}
              textColor={isDark ? 'white' : undefined}
              className="h-100 cursor-pointer shadow-sm"
              onClick={() => handleCardClick(subsystem)}
              style={{
                cursor: 'pointer',
                transition: 'transform 0.2s',
                backgroundColor: isDark ? `var(--cui-${subsystem.color}-dark)` : undefined
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <CCardBody className="d-flex flex-column align-items-center justify-content-center p-3">
                <CIcon icon={subsystem.icon} size="xl" className="mb-2" />
                <CCardTitle className="text-center fs-6 mb-0">{subsystem.title}</CCardTitle>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </>
  );
};

export default SubsystemCards;
export { MODULES };
