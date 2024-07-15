import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import EditRoleDialogBox from "./EditRoleDialogBox";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(null)
  const dialog = useRef()
  axios.defaults.withCredentials = true;
  
  useEffect(() => {
    const fetchRoles = async () => {
        try {
            const rolesData = await axios.get("http://localhost:3000/api/roles");
            setRoles(rolesData.data);
            console.log(rolesData.data)
        } catch (error) {
            console.log(error)
        }
    };
    fetchRoles();
  }, []);

  const handleEditClick = (id) => {
    setSelectedRoleId(id)
    dialog.current.open()
  }

  const handleEditRole = () => {

  }

  return (
    <>
    {selectedRoleId && <EditRoleDialogBox roleId={selectedRoleId} onEditRole={handleEditRole} ref={dialog} />}
      {roles && roles.length > 0 ? (
        <div className="w-full max-w-[820px] mx-auto bg-gray-200 p-6 px-1 md:px-6 rounded-xl">
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr className="h-10">
              <th className="border border-slate-600 rounded-md">S.No.</th>
              <th className="border border-slate-600 rounded-md">Role</th>
              <th className="border border-slate-600 rounded-md max-sm:hidden">
                Menus
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => {
              const { _id, name, menus } = role;
              const serialNo = index + 1;
              return (
                <tr key={_id} className="h-10">
                  <td className="border border-slate-600 rounded-md text-center">
                    {serialNo}
                  </td>
                  <td className="border border-slate-600 rounded-md text-center">
                    {name}
                  </td>
                  <td className="border border-slate-600 rounded-md max-sm:hidden text-center">
                    <div className="w-full flex flex-wrap justify-center gap-x-1 gap-y-1">
                      {menus.map((menu) => (
                        <span className="menu-name" key={menu}>
                          {menu}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="border border-slate-600 rounded-md">
                    <div className="flex justify-center gap-x-4 items-center">
                      <button onClick={() => handleEditClick(_id)}>
                        <FiEdit className="text-xl text-green-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      ) : (
        <p>No roles available! Create Roles</p>
      )}
    </>
  );
};

export default RoleManagement;
