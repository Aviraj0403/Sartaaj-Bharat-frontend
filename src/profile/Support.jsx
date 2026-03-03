import React from "react";
import { Smile } from "lucide-react";

export default function Support() {
  // Define the WhatsApp number and message
  const whatsappNumber = "+919999398494"; // Remove any "+" sign and spaces
  const message = "How can I help you?";

  // Create the WhatsApp link
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="p-6 md:p-10 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 min-h-[60vh]">
      <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 italic tracking-tighter uppercase">Support Portal</h1>
      <p className="text-slate-500 mb-10 text-sm font-medium uppercase tracking-widest max-w-lg">
        Synchronize with our intelligence team regarding orders or technical artifacts.
      </p>

      <div className="p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full translate-x-12 -translate-y-12"></div>
        <div className="flex items-center gap-8 relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <Smile className="text-white" size={40} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 italic uppercase">Neural Chat Interface</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1 mb-4">Elite Intelligence Response 24/7</p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-lg active:scale-95 italic text-center">
                Initialize Protocol
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
