import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
                <div className="w-full h-[500px] md:h-[700px] bg-slate-900/10 animate-pulse rounded-[4rem] flex items-center justify-center border border-slate-200">
                    <Sparkles className="text-slate-300 animate-spin-slow" size={48} />
                </div>
            </div>
        );
    }

    const currentSlide = slides[currentIndex];

    return (
        <section className="relative overflow-hidden pt-8 pb-16">
            <div className="container-custom">
                <div className="relative h-[550px] md:h-[750px] rounded-[4rem] md:rounded-[5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] group bg-slate-900">

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
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 z-10 flex items-center">
                        <div className="container-custom px-8 md:px-24">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="max-w-3xl space-y-8"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="flex items-center gap-3 bg-blue-600/20 backdrop-blur-xl border border-blue-500/30 text-blue-400 text-[10px] md:text-xs font-black px-6 py-2.5 rounded-full uppercase tracking-[0.3em] w-fit"
                                    >
                                        <Sparkles size={14} className="animate-pulse" />
                                        {currentSlide.subtitle || 'Elite Global Collection'}
                                    </motion.div>

                                    <motion.h2
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                        className="text-5xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter italic"
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
                                        className="text-slate-400 text-lg md:text-2xl font-medium max-w-xl leading-relaxed"
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
                                                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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
                    <div className="absolute top-24 right-[-50px] rotate-90 hidden xl:block">
                        <span className="text-white/10 text-9xl font-black italic tracking-tighter select-none whitespace-nowrap">
                            SARTAAJ BHARAT
                        </span>
                    </div>
                </div>

                {/* Luxury Advantage Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-[-60px] relative z-30 px-4">
                    {[
                        { title: 'Global Warranty', desc: 'Secure Coverage', icon: Shield, color: 'blue' },
                        { title: 'Nexus Shipping', desc: 'Ultra-fast Delivery', icon: Zap, color: 'orange' },
                        { title: 'High Fidelity', desc: 'Curated Quality', icon: Star, color: 'blue' },
                        { title: 'Expert Consult', desc: 'Elite Assistance', icon: Sparkles, color: 'orange' }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="glass-surface p-6 md:p-8 rounded-[2.5rem] border border-white/40 shadow-2xl group cursor-default"
                        >
                            <div className={`p-4 rounded-2xl mb-4 inline-block ${item.color === 'blue' ? 'bg-blue-600/10 text-blue-600' : 'bg-orange-500/10 text-orange-600'} group-hover:bg-slate-900 group-hover:text-white transition-smooth shadow-sm`}>
                                <item.icon size={28} />
                            </div>
                            <h4 className="font-black text-slate-850 group-hover:text-blue-600 transition-smooth text-sm md:text-lg italic uppercase tracking-tighter mb-1">{item.title}</h4>
                            <p className="text-[10px] md:text-sm text-slate-500 font-bold uppercase tracking-widest">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EliteHeroSlider;
