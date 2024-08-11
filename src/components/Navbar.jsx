import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex gap-4 items-center justify-end shadow-md p-6 ">
      <Link to={"/"} className="text-xl font-semibold">
        Home
      </Link>
      <Link to={"/dashboard"} className="text-xl font-semibold">
        Dashboard
      </Link>
    </nav>
  );
};

export default Navbar;
