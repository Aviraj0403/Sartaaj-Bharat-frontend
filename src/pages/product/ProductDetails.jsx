import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    Star, Heart, Share2, Truck, ShieldCheck, ArrowLeft, ChevronDown,
    Minus, Plus, ShoppingCart, Check, ChevronRight, Sparkles,
    RefreshCw, Award, Zap, Package, Clock, MapPin, Phone, Mail
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ProductCard from "../../components/Product/ProductCard";
import { useProduct, useProducts, useRecommendations } from "../../hooks";
import { addToCartThunk } from "../../features/cart/cartThunk";

const ProductDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data: product, isLoading, error } = useProduct(slug);
    const { data: recommendationsData, isLoading: isRecLoading } = useRecommendations(
        product?._id || product?.id,
        4
    );

    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        if (product) {
            setSelectedVariant(product.variants?.[0] || null);
            setActiveImage(0);
            window.scrollTo(0, 0);
        }
    }, [product]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 font-medium">Loading product...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h2>
                <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Back to Home
                </Link>
            </div>
        );
    }

    const images = product.images?.length > 0 ? product.images : [product.image];
    const currentPrice = selectedVariant?.price || product.price || 0;
    const oldPrice = selectedVariant?.compareAtPrice || product.oldPrice;
    const discount = oldPrice ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100) : 0;

    const handleAddToCart = async () => {
        try {
            const payload = {
                productId: product._id || product.id,
                quantity,
                size: selectedVariant?.size || 'Standard',
                color: selectedVariant?.color || 'Default'
            };
            await dispatch(addToCartThunk(payload)).unwrap();
            toast.success(`${product.name} added to cart!`);
        } catch (err) {
            toast.error(err.message || 'Failed to add to cart');
        }
    };

    return (
        <div className="bg-white min-h-screen pb-24 lg:pb-0">
            {/* Breadcrumb */}
            <div className="bg-slate-50 border-b border-slate-200">
                <div className="container-custom py-3">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <Link to={`/category/${product.categoryId?.slug || ''}`} className="hover:text-blue-600 transition-colors">
                            {product.categoryId?.name || 'Category'}
                        </Link>
                        <ChevronRight size={14} />
                        <span className="text-slate-900 font-medium truncate">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="container-custom py-6 md:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Left: Image Gallery */}
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
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-lg ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-sm text-slate-600 hover:bg-white'
                                        }`}
                                >
                                    <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
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
                                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-blue-600' : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain p-2 bg-slate-50" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="space-y-6">
                        {/* Brand */}
                        {product.brand && (
                            <div className="text-xs text-slate-400 uppercase tracking-widest font-black mb-2">
                                <span className="text-blue-600 italic">{product.brand}</span>
                            </div>
                        )}

                        {/* Product Name */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight italic mb-6">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-4 pb-6 mb-6 border-b border-slate-200">
                            <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl shadow-lg">
                                <Star size={16} fill="#3b82f6" className="text-blue-500" />
                                <span className="font-black italic">{product.rating || '4.8'}</span>
                            </div>
                            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                                Elite Validation
                            </span>
                        </div>

                        {/* Price */}
                        <div className="space-y-2 mb-8">
                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl md:text-5xl font-black text-blue-600 tracking-tighter italic">
                                    ₹{currentPrice.toLocaleString()}
                                </span>
                                {oldPrice && (
                                    <>
                                        <span className="text-2xl text-slate-300 line-through font-bold">
                                            ₹{oldPrice.toLocaleString()}
                                        </span>
                                        <span className="text-green-600 font-black text-sm uppercase tracking-wider">
                                            Save {discount}%
                                        </span>
                                    </>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 font-semibold">Inclusive of all taxes</p>
                        </div>

                        {/* Variants */}
                        {product.variants && product.variants.length > 0 && (
                            <div className="space-y-4 mb-6">
                                <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest italic">Select Configuration</h3>
                                <div className="flex flex-wrap gap-3">
                                    {product.variants.map((v, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedVariant(v)}
                                            className={`px-6 py-3 rounded-xl border-2 font-black text-xs uppercase tracking-wider transition-all ${selectedVariant === v
                                                ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-lg'
                                                : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                                                }`}
                                        >
                                            {v.size} {v.color !== 'Default' ? `- ${v.color}` : ''}
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
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-12 h-12 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-600"
                                    >
                                        <Minus size={18} strokeWidth={3} />
                                    </button>
                                    <span className="w-12 text-center font-black italic text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="w-12 h-12 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-600"
                                    >
                                        <Plus size={18} strokeWidth={3} />
                                    </button>
                                </div>
                                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                                    {product.stock > 0 ? `${product.stock} Available` : 'In Stock'}
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-xl italic"
                                >
                                    <ShoppingCart size={20} />
                                    Acquire
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-xl italic"
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
                                    { icon: ShieldCheck, text: "1 Year Warranty", color: "text-green-600" },
                                    { icon: Truck, text: "Free Delivery", color: "text-blue-600" },
                                    { icon: RefreshCw, text: "7 Days Return", color: "text-orange-600" },
                                    { icon: Zap, text: "Fast Shipping", color: "text-purple-600" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center ${item.color}`}>
                                            <item.icon size={20} />
                                        </div>
                                        <span className="text-sm font-medium text-slate-700">{item.text}</span>
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
                                    <span>Get it by <strong className="text-slate-900">Tomorrow</strong></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Package size={16} className="text-blue-600" />
                                    <span>Free delivery on orders above ₹499</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="mt-12 md:mt-16">
                    <div className="border-b border-slate-200">
                        <div className="flex gap-8 overflow-x-auto no-scrollbar">
                            {['overview', 'specifications', 'reviews'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-4 px-2 font-semibold capitalize whitespace-nowrap transition-colors relative ${activeTab === tab ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="py-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeTab === 'overview' && (
                                    <div className="max-w-4xl space-y-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-4">Product Description</h3>
                                            <div className={`text-slate-700 leading-relaxed ${!showFullDesc && 'line-clamp-4'}`}>
                                                {product.longDescription || product.description}
                                            </div>
                                            {(product.longDescription || product.description)?.length > 200 && (
                                                <button
                                                    onClick={() => setShowFullDesc(!showFullDesc)}
                                                    className="text-blue-600 font-medium mt-2 hover:underline flex items-center gap-1"
                                                >
                                                    {showFullDesc ? 'Show Less' : 'Read More'}
                                                    <ChevronDown size={16} className={`transition-transform ${showFullDesc && 'rotate-180'}`} />
                                                </button>
                                            )}
                                        </div>

                                        {product.features && product.features.length > 0 && (
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 mb-4">Key Features</h3>
                                                <ul className="space-y-2">
                                                    {product.features.map((feature, idx) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                                                            <span className="text-slate-700">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'specifications' && (
                                    <div className="max-w-4xl">
                                        <h3 className="text-xl font-bold text-slate-900 mb-6">Technical Specifications</h3>
                                        {product.details && Object.keys(product.details).length > 0 ? (
                                            <div className="bg-slate-50 rounded-xl overflow-hidden">
                                                {Object.entries(product.details).map(([key, value], idx) => (
                                                    <div
                                                        key={key}
                                                        className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-4 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                                                            }`}
                                                    >
                                                        <div className="font-semibold text-slate-900">{key}</div>
                                                        <div className="md:col-span-2 text-slate-700">{value}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="bg-slate-50 rounded-xl p-8 text-center">
                                                <p className="text-slate-600">Specifications will be updated soon</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'reviews' && (
                                    <div className="max-w-4xl">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-bold text-slate-900">Customer Reviews</h3>
                                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                                Write a Review
                                            </button>
                                        </div>

                                        {/* Rating Summary */}
                                        <div className="bg-slate-50 rounded-xl p-6 mb-8">
                                            <div className="flex flex-col md:flex-row gap-8">
                                                <div className="text-center md:text-left">
                                                    <div className="text-5xl font-bold text-slate-900 mb-2">
                                                        {product.rating || '4.5'}
                                                    </div>
                                                    <div className="flex items-center gap-1 justify-center md:justify-start mb-2">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={20} fill="#fbbf24" className="text-yellow-400" />
                                                        ))}
                                                    </div>
                                                    <p className="text-sm text-slate-600">Based on {product.reviewCount || '1,234'} reviews</p>
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    {[5, 4, 3, 2, 1].map(star => (
                                                        <div key={star} className="flex items-center gap-3">
                                                            <span className="text-sm font-medium text-slate-700 w-8">{star} ★</span>
                                                            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-yellow-400"
                                                                    style={{ width: `${Math.random() * 100}%` }}
                                                                />
                                                            </div>
                                                            <span className="text-sm text-slate-600 w-12 text-right">
                                                                {Math.floor(Math.random() * 500)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Sample Review */}
                                        <div className="space-y-6">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="border border-slate-200 rounded-xl p-6">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <div className="flex items-center gap-1">
                                                                    {[...Array(5)].map((_, idx) => (
                                                                        <Star key={idx} size={16} fill="#fbbf24" className="text-yellow-400" />
                                                                    ))}
                                                                </div>
                                                                <span className="font-semibold text-slate-900">Excellent Product!</span>
                                                            </div>
                                                            <p className="text-sm text-slate-600">by Customer {i} • 2 days ago</p>
                                                        </div>
                                                        <div className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                                                            Verified Purchase
                                                        </div>
                                                    </div>
                                                    <p className="text-slate-700 leading-relaxed">
                                                        Great product with excellent build quality. Highly recommended for anyone looking for premium quality at this price point.
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Related Products / Recommendations */}
                <div className="mt-16 md:mt-24 border-t border-slate-100 pt-16">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                        <div className="text-center md:text-left">
                            <span className="text-[10px] font-black text-blue-600 tracking-[0.3em] uppercase mb-2 block italic">Similar Artifacts</span>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tighter italic">Recommended <span className="text-blue-600">Archive.</span></h2>
                        </div>
                        <Link
                            to={`/category/${product.categoryId?.slug || ''}`}
                            className="bg-slate-50 text-slate-900 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm flex items-center gap-3 italic border border-slate-100"
                        >
                            View Entire Collection <ChevronRight size={14} strokeWidth={3} />
                        </Link>
                    </div>

                    {!isRecLoading && (!recommendationsData || (Array.isArray(recommendationsData) ? recommendationsData.length === 0 : recommendationsData?.products?.length === 0)) ? (
                        <div className="bg-slate-50 rounded-[3rem] p-16 text-center border border-dashed border-slate-200">
                            <Sparkles className="mx-auto text-slate-300 mb-6" size={48} strokeWidth={1} />
                            <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest italic mb-2">No Similar Artifacts Found</h3>
                            <p className="text-slate-400 text-sm font-medium italic">Our curator is still cataloging related items for this specified protocol.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {isRecLoading ? (
                                [...Array(4)].map((_, i) => (
                                    <div key={i} className="aspect-[4/5] bg-slate-50 animate-pulse rounded-[2rem]"></div>
                                ))
                            ) : (
                                (Array.isArray(recommendationsData) ? recommendationsData : recommendationsData?.products || []).slice(0, 4).map(p => (
                                    <ProductCard key={p._id || p.id} product={p} />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Sticky Footer */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200 p-4 lg:hidden z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]"
            >
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 leading-none block mb-1">Elite Artifact</span>
                        <span className="text-sm font-black text-slate-900 truncate block tracking-tight italic">
                            {product.name}
                        </span>
                        <span className="text-blue-600 font-bold text-xs italic">
                            ₹{(selectedVariant?.price || product.price || 0).toLocaleString()}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all ${isWishlisted ? 'bg-red-50 border-red-500 text-red-500' : 'border-slate-200 text-slate-400'
                            }`}
                    >
                        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                    <button
                        onClick={handleAddToCart}
                        className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-xl italic"
                    >
                        <ShoppingCart size={16} />
                        Acquire
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default ProductDetails;
