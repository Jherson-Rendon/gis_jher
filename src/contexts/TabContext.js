// src/contexts/TabContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useModule } from './ModuleContext';

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { activeModule, moduleHomeTab } = useModule();

  // Efecto para crear automáticamente una pestaña "Home" cuando se selecciona un módulo
  useEffect(() => {
    if (moduleHomeTab) {
      // Verificar si ya existe una pestaña home para este módulo
      const existingHomeTab = tabs.find(tab => tab.id === moduleHomeTab.id);

      if (!existingHomeTab) {
        // Cerrar todas las pestañas existentes y crear la nueva pestaña home
        setTabs([moduleHomeTab]);
        setActiveTab(moduleHomeTab.id);
      } else if (activeTab !== moduleHomeTab.id && location.pathname === '/dashboard') {
        // Si estamos en el dashboard y existe la pestaña home pero no está activa, activarla
        setActiveTab(moduleHomeTab.id);
      }
    }
  }, [moduleHomeTab, activeModule]);

  // Abrir una nueva pestaña
  const openTab = (tab) => {
    // Verificar si la pestaña ya existe
    const existingTab = tabs.find((t) => t.id === tab.id);

    if (existingTab) {
      // Si la pestaña ya existe, solo la activamos
      setActiveTab(existingTab.id);

      // Navegar a la ruta de la pestaña si es diferente a la actual
      if (location.pathname !== existingTab.path) {
        navigate(existingTab.path);
      }
    } else {
      // Si la pestaña no existe, la agregamos y la activamos
      const newTabs = [...tabs, { ...tab, module: activeModule }];
      setTabs(newTabs);
      setActiveTab(tab.id);

      // Navegar a la ruta de la nueva pestaña
      navigate(tab.path);
    }
  };

  // Cerrar una pestaña
  const closeTab = (tabId) => {
    // No permitir cerrar pestañas de home
    const tabToClose = tabs.find(tab => tab.id === tabId);
    if (tabToClose && tabToClose.isHome) return;

    // Encontrar el índice de la pestaña a cerrar
    const tabIndex = tabs.findIndex((tab) => tab.id === tabId);

    if (tabIndex === -1) return;

    // Crear una nueva lista de pestañas sin la pestaña cerrada
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);

    // Si la pestaña cerrada era la activa, activar otra
    if (activeTab === tabId) {
      // Buscar la pestaña home del módulo actual
      const currentModule = tabToClose.module;
      const homeTabId = `home-${currentModule}`;
      const homeTab = newTabs.find(tab => tab.id === homeTabId);

      if (homeTab) {
        // Si existe una pestaña home para este módulo, activarla
        setActiveTab(homeTabId);
        navigate('/dashboard');
      } else if (newTabs.length > 0) {
        // Si no hay pestaña home, activar otra pestaña
        const newActiveIndex = tabIndex === 0 ? 0 : tabIndex - 1;
        const newActiveTab = newTabs[newActiveIndex];
        setActiveTab(newActiveTab.id);
        navigate(newActiveTab.path);
      } else {
        // Si no quedan pestañas, volver al dashboard
        setActiveTab(null);
        navigate('/dashboard');
      }
    }
  };

  // Cerrar todas las pestañas excepto las de home
  const closeAllTabs = () => {
    // Mantener solo las pestañas de home
    const homeTabs = tabs.filter(tab => tab.isHome);
    setTabs(homeTabs);

    // Activar la pestaña home del módulo actual si existe
    if (activeModule) {
      const homeTabId = `home-${activeModule}`;
      const homeTab = homeTabs.find(tab => tab.id === homeTabId);

      if (homeTab) {
        setActiveTab(homeTabId);
        navigate('/dashboard');
      } else {
        setActiveTab(null);
        navigate('/dashboard');
      }
    } else {
      setActiveTab(null);
      navigate('/dashboard');
    }
  };

  // Cerrar otras pestañas (todas excepto la activa y las de home)
  const closeOtherTabs = () => {
    if (activeTab) {
      // Mantener la pestaña activa y todas las pestañas de home
      const tabsToKeep = tabs.filter(tab => tab.id === activeTab || tab.isHome);
      setTabs(tabsToKeep);
    }
  };

  return (
    <TabContext.Provider
      value={{
        tabs,
        setTabs,
        activeTab,
        setActiveTab,
        openTab,
        closeTab,
        closeAllTabs,
        closeOtherTabs,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

export const useTabs = () => useContext(TabContext);
