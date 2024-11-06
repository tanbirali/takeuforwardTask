import { useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Flashcards from "./components/Flashcards";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useAuth } from "./store/authContext";

function App() {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <BrowserRouter>
        {user && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

const AppContent = () => {
  const { user } = useAuth();

  return (
    <>
      {user !== null && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};
