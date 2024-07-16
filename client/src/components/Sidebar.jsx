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
import { TbLogin2 } from "react-icons/tb";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { NavLink } from "react-router-dom";
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
          <NavLink to={`/${formattedMenuItem}`}>
            {menuIcons[formattedMenuItem]}
            <span>{menuItem}</span>
          </NavLink>
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
          {!isAuthenticated && (
            <>
              <li>
                <NavLink to='/login'>
                  <TbLogin2 />
                  <span>Login</span>
                </NavLink>
              </li>
              <li>
                <NavLink to='/signup'>
                  <AiOutlineUsergroupAdd />
                <span>Signup</span>
                </NavLink>
              </li>
            </>
          )}
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
