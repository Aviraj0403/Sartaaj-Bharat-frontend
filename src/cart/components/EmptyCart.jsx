import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-10 sm:p-20 text-center relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-50/50 blur-3xl -ml-10 -mt-10 rounded-full"></div>
      <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 relative z-10 shadow-sm">
        <ShoppingBag size={40} strokeWidth={1.5} className="text-slate-300" />
      </div>
      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 tracking-tighter uppercase italic">
        Cart is Empty
      </h3>
      <p className="text-slate-400 text-sm sm:text-base font-medium mb-10 max-w-xs mx-auto leading-relaxed">
        Your elite collection is currently vacant. Discover our premium artifacts.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-3 px-10 py-4 bg-slate-950 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all duration-500 shadow-2xl shadow-blue-600/10 italic group"
      >
        Explore Collection <ArrowRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}
