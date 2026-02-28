import React from "react";
import { User } from "lucide-react";

export default function BeautyProfile() {
  return (
    <div className="p-8 md:p-12 bg-white rounded-[2.5rem] border border-slate-100 min-h-[50vh]">
      <h1 className="text-4xl font-black text-slate-900 mb-4 italic tracking-tighter uppercase">Elite Profile</h1>
      <p className="text-slate-500 font-medium uppercase tracking-widest text-xs mb-10">Curation preferences and behavioral patterns.</p>

      <div className="p-12 text-center border-2 border-slate-100 border-dashed rounded-[3rem] bg-slate-50/50 group hover:bg-white hover:border-blue-600 transition-all duration-500">
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform">
          <User className="text-white" size={32} />
        </div>
        <p className="text-slate-400 font-black italic uppercase tracking-widest text-sm">Protocol Under Maintenance</p>
      </div>
    </div>
  );
}
