import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaPhone, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import AuthLayout from "../../components/auth/AuthLayout";
import OtpInput from "../../components/OtpInput";

const SignInPage = () => {
  const [loginType, setLoginType] = useState("mobile");
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, googleLogin, facebookLogin, sendPhoneOTP, verifyPhoneOTP } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo =
    location.state?.from?.pathname ||
    location.state?.from ||
    new URLSearchParams(location.search).get("redirect") ||
    "/";

  const handleCustomSignIn = async (e) => {
    e?.preventDefault();
    if (!emailOrUsername.trim() || !password.trim()) {
      toast.error("Please enter your email/username and password.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setIsSubmitting(true);
    try {
      await login({
        email: emailOrUsername.includes("@") ? emailOrUsername : undefined,
        userName: !emailOrUsername.includes("@") ? emailOrUsername : undefined,
        password,
      });
      toast.success("Login successful! Welcome back 🎉");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Incorrect email or password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendOTP = async () => {
    if (mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    setIsSubmitting(true);
    try {
      await sendPhoneOTP(`+91${mobile}`);
      setOtpSent(true);
      setTimer(30);
      toast.success("OTP sent to your mobile number.");
    } catch (err) {
      toast.error(err?.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }
    setIsSubmitting(true);
    try {
      await verifyPhoneOTP(`+91${mobile}`, otp);
      toast.success("Login successful! 🎉");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Invalid OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsSubmitting(true);
    try {
      if (provider === "google") await googleLogin();
      if (provider === "facebook") await facebookLogin();
      toast.success("Logged in successfully! Welcome 🎉");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || `${provider} login failed. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (otp.length === 6 && otpSent && !isSubmitting) {
      handleVerifyOTP();
    }
  }, [otp]);

  useEffect(() => {
    if (!otpSent || timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  return (
    <AuthLayout
      title="Login to Your Account"
      subtitle="Welcome back! Sign in to continue shopping."
    >
      <div className="space-y-8">
        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialLogin("google")}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2.5 bg-white/5 border border-white/10 py-3.5 rounded-2xl hover:bg-white/10 transition-all duration-300"
          >
            <FcGoogle size={20} />
            <span className="text-white text-[11px] font-bold uppercase tracking-widest">
              Google
            </span>
          </motion.button>
          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialLogin("facebook")}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2.5 bg-white/5 border border-white/10 py-3.5 rounded-2xl hover:bg-white/10 transition-all duration-300"
          >
            <FaFacebook size={20} className="text-[#1877F2]" />
            <span className="text-white text-[11px] font-bold uppercase tracking-widest">
              Facebook
            </span>
          </motion.button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-widest">
            or continue with
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Login Type Toggle */}
        <div className="flex bg-slate-950/50 p-1.5 rounded-2xl border border-white/5 relative overflow-hidden">
          <motion.div
            className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-blue-600 rounded-xl"
            animate={{ x: loginType === "mobile" ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button
            onClick={() => { setLoginType("mobile"); setOtpSent(false); }}
            className={`flex-1 py-2.5 rounded-xl z-10 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${loginType === "mobile" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
          >
            📱 Mobile OTP
          </button>
          <button
            onClick={() => setLoginType("email")}
            className={`flex-1 py-2.5 rounded-xl z-10 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${loginType === "email" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
          >
            ✉️ Email
          </button>
        </div>

        {/* Form */}
        <div className="min-h-[220px]">
          <AnimatePresence mode="wait">
            {loginType === "email" ? (
              <motion.form
                key="email-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleCustomSignIn}
                className="space-y-4"
              >
                <div className="relative group">
                  <FaUser
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
                    size={14}
                  />
                  <input
                    placeholder="Email or Username"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm font-medium focus:border-blue-500 outline-none transition-all placeholder:text-slate-500"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    autoComplete="username"
                  />
                </div>

                <div className="relative group">
                  <FaLock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
                    size={14}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white text-sm font-medium focus:border-blue-500 outline-none transition-all placeholder:text-slate-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                  </button>
                </div>

                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-xs text-slate-500 hover:text-blue-400 transition-colors font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm hover:bg-blue-500 transition-all shadow-lg shadow-blue-700/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Signing in..." : "Login →"}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="mobile-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                {!otpSent ? (
                  <div className="space-y-4">
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-white/10 pr-3">
                        <FaPhone className="text-slate-500" size={12} />
                        <span className="text-white text-xs font-bold">+91</span>
                      </div>
                      <input
                        maxLength="10"
                        placeholder="Enter your mobile number"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-20 pr-4 text-white text-sm font-medium focus:border-blue-500 outline-none transition-all placeholder:text-slate-500"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                        inputMode="numeric"
                      />
                    </div>
                    <button
                      onClick={handleSendOTP}
                      disabled={isSubmitting || mobile.length !== 10}
                      className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm hover:bg-blue-500 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Sending OTP..." : "Send OTP →"}
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <p className="text-sm text-slate-400 font-medium mb-1">
                        OTP sent to: <span className="text-white font-bold">+91 {mobile}</span>
                      </p>
                      <p className="text-xs text-slate-600">Enter the 6-digit OTP below</p>
                    </div>
                    <OtpInput value={otp} onChange={setOtp} />

                    <button
                      onClick={handleVerifyOTP}
                      disabled={isSubmitting || otp.length !== 6}
                      className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm hover:bg-blue-500 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Verifying OTP..." : "Verify & Login →"}
                    </button>

                    <div className="flex flex-col items-center gap-3">
                      {timer > 0 ? (
                        <span className="text-xs text-slate-500 font-medium">
                          Resend OTP in {timer}s
                        </span>
                      ) : (
                        <button
                          onClick={handleSendOTP}
                          className="text-xs text-blue-500 font-bold hover:text-blue-400 underline"
                        >
                          Resend OTP
                        </button>
                      )}
                      <button
                        onClick={() => setOtpSent(false)}
                        className="text-xs text-slate-600 hover:text-slate-300 transition-colors font-medium"
                      >
                        Change Mobile Number
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="text-center space-y-3">
          <p className="text-sm text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 font-bold hover:text-blue-400 underline decoration-2 underline-offset-4"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
