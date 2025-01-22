import { getAuth } from "@/lib/auth";
import { Navigate, Outlet } from "react-router-dom";
import { AppProvider } from "../provider";

export const ProtectedRoute = () => {
  const user = getAuth();

  if (user === null) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
};
