import React from "react";
import { FaShoppingBag, FaMobileAlt } from "react-icons/fa";
import { useViewport } from "../../hooks/useViewport";

export default function BeautyDiscountBanner() {
  const { isMobile } = useViewport();
  return (
    <section className="bg-slate-900 rounded-[2rem] md:rounded-[4rem] py-12 md:py-16 px-8 md:px-20 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative border border-white/5 shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 opacity-10 blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-800 opacity-20 blur-[80px]"></div>
      {/* Left Content */}
      <div className="flex-1 text-center lg:text-left space-y-4 md:space-y-6 z-10">
        <div className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 font-black text-[9px] uppercase tracking-[0.4em] italic mb-2">
          Protocol Activation Required
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight italic uppercase tracking-tighter">
          YIELD <span className="text-blue-600">20% GAIN.</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium uppercase tracking-wide">
          AUTHORIZE A FLAT <span className="text-white font-black underline decoration-blue-600 decoration-2 underline-offset-4 italic">20% LOGISTICAL OFFSET</span> ON
          YOUR {isMobile ? "APP INTERFACE DEPLOYMENT" : "INITIAL ARTIFACT ACQUISITION VIA OUR EXCLUSIVE ECOSYSTEM"}.
        </p>

        {/* Fancy Gradient Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
          <a
            href="#shop"
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-blue-500/20 hover:scale-105 hover:bg-white hover:text-slate-950 transition-all duration-500 italic"
          >
            <FaShoppingBag className="text-base" />
            <span>ACQUIRE NOW</span>
          </a>

          <a
            href="#download"
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-md text-white font-black text-[10px] uppercase tracking-[0.3em] border border-white/10 hover:bg-white hover:text-slate-950 transition-all duration-500 italic"
          >
            <FaMobileAlt className="text-base" />
            <span>DEPLOY INTERFACE</span>
          </a>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="flex-1 relative flex justify-center md:justify-end">
        {/* Lipstick Image (Transparent PNG) */}
        <img
          src="https://png.pngtree.com/png-vector/20250611/ourmid/pngtree-red-lipstick-realistic-cosmetic-product-png-image_16519016.png"
          alt="Lipstick Product"
          className="absolute md:-left-16 md:bottom-0 md:w-36 md:rotate-[-15deg] drop-shadow-2xl
                     w-20 bottom-auto left-auto relative mb-[-20px] md:mb-0 md:relative md:inline-block"
        />

        {/* Mobile App Image */}
        <img
          src="https://d1y41eupgbwbb2.cloudfront.net/images/beautyHeroImage.webp"
          alt="Cosmetic App Preview"
          className="w-56 md:w-72 rounded-3xl shadow-2xl border-4 border-white relative z-10"
        />
      </div>
    </section>
  );
}
