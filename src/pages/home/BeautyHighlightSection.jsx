import React from "react";

export default function AestheticCosmeticSection() {
  return (
    <section className="w-full py-8 px-6 relative overflow-hidden">

      {/* Background Soft Shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-slate-900/10 blur-[150px] rounded-full"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">

        {/* Left Section Text */}
        <div className="space-y-8">

          {/* ONE-LINE TITLE WITH DIFFERENT COLOR */}
          <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block italic">Core Engineering</span>
          <h1 className="text-[50px] md:text-[70px] font-black leading-none italic uppercase tracking-tighter text-slate-950">
            AESTHETIC <br />
            <span className="text-blue-600">PROTOCOL.</span>
          </h1>

          <p className="text-base font-medium text-slate-500 max-w-md leading-relaxed uppercase tracking-wider italic">
            EXPERIENCE THE PRECISION OF ELITE DERMATOLOGICAL ASSETS CRAFTED FOR QUANTUM RADIANCE.
            EVOLVE YOUR VISUAL INTERFACE EFFORTLESSLY.
          </p>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-6 group">
              <span className="w-8 h-[2px] bg-blue-600 transition-all group-hover:w-12"></span>
              <p className="text-slate-900 font-black text-xs uppercase tracking-widest italic">PREMIUM ACTIVE NODES</p>
            </div>
            <div className="flex items-center gap-6 group">
              <span className="w-8 h-[2px] bg-slate-300 transition-all group-hover:w-12"></span>
              <p className="text-slate-900 font-black text-xs uppercase tracking-widest italic">DERMATOLOGICAL VALIDATION</p>
            </div>
            <div className="flex items-center gap-6 group">
              <span className="w-8 h-[2px] bg-blue-600/30 transition-all group-hover:w-12"></span>
              <p className="text-slate-900 font-black text-xs uppercase tracking-widest italic">UNIVERSAL DERMA-SYNC</p>
            </div>
          </div>

          {/* Button */}
          <button className="mt-6 px-10 py-4 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-blue-600 transition-all duration-500 italic">
            INITIATE SEARCH PROMPT →
          </button>
        </div>

        {/* Right Side Product Display */}
        <div className="relative flex justify-center">

          {/* Background Tall Rectangle */}
          <div className="absolute -top-10 w-72 h-[450px] bg-white rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-slate-50 transition-all group-hover:shadow-[0_40px_100px_rgba(37,99,235,0.1)] shadow-blue-500/5"></div>

          {/* Product Image */}
          <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348"
            alt="Cosmetic Product"
            className="relative z-10 h-[350px] object-cover rounded-[2.5rem] shadow-2xl hover:scale-[1.02] transition-all duration-700 grayscale hover:grayscale-0"
          />

          {/* Floating Badge */}
          <div className="absolute top-8 -right-12 bg-slate-950 px-8 py-3 rounded-2xl shadow-2xl text-white font-black text-[10px] uppercase tracking-[0.3em] z-20 italic">
            Elite Verification <span className="text-blue-600">Active</span>
          </div>

        </div>

      </div>
    </section>
  );
}
