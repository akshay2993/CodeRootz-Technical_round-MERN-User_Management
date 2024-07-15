import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
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
