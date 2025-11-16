// src/pages/SignInPage.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/";

  const handleCustomSignIn = async () => {
    if (!emailOrUsername || !password) {
      toast.error("Please fill both fields");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      email: emailOrUsername.includes("@") ? emailOrUsername : undefined,
      userName: !emailOrUsername.includes("@") ? emailOrUsername : undefined,
      password,
    };

    try {
      await login(payload);
      toast.success("Signed in successfully");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      await googleLogin();
      toast.success("Google sign-in successful");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google sign-in failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isSubmitting) handleCustomSignIn();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-pink-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white text-center py-6">
          <h2 className="text-3xl font-bold tracking-wide">Welcome Back</h2>
          <p className="text-sm opacity-90 mt-1">Log in to continue</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Google Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition disabled:opacity-70"
          >
            <FcGoogle size={24} />
            <span className="text-gray-700 font-medium">Sign in with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Email or Username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition"
            />
          </div>

          <button
            onClick={handleCustomSignIn}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-pink-500 to-pink-400 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition disabled:opacity-70"
          >
            {isSubmitting ? "Signing In…" : "Sign In"}
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-pink-500 font-semibold hover:text-pink-600">
              Register
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default SignInPage;