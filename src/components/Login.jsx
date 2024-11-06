import React, { useContext, useState } from "react";
import { BsEye } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../store/authContext";
import { Router } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState("");
  const { user, login } = useAuth();
  console.log(user);
  const handleSubmit = async (e) => {
    if (email !== "" || password !== "") {
      setErrors("Email and Password cannot be empty");
    }
    if (password.length < 6) {
      setErrors("Password should be atleast 6 characters");
    }
    try {
      await login(email, password);
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-5">
      <h1 className="text-3xl font-bold underline">Login </h1>
      {errors && <p className="text-red-500">{errors}</p>}

      <div className="w-56 flex flex-col space-y-1">
        <label htmlFor="Email" className="text-xl font-bold">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-8 p-2 outline-none border border-black rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="Password" className="text-xl font-bold">
          Password
        </label>
        <div className="w-56 h-8 flex gap-2 border border-black rounded-md">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full outline-none rounded-md p-2"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="px-2"
          >
            {showPassword ? <BsEye /> : <FaEyeSlash />}
          </button>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-red-500 mt-2 rounded-md  text-white font-bold py-2 px-2"
        >
          Login
        </button>
      </div>
      <div>
        <p>
          Don't have an account{" "}
          <a href="/signup" className="underline text-blue-500">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
