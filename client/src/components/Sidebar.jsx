import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { MdDisplaySettings } from "react-icons/md";
import { BsFileBarGraphFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { FaUserLock } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAuthContext } from "../store/AuthContext";

const menuIcons = {
  home: <FaHome />,
  profile: <FaClipboardUser />,
  settings: <IoSettings />,
  dummymenu1: <MdDisplaySettings />,
  dummymenu2: <BsFileBarGraphFill />,
  "user-management": <FaUserEdit />,
  "role-management": <FaUserLock />,
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { isAuthenticated, userRole, logout, roleMenus } = useAuthContext();

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
  };

  function convertToUrlString(str) {
    return str.toLowerCase().replace(/\s+/g, "-");
  }

  const renderMenuItems = () => {
    return roleMenus.map((menuItem) => {
      const formattedMenuItem = convertToUrlString(menuItem);
      return (
        <li key={formattedMenuItem}>
          <Link to={`/${formattedMenuItem}`}>
            {menuIcons[formattedMenuItem]}
            <span>{menuItem}</span>
          </Link>
        </li>
      );
    });
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div>
        <button className="toggle-button" onClick={toggleCollapse}>
          <FiMenu />
        </button>
      </div>
      <nav>
        <ul>
          {!isAuthenticated && <p>Login to see menu</p>}
          {isAuthenticated && renderMenuItems()}
          {isAuthenticated && (
            <li>
              <button onClick={handleLogout}>
                <TbLogout />
                <span>Logout</span>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
