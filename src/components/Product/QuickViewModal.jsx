import React, { useState } from "react";
import {
  X,
  Star,
  Check,
  ShoppingCart,
  Heart,
  RefreshCw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const FM = motion;
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { useCartActions } from "../../hooks/useCartActions";
import { useWishlist } from "../../hooks";

const QuickViewModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    Array.isArray(product.variants)
      ? product.variants[0]
      : product.variants || null,
  );

  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = product ? isWishlisted(product._id || product.id) : false;

  const dispatch = useDispatch();
  const { addToCart } = useCartActions();

  if (!product) return null;

  const images =
    product.images?.length > 0
      ? product.images
      : product.pimages?.length > 0
        ? product.pimages
        : [product.pimage || product.image];

  const handleAddToCart = async () => {
    try {
      await addToCart(
        product,
        selectedVariant?.size || "Standard",
        Array.isArray(selectedVariant?.color)
          ? selectedVariant.color[0]
          : selectedVariant?.color || "Default",
        quantity,
        selectedVariant?._id,
      );
      toast.success(`${product.name} added to cart`);
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to add to cart");
    }
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (!product) return;

    if (inWishlist) {
      removeFromWishlist(product._id || product.id);
    } else {
      addToWishlist(product._id || product.id);
    }
  };

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
        />

        {/* Content Matrix */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white/95 backdrop-blur-md w-full max-w-4xl rounded-3xl sm:rounded-[2rem] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.3)] overflow-hidden relative flex flex-col lg:flex-row border border-white max-h-[90vh] h-auto"
        >
          {/* Interaction Exit */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-slate-400 hover:text-slate-900 z-50 p-2 bg-slate-100/50 hover:bg-white rounded-xl transition-all duration-300 active:scale-90"
          >
            <X size={20} className="sm:w-6 sm:h-6" strokeWidth={2.5} />
          </button>

          {/* Visual Core (Left) */}
          <div className="w-full lg:w-1/2 bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden group">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              src={images[activeImage]}
              alt={product.name}
              className="max-h-[280px] lg:max-h-[360px] object-contain mix-blend-multiply drop-shadow-2xl"
              onError={(e) => {
                const fallback = "https://via.placeholder.com/400?text=Premium+Collection";
                if (e.target.src !== fallback) {
                  e.target.src = fallback;
                }
              }}
            />

            {/* Image Navigation Nodes */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-12 h-12 rounded-lg border-2 transition-all p-1 bg-white ${activeImage === idx ? "border-blue-600 scale-105 shadow-sm" : "border-transparent opacity-50 hover:opacity-100"}`}
                  >
                    <img src={img} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Intelligence Core (Right) */}
          <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-10 flex flex-col overflow-y-auto no-scrollbar">
            <div className="mb-3 lg:mb-4">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-blue-600 font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.3em] mb-1 sm:mb-2 block"
              >
                {product.brand || "Official Store"}
              </motion.span>
              <h2 className="text-lg sm:text-xl lg:text-3xl font-black text-slate-900 mb-1 sm:mb-3 leading-tight italic tracking-tighter">
                {product.name}
              </h2>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-blue-600 tracking-tighter italic">
                  ₹
                  {(
                    selectedVariant?.price ||
                    product.price ||
                    0
                  ).toLocaleString()}
                </div>
                {(selectedVariant?.compareAtPrice || product.oldPrice) && (
                  <div className="text-slate-300 line-through text-base sm:text-xl font-bold">
                    ₹
                    {(
                      selectedVariant?.compareAtPrice || product.oldPrice
                    ).toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-1.5 bg-slate-900 text-white px-4 py-1.5 rounded-full">
                <Star size={12} className="fill-blue-400 text-blue-400" />
                <span className="text-xs font-black">
                  {product.rating || "4.9"}
                </span>
              </div>
              <span className="text-slate-400 text-xs font-black uppercase tracking-widest italic">
                Customer Reviews
              </span>
            </div>

            <p className="text-slate-600 text-sm font-medium mb-6 leading-relaxed">
              {product.description ||
                "Premium quality product designed for excellence and durability."}
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-sm font-black text-slate-900 group">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="uppercase tracking-widest">
                  In Stock / Sartaaj Express
                </span>
              </div>

              {product.variants && product.variants.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                    Select Configuration
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-3 py-2 rounded-lg border-2 text-[9px] font-black tracking-widest transition-all ${selectedVariant === variant ? "border-blue-600 bg-blue-50/50 text-blue-600 shadow-md shadow-blue-100 scale-105" : "border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600"}`}
                      >
                        {variant.size}{" "}
                        {variant.color !== "Default"
                          ? `- ${variant.color}`
                          : ""}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-slate-100 mt-auto">
              <div className="flex items-center bg-slate-100 rounded-xl sm:rounded-2xl p-1 gap-1 sm:gap-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg hover:bg-white text-slate-900 font-black transition-all shadow-sm flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-5 sm:w-6 text-center text-[10px] sm:text-xs font-black">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg hover:bg-white text-slate-900 font-black transition-all shadow-sm flex items-center justify-center"
                >
                  +
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 bg-slate-900 text-white px-4 sm:px-8 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center gap-2 sm:gap-3 group"
              >
                <ShoppingCart size={18} strokeWidth={2.5} /> Add to Cart
              </motion.button>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={toggleWishlist}
                className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-colors ${inWishlist ? "text-red-500" : "text-slate-400 hover:text-slate-900"}`}
              >
                <Heart
                  size={16}
                  strokeWidth={2.5}
                  fill={inWishlist ? "currentColor" : "none"}
                />{" "}
                Add to Wishlist
              </button>
              <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                <RefreshCw size={16} strokeWidth={2.5} /> Add to Compare
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body,
  );
};

export default QuickViewModal;
