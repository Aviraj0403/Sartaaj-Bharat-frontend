import React, { createContext, useContext, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { fetchBackendCart, syncCartOnLogin } from "../features/cart/cartThunk";
import Axios from "../utils/Axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartSyncing, setCartSyncing] = useState(false);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // Validate session on mount
  useEffect(() => {
    const validateSession = async () => {
      try {
        const res = await Axios.get("/auth/profile");
        setUser(res.data.data);

        setCartSyncing(true);
        await dispatch(fetchBackendCart()).unwrap();
      } catch (error) {
        setUser(null);
        // Don't log 401 errors as they're expected when not logged in
        if (error.response?.status !== 401) {
          console.error("Session validation error:", error);
        }
      } finally {
        setLoading(false);
        setCartSyncing(false);
      }
    };

    validateSession();
  }, [dispatch]);

  // ✅ Phone OTP - Send OTP
  const sendPhoneOTP = async (phoneNumber) => {
    try {
      const response = await Axios.post("/auth/phone/request-otp", {
        phoneNumber
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to send OTP" };
    }
  };

  // ✅ Phone OTP - Verify OTP & Login
  const verifyPhoneOTP = async (phoneNumber, otp) => {
    try {
      const response = await Axios.post("/auth/phone/verify-otp", {
        phoneNumber,
        otp
      });

      // Fetch updated user data
      const userRes = await Axios.get("/auth/profile");
      setUser(userRes.data.data);

      // Sync cart
      setCartSyncing(true);
      await dispatch(syncCartOnLogin()).unwrap();
      await dispatch(fetchBackendCart()).unwrap();
      setCartSyncing(false);

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to verify OTP" };
    }
  };

  // ✅ Email/Username login
  const login = async (credentials) => {
    try {
      await Axios.post("/auth/login", credentials);

      const res = await Axios.get("/auth/profile");
      setUser(res.data.data);

      setCartSyncing(true);
      await dispatch(syncCartOnLogin()).unwrap();
      await dispatch(fetchBackendCart()).unwrap();
      setCartSyncing(false);

      return res.data.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  };

  // ✅ Google Login with proper error handling
  const googleLogin = async () => {
    try {
      console.log('🔐 Starting Google login...');

      // Dynamic import of Firebase
      const { auth, googleProvider, signInWithPopup } =
        await import("../pages/firebase/firebase");
      const { getIdToken } = await import("firebase/auth");

      console.log('🔐 Opening Google sign-in popup...');
      const result = await signInWithPopup(auth, googleProvider);

      console.log('✅ Google popup successful');
      const firebaseUser = result.user;
      const idToken = await getIdToken(firebaseUser);

      // console.log('🔐 Sending token to backend...');

      // Send token to backend
      const response = await Axios.post("/auth/google", {
        idToken
      });

      console.log('✅ Backend authentication successful');

      // Fetch updated user data
      const userRes = await Axios.get("/auth/profile");
      setUser(userRes.data.data);

      console.log('🛒 Syncing cart...');

      // Sync cart
      setCartSyncing(true);
      try {
        await dispatch(syncCartOnLogin()).unwrap();
        await dispatch(fetchBackendCart()).unwrap();
      } catch (cartError) {
        console.error("Cart sync error:", cartError);
        // Don't fail login if cart sync fails
      }
      setCartSyncing(false);

      console.log('✅ Google login complete');

      return userRes.data.data;
    } catch (error) {
      console.error('❌ Google login error:', error);

      // Handle specific Firebase errors
      if (error.code === 'auth/popup-closed-by-user') {
        throw { message: "Sign-in cancelled" };
      }

      if (error.code === 'auth/popup-blocked') {
        throw { message: "Popup blocked. Please allow popups for this site." };
      }

      if (error.code === 'auth/network-request-failed') {
        throw { message: "Network error. Please check your connection." };
      }

      // Backend errors
      if (error.response?.data?.message) {
        throw { message: error.response.data.message };
      }

      throw { message: error.message || "Google login failed" };
    }
  };

  // ✅ Facebook Login
  const facebookLogin = async () => {
    try {
      const { auth, facebookProvider, signInWithPopup } =
        await import("../pages/firebase/firebase");
      const { getIdToken } = await import("firebase/auth");

      const result = await signInWithPopup(auth, facebookProvider);
      const firebaseUser = result.user;
      const idToken = await getIdToken(firebaseUser);

      await Axios.post("/auth/facebook", { idToken });

      const userRes = await Axios.get("/auth/profile");
      setUser(userRes.data.data);

      setCartSyncing(true);
      try {
        await dispatch(syncCartOnLogin()).unwrap();
        await dispatch(fetchBackendCart()).unwrap();
      } catch (cartError) {
        console.error("Cart sync error:", cartError);
      }
      setCartSyncing(false);

      return userRes.data.data;
    } catch (error) {
      console.error('❌ Facebook login error:', error);
      if (error.code === 'auth/popup-closed-by-user') throw { message: "Sign-in cancelled" };
      throw { message: error.response?.data?.message || "Facebook login failed" };
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await Axios.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear everything regardless of API success
      setUser(null);
      dispatch(clearCart());
      queryClient.clear();

      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        cartSyncing,
        sendPhoneOTP,
        verifyPhoneOTP,
        login,
        googleLogin,
        facebookLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};