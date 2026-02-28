import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Star, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCartThunk } from '../../features/cart/cartThunk';
import QuickViewModal from './QuickViewModal';
import { useWishlist } from '../../hooks';

const ProductCard = ({ product, layout = "grid" }) => {
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

  if (layout === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="bg-white rounded-[2rem] border border-slate-100 p-6 flex gap-8 hover:shadow-2xl transition-all duration-700 relative group overflow-hidden"
      >
        <div className="w-64 h-64 bg-slate-50 rounded-2xl overflow-hidden p-6 shrink-0 relative">
          <Link to={`/product/${product.slug || product._id || product.id}`}>
            <motion.img
              src={product.images?.[0] || product.pimage}
              whileHover={{ scale: 1.1 }}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </Link>
          {product.discount > 0 && (
            <div className="absolute top-4 left-4 bg-blue-600 text-white text-[8px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest italic">
              -{product.discount}% ELITE
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col py-2">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block italic">{product.brand || 'Elite Series'}</span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter italic">
                <Link to={`/product/${product.slug || product._id || product.id}`}>{product.name}</Link>
              </h3>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
              <Star size={12} className="fill-blue-500 text-blue-500" />
              <span className="text-xs font-black text-slate-900 italic">{product.rating || '4.9'}</span>
            </div>
          </div>

          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-6 italic line-clamp-2 max-w-xl">
            {product.description || "The pinnacle of engineering meets elite aesthetics. Experience superior performance in every detail."}
          </p>

          <div className="flex items-center gap-6 mb-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
            {product.variants?.[0]?.ram && <span className="flex items-center gap-2"><Cpu size={14} /> {product.variants[0].ram} Memory</span>}
            {product.variants?.[0]?.storage && <span className="flex items-center gap-2"><HardDrive size={14} /> {product.variants[0].storage} Vault</span>}
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-col">
              {displayOldPrice && <span className="text-slate-300 text-xs line-through font-bold tracking-widest">₹{displayOldPrice.toLocaleString()}</span>}
              <span className="text-3xl font-black text-blue-600 tracking-tighter italic leading-none">₹{displayPrice.toLocaleString()}</span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={toggleWishlist}
                className={`p-4 rounded-2xl transition-all shadow-xl ${inWishlist ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400 hover:text-slate-900'}`}
              >
                <Heart size={20} fill={inWishlist ? "currentColor" : "none"} strokeWidth={2.5} />
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl flex items-center gap-3 italic"
              >
                <ShoppingCart size={16} strokeWidth={2.5} /> Acquire Artifact
              </button>
            </div>
          </div>
        </div>

        {showQuickView && (
          <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col h-full bg-white rounded-2xl md:rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-700 border border-slate-100/50"
    >
      {/* Discovery Core (Image Area) */}
      <div className="relative aspect-square overflow-hidden bg-slate-50 p-4 sm:p-6 md:p-10">
        {/* Status Indicators */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex flex-col gap-2">
          {(product.isFeatured || product.isBestSeller) && (
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
            src={product.images?.[0] || product.pimage || product.image || 'https://via.placeholder.com/400'}
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

        <h3 className="text-slate-900 font-bold text-sm sm:text-lg mb-2 sm:mb-4 leading-tight tracking-tight hover:text-blue-600 transition-colors duration-300">
          <Link to={`/product/${product.slug || product._id || product.id}`} className="line-clamp-2 italic">{product.name}</Link>
        </h3>

        {/* Always-visible Quick View trigger */}
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowQuickView(true); }}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-300 py-1"
          >
            <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-white transition-colors">
              <Eye size={12} strokeWidth={2.5} />
            </div>
            Quick View
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between pt-4 border-t border-slate-100/50">
          <div className="flex flex-col">
            {displayOldPrice && (
              <span className="text-slate-300 text-xs line-through font-bold mb-1 tracking-widest uppercase">
                ₹{displayOldPrice.toLocaleString()}
              </span>
            )}
            <span className="text-blue-600 font-black text-lg sm:text-2xl tracking-tighter italic">
              ₹{displayPrice.toLocaleString()}
            </span>
          </div>

          <motion.div
            whileHover={{ x: 5 }}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-500 shadow-sm"
          >
            <ArrowRight size={16} strokeWidth={3} />
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
