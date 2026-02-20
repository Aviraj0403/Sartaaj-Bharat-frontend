import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    Star, Heart, Share2, Truck, ShieldCheck, ArrowLeft,
    Minus, Plus, ShoppingCart, Check, Twitter, Facebook,
    Instagram, ChevronRight, Sparkles, Box, RefreshCw,
    Cpu, Activity, Zap, HardDrive, Layout
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ProductCard from "../../components/Product/ProductCard";
import { useProduct, useProducts } from "../../hooks";
import { addToCartThunk } from "../../features/cart/cartThunk";

const MobileBuyBar = ({ product, onAcquire, selectedVariant, isWishlisted, onWishlist }) => (
    <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-16 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-100 p-4 z-50 md:hidden flex items-center gap-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]"
    >
        <div className="flex-1 flex flex-col justify-center">
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Elite Artifact</span>
            <span className="text-sm font-black text-slate-900 truncate tracking-tighter italic">
                {product.name}
            </span>
            <span className="text-blue-600 font-bold text-xs italic">
                ₹{(selectedVariant?.price || product.price || 0).toLocaleString()}
            </span>
        </div>
        <div className="flex gap-2">
            <button
                onClick={onWishlist}
                className={`w-12 h-12 flex items-center justify-center border-2 rounded-xl transition-all ${isWishlisted ? 'bg-red-50 border-red-100 text-red-500' : 'bg-white border-slate-100 text-slate-300'}`}
            >
                <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
            <button
                onClick={onAcquire}
                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 flex items-center gap-2 italic shadow-lg"
            >
                <ShoppingCart size={14} /> Acquire
            </button>
        </div>
    </motion.div>
);

const ProductDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const containerRef = useRef(null);

    // 3D Tilt Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

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
                <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Syncing Specs...</span>
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
        <div className="bg-white min-h-screen font-sans selection:bg-blue-600 selection:text-white">
            {/* Breadcrumb - Elite Essence */}
            <div className="bg-slate-50/50 border-b border-slate-100 py-6">
                <div className="container-custom flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-start">

                    {/* Left: 3D Gallery Canvas */}
                    <div className="flex flex-col-reverse md:flex-row gap-8 sticky top-32">
                        {/* Thumbnails Spectrum */}
                        <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24">
                            {images.map((img, idx) => (
                                    <motion.button
                                    key={idx}
                                    whileHover={{ y: -5, scale: 1.05 }}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative aspect-square rounded-3xl overflow-hidden border transition-all p-3 bg-white ${activeImage === idx ? 'border-blue-600 shadow-2xl shadow-blue-100' : 'border-slate-100 hover:border-slate-300'}`}
                                >
                                    <img src={img} className="w-full h-full object-contain mix-blend-multiply" alt={`View ${idx + 1}`} />
                                </motion.button>
                            ))}
                        </div>

                        {/* Elite Master Canvas with 3D Interaction */}
                        <div
                            ref={containerRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            className="flex-1 aspect-square rounded-[3.5rem] bg-slate-50 border border-slate-100 p-6 md:p-12 relative overflow-hidden group perspective-1000"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeImage}
                                    style={{
                                        rotateX,
                                        rotateY,
                                        transformStyle: "preserve-3d"
                                    }}
                                    className="w-full h-full relative"
                                >
                                    <motion.img
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        src={images[activeImage]}
                                        className="w-full h-full object-contain mix-blend-multiply drop-shadow-[0_40px_60px_rgba(37,99,235,0.2)]"
                                        alt={product.name}
                                    />
                                    {/* Subtle Glass Glare */}
                                    <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                            </AnimatePresence>

                            <div className="absolute top-8 left-8">
                                <span className="glass-surface text-slate-900 text-[10px] font-black px-6 py-3 rounded-2xl uppercase tracking-[0.4em] shadow-xl flex items-center gap-2 italic border border-white/50">
                                    <Sparkles size={14} className="text-blue-600 animate-pulse" /> Ultimate Artifact
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Technical Specifications & Acquisition */}
                    <div className="flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-12"
                        >
                            <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.6em] mb-6 block italic">
                                {product.brand || 'Elite Series .26'}
                            </span>
                            <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 leading-[0.9] tracking-tighter italic">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-8 mb-12 pb-12 border-b border-slate-100">
                                <div className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-2xl shadow-xl shadow-slate-200">
                                    <Star size={16} className="fill-blue-500 text-blue-500" />
                                    <span className="text-base font-black italic">{product.rating || '5.0'}</span>
                                </div>
                                <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] italic leading-tight">
                                    Elite Validation <br /> Verified Selection
                                </span>
                                <div className="h-10 w-px bg-slate-100 ml-auto hidden md:block"></div>
                                <div className="hidden md:flex flex-col ml-8 items-end">
                                    <span className="text-blue-600 font-black text-xs tracking-widest uppercase">Available</span>
                                    <span className="text-slate-400 text-[8px] font-bold uppercase">Ships Worldwide</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 mb-12">
                                <span className="text-6xl md:text-8xl font-black text-blue-600 tracking-tighter italic drop-shadow-sm">
                                    ₹{(selectedVariant?.price || product.price || 0).toLocaleString()}
                                </span>
                                {(selectedVariant?.compareAtPrice || product.oldPrice) && (
                                    <div className="flex flex-col">
                                        <span className="text-slate-300 line-through text-3xl font-bold">
                                            ₹{(selectedVariant?.compareAtPrice || product.oldPrice).toLocaleString()}
                                        </span>
                                        <motion.span
                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic"
                                        >
                                            Priority Offer
                                        </motion.span>
                                    </div>
                                )}
                            </div>

                            <p className="text-slate-500 text-xl font-medium leading-[1.8] mb-12 max-w-xl italic">
                                {product.description}
                            </p>
                        </motion.div>

                        {/* Configuration Matrix */}
                        <div className="bg-slate-50/70 rounded-[3rem] p-10 md:p-12 border border-slate-100 mb-12 shadow-inner">
                            {product.variants && product.variants.length > 0 && (
                                <div className="mb-12">
                                    <div className="flex justify-between items-center mb-8">
                                        <span className="font-black text-slate-950 text-[10px] uppercase tracking-[0.4em] italic flex items-center gap-2">
                                            <Box size={14} className="text-blue-600" /> Configuration Matrix
                                        </span>
                                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Select Preference</span>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {product.variants.map((v, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedVariant(v)}
                                                className={`px-8 py-5 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all duration-700 relative overflow-hidden flex-1 md:flex-none min-w-[120px] ${selectedVariant === v ? 'border-blue-600 bg-white text-blue-600 shadow-2xl shadow-blue-100' : 'border-white bg-white/50 text-slate-400 hover:border-slate-200 hover:bg-white'}`}
                                            >
                                                {selectedVariant === v && (
                                                    <motion.div layoutId="variant-bg" className="absolute inset-0 bg-blue-50/10 pointer-events-none" />
                                                )}
                                                <span className="relative z-10">{v.size} {v.color !== 'Default' ? `- ${v.color}` : ''}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex items-center bg-white rounded-2xl p-2 border border-slate-100 shadow-sm">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-14 h-14 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all flex items-center justify-center">
                                        <Minus size={18} strokeWidth={3} />
                                    </button>
                                    <span className="w-12 text-center text-lg font-black italic">{quantity}</span>
                                    <button onClick={() => setQuantity(q => q + 1)} className="w-14 h-14 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all flex items-center justify-center">
                                        <Plus size={18} strokeWidth={3} />
                                    </button>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.35em] hover:bg-blue-600 transition-all shadow-3xl shadow-slate-200 flex items-center justify-center gap-4 italic relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-linear-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <ShoppingCart size={22} strokeWidth={2.5} className="relative z-10" />
                                    <span className="relative z-10">Acquire Artifact</span>
                                </motion.button>

                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`w-20 h-20 flex items-center justify-center border-2 rounded-2xl transition-all duration-700 ${isWishlisted ? 'bg-red-50 border-red-500 text-red-500 shadow-2xl shadow-red-100' : 'bg-white border-slate-100 text-slate-300 hover:border-slate-900 hover:text-slate-900'}`}
                                >
                                    <Heart size={28} strokeWidth={2.5} fill={isWishlisted ? "currentColor" : "none"} />
                                </button>
                            </div>
                        </div>

                        {/* Reassurance Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: ShieldCheck, title: "Secured", sub: "Priority Vault" },
                                { icon: Truck, title: "Velocity", sub: "Nexus Shipping" },
                                { icon: RefreshCw, title: "Stability", sub: "Premium Return" }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="flex gap-4 p-8 border border-slate-100 rounded-[2.5rem] bg-white group hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-500"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                        <item.icon size={20} strokeWidth={2.5} />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 italic">{item.title}</span>
                                        <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400 mt-1">{item.sub}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tech Nexus Hub (Information Tabs) */}
                <div className="mt-40 md:mt-60">
                    <div className="flex items-center justify-center gap-12 md:gap-24 border-b border-slate-100 mb-20 pb-10">
                        {['description', 'specifications', 'reviews'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-[10px] md:text-xs font-black uppercase tracking-[0.5em] relative transition-all italic ${activeTab === tab ? 'text-blue-600 scale-110' : 'text-slate-300 hover:text-slate-900'}`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div layoutId="tab-indicator" className="absolute -bottom-10 left-0 w-full h-1.5 bg-blue-600 rounded-full shadow-[0_5px_15px_rgba(37,99,235,0.4)]" />
                                )}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-5xl mx-auto"
                        >
                            {activeTab === 'description' && (
                                <div className="prose prose-slate max-w-none text-center">
                                    <p className="text-2xl md:text-3xl font-medium text-slate-700 leading-[2.2] italic px-4">
                                        {product.longDescription || product.description}
                                    </p>
                                </div>
                            )}
                            {activeTab === 'specifications' && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {Object.entries(product.details || {}).map(([key, value], i) => (
                                        <motion.div
                                            key={key}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="glass-surface p-10 rounded-[2.5rem] border border-slate-100 group hover:border-blue-200 transition-all duration-500"
                                        >
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                    {i % 3 === 0 ? <Cpu size={18} /> : i % 3 === 1 ? <Activity size={18} /> : <Zap size={18} />}
                                                </div>
                                                <dt className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">{key}</dt>
                                            </div>
                                            <dd className="text-xl font-black text-slate-950 tracking-tight italic">{value}</dd>
                                        </motion.div>
                                    ))}
                                    {/* Default Spec Pads for visual fullness */}
                                    <div className="glass-surface p-10 rounded-[2.5rem] border border-blue-100/30 bg-blue-50/5 group">
                                        <div className="flex items-center gap-3 mb-6 text-blue-600">
                                            <Layout size={18} />
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] italic text-blue-400">Inventory</span>
                                        </div>
                                        <span className="text-xl font-black text-slate-950 italic">Priority Reserve</span>
                                    </div>
                                    <div className="glass-surface p-10 rounded-[2.5rem] border border-orange-100/30 bg-orange-50/5">
                                        <div className="flex items-center gap-3 mb-6 text-orange-600">
                                            <HardDrive size={18} />
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] italic text-orange-400">Vault</span>
                                        </div>
                                        <span className="text-xl font-black text-slate-950 italic">Archive Core</span>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'reviews' && (
                                <div className="text-center py-24 glass-surface rounded-[4rem] border border-slate-100 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-600 to-indigo-600"></div>
                                    <div className="flex justify-center gap-3 text-blue-600 mb-10">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={32} fill="currentColor" strokeWidth={0} />)}
                                    </div>
                                    <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 italic tracking-tighter">ELITE VALIDATION</h3>
                                    <p className="text-slate-500 text-xl md:text-2xl font-medium italic mb-12 px-8 leading-relaxed max-w-3xl mx-auto">
                                        "The refinement of this artifact exceeds all typical industry standards. A true benchmark of contemporary excellence."
                                    </p>
                                    <div className="flex flex-col items-center">
                                        <span className="text-sm font-black uppercase tracking-[0.5em] text-slate-900 border-b-2 border-slate-900 pb-2 mb-4">DR. ALARIC VANCE</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Master Collector / Elite Segment</span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Related Curations Hub */}
                {relatedData?.products?.length > 1 && (
                    <div className="mt-48 pt-48 border-t border-slate-100">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-20 px-4 gap-8">
                            <div>
                                <span className="text-blue-600 font-black text-xs uppercase tracking-[0.6em] mb-6 block italic">Elite Matches</span>
                                <h2 className="text-5xl md:text-7xl font-black text-slate-900 italic tracking-tighter leading-none">EQUATIONS <span className="text-blue-600">OF</span> STYLE</h2>
                            </div>
                            <Link to={`/category/${product.category}`} className="btn-premium-outline group min-w-[220px]">
                                Explore Universe <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform duration-500" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                            {relatedData.products
                                .filter(p => p._id !== product._id)
                                .slice(0, 4)
                                .map((p, i) => (
                                    <motion.div
                                        key={p._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <ProductCard product={p} />
                                    </motion.div>
                                ))
                            }
                        </div>
                    </div>
                )}
            </main>

            {/* Beast level Mobile Buy Bar */}
            <MobileBuyBar
                product={product}
                onAcquire={handleAddToCart}
                selectedVariant={selectedVariant}
                isWishlisted={isWishlisted}
                onWishlist={() => setIsWishlisted(!isWishlisted)}
            />

        </div>
    );
};

export default ProductDetails;
