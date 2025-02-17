import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { createBrowserRouter } from "react-router-dom";
import { NonProtectedRoute } from "./layouts/non-protected-route";
import { ProtectedRoute } from "./layouts/protected-route";
import MainPage from "./pages/app/main-page";

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
        { path: '/', element: <MainPage /> },
      ],
    },
  ]);

export default router;
