import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaEnvelope, FaPhone, FaArrowRight, FaLock, FaUser } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import AuthLayout from "../../components/auth/AuthLayout";
import OtpInput from "../../components/OtpInput";

const SignInPage = () => {
  const [loginType, setLoginType] = useState("mobile"); // 'mobile' or 'email'
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    login,
    googleLogin,
    facebookLogin,
    sendPhoneOTP,
    verifyPhoneOTP,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname ||
    location.state?.from ||
    new URLSearchParams(location.search).get('redirect') ||
    "/";

  /* ---------------- LOGIC HANDLERS ---------------- */

  const handleCustomSignIn = async (e) => {
    e?.preventDefault();
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
      toast.success("Identity Verified. Welcome back.");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendOTP = async () => {
    if (mobile.length !== 10) {
      toast.error("Valid 10-digit mobile required");
      return;
    }

    setIsSubmitting(true);
    try {
      await sendPhoneOTP(`+91${mobile}`);
      setOtpSent(true);
      setTimer(30);
      toast.success("Nexus Access Key (OTP) sent.");
    } catch (err) {
      toast.error(err?.message || "OTP initialization failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error("Enter 6-digit Access Key");
      return;
    }

    setIsSubmitting(true);
    try {
      await verifyPhoneOTP(`+91${mobile}`, otp);
      toast.success("Access Granted.");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Invalid Access Key");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsSubmitting(true);
    try {
      if (provider === 'google') await googleLogin();
      if (provider === 'facebook') await facebookLogin();
      toast.success("Synchronized successfully.");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || `${provider} authentication failed`);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- AUTO EFFECTS ---------------- */

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
      title="Elite Authentication"
      subtitle="Verify your identity to access the Sartaaj Repository."
    >
      <div className="space-y-8">
        {/* Social Authentication Matrix */}
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialLogin('google')}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3.5 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
          >
            <FcGoogle size={20} />
            <span className="text-white text-[10px] font-black uppercase tracking-widest">Google</span>
          </motion.button>
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialLogin('facebook')}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3.5 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
          >
            <FaFacebook size={20} className="text-[#1877F2]" />
            <span className="text-white text-[10px] font-black uppercase tracking-widest">Facebook</span>
          </motion.button>
        </div>

        {/* Divider Node */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-white/5"></div>
          <span className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em]">Identity Matrix</span>
          <div className="flex-1 h-px bg-white/5"></div>
        </div>

        {/* Protocol Selection Toggle */}
        <div className="flex bg-slate-950/50 p-1.5 rounded-2xl border border-white/5 relative overflow-hidden">
          <motion.div
            layoutId="active-toggle"
            className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-blue-600 rounded-xl"
            animate={{ x: loginType === 'mobile' ? 0 : '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button
            onClick={() => { setLoginType("mobile"); setOtpSent(false); }}
            className={`flex-1 py-2.5 rounded-xl z-10 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${loginType === "mobile" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
          >
            Neural Phone
          </button>
          <button
            onClick={() => setLoginType("email")}
            className={`flex-1 py-2.5 rounded-xl z-10 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${loginType === "email" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
          >
            Secure Email
          </button>
        </div>

        {/* Dynamic Form Module */}
        <div className="min-h-[220px]">
          <AnimatePresence mode="wait">
            {loginType === "email" ? (
              <motion.div
                key="email-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="relative group">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={14} />
                  <input
                    placeholder="EMAIL OR NEURAL ID"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-xs font-bold focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 tracking-widest"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                  />
                </div>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={14} />
                  <input
                    type="password"
                    placeholder="ACCESS PASSWORD"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-xs font-bold focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 tracking-widest"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleCustomSignIn}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-500 transition-all shadow-[0_15px_30px_rgba(37,99,235,0.2)] disabled:opacity-50 flex items-center justify-center gap-3 group"
                >
                  {isSubmitting ? "Authenticating..." : "Initialize Access"}
                  <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="mobile-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {!otpSent ? (
                  <div className="space-y-4">
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-white/10 pr-3">
                        <FaPhone className="text-slate-500 group-focus-within:text-blue-500 transition-colors" size={12} />
                        <span className="text-white text-[10px] font-black tracking-widest">+91</span>
                      </div>
                      <input
                        maxLength="10"
                        placeholder="ENTER NEURAL PHONE"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-20 pr-4 text-white text-xs font-bold focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 tracking-widest"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                      />
                    </div>
                    <button
                      onClick={handleSendOTP}
                      disabled={isSubmitting || mobile.length !== 10}
                      className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-500 transition-all shadow-[0_15px_30px_rgba(37,99,235,0.2)] disabled:opacity-50 flex items-center justify-center gap-3 group"
                    >
                      {isSubmitting ? "Requesting..." : "Request Access Key"}
                      <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4">
                        Key sent to Neural ID +91{mobile}
                      </p>
                      <OtpInput value={otp} onChange={setOtp} />
                    </div>

                    <button
                      onClick={handleVerifyOTP}
                      disabled={isSubmitting || otp.length !== 6}
                      className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-500 transition-all shadow-[0_15px_30px_rgba(37,99,235,0.2)] disabled:opacity-50 flex items-center justify-center gap-3 group"
                    >
                      {isSubmitting ? "Verifying..." : "Verify Access Key"}
                      <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex flex-col items-center gap-4">
                      {timer > 0 ? (
                        <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest italic">
                          New Key available in {timer}s
                        </span>
                      ) : (
                        <button
                          onClick={handleSendOTP}
                          className="text-[9px] text-blue-500 font-black uppercase tracking-widest underline hover:text-blue-400"
                        >
                          Request New Access Key
                        </button>
                      )}
                      <button
                        onClick={() => setOtpSent(false)}
                        className="text-[9px] text-slate-500 font-black uppercase tracking-widest hover:text-slate-300 transition-colors"
                      >
                        Change Identification ID
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Redirect Strip */}
        <div className="text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            New to the Matrix?{" "}
            <Link to="/signup" className="text-blue-500 font-black hover:text-blue-400 underline decoration-2 underline-offset-4">
              Register Account
            </Link>
          </p>
          <div className="mt-4">
            <Link to="/forgot-password" className="text-[9px] text-slate-600 font-bold uppercase tracking-widest hover:text-blue-500 transition-colors">
              Loss of Access Permission?
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignInPage;