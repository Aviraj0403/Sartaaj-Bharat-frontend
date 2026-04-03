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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pb-12">
      {propsList.map((prop, idx) => (
        <div
          key={idx}
          className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm flex flex-col items-center text-center group hover:border-blue-100/50 hover:shadow-xl transition-all duration-500"
        >
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
            <prop.icon size={20} strokeWidth={2} />
          </div>
          <span className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest mb-1">
            {prop.title}
          </span>
          <span className="text-[10px] font-medium text-slate-400">
            {prop.desc}
          </span>
        </div>
      ))}
    </div>
  );
}
