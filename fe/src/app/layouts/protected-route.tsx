import { addLogoutListener, getAuth, removeLogoutListener } from "@/lib/auth";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AppProvider } from "../provider";
import { useEffect } from "react";
import { ChatroomProvider } from "@/features/chat/chatroom-provider";

export const ProtectedRoute = () => {
  const user = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      navigate("/login");
    };

    addLogoutListener(handleLogout);

    return () => {
      removeLogoutListener(handleLogout);
    };
  }, []);

  if (user === null) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <AppProvider>
      <ChatroomProvider>
        <Outlet />
      </ChatroomProvider>
    </AppProvider>
  );
};
