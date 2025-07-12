// components/PrivateRoute.jsx
import React from 'react';
import { Navigate,useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated }) => {
  const nevigate = useNavigate();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
