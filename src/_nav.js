// src/_nav.js
import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilSpeedometer,
  cilPeople,
  cilHome,
  cilHospital,
  cilSettings,
  cilUser,
  cilBriefcase,
  cilHeart,
  cilBeaker,
  cilDollar,
  cilCalendar,
} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';
import { MODULES } from './views/dashboard/SubsystemCards';

// Función para generar el menú según el rol del usuario
const generateNav = (user, setActiveModule) => {
  // Menú base que todos los usuarios pueden ver
  const baseNav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      onClick: () => setActiveModule(null) // Resetear el módulo activo al ir al dashboard principal
    },
  ];

  // Si no hay usuario autenticado, devolver solo el menú base
  if (!user || !user.role) {
    return baseNav;
  }

  // Función para crear un elemento de navegación para un módulo
  const createModuleNavItem = (moduleId) => {
    const module = MODULES[moduleId];
    if (!module) return null;

    return {
      component: CNavItem,
      name: module.title,
      to: '/dashboard', // Siempre vamos al dashboard, pero cambiamos el módulo activo
      icon: <CIcon icon={module.icon} customClassName="nav-icon" />,
      onClick: () => setActiveModule(moduleId) // Esto ahora usará changeActiveModule
    };
  };

  // Mapeo de roles de la API a roles del sistema
  const roleMapping = {
    'superAdmin': 'SUPER_ADMIN',
    'Admin': 'ADMIN',
    'Medico': 'MEDICO',
    'Enfermera': 'ENFERMERA',
    'Laboratorio': 'LABORATORIO',
    'Contabilidad': 'CONTABILIDAD',
    'Recepcion': 'RECEPCION'
  };

  const userRole = roleMapping[user.role] || user.role;

  // Menús específicos por rol
  const roleMenus = {
    SUPER_ADMIN: [
      {
        component: CNavGroup,
        name: 'Módulos Administrativos',
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
        items: [
          createModuleNavItem('super-admin'),
          createModuleNavItem('admin-ips'),
        ],
      },
      {
        component: CNavGroup,
        name: 'Módulos Operativos',
        icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
        items: [
          createModuleNavItem('medico'),
          createModuleNavItem('enfermeria'),
          createModuleNavItem('laboratorio'),
          createModuleNavItem('contabilidad'),
          createModuleNavItem('recepcion'),
        ],
      },
    ],
    ADMIN: [
      {
        component: CNavGroup,
        name: 'Módulos Administrativos',
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
        items: [
          createModuleNavItem('admin-ips'),
        ],
      },
    ],
    MEDICO: [
      createModuleNavItem('medico'),
    ],
    ENFERMERA: [
      createModuleNavItem('enfermeria'),
    ],
    LABORATORIO: [
      createModuleNavItem('laboratorio'),
    ],
    CONTABILIDAD: [
      createModuleNavItem('contabilidad'),
    ],
    RECEPCION: [
      createModuleNavItem('recepcion'),
    ],
  };

  // Filtrar elementos nulos y elementos vacíos
  const roleMenu = roleMenus[userRole] || [];
  const filteredRoleMenu = roleMenu.filter(item => {
    if (!item) return false;
    // Si es un grupo, verificar que tenga elementos
    if (item.component === CNavGroup) {
      return item.items && item.items.filter(subItem => subItem !== null).length > 0;
    }
    return true;
  });

  // Agregar menús específicos del rol al menú base
  return [...baseNav, ...filteredRoleMenu];
};

// Exportar una función que devuelve el menú según el usuario y la función setActiveModule
export const getNav = (user, setActiveModule) => {
  return generateNav(user, setActiveModule);
};

// Exportar un menú por defecto para compatibilidad con el código existente
const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Usuarios',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Titular',
    to: '/titular',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
];

export default _nav;
