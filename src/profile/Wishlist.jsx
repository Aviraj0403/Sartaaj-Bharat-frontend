import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, ShoppingCart, Sparkles, ArrowLeft, Loader2, Search, ArrowRight } from "lucide-react";
import { useWishlist } from "../hooks";
import ProductCard from "../components/Product/ProductCard";

export default function Wishlist() {
  const { wishlist, isLoading, clearWishlist } = useWishlist();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full mb-6"
        />
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 italic">Accessing Intelligence Bank...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 md:py-24 font-sans selection:bg-blue-600 selection:text-white">
      <div className="container-custom px-4">

        {/* Header - Elite Gallery Essence */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
          <div>
            <div className="flex items-center gap-4 text-blue-600 font-black text-[10px] uppercase tracking-[0.5em] mb-6 italic">
              <Sparkles size={14} /> Intelligence Bank
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter italic leading-none">
              Elite <span className="text-blue-600 underline underline-offset-[16px] decoration-8">Collection</span>
            </h1>
          </div>

          {wishlist?.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearWishlist}
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-red-500 transition-colors group italic"
            >
              <Trash2 size={18} className="group-hover:rotate-12 transition-transform" /> Vaporize Selection
            </motion.button>
          )}
        </header>

        <AnimatePresence mode="wait">
          {wishlist?.length > 0 ? (
            <motion.div
              key="gallery-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
            >
              {wishlist.map((item, idx) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
                  className="group relative"
                >
                  <ProductCard product={item.productId} />
                  {/* Elite Overlay Tag */}
                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <span className="bg-white/80 backdrop-blur-md text-blue-600 text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm border border-white/50 italic opacity-0 group-hover:opacity-100 transition-opacity">
                      Authorized Item
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-48 glass-surface rounded-[4rem] border border-slate-100 border-dashed relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl border border-slate-50 group">
                  <Heart size={36} className="text-slate-200 group-hover:text-red-400 transition-colors" strokeWidth={3} />
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter italic">Intelligence Bank Restricted</h3>
                <p className="text-slate-400 font-medium text-xl mb-12 max-w-sm mx-auto italic leading-relaxed">No high-fidelity artifacts have been authorized for your elite collection yet.</p>
                <Link to="/" className="btn-premium px-12 py-5 inline-flex items-center gap-4">
                  <Search size={20} /> Inspect Gallery
                </Link>
              </div>
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-slate-900/5 blur-[80px] rounded-full -ml-24 -mb-24"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wishlist Recommendation Strip */}
        {wishlist?.length > 0 && (
          <div className="mt-40 pt-24 border-t border-slate-100 text-center">
            <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.6em] mb-4 block italic">Next Step</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 italic tracking-tighter mb-10">Authorize Transaction?</h2>
            <button
              onClick={() => navigate('/cart')}
              className="btn-premium px-16 py-6 text-sm flex items-center gap-4 mx-auto group"
            >
              Proceed to Checkout <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
