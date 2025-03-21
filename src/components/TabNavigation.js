// src/components/TabNavigation.js
import React from 'react';
import { CNav, CNavItem, CNavLink, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilX, cilHome } from '@coreui/icons';
import { useTabs } from '../contexts/TabContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useModule } from '../contexts/ModuleContext';

const TabNavigation = () => {
  const { tabs, activeTab, setActiveTab, closeTab } = useTabs();
  const { activeModule } = useModule();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Manejar el cambio de pestaña
  const handleTabChange = (tabId, path) => {
    setActiveTab(tabId);
    navigate(path);
  };

  // Si no hay pestañas, no mostramos nada
  if (tabs.length === 0) {
    return null;
  }

  // Filtrar las pestañas para mostrar solo las del módulo activo
  const moduleTabs = activeModule
    ? tabs.filter(tab => tab.module === activeModule)
    : tabs;

  // Si no hay pestañas para el módulo activo, no mostramos nada
  if (moduleTabs.length === 0) {
    return null;
  }

  return (
    <div className={`tab-navigation mb-2 ${isDark ? 'bg-dark' : 'bg-light'}`}>
      <CNav variant="tabs">
        {moduleTabs.map((tab) => (
          <CNavItem key={tab.id}>
            <CNavLink
              active={activeTab === tab.id}
              onClick={() => handleTabChange(tab.id, tab.path)}
              className={`d-flex align-items-center ${isDark ? 'text-light' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {tab.isHome && <CIcon icon={cilHome} className="me-1" size="sm" />}
              {tab.title}
              {tab.closable && (
                <CButton
                  color="link"
                  size="sm"
                  className="ms-2 p-0 text-decoration-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                >
                  <CIcon icon={cilX} size="sm" />
                </CButton>
              )}
            </CNavLink>
          </CNavItem>
        ))}
      </CNav>
    </div>
  );
};

export default TabNavigation;
