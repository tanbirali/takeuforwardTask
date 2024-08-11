import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Flashcards from "./components/Flashcards";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Flashcards />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
