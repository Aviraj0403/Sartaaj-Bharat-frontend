import React from "react";
import { motion } from "framer-motion";

const LegalLayout = ({ title, lastUpdated, children }) => {
    return (
        <div className="min-h-screen bg-slate-950 py-12 md:py-24 relative overflow-hidden selection:bg-blue-600 selection:text-white">
            {/* Background Intelligence */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header Node */}
                    <header className="mb-16 text-center md:text-left">
                        <div className="inline-flex items-center gap-3 bg-blue-600/10 border border-blue-500/20 px-4 py-2 rounded-full mb-6">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></div>
                            <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.4em]">Sartaaj Intelligence Protocol</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-4 leading-none">
                            {title.split(' ').map((word, i) => (
                                <span key={i} className={i === 0 ? "" : "text-blue-500 ml-2"}>{word}</span>
                            ))}
                        </h1>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center md:justify-start gap-2">
                            Status: <span className="text-green-500">Active</span>
                            <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
                            Last Revision: <span className="text-slate-300">{lastUpdated}</span>
                        </p>
                    </header>

                    {/* Document Content */}
                    <div className="glass-surface p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600/50 via-indigo-600/50 to-blue-600/50"></div>

                        <div className="prose prose-invert prose-slate max-w-none 
              prose-headings:font-black prose-headings:italic prose-headings:tracking-tight prose-headings:uppercase prose-headings:text-white
              prose-h2:text-2xl prose-h2:border-l-4 prose-h2:border-blue-600 prose-h2:pl-6 prose-h2:mt-12
              prose-p:text-slate-400 prose-p:text-sm prose-p:leading-relaxed prose-p:font-medium
              prose-ul:text-slate-400 prose-ul:text-sm prose-li:mb-2
              prose-strong:text-white prose-strong:font-black
            ">
                            {children}
                        </div>
                    </div>

                    {/* Footer Acknowledgment */}
                    <footer className="mt-12 text-center md:text-left">
                        <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.5em] italic">
                            Authorized by Sartaaj Bharat Legal Division &copy; 2026
                        </p>
                    </footer>
                </motion.div>
            </div>
        </div>
    );
};

export default LegalLayout;
