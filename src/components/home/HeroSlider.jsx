import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useBanners } from '../../hooks';
import { sliders as mockSliders } from '../../data/mockData';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const HeroSlider = () => {
    const { data: banners, isLoading } = useBanners();

    // Use CMS banners if available, otherwise fallback to mock
    const slides = (banners && banners.length > 0) ? banners : mockSliders;

    if (isLoading) {
        return <div className="w-full h-[500px] bg-slate-100 animate-pulse rounded-[3rem] container-custom mt-8"></div>;
    }

    return (
        <section className="container-custom mt-6">
            <div className="relative rounded-[3rem] overflow-hidden group shadow-2xl">
                <Swiper
                    modules={[Autoplay, Pagination, EffectFade, Navigation]}
                    effect="fade"
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    className="h-[400px] sm:h-[450px] md:h-[600px]"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={slide.id || slide._id}>
                            <div className="relative w-full h-full">
                                {/* Image with zoom-in animation */}
                                <motion.div
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 10, ease: "linear" }}
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${slide.image})` }}
                                />

                                {/* Professional Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent"></div>

                                {/* Content with Framer Motion */}
                                <div className="relative h-full container-custom flex items-center px-4">
                                    <div className="max-w-2xl space-y-4 md:space-y-6">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                        >
                                            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-600/30 text-blue-400 text-[10px] md:text-xs font-black uppercase tracking-widest mb-4">
                                                {slide.subtitle || 'Exclusive Collection'}
                                            </span>
                                            <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-white leading-[1.1] mb-4 md:mb-6 drop-shadow-2xl">
                                                {slide.title}
                                            </h2>
                                            <p className="text-slate-300 text-sm sm:text-lg md:text-xl font-medium max-w-lg leading-relaxed mb-6 md:mb-8 line-clamp-2 md:line-clamp-none">
                                                {slide.description}
                                            </p>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="btn-premium px-8 md:px-10 py-3 md:py-4 text-sm md:text-lg group"
                                            >
                                                {slide.btnText || 'Explore Now'}
                                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                            </motion.button>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <div className="swiper-button-prev-custom absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white cursor-pointer hover:bg-white hover:text-slate-900 transition-smooth opacity-0 group-hover:opacity-100 hidden md:flex">
                    <ArrowRight className="rotate-180" size={20} />
                </div>
                <div className="swiper-button-next-custom absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white cursor-pointer hover:bg-white hover:text-slate-900 transition-smooth opacity-0 group-hover:opacity-100 hidden md:flex">
                    <ArrowRight size={20} />
                </div>
            </div>

            {/* Trust Badges Strip (Added for visual premium feel) */}
            <div className="mt-[-40px] relative z-30 container-custom flex flex-wrap justify-center gap-4 px-4">
                {[
                    { label: 'Premium Quality', icon: '✨' },
                    { label: 'Secure Checkout', icon: '🔒' },
                    { label: 'Free Global Shipping', icon: '🌍' },
                    { label: '24/7 Support', icon: '🎧' }
                ].map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="bg-white/80 backdrop-blur-xl border border-white shadow-xl px-6 py-3 rounded-2xl flex items-center gap-3"
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-xs font-black text-slate-800 uppercase tracking-widest">{item.label}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HeroSlider;
