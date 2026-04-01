import React from "react";
import { Minus, Plus, X, Tag } from "lucide-react";
import { motion } from "framer-motion";

export default function CartItem({
  item,
  idx,
  navigate,
  transformToSlug,
  handleDecrement,
  handleIncrement,
  handleRemoveItem,
}) {
  const itemPrice = item.price || 0;
  const itemTotal = itemPrice * (item.quantity || 1);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -30, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden group/card"
    >
      <div className="flex flex-col sm:flex-row gap-0">
        {/* Image Panel */}
        <div
          onClick={() => navigate(`/product/${transformToSlug(item.name)}`)}
          className="w-full sm:w-44 h-44 sm:h-auto bg-slate-50 flex-shrink-0 cursor-pointer overflow-hidden relative"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain p-6 group-hover/card:scale-110 transition-transform duration-700"
            onError={(e) => {
              const fallback = "https://via.placeholder.com/200?text=Premium+Item";
              if (e.target.src !== fallback) {
                e.target.src = fallback;
              }
            }}
          />
          <div className="absolute top-4 left-4">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse shadow-[0_0_10px_#2563eb]"></div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0 relative">
          {/* Remove */}
          <button
            onClick={() => handleRemoveItem(item.id, item.size, item.color)}
            className="absolute top-5 right-5 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 active:scale-90"
            title="Remove item"
          >
            <X size={18} strokeWidth={2.5} />
          </button>

          {/* Name */}
          <div className="pr-10">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 block">
               {item.brand || "Elite Collection"}
            </span>
            <h2
              onClick={() => navigate(`/product/${transformToSlug(item.name)}`)}
              className="text-base sm:text-lg font-black text-slate-900 hover:text-blue-600 cursor-pointer transition-colors line-clamp-2 leading-tight mb-4 tracking-tight"
            >
              {item.name}
            </h2>

            {/* Size / Color Badges */}
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl italic">
                <Tag size={12} className="text-blue-600" />
                {item.size || "Standard"}
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl italic">
                <div
                  className="w-2.5 h-2.5 rounded-full border border-slate-300 shadow-sm"
                  style={{
                    backgroundColor:
                      item.color?.toLowerCase() === "default" ||
                      item.color?.toLowerCase() === "standard"
                        ? "#94a3b8"
                        : item.color?.toLowerCase(),
                  }}
                />
                {item.color || "Default"}
              </div>
            </div>
          </div>

          {/* Bottom Row: Qty + Price */}
          <div className="flex items-center justify-between gap-3 mt-auto">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm h-10">
              <button
                onClick={() => handleDecrement(item.id, item.size, item.color)}
                className="w-10 h-full flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300 border-r border-slate-100 active:scale-95"
              >
                <Minus size={14} strokeWidth={3} />
              </button>
              <span className="w-10 text-center font-black text-sm text-slate-950">
                {item.quantity}
              </span>
              <button
                onClick={() => handleIncrement(item.id, item.size, item.color)}
                className="w-10 h-full flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 border-l border-slate-100 active:scale-95"
              >
                <Plus size={14} strokeWidth={3} />
              </button>
            </div>

            {/* Price Display */}
            <div className="text-right">
              <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tighter">
                ₹{itemTotal.toLocaleString()}
              </div>
              {item.quantity > 1 && (
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                  ₹{itemPrice.toLocaleString()} / Unit
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
