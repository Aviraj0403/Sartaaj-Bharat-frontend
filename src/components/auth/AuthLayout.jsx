import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-[calc(100vh-200px)] bg-slate-950 flex items-center justify-center p-4 py-20 relative overflow-hidden font-inter">
            {/* Background Intelligence - Animated Blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full -translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />

            {/* Main Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-xl relative z-10"
            >
                {/* Elite Branding Node */}
                <div className="flex flex-col items-center mb-10">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-[0_20px_40px_rgba(37,99,235,0.3)] mb-6 group relative"
                    >
                        <ShieldCheck size={40} className="text-white group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute -top-2 -right-2 bg-slate-900 border border-blue-500/30 p-1.5 rounded-xl text-blue-400 shadow-xl animate-bounce">
                            <Sparkles size={14} />
                        </div>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-white text-3xl font-black italic tracking-tighter text-center uppercase"
                    >
                        Sartaaj <span className="text-blue-500">Bharat</span>
                    </motion.h1>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="h-1 w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-2 rounded-full"
                    />
                </div>

                {/* Content Matrix (Glass Surface) */}
                <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
                    <div className="p-8 sm:p-12">
                        <div className="mb-10">
                            <h2 className="text-2xl sm:text-3xl font-black text-white italic tracking-tight mb-2 uppercase">
                                {title}
                            </h2>
                            <p className="text-slate-400 font-medium text-sm tracking-wide">
                                {subtitle}
                            </p>
                        </div>

                        {children}
                    </div>

                    {/* Bottom Nexus Strip */}
                    <div className="bg-white/5 border-t border-white/5 py-4 px-8 text-center">
                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">
                            Secured by Sartaaj Intelligence Matrix &copy; 2026
                        </span>
                    </div>
                </div>

                {/* Floating Support Info */}
                <div className="mt-8 flex justify-center gap-8">
                    <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-blue-500 transition-colors">Digital Privacy</button>
                    <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-blue-500 transition-colors">Protocols</button>
                    <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-blue-500 transition-colors">Elite Support</button>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthLayout;
