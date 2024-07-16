import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import axios from "axios";

const EditUserDialog = forwardRef(function EditUserDialog(
  { user, onclose },
  ref
) {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  const dialog = useRef();
  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current.showModal();
    },
  }));

  const fetchRoles = async () => {
    try {
      const roles = await axios.get("http://localhost:3000/api/roles");
      if (!roles) {
        return;
      }
      setRoles(roles.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(roles);

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    if (user && user.role) {
      setSelectedRole(user.role.name);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const formValues = Object.fromEntries(formData.entries());
      // console.log(formValues)
      const updatedUser = await axios.put(`http://localhost:3000/api/users/${user._id}`,
        formValues
      );
      console.log(updatedUser);
      dialog.current.close();
      onclose();
    } catch (error) {
        console.log(error);
    }
    dialog.current.close();
  };

  return createPortal(
    <dialog
      ref={dialog}
      onClose={onclose}
      className="p-6 sm:p-16 sm:py-10 bg-gray-100 rounded-xl w-full max-w-2xl"
    >
      <h2 className="text-2xl pb-6">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user && user?.name}
            readOnly
          />
        </div>

        <input type="hidden" name="userId" value={user && user._id} />
        <div className="form-row">
          <label htmlFor="roleName">Role</label>
          <select
            name="roleName"
            value={selectedRole || ""}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles && roles.length > 0
              ? roles.map((role) => {
                  return (
                    <option
                      key={role._id}
                      value={role.name}
                    >
                      {role.name}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
        <button
          className="border rounded-lg bg-blue-500 text-white active:bg-blue-600 hover:bg-blue-600 text-md font-bold"
          type="submit"
        >
          Save
        </button>
      </form>
      <form
        method="dialog"
        className="flex items-center justify-center gap-5 mt-8"
      >
        <button className="border rounded-lg text-gray-600 bg-gray-200 active:bg-gray-200 hover:bg-gray-300 text-md font-bold">
          Cancel
        </button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default EditUserDialog;
