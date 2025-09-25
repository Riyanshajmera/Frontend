import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext.jsx';

export default function ProtectedRoute({ requireRole }) {
  const { user, loadingUser } = useContext(UserContext);

  if (loadingUser) return null; // or a spinner component

  if (!user) return <Navigate to="/login" replace />;

  if (requireRole && (user.role || '').toUpperCase() !== String(requireRole).toUpperCase()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}


