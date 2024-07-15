import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null)

  const login = (name, role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserName(name)
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserName(null)
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
