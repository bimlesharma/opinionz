// contexts/AuthContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dp, setDp] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/v1/user-profile", {
          credentials: "include", // Make sure cookies are included
        });
        setIsLoggedIn(res.ok); // Update the state based on the response
        const data = await res.json();
        console.log("User profile data:", data.data.user.role);
        setDp(data.data.user.doodle); // Set the profile picture URL
        setIsAdmin(data.data.user.role === "admin"); // Check if the user is an admin
      } catch (error) {
        setIsLoggedIn(false); // Handle error
      }
    };

    checkAuth();
  }, []);

  // Handle user logout
  const logout = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for logout request
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsLoggedIn(false);
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout , dp, isAdmin}}>
      {children}
    </AuthContext.Provider>
  );
};
