import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.03)] border border-gray-50 p-12 sm:p-24 text-center relative overflow-hidden"
    >
      <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
        <ShoppingBag size={32} strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
        Your Cart is Empty
      </h3>
      <p className="text-slate-400 text-sm sm:text-base font-medium mb-12 max-w-xs mx-auto leading-relaxed">
        Explore our curated collection and find something remarkable today.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-slate-200 group"
      >
        Start Exploring <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}
