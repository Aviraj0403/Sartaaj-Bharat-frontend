import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { fetchBackendCart, syncCartOnLogin } from "../features/cart/cartThunk";
import { setUser as setReduxUser, clearUser } from "../features/auth/authSlice";
import Axios from "../utils/Axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartSyncing, setCartSyncing] = useState(false);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // ────────────── LOGOUT HELPER ──────────────
  const performLogout = useCallback(async (callApi = true) => {
    if (callApi) {
      try {
        await Axios.post("/auth/logout");
      } catch (_) {
        // Ignore logout API errors — always clear local state
      }
    }
    setUser(null);
    dispatch(clearUser());
    dispatch(clearCart());
    queryClient.clear();
    Cookies.remove("userToken");
    localStorage.removeItem("persist:root");
    sessionStorage.clear();
  }, [dispatch, queryClient]);

  // ────────────── LISTEN FOR TOKEN EXPIRY ──────────────
  // The Axios interceptor fires this when refresh-token call also fails
  useEffect(() => {
    const handleForcedLogout = () => {
      console.warn("Session expired — logging out automatically.");
      performLogout(false); // Don't call API since we're already 401
    };

    window.addEventListener("auth:logout", handleForcedLogout);
    return () => window.removeEventListener("auth:logout", handleForcedLogout);
  }, [performLogout]);

  // ────────────── VALIDATE SESSION ON MOUNT ──────────────
  useEffect(() => {
    const validateSession = async () => {
      try {
        const res = await Axios.get("/auth/profile");
        setUser(res.data.data);
        dispatch(setReduxUser(res.data.data));

        setCartSyncing(true);
        await dispatch(fetchBackendCart()).unwrap();
      } catch (error) {
        // 401 = not logged in (expected). Any other error = log it.
        if (error.response?.status !== 401) {
          console.error("Session validation error:", error);
        }
        setUser(null);
        dispatch(clearUser());
      } finally {
        setLoading(false);
        setCartSyncing(false);
      }
    };

    validateSession();
  }, [dispatch]);

  // ────────────── PHONE OTP ──────────────
  const sendPhoneOTP = async (phoneNumber) => {
    try {
      const response = await Axios.post("/auth/phone/request-otp", { phoneNumber });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to send OTP" };
    }
  };

  const verifyPhoneOTP = async (phoneNumber, otp) => {
    try {
      const response = await Axios.post("/auth/phone/verify-otp", {
        phoneNumber,
        otp,
      });

      const token =
        response.data?.token ||
        response.data?.data?.token ||
        response.data?.data?.accessToken;
      if (token) Cookies.set("userToken", token, { expires: 7 });

      // Call profile with the new token explicitly in header to avoid race conditions
      const userRes = await Axios.get("/auth/profile", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setUser(userRes.data.data);
      dispatch(setReduxUser(userRes.data.data));

      setCartSyncing(true);
      try {
        await dispatch(syncCartOnLogin()).unwrap();
        await dispatch(fetchBackendCart()).unwrap();
      } catch (_) {}
      setCartSyncing(false);

      return userRes.data.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to verify OTP" };
    }
  };

  // ────────────── EMAIL / USERNAME LOGIN ──────────────
  const login = async (credentials) => {
    try {
      const response = await Axios.post("/auth/login", credentials);

      const token =
        response.data?.token ||
        response.data?.data?.token ||
        response.data?.data?.accessToken;
      if (token) Cookies.set("userToken", token, { expires: 7 });

      const res = await Axios.get("/auth/profile", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setUser(res.data.data);
      dispatch(setReduxUser(res.data.data));

      setCartSyncing(true);
      try {
        await dispatch(syncCartOnLogin()).unwrap();
        await dispatch(fetchBackendCart()).unwrap();
      } catch (_) {}
      setCartSyncing(false);

      return res.data.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  };

  // ────────────── GOOGLE LOGIN ──────────────
  const googleLogin = async () => {
    try {
      const { auth, googleProvider, signInWithPopup } =
        await import("../pages/firebase/firebase");
      const { getIdToken } = await import("firebase/auth");

      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await getIdToken(result.user);

      const response = await Axios.post("/auth/google", { idToken });

      const token =
        response.data?.token ||
        response.data?.data?.token ||
        response.data?.data?.accessToken;
      if (token) Cookies.set("userToken", token, { expires: 7 });

      const userRes = await Axios.get("/auth/profile", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setUser(userRes.data.data);
      dispatch(setReduxUser(userRes.data.data));

      setCartSyncing(true);
      try {
        await dispatch(syncCartOnLogin()).unwrap();
        await dispatch(fetchBackendCart()).unwrap();
      } catch (_) {}
      setCartSyncing(false);

      return userRes.data.data;
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user")
        throw { message: "Sign-in cancelled" };
      if (error.code === "auth/popup-blocked")
        throw { message: "Popup blocked. Please allow popups for this site." };
      if (error.code === "auth/network-request-failed")
        throw { message: "Network error. Please check your connection." };
      if (error.response?.data?.message)
        throw { message: error.response.data.message };
      throw { message: error.message || "Google login failed" };
    }
  };

  // ────────────── FACEBOOK LOGIN ──────────────
  const facebookLogin = async () => {
    try {
      const { auth, facebookProvider, signInWithPopup } =
        await import("../pages/firebase/firebase");
      const { getIdToken } = await import("firebase/auth");

      const result = await signInWithPopup(auth, facebookProvider);
      const idToken = await getIdToken(result.user);

      const response = await Axios.post("/auth/facebook", { idToken });

      const token =
        response.data?.token ||
        response.data?.data?.token ||
        response.data?.data?.accessToken;
      if (token) Cookies.set("userToken", token, { expires: 7 });

      const userRes = await Axios.get("/auth/profile", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setUser(userRes.data.data);
      dispatch(setReduxUser(userRes.data.data));

      setCartSyncing(true);
      try {
        await dispatch(syncCartOnLogin()).unwrap();
        await dispatch(fetchBackendCart()).unwrap();
      } catch (_) {}
      setCartSyncing(false);

      return userRes.data.data;
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user")
        throw { message: "Sign-in cancelled" };
      throw {
        message: error.response?.data?.message || "Facebook login failed",
      };
    }
  };

  // ────────────── LOGOUT ──────────────
  const logout = () => performLogout(true);

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
