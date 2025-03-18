// src/components/AppModuleTabs.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CNav, CNavItem, CNavLink } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useAuth } from '../contexts/AuthContext';
import { getNav } from '../_nav';

const AppModuleTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentPath = location.pathname;

  // Obtener el menú de navegación basado en el rol del usuario
  const navItems = getNav(user);

  // Encontrar el módulo principal activo
  const activeMainModule = navItems.find(item =>
    item.component?.name === 'CNavGroup' &&
    currentPath.includes(item.name.toLowerCase().replace(/\s+/g, '-'))
  );

  // Si no hay un módulo principal activo o no tiene subítems, no mostrar pestañas
  if (!activeMainModule || !activeMainModule.items) {
    return null;
  }

  return (
    <CNav variant="tabs" className="mb-3">
      {activeMainModule.items.map((item, index) => (
        <CNavItem key={index}>
          <CNavLink
            active={currentPath === item.to}
            onClick={() => navigate(item.to)}
            style={{ cursor: 'pointer' }}
          >
            {item.icon && <span className="me-2">{item.icon}</span>}
            {item.name}
          </CNavLink>
        </CNavItem>
      ))}
    </CNav>
  );
};

export default React.memo(AppModuleTabs);
