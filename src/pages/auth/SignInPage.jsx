import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import OtpInput from "../../components/OtpInput";
import "react-toastify/dist/ReactToastify.css";

const SignInPage = () => {
  const [loginType, setLoginType] = useState("mobile");
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    login,
    googleLogin,
    sendPhoneOTP,
    verifyPhoneOTP,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || 
                     location.state?.from || 
                     new URLSearchParams(location.search).get('redirect') || 
                     "/";

  /* ---------------- EMAIL LOGIN ---------------- */
  const handleCustomSignIn = async () => {
    if (!emailOrUsername || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await login({
        email: emailOrUsername.includes("@") ? emailOrUsername : undefined,
        userName: !emailOrUsername.includes("@") ? emailOrUsername : undefined,
        password,
      });
      toast.success("Signed in successfully");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- PHONE OTP V2 ---------------- */
  const handleSendOTP = async () => {
    if (mobile.length !== 10) {
      toast.error("Enter valid 10 digit mobile number");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await sendPhoneOTP(`+91${mobile}`, sessionId);
      setSessionId(response.sessionId);
      setOtpSent(true);
      setTimer(30);
      toast.success(response.message || "OTP sent successfully");
    } catch (err) {
      toast.error(err?.message || "Failed to send OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!sessionId || otp.length !== 6) {
      toast.error("Please enter 6 digit OTP");
      return;
    }

    setIsSubmitting(true);
    try {
      await verifyPhoneOTP(sessionId, otp);
      toast.success("Login successful");
      
      // Clear OTP state
      setOtp("");
      setOtpSent(false);
      setSessionId(null);
      
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Invalid OTP");
      
      // If session expired, reset OTP flow
      if (err?.message?.includes("expired")) {
        setOtpSent(false);
        setSessionId(null);
        setOtp("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- GOOGLE LOGIN ---------------- */
  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      await googleLogin();
      toast.success("Signed in successfully");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- AUTO SUBMIT OTP ---------------- */
  useEffect(() => {
    if (otp.length === 6 && otpSent && sessionId) {
      handleVerifyOTP();
    }
  }, [otp, otpSent, sessionId]);

  /* ---------------- RESEND TIMER ---------------- */
  useEffect(() => {
    if (!otpSent || timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  /* ---------------- SMS AUTO READ ---------------- */
  useEffect(() => {
    if (!otpSent) return;

    if ("OTPCredential" in window) {
      const abortController = new AbortController();
      
      navigator.credentials
        .get({ 
          otp: { transport: ["sms"] },
          signal: abortController.signal 
        })
        .then((otpCred) => {
          if (otpCred?.code) {
            setOtp(otpCred.code);
          }
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            console.log("OTP auto-read not available:", err);
          }
        });

      return () => abortController.abort();
    }
  }, [otpSent]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-start justify-center p-4 pt-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 mt-6">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl mb-4 hover:bg-gray-50 transition disabled:opacity-50"
        >
          <FcGoogle size={24} /> Continue with Google
        </button>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 border-t"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 border-t"></div>
        </div>

        {/* Login Type Toggle */}
        <div className="flex bg-pink-50 rounded-xl p-1 mb-4">
          <button
            onClick={() => {
              setLoginType("mobile");
              setOtpSent(false);
              setOtp("");
            }}
            className={`flex-1 py-2 rounded-lg transition ${
              loginType === "mobile"
                ? "bg-white shadow text-pink-600"
                : "text-gray-500"
            }`}
          >
            Phone
          </button>
          <button
            onClick={() => setLoginType("email")}
            className={`flex-1 py-2 rounded-lg transition ${
              loginType === "email"
                ? "bg-white shadow text-pink-600"
                : "text-gray-500"
            }`}
          >
            Email
          </button>
        </div>

        {/* EMAIL LOGIN */}
        {loginType === "email" && (
          <>
            <input
              placeholder="Email or Username"
              className="w-full mb-3 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCustomSignIn()}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCustomSignIn()}
            />
            <button
              onClick={handleCustomSignIn}
              disabled={isSubmitting}
              className="w-full bg-pink-500 text-white py-3 rounded-xl hover:bg-pink-600 transition disabled:opacity-50"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
            
            <div className="text-center mt-3">
              <Link to="/forgot-password" className="text-sm text-pink-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
          </>
        )}

        {/* PHONE OTP LOGIN */}
        {loginType === "mobile" && (
          <>
            {!otpSent ? (
              <>
                <div className="flex items-center border rounded-xl px-3 focus-within:ring-2 focus-within:ring-pink-500">
                  <span className="font-semibold text-gray-700">+91</span>
                  <input
                    autoFocus
                    maxLength="10"
                    className="flex-1 px-3 py-3 outline-none"
                    placeholder="Mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendOTP()}
                  />
                </div>
                
                <button
                  onClick={handleSendOTP}
                  disabled={isSubmitting || mobile.length !== 10}
                  className="w-full bg-pink-500 text-white py-3 rounded-xl mt-4 hover:bg-pink-600 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Sending OTP..." : "Send OTP"}
                </button>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Enter OTP sent to +91{mobile}
                  </p>
                  <OtpInput value={otp} onChange={setOtp} />
                </div>

                <button
                  onClick={handleVerifyOTP}
                  disabled={isSubmitting || otp.length !== 6}
                  className="w-full bg-pink-500 text-white py-3 rounded-xl hover:bg-pink-600 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Verifying..." : "Verify OTP"}
                </button>

                <div className="text-center text-sm text-gray-500 mt-3">
                  {timer > 0 ? (
                    <p>Resend OTP in {timer}s</p>
                  ) : (
                    <button
                      onClick={handleSendOTP}
                      disabled={isSubmitting}
                      className="text-pink-500 font-semibold hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                    setSessionId(null);
                  }}
                  className="w-full text-gray-500 text-sm mt-2 hover:text-gray-700"
                >
                  Change Number
                </button>
              </>
            )}
          </>
        )}

        <p className="text-center text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-pink-500 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>

      <div id="sign-in-recaptcha-container"></div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SignInPage;