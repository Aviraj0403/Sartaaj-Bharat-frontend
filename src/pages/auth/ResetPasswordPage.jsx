import React, { useState } from "react";
import { FaLock, FaArrowRight, FaKey } from "react-icons/fa";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import AuthLayout from "../../components/auth/AuthLayout";
import Axios from "../../utils/Axios";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            toast.error("Invalid reset sequence. Token missing.");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Security tokens (passwords) do not match.");
            return;
        }

        setIsSubmitting(true);
        try {
            await Axios.post("/auth/reset-password", { token, password });
            toast.success("Security Credentials Updated. Re-initialize login.");
            navigate("/signin");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Reset sequence failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout
            title="Credential Reset"
            subtitle="Establish new security credentials for your elite profile."
        >
            <div className="space-y-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={14} />
                        <input
                            type="password"
                            placeholder="NEW ACCESS PASSWORD"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-xs font-bold focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 tracking-widest"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative group">
                        <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={14} />
                        <input
                            type="password"
                            placeholder="CONFIRM NEW PASSWORD"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-xs font-bold focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 tracking-widest"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-500 transition-all shadow-[0_15px_30px_rgba(37,99,235,0.2)] disabled:opacity-50 flex items-center justify-center gap-3 group"
                    >
                        {isSubmitting ? "Finalizing..." : "Update Credentials"}
                        <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                {/* Redirect */}
                <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Abort sequence?{" "}
                    <Link to="/signin" className="text-blue-500 font-black hover:text-blue-400 underline decoration-2 underline-offset-4">
                        Return to Login
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default ResetPasswordPage;
