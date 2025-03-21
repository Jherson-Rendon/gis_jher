// src/contexts/ModuleContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { MODULES } from '../views/dashboard/SubsystemCards';
import { useLocation, useNavigate } from 'react-router-dom';

const ModuleContext = createContext();

export const ModuleProvider = ({ children }) => {
  const [activeModule, setActiveModule] = useState(null);
  const [moduleHomeTab, setModuleHomeTab] = useState(null);
  const { user, hasRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Función para cambiar el módulo activo
  const changeActiveModule = (moduleId) => {
    // Establecer el nuevo módulo activo
    setActiveModule(moduleId);

    // Si hay un nuevo módulo, crear su información de pestaña home
    if (moduleId) {
      const module = MODULES[moduleId];
      if (module) {
        const homeTabId = `home-${moduleId}`;
        const homeTab = {
          id: homeTabId,
          title: `${module.title} - Home`,
          path: '/dashboard',
          module: moduleId,
          isHome: true,
          closable: false
        };

        setModuleHomeTab(homeTab);

        // Navegar al dashboard para mostrar el home del módulo
        navigate('/dashboard');
      }
    } else {
      // Si estamos volviendo al dashboard principal, limpiar la pestaña home
      setModuleHomeTab(null);
      navigate('/dashboard');
    }
  };

  // Función para determinar el primer módulo disponible para el usuario
  const getFirstAvailableModule = () => {
    if (!user || !user.role) return null;

    // Definir el orden de prioridad de los módulos según el rol
    const modulesByRole = {
      SUPER_ADMIN: ['super-admin', 'admin-ips', 'medico', 'enfermeria', 'laboratorio', 'contabilidad', 'recepcion'],
      ADMIN: ['admin-ips'],
      MEDICO: ['medico'],
      ENFERMERA: ['enfermeria'],
      LABORATORIO: ['laboratorio'],
      CONTABILIDAD: ['contabilidad'],
      RECEPCION: ['recepcion']
    };

    // Obtener los módulos disponibles para el rol del usuario
    const availableModules = modulesByRole[user.role] || [];

    // Verificar si el usuario tiene acceso a algún subsistema en cada módulo
    for (const moduleId of availableModules) {
      const module = MODULES[moduleId];
      if (module) {
        const hasAccessToSubsystem = module.subsystems.some(
          subsystem => subsystem.roles.some(role => hasRole(role))
        );
        if (hasAccessToSubsystem) {
          return moduleId;
        }
      }
    }

    return null;
  };

  // Detectar el módulo activo basado en la URL actual
  useEffect(() => {
    if (location.pathname && location.pathname !== '/dashboard') {
      // Extraer el primer segmento de la ruta después de la barra
      const pathSegment = location.pathname.split('/')[1];

      // Verificar si este segmento corresponde a un módulo
      const moduleExists = Object.keys(MODULES).some(
        moduleId => moduleId === pathSegment || MODULES[moduleId].path.includes(`/${pathSegment}/`)
      );

      if (moduleExists) {
        // Encontrar el ID del módulo correspondiente
        const foundModuleId = Object.keys(MODULES).find(
          moduleId => moduleId === pathSegment || MODULES[moduleId].path.includes(`/${pathSegment}/`)
        );

        if (foundModuleId !== activeModule) {
          // Usar changeActiveModule en lugar de setActiveModule directamente
          changeActiveModule(foundModuleId);
        }
      }
    }
  }, [location.pathname]);

  return (
    <ModuleContext.Provider value={{
      activeModule,
      moduleHomeTab,
      setActiveModule: changeActiveModule,
      getFirstAvailableModule
    }}>
      {children}
    </ModuleContext.Provider>
  );
};

export const useModule = () => useContext(ModuleContext);
