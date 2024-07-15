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

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { isAuthenticated, userRole, logout } = useAuthContext();

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const handleLogout = () => {
    logout()
  }

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div>
        <button className="toggle-button" onClick={toggleCollapse}>
          <FiMenu />
        </button>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/home">
              <FaHome />
              <span>Home</span>
            </Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link to="">
                  <FaClipboardUser />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link to="">
                  <IoSettings />
                  <span>Settings</span>
                </Link>
              </li>
              <li>
                <Link to="">
                  <MdDisplaySettings />
                  <span>DummyMenu</span>
                </Link>
              </li>
              <li>
                <Link to="">
                  <BsFileBarGraphFill />
                  <span>DummyMenu</span>
                </Link>
              </li>
              {isAuthenticated && userRole === "superadmin" ? (
                <>
                  <li>
                    <Link to="/user-management">
                      <FaUserEdit />
                      <span>User Management</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/role-management">
                      <FaUserLock />
                      <span>Role Management</span>
                    </Link>
                  </li>
                </>
              ) : null}
              <li>
                <button onClick={handleLogout}>
                  <TbLogout />
                  <span>Logout</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
