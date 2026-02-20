import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Star, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCartThunk } from '../../features/cart/cartThunk';
import QuickViewModal from './QuickViewModal';
import { useWishlist } from '../../hooks';

const ProductCard = ({ product }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated } = useSelector(state => state.auth);
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inWishlist = isWishlisted(product._id || product.id);

  // High-End Price Extraction
  const defaultVariant = product.variants?.[0];
  const displayPrice = product.price || defaultVariant?.price || 0;
  const displayOldPrice = product.oldPrice || defaultVariant?.compareAtPrice;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const payload = {
        productId: product._id || product.id,
        quantity: 1,
        size: product.variants?.[0]?.size || 'Standard',
        color: product.variants?.[0]?.color || 'Default'
      };
      await dispatch(addToCartThunk(payload)).unwrap();
      toast.success(`Exclusive ${product.name} added to lounge`);
    } catch (err) {
      toast.error(err.message || 'Collection sync failed');
    }
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) return navigate('/auth');

    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-700 border border-slate-100/50"
    >
      {/* Discovery Core (Image Area) */}
      <div className="relative aspect-square overflow-hidden bg-slate-50 p-4 sm:p-6 md:p-10">
        {/* Status Indicators */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex flex-col gap-2">
          {product.isFeatured && (
            <motion.span
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-slate-900 text-white text-[8px] sm:text-[9px] font-black px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2 border border-slate-700/50"
            >
              <Sparkles size={10} className="text-blue-400" /> Signature
            </motion.span>
          )}
          {product.discount > 0 && (
            <span className="bg-blue-600 text-white text-[8px] sm:text-[9px] font-black px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl uppercase tracking-[0.2em] shadow-2xl">
              -{product.discount}% ELITE
            </span>
          )}
        </div>

        {/* Main Visual */}
        <Link to={`/product/${product.slug || product._id || product.id}`} className="block w-full h-full relative cursor-pointer">
          <motion.img
            src={product.images?.[0] || product.image || 'https://via.placeholder.com/400'}
            alt={product.name}
            loading="lazy"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=Premium+Collection'; }}
            animate={{
              scale: isHovered ? 1.15 : 1,
              rotate: isHovered ? 2 : 0
            }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </Link>

        {/* Interaction Matrix (Overlay) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="absolute inset-x-8 bottom-8 z-30 flex gap-3"
            >
              <button
                onClick={handleAddToCart}
                className="flex-[3] bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl shadow-slate-900/40 flex items-center justify-center gap-3 active:scale-95"
              >
                <ShoppingCart size={16} strokeWidth={2.5} /> Acquire
              </button>
              <button
                onClick={(e) => { e.preventDefault(); setShowQuickView(true); }}
                className="flex-1 bg-white/80 backdrop-blur-xl text-slate-900 border border-white p-4 rounded-2xl flex items-center justify-center hover:bg-white transition-all shadow-xl active:scale-90"
              >
                <Eye size={18} strokeWidth={2.5} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wishlist Portal */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleWishlist}
          className={`absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2.5 sm:p-3 rounded-2xl transition-all duration-500 shadow-xl ${inWishlist ? 'bg-red-50 text-red-500' : 'bg-white/80 backdrop-blur-md text-slate-400 hover:text-slate-900'}`}
        >
          <Heart className="w-[18px] h-[18px] sm:w-5 sm:h-5" strokeWidth={2.5} fill={inWishlist ? "currentColor" : "none"} />
        </motion.button>
      </div>

      {/* Insight Area (Content) */}
      <div className="px-5 sm:px-8 pb-6 sm:pb-8 pt-2 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            {product.brand || 'Elite Series'}
          </span>
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
            <Star size={10} className="fill-blue-500 text-blue-500" />
            <span className="text-[10px] font-black text-slate-700 tracking-tighter">{product.rating || '4.9'}</span>
          </div>
        </div>

        <h3 className="text-slate-900 font-black text-xl mb-4 leading-[1.2] tracking-tight hover:text-blue-600 transition-colors duration-300">
          <Link to={`/product/${product.slug || product._id || product.id}`} className="line-clamp-2 italic">{product.name}</Link>
        </h3>

        {/* Always-visible Quick View trigger */}
        <div className="mb-4 flex justify-between items-center text-[10px]">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowQuickView(true); }}
            className="inline-flex items-center gap-1 text-slate-500 hover:text-blue-600 font-black uppercase tracking-[0.25em] transition-colors"
          >
            <Eye size={14} strokeWidth={2.2} /> Quick View
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between pt-4 border-t border-slate-100/50">
          <div className="flex flex-col">
            {displayOldPrice && (
              <span className="text-slate-300 text-xs line-through font-bold mb-1 tracking-widest uppercase">
                ₹{displayOldPrice.toLocaleString()}
              </span>
            )}
            <span className="text-blue-600 font-black text-3xl tracking-tighter italic">
              ₹{displayPrice.toLocaleString()}
            </span>
          </div>

          <motion.div
            whileHover={{ x: 5 }}
            className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-500 shadow-sm"
          >
            <ArrowRight size={20} strokeWidth={3} />
          </motion.div>
        </div>
      </div>

      {showQuickView && (
        <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
      )}
    </motion.div>
  );
};

export default ProductCard;
