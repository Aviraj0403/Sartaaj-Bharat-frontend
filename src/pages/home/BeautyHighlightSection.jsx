import React from "react";

export default function AestheticCosmeticSection() {
  return (
    <section className="w-full  py-24 px-6 relative overflow-hidden">

      {/* Background Soft Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-rose-200/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/20 blur-[100px] rounded-full"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">

        {/* Left Section Text */}
        <div className="space-y-8">

          {/* ONE-LINE TITLE WITH DIFFERENT COLOR */}
          <h1 className="text-[65px] font-extrabold leading-none">
            <span className="text-pink-500">Pure</span>{" "}
            <span className="text-yellow-500">Beauty</span>
          </h1>

          <p className="text-lg text-gray-700 max-w-md leading-relaxed">
            Feel the elegance of premium cosmetics crafted for glowing,
            healthy and naturally radiant skin. Discover a collection that
            enhances your charm effortlessly.
          </p>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-4 h-4 rounded-full bg-rose-600"></span>
              <p className="text-gray-800 font-medium">Premium Active Ingredients</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-4 h-4 rounded-full bg-rose-400"></span>
              <p className="text-gray-800 font-medium">Dermatologist Tested</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-4 h-4 rounded-full bg-pink-400"></span>
              <p className="text-gray-800 font-medium">Perfect for All Skin Types</p>
            </div>
          </div>

          {/* Button */}
          <button className="mt-6 px-12 py-4 bg-rose-600 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-rose-700 transition-all duration-300">
            Discover Collection →
          </button>
        </div>

        {/* Right Side Product Display */}
        <div className="relative flex justify-center">

          {/* Background Tall Rectangle */}
          <div className="absolute -top-10 w-64 h-[520px] bg-white rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.15)] border border-white/40"></div>

          {/* Product Image */}
          <img
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348"
            alt="Cosmetic Product"
            className="relative z-10 h-[500px] object-cover rounded-3xl drop-shadow-xl hover:scale-105 transition duration-500"
          />

          {/* Floating Badge */}
          <div className="absolute top-6 right-6 bg-white px-5 py-2 rounded-full shadow-md text-rose-600 font-semibold z-20">
            Luxury Edition ✨
          </div>

        </div>

      </div>
    </section>
  );
}
