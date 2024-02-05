import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Role } from "../../types";
import { useAuthStore } from "../store/useAuthStore";

interface ProtectedRouteProps {
  accessRoles: Role[];
  children: JSX.Element;
}

export default function ProtectedRoute({
  children,
  accessRoles,
}: ProtectedRouteProps) {
  let location = useLocation();
  const user = useAuthStore((store) => store.user);
  if (!user) {
    return <Navigate state={{ from: location }} to="/login" replace />;
  }
  if (user && !user.activated) {
    return <Navigate to="/no-activate" state={{ from: location }} replace />;
  }
  if (user && !accessRoles.includes(user.role)) {
    return <Navigate to="/noaccess" replace />;
  }
  return children;
}
