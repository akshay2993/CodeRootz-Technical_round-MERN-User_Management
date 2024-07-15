import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const EditRoleDialogBox = forwardRef(function EditRoleDialogBox(
  { roleId, onEditRole },
  ref
) {
  const [selectedRole, setSelectedRole] = useState('');
  const dialog = useRef();
  const selectRef = useRef();
  //   const navigate = useNavigate()
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  useEffect(() => {
    const fetchSelectedRole = async () => {
      try {
        const roleData = await axios.get(
          `http://localhost:3000/api/roles/${roleId}`
        );
        console.log(roleData);
        roleData.data && setSelectedRole(roleData.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSelectedRole();
  }, [roleId]);

  const preSelectedMenus = selectedRole ? selectedRole.menus : [];

  return createPortal(
    <dialog
      ref={dialog}
      className="p-6 sm:p-16 sm:py-10 bg-gray-100 rounded-xl"
    >
      <h2 className="text-2xl pb-6">Edit Role</h2>
      <form onSubmit={onEditRole}>
        <div className="form-row">
          <label htmlFor="roleName">Role</label>
          <input
            type="text"
            id="roleName"
            name="roleName"
            defaultValue={selectedRole.name}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="menus">Choose menus to show</label>
          <Multiselect
            ref={selectRef}
            isObject={false}
            options={[
              "Home",
              "Profile",
              "Settings",
              "DummyMenu",
              "DummyMenu",
              "User Management",
              "Role Management",
            ]}
            selectedValues={preSelectedMenus}
          />
        </div>
      </form>
      <form
        method="dialog"
        className="flex items-center justify-center gap-5 mt-8"
      >
        <button
          className="border rounded-lg bg-blue-500 text-white active:bg-blue-600 hover:bg-blue-600 text-md font-bold"
          onClick={() => {}}
          type="button"
        >
          Save
        </button>
        <button className="border rounded-lg text-gray-600 bg-gray-200 active:bg-gray-200 hover:bg-gray-300 text-md font-bold">
          Cancel
        </button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
export default EditRoleDialogBox;
