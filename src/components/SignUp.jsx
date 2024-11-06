import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa";
import { PiEyeClosed } from "react-icons/pi";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState("");
  const handleSubmit = async (e) => {
    if (email !== "" || password !== "") {
      setErrors("Email and Password cannot be empty");
    }
    if (password.length < 6) {
      setErrors("Password should be atleast 6 characters");
    }
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/v1/signup", //production URL
        // "http://localhost:8000/api/auth/v1/signup", //local API URL
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      setErrors("");
      setUsername("");
      setEmail("");
      setPassword("");
      window.location.href = "/"; //Redirect to login page
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-5">
      <h1 className="text-3xl font-bold underline">Signup </h1>
      {errors && <p className="text-red-500">{errors}</p>}

      <div className="w-56 flex flex-col space-y-1">
        <label htmlFor="Email" className="text-xl font-bold">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-8 p-2 outline-none border border-black rounded-md"
        />
      </div>
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
            type="password"
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
          Signup
        </button>
        <div>
          Already have an Account{" "}
          <a href="/" className="underline text-blue-500">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
