import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/authContext";

const Navbar = () => {
  const { logout } = useAuth();
  return (
    <nav className="flex gap-4 items-center justify-end shadow-md p-6 ">
      <Link to={"/flashcards"} className="text-xl font-semibold">
        Flashcards
      </Link>
      <Link to={"/dashboard"} className="text-xl font-semibold">
        Dashboard
      </Link>
      <button
        onClick={() => logout()}
        className="bg-red-700 rounded-md text-white p-2 "
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
