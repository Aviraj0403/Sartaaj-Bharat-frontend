import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    Star, Heart, Share2, Truck, ShieldCheck, ArrowLeft,
    Minus, Plus, ShoppingCart, Check, Twitter, Facebook,
    Instagram, ChevronRight, Sparkles, Box, RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import ProductCard from "../../components/Product/ProductCard";
import { useProduct, useProducts } from "../../hooks";
import { addToCartThunk } from "../../features/cart/cartThunk";

const ProductDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Elite Data Fetching
    const { data: product, isLoading, error } = useProduct(slug);
    const { data: relatedData } = useProducts({
        category: product?.categoryId?._id || product?.categoryId,
        limit: 4
    });

    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Synchronize initial state when data arrives
    useEffect(() => {
        if (product) {
            setSelectedVariant(product.variants?.[0] || null);
            setActiveImage(0);
            window.scrollTo(0, 0);
        }
    }, [product]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full mb-4"
                />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Archiving Specs...</span>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
                <h2 className="text-2xl font-black text-slate-900 mb-4 italic">Artifact Not Found</h2>
                <Link to="/" className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all">Return to Lounge</Link>
            </div>
        );
    }

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
        } catch (err) {
            toast.error(err.message || 'Acquisition failed');
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">
            <Header />

            {/* Breadcrumb - Signature Style */}
            <div className="bg-slate-50 border-b border-slate-100 py-6">
                <div className="container-custom flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <Link to="/" className="hover:text-blue-600 transition-colors">Lounge</Link>
                    <ChevronRight size={10} strokeWidth={3} />
                    <Link
                        to={`/category/${product.categoryId?.slug || product.categoryId}`}
                        className="hover:text-blue-600 transition-colors"
                    >
                        {product.categoryId?.name || product.categoryId}
                    </Link>
                    <ChevronRight size={10} strokeWidth={3} />
                    <span className="text-slate-900 italic">{product.name}</span>
                </div>
            </div>

            <main className="container-custom py-12 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

                    {/* Left: Immersive Gallery */}
                    <div className="flex flex-col-reverse md:flex-row gap-8 sticky top-32">
                        {/* Thumbnails Matrix */}
                        <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24">
                            {images.map((img, idx) => (
                                <motion.button
                                    key={idx}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative aspect-square rounded-3xl overflow-hidden border-2 transition-all p-2 bg-white ${activeImage === idx ? 'border-blue-600 shadow-xl shadow-blue-100' : 'border-slate-100 hover:border-slate-300'}`}
                                >
                                    <img src={img} className="w-full h-full object-contain mix-blend-multiply" alt={`View ${idx + 1}`} />
                                </motion.button>
                            ))}
                        </div>

                        {/* Master Canvas */}
                        <div className="flex-1 aspect-square rounded-[3rem] bg-slate-50 border border-slate-100 p-12 relative overflow-hidden group">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImage}
                                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 1.1, rotate: 2 }}
                                    transition={{ duration: 0.6, ease: "circOut" }}
                                    src={images[activeImage]}
                                    className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl"
                                    alt={product.name}
                                />
                            </AnimatePresence>

                            <div className="absolute top-8 left-8">
                                {product.isFeatured && (
                                    <span className="bg-slate-900 text-white text-[10px] font-black px-5 py-2.5 rounded-2xl uppercase tracking-[0.3em] shadow-2xl flex items-center gap-2 italic border border-slate-700">
                                        <Sparkles size={12} className="text-blue-400" /> Signature Essence
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Technical Specs & Acquisition */}
                    <div className="flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-12"
                        >
                            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.5em] mb-4 block italic">
                                {product.brand || 'Elite Series'}
                            </span>
                            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tighter italic">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-8 mb-10 pb-10 border-b border-slate-100">
                                <div className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-2xl shadow-xl">
                                    <Star size={14} className="fill-blue-400 text-blue-400" />
                                    <span className="text-sm font-black">{product.rating || '5.0'}</span>
                                </div>
                                <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] italic">
                                    Trusted by 2.4k+ Collectors
                                </span>
                            </div>

                            <div className="flex items-baseline gap-6 mb-12">
                                <span className="text-6xl font-black text-blue-600 tracking-tighter italic">
                                    ₹{(selectedVariant?.price || product.price || 0).toLocaleString()}
                                </span>
                                {(selectedVariant?.compareAtPrice || product.oldPrice) && (
                                    <div className="flex flex-col">
                                        <span className="text-slate-300 line-through text-2xl font-bold">
                                            ₹{(selectedVariant?.compareAtPrice || product.oldPrice).toLocaleString()}
                                        </span>
                                        <span className="text-orange-500 text-[10px] font-black uppercase tracking-widest mt-1">
                                            Excl. Preference
                                        </span>
                                    </div>
                                )}
                            </div>

                            <p className="text-slate-500 text-lg font-medium leading-[1.8] mb-12 max-w-xl">
                                {product.description}
                            </p>
                        </motion.div>

                        {/* Configuration Hub */}
                        <div className="bg-slate-50/50 rounded-[2.5rem] p-10 border border-slate-100 mb-12">
                            {product.variants && product.variants.length > 0 && (
                                <div className="mb-12">
                                    <span className="font-black text-slate-900 text-[10px] uppercase tracking-[0.3em] block mb-6 italic">Configuration Matrix</span>
                                    <div className="flex flex-wrap gap-4">
                                        {product.variants.map((v, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedVariant(v)}
                                                className={`px-8 py-4 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${selectedVariant === v ? 'border-blue-600 bg-white text-blue-600 shadow-2xl shadow-blue-100 scale-105' : 'border-white bg-white/50 text-slate-400 hover:border-slate-200'}`}
                                            >
                                                {v.size} {v.color !== 'Default' ? `- ${v.color}` : ''}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex items-center bg-white rounded-[1.5rem] p-2 border border-slate-100 shadow-sm">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-12 h-12 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all flex items-center justify-center">
                                        <Minus size={16} strokeWidth={3} />
                                    </button>
                                    <span className="w-10 text-center text-sm font-black italic">{quantity}</span>
                                    <button onClick={() => setQuantity(q => q + 1)} className="w-12 h-12 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all flex items-center justify-center">
                                        <Plus size={16} strokeWidth={3} />
                                    </button>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-slate-900 text-white px-10 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-4 italic"
                                >
                                    <ShoppingCart size={20} strokeWidth={2.5} /> Acquire Artifact
                                </motion.button>

                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`w-16 h-16 flex items-center justify-center border-2 rounded-[1.5rem] transition-all duration-500 ${isWishlisted ? 'bg-red-50 border-red-100 text-red-500 shadow-xl shadow-red-100' : 'bg-white border-slate-100 text-slate-300 hover:border-slate-900 hover:text-slate-900'}`}
                                >
                                    <Heart size={24} strokeWidth={2.5} fill={isWishlisted ? "currentColor" : "none"} />
                                </button>
                            </div>
                        </div>

                        {/* Reassurance Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: ShieldCheck, title: "Secured", sub: "AES-256 Vault" },
                                { icon: Truck, title: "Priority", sub: "Elite Logistics" },
                                { icon: RefreshCw, title: "Lounge Flex", sub: "30-Day Policy" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 p-6 border border-slate-100 rounded-[2rem] bg-slate-50/30 group hover:bg-white hover:shadow-xl transition-all duration-500">
                                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <item.icon size={20} strokeWidth={2.5} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{item.title}</span>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">{item.sub}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Information Nexus (Tabs) */}
                <div className="mt-40">
                    <div className="flex items-center justify-center gap-16 border-b border-slate-100 mb-20 pb-8">
                        {['description', 'specifications', 'reviews'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-[10px] font-black uppercase tracking-[0.4em] relative transition-colors italic ${activeTab === tab ? 'text-blue-600' : 'text-slate-300 hover:text-slate-900'}`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div layoutId="tab-underline" className="absolute -bottom-8 left-0 w-full h-1 bg-blue-600 rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-4xl mx-auto px-4"
                        >
                            {activeTab === 'description' && (
                                <div className="prose prose-slate max-w-none">
                                    <p className="text-xl font-medium text-slate-600 leading-[2] italic text-center">
                                        {product.longDescription || product.description}
                                    </p>
                                </div>
                            )}
                            {activeTab === 'specifications' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
                                    {Object.entries(product.details || {}).map(([key, value]) => (
                                        <div key={key} className="flex flex-col border-b border-slate-100 pb-6 group">
                                            <dt className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 group-hover:text-blue-600 transition-colors italic">{key}</dt>
                                            <dd className="text-lg font-black text-slate-900 tracking-tight">{value}</dd>
                                        </div>
                                    ))}
                                    <div className="flex flex-col border-b border-slate-100 pb-6">
                                        <dt className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 italic">Inventory Status</dt>
                                        <dd className="text-lg font-black text-slate-900 tracking-tight">160 Units in Vault</dd>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'reviews' && (
                                <div className="text-center py-20 bg-slate-50/50 rounded-[3rem] border border-slate-100">
                                    <div className="flex justify-center gap-2 text-blue-500 mb-8">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-6 italic tracking-tighter">Pinnacle of Engineering</h3>
                                    <p className="text-slate-500 font-medium italic mb-10">"The refinement of this artifact exceeds all typical industry standards. A true benchmark."</p>
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900">Dr. Alaric Vance / Collector</span>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Related Curations */}
                {relatedData?.products?.length > 1 && (
                    <div className="mt-48 pt-48 border-t border-slate-100">
                        <div className="flex justify-between items-end mb-16 px-4">
                            <div>
                                <span className="text-blue-600 font-black text-xs uppercase tracking-[0.5em] mb-4 block italic">Curated Matches</span>
                                <h2 className="text-4xl md:text-5xl font-black text-slate-900 italic tracking-tighter">Extend Your Collection</h2>
                            </div>
                            <Link to={`/category/${product.category}`} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-3">
                                Explore Category <ArrowLeft size={14} className="rotate-180" strokeWidth={3} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                            {relatedData.products
                                .filter(p => p._id !== product._id)
                                .slice(0, 4)
                                .map(p => <ProductCard key={p._id} product={p} />)
                            }
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetails;
