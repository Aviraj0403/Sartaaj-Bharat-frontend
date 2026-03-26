import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Sparkles } from "lucide-react";

export default function ProductGallery({
  images,
  activeImage,
  setActiveImage,
  product,
  discount,
  inWishlist,
  toggleWishlist,
}) {
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-slate-50 rounded-2xl overflow-hidden aspect-square border border-slate-200">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={images[activeImage]}
            alt={product.name}
            className="w-full h-full object-contain p-8"
          />
        </AnimatePresence>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-black px-4 py-2 rounded-xl shadow-lg uppercase tracking-wider">
              {discount}% OFF
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-blue-600 text-white text-xs font-black px-4 py-2 rounded-xl shadow-lg flex items-center gap-1 uppercase tracking-wider">
              <Sparkles size={12} /> Featured
            </span>
          )}
        </div>

        {/* Wishlist & Share */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={toggleWishlist}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-lg ${
              inWishlist
                ? "bg-red-500 text-white"
                : "bg-white/90 backdrop-blur-sm text-slate-600 hover:bg-white"
            }`}
          >
            <Heart size={20} fill={inWishlist ? "currentColor" : "none"} />
          </button>
          <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-slate-600 hover:bg-white transition-all shadow-lg">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-5 gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(idx)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              activeImage === idx
                ? "border-blue-600"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <img
              src={img}
              alt={`View ${idx + 1}`}
              className="w-full h-full object-contain p-2 bg-slate-50"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
