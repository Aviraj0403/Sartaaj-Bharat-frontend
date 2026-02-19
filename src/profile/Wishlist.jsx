import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, ShoppingCart, Sparkles, ArrowLeft, Loader2 } from "lucide-react";
import { useWishlist } from "../hooks";
import ProductCard from "../components/Product/ProductCard";

export default function Wishlist() {
  const { wishlist, isLoading, clearWishlist } = useWishlist();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-6" strokeWidth={3} />
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 italic">Syncing Collection...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
        <div>
          <div className="flex items-center gap-4 text-blue-600 font-black text-[10px] uppercase tracking-[0.5em] mb-6 italic">
            <Sparkles size={14} /> Intelligence Bank
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter italic">
            Your <span className="text-blue-600 underline underline-offset-[12px] decoration-4">Collection</span>
          </h1>
        </div>

        {wishlist?.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearWishlist}
            className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-red-500 transition-colors group italic"
          >
            <Trash2 size={16} className="group-hover:rotate-12 transition-transform" /> Vaporize All
          </motion.button>
        )}
      </header>

      <AnimatePresence mode="wait">
        {wishlist?.length > 0 ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
          >
            {wishlist.map((item, idx) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <ProductCard product={item.productId} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-48 bg-slate-50/50 rounded-[3rem] border border-slate-100 border-dashed"
          >
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl border border-slate-100">
              <Heart size={32} className="text-slate-200" strokeWidth={3} />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter italic">Vault is Empty</h3>
            <p className="text-slate-400 font-medium text-lg mb-12 max-w-sm mx-auto">No artifacts have been authorized for your elite collection yet.</p>
            <Link to="/" className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-600 shadow-2xl transition-all italic">
              <ArrowLeft size={14} strokeWidth={3} /> Return to Lounge
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
