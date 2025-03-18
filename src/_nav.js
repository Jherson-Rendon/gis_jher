import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilPeople,
  cilHome,
  cilHospital,
  cilSettings,
  cilUser,
  // Reemplazar los iconos no disponibles con alternativas
  cilBriefcase,  // En lugar de cilMedicalCross
  cilHeart,      // Este sí está disponible
  cilBeaker,     // En lugar de cilFlask
  cilDollar,     // En lugar de cilMoney
  cilCalendar,   // Este sí está disponible
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

// Función para generar el menú según el rol del usuario
const generateNav = (user) => {
  // Menú base que todos los usuarios pueden ver
  const baseNav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: user?.role === 'SUPER_ADMIN' ? '/super-admin/dashboard' : '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
  ]

  // Si no hay usuario autenticado, devolver solo el menú base
  if (!user || !user.role) {
    return baseNav
  }

  // Menús específicos por rol
  const roleMenus = {
    SUPER_ADMIN: [
      {
        component: CNavGroup,
        name: 'Super Administrador',
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Gestión de IPS',
            to: '/super-admin/ips-management',
            icon: <CIcon icon={cilHospital} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Usuarios',
            to: '/super-admin/users',
            icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Configuración Global',
            to: '/super-admin/global-settings',
            icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
          },
        ],
      },
      // Módulo de Administrador IPS como grupo desplegable
      {
        component: CNavGroup,
        name: 'Administrador IPS',
        icon: <CIcon icon={cilHospital} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Gestión de Usuarios IPS',
            to: '/admin-ips/users',
            icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Configuración de IPS',
            to: '/admin-ips/settings',
            icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
          },
        ],
      },
      // Módulo Médico como grupo desplegable
      {
        component: CNavGroup,
        name: 'Médicos',
        icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Pacientes',
            to: '/medico/pacientes',
            icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Consultas',
            to: '/medico/consultas',
            icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
          },
        ],
      },
      // Módulo Enfermería como grupo desplegable
      {
        component: CNavGroup,
        name: 'Enfermería',
        icon: <CIcon icon={cilHeart} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Pacientes',
            to: '/enfermera/pacientes',
            icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
          },
        ],
      },
      // Módulo Laboratorio como grupo desplegable
      {
        component: CNavGroup,
        name: 'Laboratorio',
        icon: <CIcon icon={cilBeaker} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Exámenes',
            to: '/laboratorio/examenes',
            icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
          },
        ],
      },
      // Módulo Contabilidad como grupo desplegable
      {
        component: CNavGroup,
        name: 'Contabilidad',
        icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Facturación',
            to: '/contabilidad/facturacion',
            icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
          },
        ],
      },
      // Módulo Recepción como grupo desplegable
      {
        component: CNavGroup,
        name: 'Recepción',
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Citas',
            to: '/recepcion/citas',
            icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Pacientes',
            to: '/recepcion/pacientes',
            icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
          },
        ],
      },
    ],
    ADMIN: [
      {
        component: CNavGroup,
        name: 'Administrador IPS',
        icon: <CIcon icon={cilHospital} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Gestión de Usuarios',
            to: '/admin-ips/users',
            icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Configuración de IPS',
            to: '/admin-ips/settings',
            icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
          },
        ],
      },
    ],
    MEDICO: [
      {
        component: CNavGroup,
        name: 'Médico',
        icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Pacientes',
            to: '/medico/pacientes',
            icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Consultas',
            to: '/medico/consultas',
            icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
          },
        ],
      },
    ],
    ENFERMERA: [
      {
        component: CNavGroup,
        name: 'Enfermería',
        icon: <CIcon icon={cilHeart} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Pacientes',
            to: '/enfermera/pacientes',
            icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
          },
        ],
      },
    ],
    LABORATORIO: [
      {
        component: CNavGroup,
        name: 'Laboratorio',
        icon: <CIcon icon={cilBeaker} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Exámenes',
            to: '/laboratorio/examenes',
            icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
          },
        ],
      },
    ],
    CONTABILIDAD: [
      {
        component: CNavGroup,
        name: 'Contabilidad',
        icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Facturación',
            to: '/contabilidad/facturacion',
            icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
          },
        ],
      },
    ],
    RECEPCION: [
      {
        component: CNavGroup,
        name: 'Recepción',
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Citas',
            to: '/recepcion/citas',
            icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Pacientes',
            to: '/recepcion/pacientes',
            icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
          },
        ],
      },
    ],
  }

  // Agregar menús específicos del rol al menú base
  return [...baseNav, ...(roleMenus[user.role] || [])]
}

// Exportar una función que devuelve el menú según el usuario
export const getNav = (user) => {
  return generateNav(user)
}

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
]

export default _nav
