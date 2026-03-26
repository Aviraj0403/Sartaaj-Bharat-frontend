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
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row gap-0">
        {/* Image Panel */}
        <div
          onClick={() => navigate(`/product/${transformToSlug(item.name)}`)}
          className="w-full sm:w-36 h-36 sm:h-auto bg-slate-50 flex-shrink-0 cursor-pointer overflow-hidden group relative"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = "/placeholder-cart.png";
            }}
          />
          {itemPrice > 0 && (
            <div className="absolute top-2 left-2">
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                ₹{itemPrice.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0 relative">
          {/* Remove */}
          <button
            onClick={() => handleRemoveItem(item.id, item.size, item.color)}
            className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
            title="Remove item"
          >
            <X size={16} strokeWidth={2.5} />
          </button>

          {/* Name */}
          <div className="pr-8">
            <h2
              onClick={() => navigate(`/product/${transformToSlug(item.name)}`)}
              className="text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors line-clamp-2 leading-snug mb-2"
            >
              {item.name}
            </h2>

            {/* Size / Color Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                <Tag size={10} />
                {item.size || "Standard"}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-slate-300"
                  style={{
                    backgroundColor:
                      item.color?.toLowerCase() === "default" ||
                      item.color?.toLowerCase() === "standard"
                        ? "#94a3b8"
                        : item.color?.toLowerCase(),
                  }}
                />
                {item.color || "Default"}
              </span>
            </div>
          </div>

          {/* Bottom Row: Qty + Price */}
          <div className="flex items-center justify-between gap-3 mt-auto">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50 h-9">
              <button
                onClick={() => handleDecrement(item.id, item.size, item.color)}
                className="w-9 h-full flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors border-r border-slate-200"
              >
                <Minus size={13} strokeWidth={2.5} />
              </button>
              <span className="w-9 text-center font-bold text-sm text-slate-900">
                {item.quantity}
              </span>
              <button
                onClick={() => handleIncrement(item.id, item.size, item.color)}
                className="w-9 h-full flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors border-l border-slate-200"
              >
                <Plus size={13} strokeWidth={2.5} />
              </button>
            </div>

            {/* Price Display */}
            <div className="text-right">
              <div className="text-base sm:text-lg font-black text-slate-900">
                ₹{itemTotal.toLocaleString()}
              </div>
              {item.quantity > 1 && (
                <div className="text-[11px] text-slate-400 font-medium">
                  ₹{itemPrice.toLocaleString()} × {item.quantity}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
