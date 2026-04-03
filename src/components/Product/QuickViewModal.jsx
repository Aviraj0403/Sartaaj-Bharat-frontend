import React, { useState } from "react";
import {
  X,
  Star,
  Check,
  ShoppingCart,
  Heart,
  RefreshCw,
  Sparkles,
} from "lucide-react";
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
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative flex flex-col lg:flex-row border border-slate-100 max-h-[90vh] h-auto animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 z-50 p-2 hover:bg-slate-50 rounded-lg transition-all"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* Product Visual Area */}
        <div className="w-full lg:w-1/2 bg-slate-50 flex flex-col items-center justify-center p-6 lg:p-10 relative overflow-hidden">
          <img
            src={images[activeImage]}
            alt={product.name}
            className="max-h-[250px] lg:max-h-[380px] object-contain mix-blend-multiply transition-all duration-300 transform"
            onError={(e) => { e.target.src = "https://via.placeholder.com/400?text=Premium+Collection"; }}
          />

          {images.length > 1 && (
            <div className="flex gap-2 mt-6 overflow-x-auto no-scrollbar pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-14 h-14 rounded-lg border-2 transition-all p-1 bg-white flex-shrink-0 ${activeImage === idx ? "border-blue-600 shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <img src={img} className="w-full h-full object-contain" alt="Preview" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Area */}
        <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col overflow-y-auto no-scrollbar">
          <div className="mb-4">
            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-widest mb-1.5 block">
              {product.brand || "Official Store"}
            </span>
            <h2 className="text-xl lg:text-3xl font-black text-slate-900 mb-2 leading-tight tracking-tight uppercase">
              {product.name}
            </h2>
            <div className="flex items-center gap-4">
              <div className="text-2xl lg:text-3xl font-black text-blue-600 tracking-tight">
                ₹{(selectedVariant?.price || product.price || 0).toLocaleString()}
              </div>
              {(selectedVariant?.compareAtPrice || product.oldPrice) && (
                <div className="text-slate-300 line-through text-lg font-bold">
                  ₹{(selectedVariant?.compareAtPrice || product.oldPrice).toLocaleString()}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1 rounded-md">
              <Star size={10} className="fill-blue-400 text-blue-400" />
              <span className="text-[10px] font-bold">
                {product.rating || "4.9"}
              </span>
            </div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest italic">
              Verified Collection
            </span>
          </div>

          <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed line-clamp-4">
            {product.description || "Premium quality technology crafted for performance and durability."}
          </p>

          <div className="space-y-6 mb-8 pt-2">
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  Configuration
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-3 py-2 rounded-lg border-2 text-[9px] font-black tracking-widest transition-all ${selectedVariant === variant ? "border-blue-600 bg-blue-50/50 text-blue-600 shadow-sm" : "border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600"}`}
                    >
                      {variant.size} {variant.color !== "Default" ? `- ${variant.color}` : ""}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-900">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="uppercase tracking-widest">In Stock</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw size={14} className="text-slate-400" />
                <span className="uppercase tracking-widest">7 Day Replacement</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-auto">
            <div className="flex items-center bg-slate-100 rounded-lg p-1 gap-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-md hover:bg-white text-slate-900 font-bold transition-all flex items-center justify-center"
              >
                -
              </button>
              <span className="w-6 text-center text-xs font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-md hover:bg-white text-slate-900 font-bold transition-all flex items-center justify-center"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-slate-900 text-white px-8 py-3.5 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center gap-3"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={toggleWishlist}
              className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${inWishlist ? "text-red-500" : "text-slate-400 hover:text-slate-900"}`}
            >
              <Heart size={14} fill={inWishlist ? "currentColor" : "none"} strokeWidth={2.5} />
              Save to Wishlist
            </button>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              Secured Checkout
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default QuickViewModal;

