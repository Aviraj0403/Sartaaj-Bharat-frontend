import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const FM = motion;
import { ArrowRight, Sparkles, Star, Zap, Shield } from 'lucide-react';
import { useBanners } from '../../hooks';
import { sliders as mockSliders } from '../../data/mockData';

const EliteHeroSlider = () => {
    const { data: banners, isLoading } = useBanners();
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = (banners && banners.length > 0) ? banners : mockSliders;

    // Auto-advance
    React.useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [slides.length]);

    if (isLoading) {
        return (
            <div className="container-custom mt-8">
                <div className="w-full h-[500px] md:h-[700px] bg-slate-900/10 animate-pulse rounded-3xl md:rounded-[2rem] flex items-center justify-center border border-slate-200">
                    <Sparkles className="text-slate-300 animate-spin-slow" size={48} />
                </div>
            </div>
        );
    }

    const currentSlide = slides[currentIndex];

    return (
        <section className="relative overflow-hidden pb-6 md:pb-10">
            <div className="w-full">
                {/* <div className="relative h-[380px] sm:h-[480px] md:h-[650px] lg:h-screen overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] group bg-slate-900"> */}
                <div className="relative h-[380px] sm:h-[480px] md:h-[650px] lg:h-screen overflow-hidden rounded-[2rem] md:rounded-[2rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] group bg-slate-900">

                    {/* Background Layers with Parallax */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0"
                        >
                            <img
                                src={currentSlide.image}
                                alt={currentSlide.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900/60 to-transparent"></div>
                            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent"></div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 z-10 flex items-center">
                        <div className="container-custom px-6 sm:px-8 md:px-24">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="max-w-3xl space-y-6 md:space-y-8"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="flex items-center gap-3 bg-blue-600/20 backdrop-blur-xl border border-blue-500/30 text-blue-400 text-[9px] md:text-xs font-black px-4 md:px-6 py-2 md:py-2.5 rounded-full uppercase tracking-[0.3em] w-fit"
                                    >
                                        <Sparkles size={14} className="animate-pulse" />
                                        {currentSlide.subtitle || 'Elite Global Collection'}
                                    </motion.div>

                                    <motion.h2
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter italic"
                                    >
                                        {currentSlide.title.split(' ').map((word, i) => (
                                            <span key={i} className={i % 2 !== 0 ? 'text-blue-500 block md:inline md:ml-4' : 'block'}>
                                                {word}
                                            </span>
                                        ))}
                                    </motion.h2>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-slate-400 text-sm sm:text-lg md:text-2xl font-medium max-w-xl leading-relaxed line-clamp-2 md:line-clamp-none"
                                    >
                                        {currentSlide.description || "Experience the pinnacle of technology and luxury craftsmanship."}
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="flex flex-wrap gap-6"
                                    >
                                        <button className="btn-premium px-12 py-5 text-xl group relative overflow-hidden">
                                            <span className="relative z-10 flex items-center gap-3">
                                                Discover Selection <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-500" />
                                            </span>
                                            <motion.div
                                                className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            />
                                        </button>

                                        <div className="hidden md:flex items-center gap-4 text-white/50">
                                            <div className="h-12 w-px bg-white/20"></div>
                                            <div className="flex flex-col">
                                                <span className="text-white font-black text-xl italic tracking-tighter uppercase leading-none">Limitless</span>
                                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Performance</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Progress Indicators */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className="relative h-1.5 transition-all duration-500 ease-out"
                                style={{ width: i === currentIndex ? '60px' : '20px' }}
                            >
                                <div className={`absolute inset-0 rounded-full ${i === currentIndex ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]' : 'bg-white/20 hover:bg-white/40'}`}></div>
                                {i === currentIndex && (
                                    <motion.div
                                        layoutId="activeBar"
                                        className="absolute inset-0 bg-white/20 rounded-full"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Floating Side Note */}
                    {/* <div className="absolute top-1/2 -translate-y-1/2 right-12 hidden xl:block"> */}
                    <div className="absolute inset-0 flex items-center justify-center hidden xl:flex pointer-events-none opacity-20">
                        <span className="text-white/5 text-6xl lg:text-8xl font-black italic tracking-tighter select-none whitespace-nowrap">
                            SARTAAJ BHARAT
                        </span>
                    </div>
                </div>

                {/* Luxury Advantage Strip - Professional Design */}
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-10 relative z-30 px-2 sm:px-4">
                        {[
                            { title: 'Global Warranty', desc: 'Secure Coverage', icon: Shield, color: 'blue' },
                            { title: 'Nexus Shipping', desc: 'Ultra-fast Delivery', icon: Zap, color: 'orange' },
                            { title: 'High Fidelity', desc: 'Curated Quality', icon: Star, color: 'blue' },
                            { title: 'Expert Consult', desc: 'Elite Assistance', icon: Sparkles, color: 'orange' }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08, duration: 0.5 }}
                                whileHover={{ y: -4, scale: 1.02 }}
                                className="bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] group cursor-default transition-all duration-300"
                            >
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-12 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 ${item.color === 'blue'
                                    ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                                    : 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white'
                                    } shadow-sm group-hover:shadow-lg`}>
                                    <item.icon size={20} strokeWidth={2.5} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                </div>
                                <h4 className="font-black text-slate-900 group-hover:text-blue-600 transition-colors text-[10px] sm:text-xs md:text-sm italic uppercase tracking-tight mb-1 leading-tight">
                                    {item.title}
                                </h4>
                                <p className="text-[8px] sm:text-[9px] md:text-[10px] text-slate-500 font-semibold uppercase tracking-[0.15em] leading-tight">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EliteHeroSlider;
