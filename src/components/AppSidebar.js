import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  useColorModes
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { sygnet } from '../assets/brand/sygnet';
import { logo } from '../assets/brand/logo';
import { AppSidebarNav } from './AppSidebarNav';
import { useAuth } from '../contexts/AuthContext';
import { getNav } from '../_nav';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const { user } = useAuth();
  const { colorMode } = useColorModes();

  // Obtener el menú dinámico según el rol del usuario
  const navigation = getNav(user);

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      colorScheme={colorMode}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}
    >
      <CSidebarBrand
        to={user?.role === 'SUPER_ADMIN' ? '/super-admin/dashboard' : '/dashboard'}
      >
        <CIcon className="sidebar-brand-full" icon={logo} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>

      <CSidebarNav>
        <SimpleBar style={{ maxHeight: '100%' }}>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>

      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
