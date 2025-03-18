import React from 'react';
import { Navigate } from 'react-router-dom';

const Welcome = () => {
  return <Navigate to="/auth/login" replace />;
};

export default Welcome;
