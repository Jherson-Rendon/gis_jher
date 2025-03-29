// src/components/AppHeader.js
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu, cilMoon, cilSun } from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'
import { useTheme } from '../contexts/ThemeContext'
import ApiModeToggler from './ApiModeToggler'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const { isDark, toggleTheme } = useTheme()

  return (
    <CHeader position="sticky" className={isDark ? 'bg-dark text-white border-dark' : ''}>
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <h4 className="m-0">GisoSalud</h4>
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          {/* Botón para cambiar entre API real y mock */}
          <ApiModeToggler />

          {/* Botón para cambiar el tema */}
          <CButton
            color={isDark ? 'light' : 'dark'}
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="me-2"
            title={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          >
            <CIcon icon={isDark ? cilSun : cilMoon} size="lg" />
          </CButton>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
