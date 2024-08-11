import axios from "axios";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const EditModal = ({
  showEditModal,
  setShowEditModal,
  id,
  question,
  answer,
  fetchData,
}) => {
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  const handleUpdate = async (id) => {
    console.log(id);
    if (!editAnswer || !editQuestion) {
      throw new Error("Question and Answer cannot be empty");
    }
    try {
      const res = await axios.put(
        import.meta.env.VITE_API_URL + "/flashcards" + `/${id}`,
        {
          question: editQuestion,
          answer: editAnswer,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      fetchData();
      setEditQuestion("");
      setEditAnswer("");
      setShowEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return showEditModal ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg  w-72  lg:w-96">
        <div className="flex justify-end  p-2">
          <button
            className="border rounded-full flex justify-center p-2 hover:bg-red-400 "
            onClick={() => setShowEditModal(false)}
          >
            <RxCross2 />
          </button>
        </div>
        <div className="flex flex-col p-4  gap-4">
          <h1 className="text-xl font-semibold">Question</h1>
          <input
            type="text"
            name="question"
            id="question"
            className="border rounded-md p-2"
            placeholder={question}
            value={editQuestion}
            onChange={(e) => setEditQuestion(e.target.value)}
          />
          <h1 className="text-xl font-semibold">Answer</h1>
          <input
            type="text"
            name="answer"
            id="answer"
            className="border rounded-md p-2"
            placeholder={answer}
            value={editAnswer}
            onChange={(e) => setEditAnswer(e.target.value)}
          />
          <button
            className="bg-green-500 p-2 text-white rounded-md"
            onClick={() => handleUpdate(id)}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default EditModal;
