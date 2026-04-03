import React from "react";
import { Minus, Plus, X, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { getProductUrl } from "../../utils/navigation";

export default function CartItem({
  item,
  idx,
  navigate,
  handleDecrement,
  handleIncrement,
  handleRemoveItem,
}) {
  const itemPrice = item.price || 0;
  const itemTotal = itemPrice * (item.quantity || 1);

  const productUrl = getProductUrl(item);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, scale: 0.98 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white/70 backdrop-blur-lg rounded-[1.5rem] border border-white/40 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500 overflow-hidden group/card relative"
    >
      {/* Subtle Technical Grid Overlay for that Elite feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50"></div>

      <div className="flex flex-row items-stretch min-h-[140px] relative z-10">
        {/* Image Panel - Now more compact on mobile */}
        <div
          onClick={() => navigate(productUrl)}
          className="w-28 xs:w-32 sm:w-44 h-auto bg-slate-50/50 flex-shrink-0 cursor-pointer overflow-hidden relative border-r border-white/40"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain p-4 group-hover/card:scale-105 transition-transform duration-700"
            onError={(e) => {
              const fallback = "https://via.placeholder.com/200?text=Premium+Item";
              if (e.target.src !== fallback) {
                e.target.src = fallback;
              }
            }}
          />
          {/* Active Status Pulse */}
          <div className="absolute top-3 left-3">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse shadow-[0_0_8px_#2563eb]"></div>
          </div>
        </div>

        {/* Info Panel - Compact and Clean */}
        <div className="flex-1 p-3 sm:p-5 flex flex-col justify-between min-w-0">
          <div className="relative">
            {/* Remove Icon */}
            <button
              onClick={() => handleRemoveItem(item.id, item.size, item.color)}
              className="absolute -top-1 -right-1 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50/50 rounded-xl transition-all active:scale-90"
              title="Remove"
            >
              <X size={16} strokeWidth={2.5} />
            </button>

            {/* Meta Info */}
            <div className="pr-8">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[8px] sm:text-[9px] font-black text-blue-600 uppercase tracking-[0.3em] italic">
                   {item.brand || "PREMIUM BRAND"}
                </span>
                <div className="h-[1px] w-4 bg-blue-600/20"></div>
              </div>
              <h2
                onClick={() => navigate(productUrl)}
                className="text-sm sm:text-lg font-black text-slate-900 line-clamp-1 hover:text-blue-600 cursor-pointer transition-colors tracking-tighter mb-2"
              >
                {item.name}
              </h2>

              {/* Tags UI */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                <div className="flex items-center gap-1.5 px-2 py-0.5 sm:py-1 bg-white/50 border border-white/60 text-slate-500 text-[8px] sm:text-[9px] font-black uppercase tracking-widest rounded-lg italic shadow-sm">
                  <Tag size={10} className="text-blue-500" />
                  {item.size || "STD"}
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 sm:py-1 bg-white/50 border border-white/60 text-slate-500 text-[8px] sm:text-[9px] font-black uppercase tracking-widest rounded-lg italic shadow-sm">
                  <div
                    className="w-2 h-2 rounded-full border border-slate-300 shadow-sm"
                    style={{
                      backgroundColor:
                        item.color?.toLowerCase() === "default" ||
                        item.color?.toLowerCase() === "standard"
                          ? "#94a3b8"
                          : item.color?.toLowerCase(),
                    }}
                  />
                  {item.color || "DEF"}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Control Row */}
          <div className="flex items-end justify-between mt-auto">
            {/* Elegant Quantity Stepper */}
            <div className="flex items-center h-8 sm:h-9 bg-white/50 backdrop-blur-md border border-white/60 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => handleDecrement(item.id, item.size, item.color)}
                className="w-8 sm:w-9 h-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50/50 transition-colors border-r border-white/40 active:scale-95"
              >
                <Minus size={12} strokeWidth={3} />
              </button>
              <span className="w-8 sm:w-9 text-center font-black text-xs sm:text-sm text-slate-900 tabular-nums">
                {item.quantity}
              </span>
              <button
                onClick={() => handleIncrement(item.id, item.size, item.color)}
                className="w-8 sm:w-9 h-full flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50/50 transition-colors border-l border-white/40 active:scale-95"
              >
                <Plus size={12} strokeWidth={3} />
              </button>
            </div>

            {/* Dynamic Total */}
            <div className="text-right">
              <div className="text-base sm:text-2xl font-black text-slate-950 tracking-tighter tabular-nums leading-none">
                ₹{itemTotal.toLocaleString()}
              </div>
              {item.quantity > 1 && (
                <div className="text-[8px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1 italic">
                  ₹{itemPrice.toLocaleString()} / ITEM
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
