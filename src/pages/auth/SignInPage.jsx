// src/pages/SignInPage.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInPage = () => {
  const [loginType, setLoginType] = useState("email"); // email | mobile
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, googleLogin, requestPhoneOtp, verifyPhoneOtpAndLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo =
  (location.state?.from && location.state.from.pathname) ||
  location.state?.from || // in case it's a string
  "/";


  /* ---------------- EMAIL LOGIN ---------------- */
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

  /* ---------------- MOBILE OTP ---------------- */
  const sendOtp = async () => {
    if (!mobile || mobile.length < 10) {
      toast.error("Enter valid mobile number");
      return;
    }

    setIsSubmitting(true);
    try {
      await requestPhoneOtp(mobile);
      setOtpSent(true);
      toast.success("OTP sent successfully");
    } catch (err) {
      toast.error(err?.message || "Failed to send OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      toast.error("Enter OTP");
      return;
    }

    setIsSubmitting(true);
    try {
      await verifyPhoneOtpAndLogin(mobile, otp);
      toast.success("Login successful");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Invalid OTP");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-pink-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white text-center py-6">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-sm opacity-90 mt-1">Log in to continue</p>
        </div>

        <div className="p-6 space-y-5">
          {/* Google */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl hover:bg-gray-50 transition"
          >
            <FcGoogle size={24} />
            <span className="text-gray-700 font-medium">
              Sign in with Google
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Login Type Tabs */}
          <div className="flex bg-pink-50 rounded-xl p-1">
            <button
              onClick={() => setLoginType("email")}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                loginType === "email"
                  ? "bg-white shadow text-pink-600"
                  : "text-gray-500"
              }`}
            >
              Email / Username
            </button>
            <button
              onClick={() => setLoginType("mobile")}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                loginType === "mobile"
                  ? "bg-white shadow text-pink-600"
                  : "text-gray-500"
              }`}
            >
              Mobile & OTP
            </button>
          </div>

          {/* Email Login */}
          {loginType === "email" && (
            <>
              <input
                type="text"
                placeholder="Email or Username"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-400"
              />

              <button
                onClick={handleCustomSignIn}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-400 text-white py-3 rounded-xl"
              >
                Sign In
              </button>
            </>
          )}

          {/* Mobile OTP */}
          {loginType === "mobile" && (
            <>
              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-400"
              />

              {otpSent && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-400"
                />
              )}

              <button
                onClick={otpSent ? verifyOtp : sendOtp}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-400 text-white py-3 rounded-xl"
              >
                {otpSent ? "Verify OTP" : "Send OTP"}
              </button>
            </>
          )}

          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-pink-500 font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SignInPage;
