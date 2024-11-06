import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FcNext, FcPrevious } from "react-icons/fc";
import { FiDelete } from "react-icons/fi";
import DeleteConfirmationModal from "./modals/DeleteConfirmationModal";
import EditModal from "./modals/EditModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Flashcards = () => {
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    id: "",
    question: "",
    answer: "",
  });
  if (!localStorage.getItem("token")) {
    toast.error("You need to login first");
  } else {
    const token = localStorage.getItem("token");
  }
  const handleEditClick = (id, question, answer) => {
    setSelectedCard({ id, question, answer });
    setShowEditModal(true);
  };
  const handleDeleteClick = (id) => {
    setSelectedCard((prev) => ({ ...prev, id }));
    setShowDeleteModal(true);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + cardsData.length) % cardsData.length);
    setShowAnswer(false);
  };
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % cardsData.length);
    setShowAnswer(false);
  };
  const [cardsData, setCardsData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/flashcards",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setCardsData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {cardsData.length === 0 ? (
        <div className="bg-lime-500 h-screen flex justify-center items-center p-6 m-4 rounded-md">
          <h1 className="text-white text-xl">There is no flashcard. </h1>
        </div>
      ) : (
        <Card
          showAnswer={showAnswer}
          setShowAnswer={setShowAnswer}
          id={cardsData[current].id}
          question={cardsData[current].question}
          answer={cardsData[current].answer}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      )}
      <div className="flex justify-between px-4 py-2 ">
        <button
          className=" bg-slate-300 border-2 rounded-full p-4 hover:bg-slate-200 "
          onClick={handlePrev}
        >
          <FcPrevious className="text-white text-xl" />
        </button>
        <button
          className="bg-slate-300 border-2 rounded-full p-4 hover:bg-slate-200 "
          onClick={handleNext}
        >
          <FcNext className="text-white text-xl" />
        </button>
      </div>
      <DeleteConfirmationModal
        id={selectedCard.id}
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        fetchData={fetchData}
      />
      <EditModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        id={selectedCard.id}
        question={selectedCard.question}
        answer={selectedCard.answer}
        fetchData={fetchData}
      />
      <ToastContainer />
    </div>
  );
};

const Card = ({
  showAnswer,
  setShowAnswer,
  id,
  question,
  answer,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <div
      className={` flex h-screen justify-center items-center border relative
     rounded-md p-6 mt-8 mx-4 transform transition-all ${
       showAnswer ? "rotate-y-180  bg-blue-500" : "rotate-y-0 bg-lime-600"
     }`}
      onClick={() => setShowAnswer(!showAnswer)}
    >
      <div className="absolute  right-4 top-2 z-10 ">
        <div className="flex gap-4">
          <button
            className="border rounded-full w-fit h-fit p-2
           hover:bg-green-500 flex justify-center"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(id, question, answer);
            }}
          >
            <BiEdit className="text-white text-xl" />
          </button>
          <button
            className="border rounded-full w-fit h-fit p-2
           hover:bg-red-400 flex justify-center"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(id);
            }}
          >
            <FiDelete className="text-red-600 text-xl" />
          </button>
        </div>
      </div>
      <div
        className={`transition-all delay-300 ${
          showAnswer ? "hidden ease-out " : "block ease-in"
        }`}
      >
        <h1 className={`text-white `}>{question}</h1>
      </div>
      <div
        className={`transform transition-all delay-300 ${
          showAnswer ? "block  ease-in" : "hidden  ease-out"
        }`}
      >
        <h1 className={`text-white `}>{answer}</h1>
      </div>
    </div>
  );
};

export default Flashcards;
