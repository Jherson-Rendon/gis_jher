import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilHospital } from '@coreui/icons'
import { AppSidebarNav } from './AppSidebarNav'
import { useAuth } from '../contexts/AuthContext'
import { useModule } from '../contexts/ModuleContext'
import { getNav } from '../_nav'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { useTheme } from '../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const { user } = useAuth()
  const { setActiveModule } = useModule()
  const { isDark } = useTheme()

  // Obtener el menú según el usuario y la función setActiveModule
  const navigation = getNav(user, (moduleId) => {
    setActiveModule(moduleId);
    navigate('/dashboard'); // Asegurar que navegamos al dashboard al cambiar de módulo
  });

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
      className={isDark ? 'bg-dark' : ''}
    >
      <CSidebarBrand className="d-none d-md-flex justify-content-center" to="/">
        <CIcon className="sidebar-brand-full" icon={cilHospital} height={35} />
        <span className="sidebar-brand-full ms-2 h4 mb-0">GisoSalud</span>
        <CIcon className="sidebar-brand-narrow" icon={cilHospital} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
