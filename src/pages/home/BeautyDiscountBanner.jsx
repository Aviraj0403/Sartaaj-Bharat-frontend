import React from "react";
import { FaShoppingBag, FaMobileAlt } from "react-icons/fa";

export default function BeautyDiscountBanner() {
  return (
    <section className="bg-pink-100 rounded-3xl py-12 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative">
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left space-y-5 z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-pink-600">
          Get 20% Off 💕
        </h2>
        <p className="text-lg text-gray-700 max-w-md mx-auto md:mx-0">
          Enjoy a flat <span className="font-semibold">20% discount</span> on
          your first order through the{" "}
          <span className="text-pink-500 font-semibold">Glow & Grace App</span>!
        </p>

        {/* Fancy Gradient Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-6">
          <a
            href="#shop"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-pink-400 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-pink-300/50 transition-all duration-300"
          >
            <FaShoppingBag className="text-lg" />
            <span>Shop Now</span>
          </a>

          <a
            href="#download"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-pink-600 font-semibold shadow-md border border-pink-200 hover:bg-pink-50 hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <FaMobileAlt className="text-lg" />
            <span>Use Our App</span>
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
