import { getAuth } from "@/lib/auth";
import { Navigate, Outlet } from "react-router-dom";

export const NonProtectedRoute = () => {
  const user = getAuth();

  if (user !== null) {
    return (
      <Navigate to={'/'} replace />
    );  
  }

  return <Outlet />;
};
