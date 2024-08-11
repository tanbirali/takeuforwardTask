import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [showList, setShowList] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // console.log(import.meta.env.VITE_API_URL);
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/flashcards"
        );
        setCardsData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const handleAddCard = async (question, answer) => {
    if (!question || !answer) {
      throw new Error("Question answer Answer cannot be empty");
    }
    try {
      console.log(import.meta.env.VITE_API_URL + "/flashcards");
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/flashcards",
        {
          question,
          answer,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      //Upadating the cardslist
      setCardsData([...cardsData, res.data]);

      //Clearing the input fields
      setQuestion("");
      setAnswer("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex justify-center items-center p-4">
      <div className=" w-full flex flex-col justify-center gap-6">
        <h1 className="text-3xl font-bold ">Dashboard</h1>
        <div className="flex flex-col justify-center gap-3 ">
          <h1 className="text-xl">Enter the Question</h1>
          <input
            type="text"
            name="question"
            id="question"
            className="w-full  outline-none border rounded-md p-2 "
            placeholder="Enter your question here"
            onChange={(e) => setQuestion(e.target.value)}
          />
          <h1 className="text-xl">Enter the Answer</h1>
          <input
            type="text"
            name="answer"
            id="answer"
            className="w-full outline-none border rounded-md p-2 "
            placeholder="Enter the answer here"
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button
            className="w-60 lg:w-full rounded-md text-white bg-black
           p-3 text-xl font-bold"
            onClick={() => handleAddCard(question, answer)}
          >
            Add Card
          </button>
        </div>
        <div className="p-4">
          {showList ? (
            <div className="flex flex-col items-center gap-6">
              <button
                className="w-40 lg:w-full bg-red-400 p-2 text-white font-bold text-xl rounded-md"
                onClick={() => setShowList(false)}
              >
                Close Table
              </button>
              <div className="overflow-x-auto">
                <table>
                  <thead className="w-full">
                    <tr>
                      <th className="w-full py-2 px-4 border-2 border-black">
                        No
                      </th>
                      <th className="w-full py-2 px-4 border-2 border-black">
                        Question
                      </th>
                      <th className="w-full py-2 px-4 border-2 border-black">
                        Answer
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cardsData.map((data, index) => (
                      <tr key={index}>
                        <td className="text-center w-full px-4 py-2 border-2 border-black">
                          {index + 1}
                        </td>
                        <td className="text-center w-full px-4 py-2 border-2 border-black">
                          {data.question}
                        </td>
                        <td className="text-center w-full px-4 py-2 border-2 border-black">
                          {data.answer}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <button
              className="w-full rounded-md text-white bg-black p-3 text-xl font-bold"
              onClick={() => setShowList(true)}
            >
              Show List
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
