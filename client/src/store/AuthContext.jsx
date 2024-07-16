import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [roleMenus, setRoleMenus] = useState(null);
  const [userName, setUserName] = useState(null)

  const login = (name, role, menus) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserName(name)
    setRoleMenus(menus)
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserName(null);
    setRoleMenus([])
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, roleMenus, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
