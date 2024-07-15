import { useAuthContext } from "../store/AuthContext";

const Header = () => {
  const { isAuthenticated, userName } = useAuthContext();

  return (
    <header>
      {isAuthenticated && <div className="user-avatar">{userName}</div>}
    </header>
  );
};

export default Header;
