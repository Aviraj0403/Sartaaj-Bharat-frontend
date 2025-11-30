// src/context/AuthContext.jsx
import React , { createContext, useContext, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { fetchBackendCart, syncCartOnLogin } from "../features/cart/cartThunk";
import Axios from "../utils/Axios";

// Firebase imports
import {
  auth,
  googleProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "../pages/firebase/firebase";
import { getIdToken } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartSyncing, setCartSyncing] = useState(false);
  const [verificationId, setVerificationId] = useState(null);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    const validateSession = async () => {
      try {
        const res = await Axios.get("/auth/me");
        setUser(res.data.data);
        
        setCartSyncing(true);
        await dispatch(fetchBackendCart()).unwrap();
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
        setCartSyncing(false);
      }
    };
    validateSession();
  }, [dispatch]);

  // ✅ Custom email/password login
  const login = async (credentials) => {
    await Axios.post("/auth/signIn", credentials, { withCredentials: true });
    const res = await Axios.get("/auth/me");
    setUser(res.data.data);
    // dispatch(clearCart());
    setCartSyncing(true);
    await dispatch(syncCartOnLogin()).unwrap();
    dispatch(fetchBackendCart()).unwrap();
    setCartSyncing(false);
    return res.data.data;
  };

  // ✅ Google login
  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;
    const idToken = await getIdToken(firebaseUser);

    await Axios.post("/auth/googleSignIn", { idToken: idToken }, { withCredentials: true });
    const res = await Axios.get("/auth/me");
    setUser(res.data.data);
    setCartSyncing(true);
    await dispatch(syncCartOnLogin()).unwrap();
    dispatch(fetchBackendCart()).unwrap();
    setCartSyncing(false);
    return res.data.data;
  };
  const sendOtp = async (phoneNumber) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "sign-in-recaptcha-container",
        { size: "invisible" }
      );
    }
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
    setVerificationId(confirmationResult.verificationId);
    return confirmationResult.verificationId;
  };
  const verifyOtp = async (otp) => {
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    const result = await signInWithCredential(auth, credential);
    const firebaseUser = result.user;
    const idToken = await getIdToken(firebaseUser);

    await Axios.post("/auth/register/phone", { token: idToken }, { withCredentials: true });
    const res = await Axios.get("/auth/me");
    setUser(res.data.data);

    setCartSyncing(true);
    await dispatch(syncCartOnLogin()).unwrap();
    setCartSyncing(false);
    return res.data.data;
  };
  const logout = async () => {
    await Axios.post("/auth/user/logout", {}, { withCredentials: true });
    localStorage.removeItem('authToken');
    localStorage.removeItem('jwt');
    dispatch(clearCart());
    setUser(null);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        cartSyncing,
        login,
        googleLogin,
        sendOtp,
        verifyOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
