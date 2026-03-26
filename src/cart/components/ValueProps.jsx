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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {propsList.map((prop, idx) => (
        <div
          key={idx}
          className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col items-center text-center"
        >
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
            <prop.icon size={20} />
          </div>
          <span className="text-sm font-semibold text-gray-900 mb-1">
            {prop.title}
          </span>
          <span className="text-xs text-gray-500">{prop.desc}</span>
        </div>
      ))}
    </div>
  );
}
