import React, { useState } from "react";
import { FaEnvelope, FaArrowRight, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import AuthLayout from "../../components/auth/AuthLayout";
import Axios from "../../utils/Axios";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please provide your registered email identifier.");
            return;
        }

        setIsSubmitting(true);
        try {
            await Axios.post("/auth/forgot-password", { email });
            setIsSent(true);
            toast.success("Recovery sequence initiated. Check your encrypted mail.");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Recovery initialization failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout
            title="Access Recovery"
            subtitle="Initiate the secure protocol to regain entry to your profile."
        >
            <div className="space-y-8">
                {!isSent ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={14} />
                            <input
                                type="email"
                                placeholder="REGISTERED SECURE EMAIL"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-xs font-bold focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 tracking-widest"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-500 transition-all shadow-[0_15px_30px_rgba(37,99,235,0.2)] disabled:opacity-50 flex items-center justify-center gap-3 group"
                        >
                            {isSubmitting ? "Initiating..." : "Request Recovery Link"}
                            <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-6"
                    >
                        <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto border border-blue-500/30">
                            <FaShieldAlt size={32} className="text-blue-500" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-white text-lg font-black italic uppercase tracking-tight">Recovery Sent</h3>
                            <p className="text-slate-400 text-xs font-medium tracking-wide leading-relaxed">
                                An encrypted recovery link has been dispatched to <span className="text-blue-400 font-bold">{email}</span>. Please verify your inbox.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsSent(false)}
                            className="text-[10px] text-slate-500 font-black uppercase tracking-widest hover:text-white transition-colors"
                        >
                            Request Again
                        </button>
                    </motion.div>
                )}

                {/* Redirect */}
                <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Remembered credentials?{" "}
                    <Link to="/signin" className="text-blue-500 font-black hover:text-blue-400 underline decoration-2 underline-offset-4">
                        Return to Login
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;
