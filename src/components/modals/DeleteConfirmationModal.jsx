import axios from "axios";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteConfirmationModal = ({
  id,
  showDeleteModal,
  setShowDeleteModal,
  fetchData,
}) => {
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        import.meta.env.VITE_API_URL + "/flashcards" + `/${id}`
      );
      toast.success(res.data.message);
      setShowDeleteModal(false);
      fetchData();
    } catch (error) {
      // console.log(error);
      toast.error(error);
    }
  };
  return showDeleteModal ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg  w-72  lg:w-96">
        <div className="flex justify-end  p-2">
          <button
            className="border rounded-full flex justify-center p-2 hover:bg-red-400 "
            onClick={() => setShowDeleteModal(false)}
          >
            <RxCross2 />
          </button>
        </div>
        <div className="flex flex-col p-4  items-center gap-4">
          <h1 className="text-xl font-bold">
            Are you sure you want to delete this?
          </h1>
          <div className="flex gap-8 justify-center">
            <button
              className="bg-red-600 rounded-md p-2 w-10"
              onClick={() => handleDelete(id)}
            >
              Yes
            </button>
            <button
              className="bg-green-500 rounded-md p-2 w-10"
              onClick={() => setShowDeleteModal(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  ) : null;
};

export default DeleteConfirmationModal;
