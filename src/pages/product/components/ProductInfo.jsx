import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Award,
  ShieldCheck,
  Truck,
  RefreshCw,
  Zap,
  MapPin,
  Clock,
  Package,
} from "lucide-react";

export default function ProductInfo({
  product,
  selectedVariant,
  setSelectedVariant,
  currentPrice,
  oldPrice,
  discount,
  quantity,
  setQuantity,
  handleAddToCart,
}) {
  return (
    <div className="space-y-6">
      {/* Brand */}
      {product.brand && (
        <div className="text-xs text-slate-400 uppercase tracking-widest font-black mb-2">
          <span className="text-blue-600 italic">{product.brand}</span>
        </div>
      )}

      {/* Product Name */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-[1.1] tracking-tighter italic mb-4 uppercase">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-4 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-lg shadow-md">
          <Star size={14} fill="#3b82f6" className="text-blue-500" />
          <span className="font-black italic text-sm">
            {product.rating || "4.8"}
          </span>
        </div>
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
          Verified Ratings
        </span>
      </div>

      {/* Price */}
      <div className="space-y-1 mb-6">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl md:text-5xl font-black text-blue-600 tracking-tighter italic">
            ₹{currentPrice.toLocaleString()}
          </span>
          {oldPrice && (
            <>
              <span className="text-xl text-slate-300 line-through font-bold">
                ₹{oldPrice.toLocaleString()}
              </span>
              <span className="text-blue-600 font-black text-xs uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">
                {discount}% OFF
              </span>
            </>
          )}
        </div>
        <p className="text-xs text-slate-500 font-semibold">
          Inclusive of all taxes
        </p>
      </div>

      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-4 mb-6">
          <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest italic">
            Select Configuration
          </h3>
          <div className="flex flex-wrap gap-3">
            {product.variants.map((v, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedVariant(v)}
                className={`px-6 py-3 rounded-xl border-2 font-black text-xs uppercase tracking-wider transition-all ${
                  selectedVariant === v
                    ? "border-blue-600 bg-blue-50 text-blue-600 shadow-lg"
                    : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                }`}
              >
                {v.size}{" "}
                {v.color !== "Default" && v.color !== null
                  ? `- ${v.color}`
                  : ""}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & Add to Cart */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-slate-200 rounded-xl bg-white">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-12 h-12 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-600"
            >
              <Minus size={18} strokeWidth={3} />
            </button>
            <span className="w-12 text-center font-black italic text-lg">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-12 h-12 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-600"
            >
              <Plus size={18} strokeWidth={3} />
            </button>
          </div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
            {product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}
          </span>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="flex-[1.5] bg-gradient-to-r from-slate-900 to-slate-800 text-white py-4 rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-slate-900/20 transition-all flex items-center justify-center gap-3 italic border border-slate-700/50"
          >
            <ShoppingCart size={18} strokeWidth={2.5} />
            Add to Cart
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-blue-600/20 transition-all shadow-xl italic border border-blue-400/30"
          >
            Buy Now
          </motion.button>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-slate-50 rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Award size={20} className="text-blue-600" />
          Key Benefits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: ShieldCheck,
              text: "1 Year Warranty",
              color: "text-green-600",
            },
            { icon: Truck, text: "Free Delivery", color: "text-blue-600" },
            {
              icon: RefreshCw,
              text: "7 Days Return",
              color: "text-orange-600",
            },
            { icon: Zap, text: "Fast Shipping", color: "text-purple-600" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center ${item.color}`}
              >
                <item.icon size={20} />
              </div>
              <span className="text-sm font-medium text-slate-700">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Info */}
      <div className="border border-slate-200 rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <MapPin size={20} className="text-blue-600" />
          Delivery Options
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter pincode"
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
            Check
          </button>
        </div>
        <div className="space-y-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-green-600" />
            <span>
              Get it by <strong className="text-slate-900">Tomorrow</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Package size={16} className="text-blue-600" />
            <span>Free delivery on orders above ₹499</span>
          </div>
        </div>
      </div>
    </div>
  );
}
