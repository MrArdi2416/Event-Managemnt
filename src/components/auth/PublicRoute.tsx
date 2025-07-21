// components/auth/PublicRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAuth } from "../../hooks/useAuth";

const PublicRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  //  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
