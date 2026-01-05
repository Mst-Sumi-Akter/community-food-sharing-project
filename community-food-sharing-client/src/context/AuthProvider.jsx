// src/context/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// Create Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // ------------------- Sync user with backend MongoDB ------------------- //
  const syncUserWithBackend = async (user) => {
    if (!user?.email) return;

    try {
      await fetch("https://community-food-sharing-server-iota.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL || "",
        }),
      });
    } catch (err) {
      console.error("Failed to sync user with backend:", err);
    }
  };

  // ------------------- Register ------------------- //
  const register = async (email, password, displayName, photoURL) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Update displayName and photoURL in Firebase
      await updateProfile(result.user, { displayName, photoURL });

      // Sync user to backend
      await syncUserWithBackend(result.user);

      return result.user;
    } finally {
      setLoading(false);
    }
  };

  // ------------------- Login ------------------- //
  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Sync user to backend
      await syncUserWithBackend(result.user);

      return result.user;
    } finally {
      setLoading(false);
    }
  };

  // ------------------- Google Login ------------------- //
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // Sync user to backend
      await syncUserWithBackend(result.user);

      return result.user;
    } finally {
      setLoading(false);
    }
  };

  // ------------------- Logout ------------------- //
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  // ------------------- Track Auth State ------------------- //
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Optional: sync on page refresh/login
      if (currentUser) {
        await syncUserWithBackend(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};




