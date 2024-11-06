import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      fetchUserDetails();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [token]);
  // Fetch user details function
  const fetchUserDetails = async () => {
    setLoading(true);
    console.log(token);
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/auth/v1/user", //production URL
        // "http://localhost:8000/api/auth/v1/user", // This is the URL of the API for local development
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User details response ", response.data);
      setUser(response.data); // Set user data from response
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    } finally {
      setLoading(false);
    }
  };
  // Function to handle login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/auth/login", //production URL
        // "http://localhost:8000/api/auth/v1/login", //local API URL
        { email, password }
      );
      console.log(response);
      const { token } = response.data;
      console.log(token);

      // Save token in state and local storage
      setToken(token);
      localStorage.setItem("token", token);

      // Fetch user details
      await fetchUserDetails();

      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        error: error.response?.data?.error || "Login failed",
      };
    }
  };

  // Function to handle logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    console.log("Logged Out Succesfully");
    window.location.href = "/";
  };

  // Provide the context values to children components
  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing the AuthContext
export const useAuth = () => useContext(AuthContext);
