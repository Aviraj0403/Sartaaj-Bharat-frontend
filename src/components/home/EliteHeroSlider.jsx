// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// const FM = motion;
// import { ArrowRight, Sparkles, Star, Zap, Shield } from "lucide-react";
// import { useBanners } from "../../hooks";
// import { sliders as mockSliders } from "../../data/mockData";

// const EliteHeroSlider = () => {
//   const { data: banners, isLoading } = useBanners();
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const slides = banners && banners.length > 0 ? banners : mockSliders;

//   // Auto-advance
//   React.useEffect(() => {
//     if (slides.length <= 1) return;
//     const timer = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % slides.length);
//     }, 8000);
//     return () => clearInterval(timer);
//   }, [slides.length]);

//   if (isLoading) {
//     return (
//       <div className="container-custom mt-8">
//         <div className="w-full h-[500px] md:h-[700px] bg-slate-900/10 animate-pulse rounded-3xl md:rounded-[2rem] flex items-center justify-center border border-slate-200">
//           <Sparkles className="text-slate-300 animate-spin-slow" size={48} />
//         </div>
//       </div>
//     );
//   }

//   const currentSlide = slides[currentIndex];

//   return (
//     <section className="relative overflow-hidden pt-4 pb-6 md:pb-10 bg-slate-50">
//       <div className="w-full px-4 sm:px-6 md:px-8">
//         <div className="relative h-[480px] sm:h-[550px] md:h-[650px] lg:h-[80vh] overflow-hidden rounded-[2.5rem] md:rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] group bg-slate-950 border border-slate-800">
//           {/* Background Layers with Parallax */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentIndex}
//               initial={{ scale: 1.2, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
//               className="absolute inset-0"
//             >
//               <img
//                 src={currentSlide.image}
//                 alt={currentSlide.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900/60 to-transparent"></div>
//               <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent"></div>
//             </motion.div>
//           </AnimatePresence>

//           {/* Content Overlay */}
//           <div className="absolute inset-0 z-10 flex items-center">
//             <div className="container-custom px-6 sm:px-8 md:px-16">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={currentIndex}
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 20 }}
//                   transition={{ duration: 0.8, ease: "easeOut" }}
//                   className="max-w-3xl space-y-6 md:space-y-8"
//                 >
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     className="flex items-center gap-3 bg-blue-600/20 backdrop-blur-xl border border-blue-500/30 text-blue-400 text-[9px] md:text-xs font-black px-4 md:px-6 py-2 md:py-2.5 rounded-full uppercase tracking-[0.3em] w-fit"
//                   >
//                     <Sparkles size={14} className="animate-pulse" />
//                     {currentSlide.subtitle || "Premium Collection"}
//                   </motion.div>

//                   <motion.h2
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3, duration: 0.8 }}
//                     className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter italic"
//                   >
//                     {currentSlide.title.split(" ").map((word, i) => (
//                       <span
//                         key={i}
//                         className={
//                           i % 2 !== 0
//                             ? "text-blue-500 block md:inline md:ml-4"
//                             : "block"
//                         }
//                       >
//                         {word}
//                       </span>
//                     ))}
//                   </motion.h2>

//                   <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.5 }}
//                     className="text-slate-400 text-sm sm:text-lg md:text-2xl font-medium max-w-xl leading-relaxed line-clamp-2 md:line-clamp-none"
//                   >
//                     {currentSlide.description ||
//                       "Experience the pinnacle of technology and luxury craftsmanship."}
//                   </motion.p>

//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.6 }}
//                     className="flex flex-wrap gap-6"
//                   >
//                     <button className="btn-premium px-8 md:px-10 py-3.5 md:py-4.5 text-base md:text-lg group relative overflow-hidden">
//                       <span className="relative z-10 flex items-center gap-3">
//                         Shop Collection{" "}
//                         <ArrowRight
//                           size={20}
//                           className="group-hover:translate-x-2 transition-transform duration-500"
//                         />
//                       </span>
//                       <motion.div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                     </button>

//                     <div className="hidden md:flex items-center gap-4 text-white/50">
//                       <div className="h-12 w-px bg-white/20"></div>
//                       <div className="flex flex-col">
//                         <span className="text-white font-black text-xl italic tracking-tighter uppercase leading-none">
//                           Limitless
//                         </span>
//                         <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
//                           Performance
//                         </span>
//                       </div>
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* Progress Indicators */}
//           <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
//             {slides.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentIndex(i)}
//                 className="relative h-1.5 transition-all duration-500 ease-out"
//                 style={{ width: i === currentIndex ? "60px" : "20px" }}
//               >
//                 <div
//                   className={`absolute inset-0 rounded-full ${i === currentIndex ? "bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]" : "bg-white/20 hover:bg-white/40"}`}
//                 ></div>
//                 {i === currentIndex && (
//                   <motion.div
//                     layoutId="activeBar"
//                     className="absolute inset-0 bg-white/20 rounded-full"
//                     initial={false}
//                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   />
//                 )}
//               </button>
//             ))}
//           </div>

//           <div className="absolute inset-0 flex items-center justify-center hidden xl:flex pointer-events-none overflow-hidden">
//             <span className="text-white/[0.08] text-[4vw] lg:text-[5rem] font-black italic tracking-[0.2em] select-none whitespace-nowrap uppercase text-center">
//               Sartaaj Bharat
//             </span>
//           </div>
//         </div>

//         {/* Luxury Advantage Strip - Professional Design */}
//         <div className="container-custom">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-10 relative z-30 px-2 sm:px-4">
//             {[
//               {
//                 title: "Global Warranty",
//                 desc: "Secure Coverage",
//                 icon: Shield,
//                 color: "blue",
//               },
//               {
//                 title: "Nexus Shipping",
//                 desc: "Ultra-fast Delivery",
//                 icon: Zap,
//                 color: "orange",
//               },
//               {
//                 title: "High Fidelity",
//                 desc: "Curated Quality",
//                 icon: Star,
//                 color: "blue",
//               },
//               {
//                 title: "Expert Consult",
//                 desc: "Elite Assistance",
//                 icon: Sparkles,
//                 color: "orange",
//               },
//             ].map((item, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: idx * 0.08, duration: 0.5 }}
//                 whileHover={{ y: -4, scale: 1.02 }}
//                 className="bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] group cursor-default transition-all duration-300"
//               >
//                 <div
//                   className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-12 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 ${
//                     item.color === "blue"
//                       ? "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
//                       : "bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white"
//                   } shadow-sm group-hover:shadow-lg`}
//                 >
//                   <item.icon
//                     size={20}
//                     strokeWidth={2.5}
//                     className="sm:w-5 sm:h-5 md:w-6 md:h-6"
//                   />
//                 </div>
//                 <h4 className="font-black text-slate-900 group-hover:text-blue-600 transition-colors text-[10px] sm:text-xs md:text-sm italic uppercase tracking-tight mb-1 leading-tight">
//                   {item.title}
//                 </h4>
//                 <p className="text-[8px] sm:text-[9px] md:text-[10px] text-slate-500 font-semibold uppercase tracking-[0.15em] leading-tight">
//                   {item.desc}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EliteHeroSlider;



import React, { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
const FM = motion;
import { ArrowRight, Sparkles, Star, Zap, Shield } from "lucide-react";
import { useBanners } from "../../hooks";
import { sliders as mockSliders } from "../../data/mockData";

const EliteHeroSlider = memo(() => {
  const { data: banners, isLoading } = useBanners();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = (banners && banners.length > 0) ? banners : mockSliders;
  const currentSlide = slides[currentIndex];
  const slideImg = currentSlide ? (currentSlide.imageUrl || (Array.isArray(currentSlide.image) ? currentSlide.image[0] : currentSlide.image)) : "";

  // Auto-advance
  React.useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides?.length]);

  if (isLoading) {
    return (
      <div className="w-full px-4 sm:px-6 md:px-8 mt-4 sm:mt-6 md:mt-8">
        <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[70vh] bg-slate-900/10 animate-pulse rounded-2xl sm:rounded-3xl md:rounded-[2rem] flex items-center justify-center border border-slate-200">
          <Sparkles className="text-slate-300 animate-spin-slow" size={40} />
        </div>
      </div>
    );
  }



  return (
    <section className="w-full  bg-slate-50">
      <div className="w-full px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-8 md:pb-10">
        {/* Hero Banner Container */}
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[70vh] overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[2rem] shadow-xl bg-slate-950">

          {/* Background Image with Overlay */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <img
                src={slideImg}
                alt={currentSlide.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const fallback = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop";
                  if (e.target.src !== fallback) {
                    e.target.src = fallback;
                  }
                }}
              />
              {/* Enhanced Gradient Overlay for Better Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>
            </motion.div>
          </AnimatePresence>

          {/* Content Container - Perfect Alignment */}
          <div className="absolute inset-0 z-10 flex items-center">
            <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-5 md:space-y-6"
                >
                  {/* Premium Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-md border border-blue-500/40 text-blue-400 text-[10px] sm:text-xs font-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full uppercase tracking-[0.2em] w-fit"
                  >
                    <Sparkles size={12} className="sm:w-3 sm:h-3" />
                    <span className="truncate">
                      {currentSlide.subtitle || "Premium Collection 2026"}
                    </span>
                  </motion.div>

                  {/* Main Title - Responsive Font Sizes */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] sm:leading-[1.1] md:leading-[1.05] tracking-tighter"
                  >
                    {currentSlide.title.split(" ").map((word, i, arr) => (
                      <span
                        key={i}
                        className={`inline-block ${i % 2 !== 0 ? "text-blue-500" : ""} ${i < arr.length - 1 ? "mr-2 sm:mr-3" : ""}`}
                      >
                        {word}
                      </span>
                    ))}
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-slate-300 text-sm sm:text-base md:text-lg lg:text-xl font-medium max-w-xl leading-relaxed line-clamp-2 sm:line-clamp-3 md:line-clamp-none"
                  >
                    {currentSlide.description ||
                      "Experience the pinnacle of technology and luxury craftsmanship. Discover our exclusive collection of premium products."}
                  </motion.p>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 pt-2 sm:pt-3"
                  >
                    <button className="group relative px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-blue-600/30 hover:scale-105 active:scale-95 flex items-center gap-2 sm:gap-3">
                      <span>Shop Collection</span>
                      <ArrowRight
                        size={16}
                        className="sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
                      />
                    </button>

                    {/* Optional: Luxury Badge */}
                    <div className="hidden sm:flex items-center gap-3 text-white/60">
                      <div className="h-8 w-px bg-white/30"></div>
                      <div className="flex flex-col">
                        <span className="text-white font-black text-sm md:text-base italic tracking-tighter leading-tight">
                          Limitless
                        </span>
                        <span className="text-[8px] uppercase tracking-[0.15em] font-bold">
                          Performance
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Dots - Better Positioning */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="group relative"
              >
                <div
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${i === currentIndex
                    ? "w-8 sm:w-10 md:w-12 bg-blue-500 shadow-lg shadow-blue-500/50"
                    : "w-4 sm:w-5 md:w-6 bg-white/40 hover:bg-white/60"
                    }`}
                ></div>
              </button>
            ))}
          </div>

          {/* Optional: Brand Watermark */}
          <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 md:right-8 z-10 opacity-5 pointer-events-none">
            <span className="text-white text-2xl sm:text-3xl md:text-4xl font-black italic tracking-wider">
              SARTAAJ
            </span>
          </div>
        </div>

        {/* Luxury Advantage Strip - Perfectly Aligned */}
        <div className="mt-6 sm:mt-8 md:mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {[
              {
                title: "Global Warranty",
                desc: "Secure Coverage",
                icon: Shield,
                color: "blue",
              },
              {
                title: "Nexus Shipping",
                desc: "Ultra-fast Delivery",
                icon: Zap,
                color: "orange",
              },
              {
                title: "High Fidelity",
                desc: "Curated Quality",
                icon: Star,
                color: "blue",
              },
              {
                title: "Expert Consult",
                desc: "Elite Assistance",
                icon: Sparkles,
                color: "orange",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                whileHover={{ y: -3 }}
                className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-2 sm:mb-3 transition-all duration-300 ${item.color === "blue"
                    ? "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                    : "bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white"
                    }`}
                >
                  <item.icon size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm md:text-base group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[9px] sm:text-[10px] md:text-xs text-slate-500 font-medium uppercase tracking-wide mt-0.5 sm:mt-1">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default EliteHeroSlider;