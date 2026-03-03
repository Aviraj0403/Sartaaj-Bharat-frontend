import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      q: "How long does delivery take?",
      a: "Delivery usually takes 3–7 business days depending on your location.",
    },
    {
      q: "Can I return a product?",
      a: "Yes, we offer a 7-day easy return policy on most products.",
    },
    {
      q: "Do you offer Cash on Delivery (COD)?",
      a: "Yes, COD is available on prepaid-verified accounts.",
    },
    {
      q: "Are your products original?",
      a: "We only sell 100% authentic and brand-certified products.",
    },
    {
      q: "How can I track my order?",
      a: "Once shipped, you will receive a tracking link via SMS/Email.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-slate-50 min-h-screen p-8 md:p-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
      {/* Header */}
      <div className="text-center mb-24 px-4">
        <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block italic">Neural Knowledge Base</span>
        <h1 className="text-5xl md:text-7xl font-black text-slate-950 mb-6 italic uppercase tracking-tighter flex justify-center items-center gap-6">
          TECHNICAL <span className="text-blue-600">FAQ.</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto text-sm uppercase tracking-widest leading-relaxed italic">
          CRITICAL DATA NODES AND SYSTEM RESPONSES FOR SEAMLESS ARCHITECTURE.
        </p>
      </div>

      {/* FAQ Box */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="bg-white shadow-sm rounded-[2.5rem] p-8 border border-slate-100 transition-all hover:shadow-2xl hover:border-blue-600 group"
          >
            <button
              className="w-full flex justify-between items-center text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <h3 className="text-lg md:text-xl font-black text-slate-900 italic uppercase tracking-tighter">
                {item.q}
              </h3>
              {openIndex === i ? (
                <ChevronUp className="text-blue-600" strokeWidth={3} />
              ) : (
                <ChevronDown className="text-blue-600" strokeWidth={3} />
              )}
            </button>

            {openIndex === i && (
              <p className="mt-3 text-gray-600 leading-relaxed border-t pt-3">
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-24">
        <button className="bg-slate-950 text-white px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] italic hover:bg-blue-600 transition-all shadow-xl active:scale-95">
          Sync with Operative
        </button>
      </div>
    </section>
  );
}
