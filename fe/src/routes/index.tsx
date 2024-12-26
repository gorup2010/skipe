import Chat from "@/pages/app/chat";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Chat />
  },
]);

export default router;
