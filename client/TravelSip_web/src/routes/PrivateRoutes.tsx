import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRouteProps> = (props) => {
  const { authState } = useAuth();
  const { children } = props;
  return authState?.authenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoutes;
