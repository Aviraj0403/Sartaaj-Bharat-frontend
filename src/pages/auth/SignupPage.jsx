import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaArrowRight, FaFacebook } from "react-icons/fa";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { googleLogin, facebookLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password || !form.userName) {
      toast.error("Username, Email, and Password are required for registration.");
      return;
    }

    setIsSubmitting(true);
    try {
      await Axios.post("/auth/register", form);
      toast.success("Account created. Welcome to the elite tier.");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration sequence failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialRegister = async (provider) => {
    setIsSubmitting(true);
    try {
      if (provider === 'google') await googleLogin();
      if (provider === 'facebook') await facebookLogin();
      toast.success("Identity Synchronized.");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err?.message || `${provider} synchronization failed`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create Identity"
      subtitle="Establish your profile in the Sartaaj Bharat global matrix."
    >
      <div className="space-y-8">
        {/* Social Matrix */}
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialRegister('google')}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3.5 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
          >
            <FcGoogle size={20} />
            <span className="text-white text-[10px] font-black uppercase tracking-widest">Google Sync</span>
          </motion.button>
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialRegister('facebook')}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3.5 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
          >
            <FaFacebook size={20} className="text-[#1877F2]" />
            <span className="text-white text-[10px] font-black uppercase tracking-widest">Facebook Sync</span>
          </motion.button>
        </div>

        {/* Divider Node */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-white/5"></div>
          <span className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em]">Direct Protocol</span>
          <div className="flex-1 h-px bg-white/5"></div>
        </div>

        {/* Form Module */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Username */}
            <div className="relative group col-span-1 md:col-span-2">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={14} />
              <input
                name="userName"
                placeholder="UNIQUE USERNAME"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-xs font-bold focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 tracking-widest"
                value={form.userName}
                onChange={handleChange}
                required
              />
            </div>

            {/* First Name */}
            <div className="relative group">
              <input
                name="firstName"
                placeholder="FIRST NAME"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white text-xs font-bold focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 tracking-widest"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>

            {/* Last Name */}
            <div className="relative group">
              <input
                name="lastName"
                placeholder="LAST NAME"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white text-xs font-bold focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 tracking-widest"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="relative group col-span-1 md:col-span-2">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={14} />
              <input
                name="email"
                type="email"
                placeholder="SECURE EMAIL"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-xs font-bold focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 tracking-widest"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={14} />
              <input
                name="password"
                type="password"
                placeholder="PASSWORD"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-xs font-bold focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 tracking-widest"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="relative group">
              <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={14} />
              <input
                name="phoneNumber"
                placeholder="MOBILE"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-xs font-bold focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 tracking-widest"
                value={form.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-500 transition-all shadow-[0_15px_30px_rgba(37,99,235,0.2)] disabled:opacity-50 flex items-center justify-center gap-3 group"
          >
            {isSubmitting ? "Processing..." : "Establish Identity"}
            <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Redirect */}
        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          Already established?{" "}
          <Link to="/signin" className="text-blue-500 font-black hover:text-blue-400 underline decoration-2 underline-offset-4">
            Initialize Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;