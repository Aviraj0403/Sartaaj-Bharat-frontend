import React from "react";
import { Star, MessageSquare, Package, ChevronRight, Tag } from "lucide-react";

export default function Reviews() {
  const reviews = [
    {
      id: "REV-8291",
      product: "iPhone 15 - Amber Tint",
      brand: "Apple Collection",
      rating: 5,
      comment: "Exceptional build quality. The amber tint is a unique tactical choice. Data sync was seamless.",
      date: "24 Mar 2026",
      status: "Verified Purchase"
    },
    {
      id: "REV-4720",
      product: "MagSafe Charger - Stealth Black",
      brand: "SarTaaj Labs",
      rating: 4,
      comment: "Solid magnetic lock. Charging speed is optimal for high-stakes deployment.",
      date: "12 Mar 2026",
      status: "Verified Purchase"
    },
  ];

  return (
    <div className="min-h-screen bg-white max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-2 italic tracking-tighter uppercase leading-none">
            Verified <span className="text-blue-600">Feedback</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] italic">
            Your assessments on acquired assets
          </p>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <MessageSquare size={20} />
          </div>
          <div>
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
              Testimonials
            </p>
            <p className="text-sm font-black text-slate-900 uppercase italic">
              {reviews.length} Contributions
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {reviews.length === 0 ? (
          <div className="py-24 text-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/50">
            <MessageSquare
              size={48}
              className="mx-auto text-slate-200 mb-6"
              strokeWidth={1}
            />
            <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest italic mb-2">
              No Feedback Filed
            </h3>
            <p className="text-slate-400 text-xs font-medium italic">
              You haven't filed any feedback on your acquisitions yet.
            </p>
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden hover:border-blue-600 transition-all duration-700 group shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 relative"
            >
              {/* Review Badge */}
              <div className="absolute top-8 right-8 bg-emerald-500/10 text-emerald-600 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-emerald-500/20 italic">
                {rev.status}
              </div>

              <div className="p-10 md:p-14 flex flex-col md:flex-row gap-10 items-start">
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-slate-100 group-hover:rotate-3 transition-transform">
                  <Package size={32} className="text-slate-300" strokeWidth={1.5} />
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest italic flex items-center gap-1.5">
                        <Tag size={10} /> {rev.brand}
                      </span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                      <span className="text-slate-400 text-[10px] font-bold italic">{rev.date}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 italic tracking-tighter uppercase leading-tight">
                      {rev.product}
                    </h2>
                  </div>

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < rev.rating ? "text-blue-600 fill-blue-600" : "text-slate-200"}
                        strokeWidth={2.5}
                      />
                    ))}
                  </div>

                  <p className="text-slate-600 text-sm font-medium italic leading-relaxed max-w-2xl border-l-2 border-slate-100 pl-6 py-2">
                    "{rev.comment}"
                  </p>

                  <div className="pt-4 flex items-center justify-between border-t border-slate-50 mt-6">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      Protocol ID: {rev.id}
                    </span>
                    <button className="flex items-center gap-2 text-blue-600 text-[9px] font-black uppercase tracking-widest hover:translate-x-2 transition-transform italic">
                      View Linked Asset <ChevronRight size={14} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
