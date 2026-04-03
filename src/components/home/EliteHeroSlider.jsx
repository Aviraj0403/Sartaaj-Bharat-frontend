import React, { useState, useEffect, memo } from "react";
import { ArrowRight, Sparkles, Shield, Zap, Star } from "lucide-react";
import { useBanners } from "../../hooks";
import { sliders as mockSliders } from "../../data/mockData";

const EliteHeroSlider = memo(() => {
  const { data: banners, isLoading } = useBanners();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = (banners && banners.length > 0) ? banners : mockSliders;
  const currentSlide = slides[currentIndex];
  const slideImg = currentSlide ? (currentSlide.imageUrl || (Array.isArray(currentSlide.image) ? currentSlide.image[0] : currentSlide.image)) : "";

  // Auto-advance
  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides?.length]);

  if (isLoading) {
    return (
      <div className="w-full px-4 mt-4">
        <div className="w-full h-[300px] md:h-[500px] bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center">
          <Sparkles className="text-slate-300" size={32} />
        </div>
      </div>
    );
  }

  return (
    <section className="w-full bg-white">
      <div className="w-full px-4 pt-4 pb-6">
        {/* Adjusted Height for Minimalism */}
        <div className="relative w-full h-[350px] md:h-[500px] lg:h-[60vh] overflow-hidden rounded-2xl shadow-lg bg-slate-950">
          
          {/* Background Image - Standard CSS transition */}
          <div className="absolute inset-0 transition-opacity duration-700">
            <img
              src={slideImg}
              alt={currentSlide?.title}
              className="w-full h-full object-cover opacity-80"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
          </div>

          <div className="absolute inset-0 z-10 flex items-center px-6 md:px-12">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-600 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                <Sparkles size={12} />
                <span>{currentSlide?.subtitle || "NEW COLLECTION"}</span>
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight uppercase">
                {currentSlide?.title}
              </h2>

              <p className="text-slate-300 text-sm md:text-lg font-medium max-w-lg leading-relaxed line-clamp-2">
                {currentSlide?.description || "Premium technology for your lifestyle."}
              </p>

              <div className="pt-2">
                <button className="px-8 py-3 bg-blue-600 hover:bg-white hover:text-blue-600 text-white rounded-lg font-bold text-sm transition-all shadow-lg flex items-center gap-2">
                  <span>Shop Now</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === currentIndex ? "w-8 bg-blue-600" : "w-2 bg-white/40"}`}
              />
            ))}
          </div>
        </div>

        {/* Simplified Advantage Strip */}
        <div className="mt-6 md:mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Warranty", desc: "Long-term Support", icon: Shield, color: "blue" },
              { title: "Fast Shipping", desc: "Express Delivery", icon: Zap, color: "orange" },
              { title: "Top Quality", desc: "Handpicked Range", icon: Star, color: "blue" },
              { title: "24/7 Support", desc: "Expert Help", icon: Sparkles, color: "orange" },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color === "blue" ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"}`}>
                  <item.icon size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-tight">{item.title}</h4>
                  <p className="text-[10px] text-slate-500 font-medium uppercase">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default EliteHeroSlider;