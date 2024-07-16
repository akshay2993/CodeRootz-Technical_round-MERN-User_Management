import axios from "axios";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
const ConfirmationDialog = forwardRef(function ConfirmationDialog({ role }, ref) {
  const dialog = useRef();
  const navigate = useNavigate()
  const handleDelete = async () => {
    try {
        const res = await axios.delete(`http://localhost:3000/roles`)
        console.log(res.data)
        dialog.current.close()
    } catch (error) {
        console.log(error)
        if(error.response.data.message){
            console.log(error.response.data.message)
            alert(`Error while deleting: ${error.response.data.message}`)
        }
    }
    
  };

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="p-6 sm:p-16 sm:py-10 rounded-xl">
      <h1 className="text-2xl">Are you sure you want to delete this entry? </h1>
      <form
        method="dialog"
        className="flex items-center justify-center gap-5 mt-8"
      >
        <button
          className="p-5 py-3 border rounded-lg bg-red-500 text-white active:bg-red-600 hover:bg-red-600 text-md font-bold"
          onClick={handleDelete}
          type="button"
        >
          Delete
        </button>
        <button className="p-5 py-3 border rounded-lg text-gray-700 active:bg-gray-100 hover:bg-gray-100 text-md font-bold">
          Cancel
        </button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
export default ConfirmationDialog;
