  import React from "react";
  import { Navigate } from "react-router-dom";
  import { useSelector } from "react-redux";
  import { RootState } from "../../redux/store";
  import { useAuth } from "../../hooks/useAuth";

  interface Props {
    children: React.ReactNode;
  }

  const ProtectedRoute: React.FC<Props> = ({ children }) => {
    // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const { isAuthenticated } = useAuth();

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
  };

  export default ProtectedRoute;
