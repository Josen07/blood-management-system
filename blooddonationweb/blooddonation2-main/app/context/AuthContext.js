"use client";
import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app, { db } from "../firebase";

const AuthContext = createContext({
  user: null,
  loading: true,
  setUserData: () => {}, // Placeholder function
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateUserData = (userData) => {
    setUser(userData);
    setLoading(false); // Assuming data is ready after setting
    localStorage.setItem("userData", JSON.stringify(userData)); // Update localStorage
  };

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is logged in
        const { uid, email } = currentUser;
        // You can potentially fetch additional user data from Firestore here
        updateUserData({ donorId: uid, email });
      } else {
        // User is logged out
        updateUserData(null);
        localStorage.removeItem("userData"); // Clear localStorage
      }
      setLoading(false); // Set loading state to false after initial check
    });

    return unsubscribe; // Cleanup function for the effect
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUserData: updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
