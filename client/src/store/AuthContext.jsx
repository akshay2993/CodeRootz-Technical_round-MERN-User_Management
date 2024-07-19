import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
axios.defaults.withCredentials = true;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(localStorage.getItem('isAuth')) || false);
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || null);
  const [roleMenus, setRoleMenus] = useState( JSON.parse(localStorage.getItem('menus')) || null);
  const [userName, setUserName] = useState(localStorage.getItem('name') || null);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/protected-route"
      );
      // console.log(response);
      setIsAuthenticated(true);
      setUserRole(response.data.role.name);
      setUserName(response.data.name);
      setRoleMenus(response.data.role.menus);

      localStorage.setItem("isAuth", JSON.stringify(true));
      localStorage.setItem("role", response.data.role.name);
      localStorage.setItem("menus", JSON.stringify(response.data.role.menus));
      localStorage.setItem("name", response.data.name);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      setUserRole(null);
      setUserName(null);
      setRoleMenus([]);

      localStorage.setItem("isAuth", JSON.stringify(false));
      localStorage.setItem("role", null);
      localStorage.setItem("menus", JSON.stringify([]));
      localStorage.setItem("name", null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = (name, role, menus) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserName(name);
    setRoleMenus(menus);

    localStorage.setItem("isAuth", JSON.stringify(true));
    localStorage.setItem("role", role);
    localStorage.setItem("menus", JSON.stringify(menus));
    localStorage.setItem("name", name);
  };

  const logout = async () => {
    const res = await axios.post("http://localhost:3000/api/auth/logout");
    console.log(res);
    alert(res.data.message);
    setIsAuthenticated(false);
    setUserRole(null);
    setUserName(null);
    setRoleMenus([]);

    localStorage.setItem("isAuth", JSON.stringify(false));
      localStorage.setItem("role", null);
      localStorage.setItem("menus", JSON.stringify([]));
      localStorage.setItem("name", null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        roleMenus,
        userName,
        login,
        fetchUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
