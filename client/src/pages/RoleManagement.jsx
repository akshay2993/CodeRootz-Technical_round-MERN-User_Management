import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { IoMdPersonAdd } from "react-icons/io";
import EditRoleDialogBox from "../components/EditRoleDialogBox";
import { MdDeleteOutline } from "react-icons/md";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const dialog = useRef();
  axios.defaults.withCredentials = true;

  const fetchRoles = async () => {
    try {
      const rolesData = await axios.get("http://localhost:3000/api/roles");
      setRoles(rolesData.data);
      console.log(rolesData.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRoles();
  }, []);

  const handleEditClick = (id) => {
    setSelectedRoleId(id);
    dialog.current.open();
  };

  const handleCreateClick = () => {
    setSelectedRoleId(null);
    dialog.current.open();
  };

  const handleDeleteRole = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/roles/${id}`);
      fetchRoles(); // Refresh roles after deletion
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-6 items-end">
      <EditRoleDialogBox
        roleId={selectedRoleId}
        ref={dialog}
        onClose={fetchRoles}
      />
      <div
        className="text-right"
      >
        <button onClick={handleCreateClick} className="flex items-center gap-3 bg-gray-200 active:bg-gray-300 hover:bg-gray-300 p-2 rounded-lg" title="Create new role">
          <IoMdPersonAdd className="text-lg"/>
          <span className="text-lg">Create Role</span> 
        </button>
      </div>
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
                <th className="border border-slate-600 rounded-md">
                  Operations
                </th>
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

                        <MdDeleteOutline
                          onClick={() =>{handleDeleteRole(_id)}}
                          className="text-xl text-red-600"
                        />
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
    </div>
  );
};

export default RoleManagement;
