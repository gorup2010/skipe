import { getAuth } from "@/lib/auth";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const user = getAuth();

  if (user === null) {
    return (
      <Navigate to={'/login'} replace />
    );
  }

  return <Outlet />;
};
