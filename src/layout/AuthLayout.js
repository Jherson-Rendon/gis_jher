// src/layout/AuthLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="bg-dark min-vh-100 d-flex flex-row align-items-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
