import Chat from "./pages/app/chat";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { createBrowserRouter } from "react-router-dom";
import { NonProtectedRoute } from "./layouts/non-protected-route";
import { ProtectedRoute } from "./layouts/protected-route";

const router = createBrowserRouter([
    {
      element: <NonProtectedRoute />,
      children: [
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
      ],
    },
    {
      element: <ProtectedRoute />,
      children: [
        { path: '/', element: <Chat /> },
      ],
    },
  ]);

export default router;
