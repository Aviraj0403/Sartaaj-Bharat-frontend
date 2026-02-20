import React, { useState } from 'react';
import { X, Star, Check, ShoppingCart, Heart, RefreshCw, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const FM = motion;
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCartThunk } from '../../features/cart/cartThunk';

const QuickViewModal = ({ product, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const dispatch = useDispatch();

    if (!product) return null;

    const images = product.images?.length > 0 ? product.images : [product.image];

    const handleAddToCart = async () => {
        try {
            const payload = {
                productId: product._id || product.id,
                quantity,
                size: selectedVariant?.size || 'Standard',
                color: selectedVariant?.color || 'Default'
            };
            await dispatch(addToCartThunk(payload)).unwrap();
            toast.success(`Exquisite ${product.name} reserved in your lounge`);
            onClose();
        } catch (err) {
            toast.error(err.message || 'Acquisition error');
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
                {/* Backdrop Area */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
                />

                {/* Content Matrix */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white/95 backdrop-blur-md w-full max-w-6xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden relative flex flex-col lg:flex-row border border-white max-h-[90vh] h-[90vh] sm:h-auto"
                >
                    {/* Interaction Exit */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 z-50 p-2 bg-slate-100/50 hover:bg-white rounded-2xl transition-all duration-300 active:scale-90"
                    >
                        <X size={24} strokeWidth={2.5} />
                    </button>

                    {/* Visual Core (Left) */}
                    <div className="w-full lg:w-1/2 bg-slate-50 flex flex-col items-center justify-center p-8 sm:p-10 lg:p-12 relative overflow-hidden group">
                        <motion.img
                            key={activeImage}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            src={images[activeImage]}
                            alt={product.name}
                            className="max-h-[350px] lg:max-h-[500px] object-contain mix-blend-multiply drop-shadow-2xl"
                        />

                        {/* Image Navigation Nodes */}
                        {images.length > 1 && (
                            <div className="flex gap-3 mt-10">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`w-16 h-16 rounded-2xl border-2 transition-all p-2 bg-white ${activeImage === idx ? 'border-blue-600 scale-110 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                    >
                                        <img src={img} className="w-full h-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Intelligence Core (Right) */}
                    <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-20 flex flex-col overflow-y-auto no-scrollbar">
                        <div className="mb-10">
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-blue-600 font-black text-xs uppercase tracking-[0.4em] mb-4 block"
                            >
                                {product.brand || 'Elite Selection'}
                            </motion.span>
                            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight italic tracking-tighter">
                                {product.name}
                            </h2>
                            <div className="flex items-center gap-6">
                                <div className="text-5xl font-black text-blue-600 tracking-tighter italic">
                                    ₹{(selectedVariant?.price || product.price || 0).toLocaleString()}
                                </div>
                                {(selectedVariant?.compareAtPrice || product.oldPrice) && (
                                    <div className="text-slate-300 line-through text-2xl font-bold">
                                        ₹{(selectedVariant?.compareAtPrice || product.oldPrice).toLocaleString()}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mb-10 pb-10 border-b border-slate-100">
                            <div className="flex items-center gap-1.5 bg-slate-900 text-white px-4 py-1.5 rounded-full">
                                <Star size={12} className="fill-blue-400 text-blue-400" />
                                <span className="text-xs font-black">{product.rating || '4.9'}</span>
                            </div>
                            <span className="text-slate-400 text-xs font-black uppercase tracking-widest italic">21 Private Reviews</span>
                        </div>

                        <p className="text-slate-600 text-lg font-medium mb-12 leading-relaxed">
                            {product.description || "Experience the pinnacle of technology and design with our most refined collection yet. Engineered for those who demand excellence."}
                        </p>

                        <div className="space-y-10 mb-12">
                            <div className="flex items-center gap-3 text-sm font-black text-slate-900 group">
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <span className="uppercase tracking-widest">In Stock / Sartaaj Prime</span>
                            </div>

                            {product.variants && product.variants.length > 0 && (
                                <div className="space-y-4">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">Select Your Configuration</span>
                                    <div className="flex flex-wrap gap-3">
                                        {product.variants.map((variant, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedVariant(variant)}
                                                className={`px-6 py-3 rounded-2xl border-2 text-xs font-black tracking-widest transition-all ${selectedVariant === variant ? 'border-blue-600 bg-blue-50/50 text-blue-600 shadow-xl shadow-blue-100 scale-105' : 'border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600'}`}
                                            >
                                                {variant.size} {variant.color !== 'Default' ? `- ${variant.color}` : ''}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-6 pt-10 border-t border-slate-100 mt-auto">
                            <div className="flex items-center bg-slate-100 rounded-4xl p-2 gap-4">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-10 h-10 rounded-xl hover:bg-white text-slate-900 font-black transition-all shadow-sm flex items-center justify-center"
                                >-</button>
                                <span className="w-8 text-center text-sm font-black">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="w-10 h-10 rounded-xl hover:bg-white text-slate-900 font-black transition-all shadow-sm flex items-center justify-center"
                                >+</button>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAddToCart}
                                className="flex-1 bg-slate-900 text-white px-10 py-5 rounded-4xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-4 group"
                            >
                                <ShoppingCart size={20} strokeWidth={2.5} /> Reserve Access
                            </motion.button>
                        </div>

                        <div className="flex gap-10 mt-10">
                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-colors ${isWishlisted ? 'text-red-500' : 'text-slate-400 hover:text-slate-900'}`}
                            >
                                <Heart size={16} strokeWidth={2.5} fill={isWishlisted ? "currentColor" : "none"} /> Add to Private Favorites
                            </button>
                            <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                                <RefreshCw size={16} strokeWidth={2.5} /> Compare Specs
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default QuickViewModal;
