import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilLockLocked,
  cilUser,
  cilSettings,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
// Importar el servicio mock correctamente
import mockAuthService from '../../views/auth/services/mockAuthService'

const AppHeaderDropdown = () => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSimulateExpiration = () => {
    // Usar el servicio importado
    mockAuthService.simulateTokenExpiration()
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Cuenta</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Perfil
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Configuración
        </CDropdownItem>
        <CDropdownDivider />
        {/* Botón para simular expiración de token (solo en desarrollo) */}
        <CDropdownItem
          onClick={handleSimulateExpiration}
          style={{ color: '#f9b115' }}
        >
          <CIcon icon={cilLockLocked} className="me-2" />
          Simular Expiración
        </CDropdownItem>
        <CDropdownItem
          onClick={handleLogout}
          style={{ color: '#e55353' }}
        >
          <CIcon icon={cilLockLocked} className="me-2" />
          Cerrar Sesión
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
