import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import UserManagement from "./pages/UserManagement";
import RoleManagement from "./pages/RoleManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./store/AuthContext";
import EditRoleDialogBox from "./components/EditRoleDialogBox";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: '/', element: <ProtectedRoute />,
        children: [
            { path: '/home', element: <Home /> },
        ]
      },
      { element: <ProtectedRoute requiredRole='superadmin' />,
        children: [
            { path: "/user-management", element: <UserManagement /> },
            { path: "/role-management", element: <RoleManagement /> },
            // { path: "/role-create", element: <RoleCreate /> },
        ]
      }
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
