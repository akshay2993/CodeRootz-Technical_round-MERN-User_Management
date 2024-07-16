import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";

const EditRoleDialogBox = forwardRef(function EditRoleDialogBox({ roleId, onClose }, ref) {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
    close() {
      dialog.current.close();
    }
  }));

  useEffect(() => {
    const fetchSelectedRole = async () => {
      if (roleId){
        try {
          const roleData = await axios.get(`http://localhost:3000/api/roles/${roleId}`);
          setSelectedRole(roleData.data);
          setSelectedOptions(roleData.data.menus);
        } catch (error) {
          console.log(error);
        }
      }else{
        setSelectedRole(null);
        setSelectedOptions([]);
      }
    };
    fetchSelectedRole();
  }, [roleId]);

  const handleDropdownChange = (selectedList) => {
    setSelectedOptions(selectedList);
  };

  // const resetForm = () => {
  //   setSelectedRole("");
  //   setSelectedOptions([]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    values.menus = selectedOptions;
    console.log(values)
    try {
      const url = `http://localhost:3000/api/roles${roleId ? `/${roleId}` : ''}`;
      const method = roleId ? 'put' : 'post';
      const res = await axios[method](url, values);
      console.log(res.data);
      dialog.current.close();
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      // if (error.response) {
      //   alert(error.response.data.message);
      // }
    }
  };

  return createPortal(
    <dialog ref={dialog} onClose={onClose} className="p-6 sm:p-16 sm:py-10 bg-gray-100 rounded-xl w-full max-w-2xl">
      <h2 className="text-2xl pb-6">{roleId ? "Edit Role" : "Create Role"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            placeholder="Enter role"
            defaultValue={selectedRole && selectedRole.name}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="menus">Choose menus to show</label>
          <Multiselect
            isObject={false}
            showArrow={true}
            placeholder=""
            style={{
              searchBox: {
                background: "white",
              },
            }}
            options={[
              "Home",
              "Profile",
              "Settings",
              "DummyMenu1",
              "DummyMenu2",
              "User Management",
              "Role Management",
            ]}
            selectedValues={selectedOptions}
            onSelect={handleDropdownChange}
            onRemove={handleDropdownChange}
          />
        </div>
        <button
          className="border rounded-lg bg-blue-500 text-white active:bg-blue-600 hover:bg-blue-600 text-md font-bold"
          type="submit"
        >
          Save
        </button>
      </form>
      <form method="dialog" className="flex items-center justify-center gap-5 mt-8">
        <button className="border rounded-lg text-gray-600 bg-gray-200 active:bg-gray-200 hover:bg-gray-300 text-md font-bold">
          Cancel
        </button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default EditRoleDialogBox;
