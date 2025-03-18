// src/components/DebugInfo.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const DebugInfo = () => {
  const { user, isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();

  // En Vite, las variables de entorno se acceden con import.meta.env
  if (import.meta.env.VITE_DEBUG !== 'true') return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      right: 0,
      background: theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(220,220,220,0.8)',
      color: theme === 'dark' ? 'white' : 'black',
      padding: '10px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px',
      maxHeight: '200px',
      overflow: 'auto'
    }}>
      <h5>Debug Info</h5>
      <p>Path: {location.pathname}</p>
      <p>Auth: {isAuthenticated() ? 'Yes' : 'No'}</p>
      <p>Theme: {theme}</p>
      {user && (
        <>
          <p>User: {user.name}</p>
          <p>Role: {user.role}</p>
        </>
      )}
    </div>
  );
};

export default DebugInfo;
