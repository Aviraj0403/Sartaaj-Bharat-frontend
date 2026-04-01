import React from "react";
import { ShieldCheck, Truck, Info, ShoppingBag } from "lucide-react";

export default function ValueProps() {
  const propsList = [
    { icon: ShieldCheck, title: "Secure Payment", desc: "100% Protected" },
    { icon: Truck, title: "Fast Delivery", desc: "Reliable Shipping" },
    { icon: Info, title: "Return Policy", desc: "Easy Returns" },
    { icon: ShoppingBag, title: "Quality Assured", desc: "Top Brands" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pb-12">
      {propsList.map((prop, idx) => (
        <div
          key={idx}
          className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:shadow-lg transition-all duration-500"
        >
          <div className="w-12 h-12 bg-slate-50 text-blue-600 rounded-xl border border-slate-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
            <prop.icon size={22} strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1 italic">
            {prop.title}
          </span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{prop.desc}</span>
        </div>
      ))}
    </div>
  );
}
