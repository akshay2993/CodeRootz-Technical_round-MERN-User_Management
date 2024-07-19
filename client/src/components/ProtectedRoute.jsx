import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../store/AuthContext";

const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, userRole } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    // if(isAuthenticated){
    //   navigate('/home')
    // }

    if (requiredRole && userRole !== requiredRole) {
      navigate("/");
    }
  }, [isAuthenticated, requiredRole]);

  return <Outlet />;
};

export default ProtectedRoute;
