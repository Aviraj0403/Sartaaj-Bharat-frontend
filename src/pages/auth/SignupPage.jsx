import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import {
  FaUser, FaEnvelope, FaLock, FaPhone, FaFacebook,
  FaEye, FaEyeSlash,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import AuthLayout from "../../components/auth/AuthLayout";
import Axios from "../../utils/Axios";

const SignupPage = () => {
  const [form, setForm] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { googleLogin, facebookLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      setForm({ ...form, [name]: value.replace(/\D/g, "").slice(0, 10) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.userName.trim() || !form.email.trim() || !form.password.trim()) {
      toast.error("Username, Email and Password are required.");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (form.phoneNumber && form.phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      await Axios.post("/auth/register", form);
      toast.success("Account created! Welcome to Sartaaj Bharat 🎉");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialRegister = async (provider) => {
    setIsSubmitting(true);
    try {
      if (provider === "google") await googleLogin();
      if (provider === "facebook") await facebookLogin();
      toast.success("Registered successfully! 🎉");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err?.message || `${provider} signup failed. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Register on Sartaaj Bharat and enjoy exclusive offers."
    >
      <div className="space-y-7">
        {/* Social Signup */}
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialRegister("google")}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2.5 bg-white/5 border border-white/10 py-3.5 rounded-2xl hover:bg-white/10 transition-all"
          >
            <FcGoogle size={20} />
            <span className="text-white text-[11px] font-bold uppercase tracking-widest">
              Google
            </span>
          </motion.button>
          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialRegister("facebook")}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2.5 bg-white/5 border border-white/10 py-3.5 rounded-2xl hover:bg-white/10 transition-all"
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
          <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-widest whitespace-nowrap">
            or register directly
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="relative group">
            <FaUser
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
              size={14}
            />
            <input
              name="userName"
              placeholder="Username (e.g. rahul123)"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm font-medium focus:border-blue-500 outline-none transition-all placeholder:text-slate-500"
              value={form.userName}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <input
              name="firstName"
              placeholder="First Name"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white text-sm font-medium focus:border-blue-500 outline-none transition-all placeholder:text-slate-500"
              value={form.firstName}
              onChange={handleChange}
              autoComplete="given-name"
            />
            <input
              name="lastName"
              placeholder="Last Name"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white text-sm font-medium focus:border-blue-500 outline-none transition-all placeholder:text-slate-500"
              value={form.lastName}
              onChange={handleChange}
              autoComplete="family-name"
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <FaEnvelope
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
              size={14}
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm font-medium focus:border-blue-500 outline-none transition-all placeholder:text-slate-500"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <FaLock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
              size={14}
            />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password (min. 6 characters)"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white text-sm font-medium focus:border-blue-500 outline-none transition-all placeholder:text-slate-500"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            >
              {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
            </button>
          </div>

          {/* Phone */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-white/10 pr-3">
              <FaPhone className="text-slate-500" size={12} />
              <span className="text-white text-xs font-bold">+91</span>
            </div>
            <input
              name="phoneNumber"
              placeholder="Mobile Number (optional)"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-20 pr-4 text-white text-sm font-medium focus:border-blue-500 outline-none transition-all placeholder:text-slate-500"
              value={form.phoneNumber}
              onChange={handleChange}
              inputMode="numeric"
              autoComplete="tel"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm hover:bg-blue-500 transition-all shadow-lg shadow-blue-700/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? "Creating account..." : "Create Account →"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-500 font-bold hover:text-blue-400 underline decoration-2 underline-offset-4"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
