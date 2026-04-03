import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Eye,
  Star,
  ArrowRight,
  Sparkles,
  Cpu,
  HardDrive,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import QuickViewModal from "./QuickViewModal";
import { useWishlist } from "../../hooks";
import { useCartActions } from "../../hooks/useCartActions";
import { getProductUrl } from "../../utils/navigation";

const ProductCard = ({ product, layout = "grid", imageFit = "contain" }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCartActions();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inWishlist = isWishlisted(product._id || product.id);

  // Price Extraction
  const defaultVariant = product.variants?.[0];
  const displayPrice = product.price || defaultVariant?.price || 0;
  const displayOldPrice = product.oldPrice || defaultVariant?.compareAtPrice;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const variant = Array.isArray(product.variants)
        ? product.variants[0]
        : product.variants;
      await addToCart(
        product,
        variant?.size || "Standard",
        Array.isArray(variant?.color)
          ? variant.color[0]
          : variant?.color || "Default",
        1,
        variant?._id,
      );
      toast.success(`${product.name} added to cart`);
    } catch (err) {
      toast.error(err.message || "Failed to add to cart");
    }
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) return navigate("/auth");

    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  if (layout === "list") {
    return (
      <div className="bg-white rounded-xl border border-slate-100 p-4 flex gap-5 hover:shadow-lg transition-all duration-300 relative group overflow-hidden">
        <div className="w-40 h-40 bg-slate-50 rounded-lg overflow-hidden p-3 shrink-0 relative">
          <Link to={getProductUrl(product)}>
            <img
              src={product.images?.[0] || product.pimage}
              alt={product.name}
              className={`w-full h-full ${imageFit === "cover" ? "object-cover" : "object-contain"} transition-transform duration-500 group-hover:scale-105`}
            />
          </Link>
          {product.discount > 0 && (
            <div className="absolute top-2 left-2 bg-blue-600 text-white text-[8px] font-bold px-2 py-1 rounded-md uppercase tracking-widest">
              {product.discount}% OFF
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col py-1">
          <div className="flex justify-between items-start mb-1">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 block">
                {product.brand || "Official"}
              </span>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
                <Link to={getProductUrl(product)}>{product.name}</Link>
              </h3>
            </div>
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
              <Star size={10} className="fill-blue-600 text-blue-600" />
              <span className="text-[10px] font-bold text-slate-900">
                {product.rating || "4.9"}
              </span>
            </div>
          </div>

          <p className="text-slate-500 text-xs font-medium leading-relaxed mb-3 line-clamp-2">
            {product.description || "Premium quality product designed for excellence."}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-col">
              {displayOldPrice && (
                <span className="text-slate-300 text-xs line-through font-medium">
                  ₹{displayOldPrice.toLocaleString()}
                </span>
              )}
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                ₹{displayPrice.toLocaleString()}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={toggleWishlist}
                className={`p-3 rounded-lg transition-all ${inWishlist ? "bg-red-50 text-red-500" : "bg-slate-50 text-slate-400 hover:text-slate-900"}`}
              >
                <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md flex items-center gap-2"
              >
                <ShoppingCart size={14} /> Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col h-full bg-white rounded-xl border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-300 relative"
    >
      {/* Image Area */}
      <div className="relative aspect-[4/5] bg-slate-50 p-4 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <span className="bg-slate-900 text-white text-[8px] font-bold px-2 py-1 rounded-md uppercase tracking-widest flex items-center gap-1.5 shadow-md">
              <Sparkles size={10} className="text-blue-400" /> Top Seller
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-blue-600 text-white text-[8px] font-bold px-2 py-1 rounded-md uppercase tracking-widest shadow-md">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Product Image */}
        <Link to={getProductUrl(product)} className="block w-full h-full cursor-pointer">
          <img
            src={product.images?.[0] || product.pimage || product.image || "https://via.placeholder.com/400"}
            alt={product.name}
            className={`w-full h-full ${imageFit === "cover" ? "object-cover" : "object-contain"} transition-transform duration-700 group-hover:scale-105`}
            onError={(e) => { e.target.src = "https://via.placeholder.com/400?text=Premium+Collection"; }}
          />
        </Link>

        {/* Floating Quick Actions */}
        <div className={`absolute inset-x-4 bottom-4 z-20 flex gap-2 transition-all duration-300 transform ${isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-slate-900 text-white py-2.5 rounded-lg font-bold text-[9px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <ShoppingCart size={14} /> Add
          </button>
          <button
            onClick={(e) => { e.preventDefault(); setShowQuickView(true); }}
            className="w-10 bg-white text-slate-900 p-2.5 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-lg border border-slate-100"
          >
            <Eye size={16} />
          </button>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className={`absolute top-3 right-3 z-10 p-2 rounded-lg transition-all duration-300 shadow-sm ${inWishlist ? "bg-red-50 text-red-500" : "bg-white/80 backdrop-blur-sm text-slate-400 hover:text-blue-600 hover:bg-white"}`}
        >
          <Heart size={16} fill={inWishlist ? "currentColor" : "none"} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {product.brand || "Official"}
          </span>
          <div className="flex items-center gap-1 text-blue-600">
            <Star size={10} className="fill-blue-600" />
            <span className="text-[10px] font-bold">{product.rating || "4.9"}</span>
          </div>
        </div>

        <h3 className="text-slate-900 font-bold text-xs sm:text-sm mb-2 leading-tight tracking-tight line-clamp-2 h-8 sm:h-10 group-hover:text-blue-600 transition-colors">
          <Link to={getProductUrl(product)}>{product.name}</Link>
        </h3>

        <div className="mt-auto flex items-end justify-between pt-3 border-t border-slate-50">
          <div className="flex flex-col">
            {displayOldPrice && (
              <span className="text-slate-300 text-[10px] line-through font-medium mb-0.5">
                ₹{displayOldPrice.toLocaleString()}
              </span>
            )}
            <span className="text-slate-900 font-bold text-sm sm:text-base tracking-tight">
              ₹{displayPrice.toLocaleString()}
            </span>
          </div>

          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 border border-slate-100">
            <ArrowRight size={14} />
          </div>
        </div>
      </div>

      {showQuickView && (
        <QuickViewModal
          product={product}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </div>
  );
};

export default ProductCard;
