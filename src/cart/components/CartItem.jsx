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
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden group/card relative"
    >
      <div className="flex flex-row items-stretch min-h-[120px] sm:min-h-[160px] relative z-10">
        {/* Image Display */}
        <div
          onClick={() => navigate(productUrl)}
          className="w-24 xs:w-32 sm:w-48 bg-gray-50/50 flex-shrink-0 cursor-pointer overflow-hidden relative"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain p-4 group-hover/card:scale-105 transition-transform duration-700"
            onError={(e) => {
              const fallback = "https://via.placeholder.com/200?text=Premium+Item";
              if (e.target.src !== fallback) { e.target.src = fallback; }
            }}
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between min-w-0">
          <div className="relative">
            {/* Remove Action */}
            <button
              onClick={() => handleRemoveItem(item.id, item.size, item.color)}
              className="absolute -top-1 -right-1 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all active:scale-90"
              title="Remove"
            >
              <X size={16} />
            </button>

            <div className="pr-8">
              <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest mb-1 block">
                 {item.brand || "ESSENTIAL"}
              </span>
              <h2
                onClick={() => navigate(productUrl)}
                className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1 hover:text-blue-600 cursor-pointer transition-colors tracking-tight mb-2"
              >
                {item.name}
              </h2>

              {/* Attributes (Size, Color) */}
              <div className="flex flex-wrap gap-2 mb-3">
                {item.size && (
                  <div className="px-2.5 py-1 bg-gray-50 border border-gray-100 text-slate-500 text-[10px] font-semibold rounded-lg shadow-sm">
                    Size: {item.size}
                  </div>
                )}
                {item.color && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-100 text-slate-500 text-[10px] font-semibold rounded-lg shadow-sm">
                    <div
                      className="w-2 h-2 rounded-full border border-gray-200"
                      style={{ backgroundColor: item.color === "default" ? "#94a3b8" : item.color }}
                    />
                    {item.color}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Controls & Price Row */}
          <div className="flex items-end justify-between mt-auto">
            {/* Minimalist Quantity Stepper */}
            <div className="flex items-center bg-gray-100/80 rounded-xl p-1">
              <button
                onClick={() => handleDecrement(item.id, item.size, item.color)}
                className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white rounded-lg transition-all active:scale-95"
              >
                <Minus size={12} strokeWidth={2.5} />
              </button>
              <span className="w-8 text-center text-xs font-bold text-slate-900 tabular-nums">
                {item.quantity}
              </span>
              <button
                onClick={() => handleIncrement(item.id, item.size, item.color)}
                className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white rounded-lg transition-all active:scale-95"
              >
                <Plus size={12} strokeWidth={2.5} />
              </button>
            </div>

            {/* Price Display */}
            <div className="text-right">
              <div className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight tabular-nums">
                ₹{itemTotal.toLocaleString()}
              </div>
              {item.quantity > 1 && (
                <div className="text-[10px] text-slate-400 font-medium">
                  ₹{itemPrice.toLocaleString()} / item
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
