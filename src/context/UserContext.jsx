import React, { createContext, useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user from localStorage on initialization
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check localStorage for login state on initial load
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode token to get user data
        setUser({
          is_nurse: decoded.is_nurse,
          id: decoded.id,
          role: decoded.is_nurse ? "nurse" : "patient" // Use "patient" instead of "user"
        });
        user_data(decoded.id, token);
        setIsAuthenticated(true); // Mark as authenticated
      } catch (error) {
        console.error("Invalid token:", error);
        logout(); // Clear invalid token
      }
    }
  }, []);

  useEffect(() => {
    // Store user in localStorage whenever it changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const user_data = async (id, token) => {
    try {
      const userDetails = await axios.get(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("User details:", userDetails.data); // Debugging log
      // Persist full name
      setUser((prev) => ({
        ...prev,
        ...userDetails.data
      })); // Update user state

    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", credentials);
      const token = response.data.token;
      if (!token) {
        throw new Error("Token not received");
      }
      localStorage.setItem("token", token); // Persist token in localStorage
      const decoded = jwtDecode(token); // Decode token to get user data

      setUser({
        is_nurse: decoded.is_nurse,
        id: decoded.id,
        role: decoded.is_nurse ? "nurse" : "patient" // Use "patient" instead of "user"
      }); // Update user state in memory
      setIsAuthenticated(true); // Update authentication state
      user_data(decoded.id, token);

    } catch (error) {
      console.error("Error during login:", error.response || error.message);
      throw new Error(error.response?.data?.error || "Login failed. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); // Clear token
    setUser(null); // Clear user state in memory
    setIsAuthenticated(false); // Update authentication state
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated,setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
