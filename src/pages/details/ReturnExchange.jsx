import React from "react";
import { FaUndo, FaExchangeAlt, FaClock, FaCheckCircle } from "react-icons/fa";

export default function ReturnExchange() {
  return (
    <section className="bg-slate-50 min-h-screen py-24 px-4 md:px-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
      {/* Heading */}
      <div className="text-center mb-24">
        <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block italic">Logistics Optimization</span>
        <h1 className="text-5xl md:text-7xl font-black text-slate-950 mb-6 italic uppercase tracking-tighter">PHASE-OUT <span className="text-blue-600">& EXCHANGE.</span></h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto text-sm uppercase tracking-widest leading-relaxed italic">
          DEFINING THE PROTOCOLS FOR ARTIFACT RESTORATION AND ASSET RE-AUTHORIZATION.
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-24">
        <div className="bg-white p-10 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all border border-slate-100 group">
          <FaUndo className="text-blue-600 text-5xl mx-auto mb-6 group-hover:rotate-[-45deg] transition-transform" />
          <h3 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter mb-4">ASSET ROLLBACK</h3>
          <p className="text-slate-500 font-medium text-sm">Roll back your acquisition within 07 solar days of delivery.</p>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all border border-slate-100 group">
          <FaExchangeAlt className="text-blue-600 text-5xl mx-auto mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter mb-4">NODE EXCHANGE</h3>
          <p className="text-slate-500 font-medium text-sm">Exchange your artifact instantly if the data-link or physical shell is corrupted.</p>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all border border-slate-100 group">
          <FaClock className="text-blue-600 text-5xl mx-auto mb-6 group-hover:animate-pulse transition-transform" />
          <h3 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter mb-4">QUANTUM PROCESS</h3>
          <p className="text-slate-500 font-medium text-sm">We process synchronization within 48-hour cycle post-authorization.</p>
        </div>
      </div>

      {/* Policy Details */}
      <div className="max-w-4xl mx-auto bg-slate-900 p-16 rounded-[4rem] shadow-2xl border border-white/5 mb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 opacity-5 blur-[100px]"></div>
        <h2 className="text-3xl font-black text-blue-600 mb-8 italic uppercase tracking-tighter underline decoration-white/10 underline-offset-8">RESTORE PROTOCOL</h2>
        <ul className="text-slate-400 space-y-6 font-medium italic uppercase tracking-widest text-[11px]">
          <li className="flex gap-4"><span className="text-blue-600 font-black">▶</span> Artifacts must be signaled within 7 cycles of arrival.</li>
          <li className="flex gap-4"><span className="text-blue-600 font-black">▶</span> Asset must be uninitialized, latent, and in full default casing.</li>
          <li className="flex gap-4"><span className="text-blue-600 font-black">▶</span> Protocols trigger only for corrupt, defective, or parity-error items.</li>
          <li className="flex gap-4"><span className="text-blue-600 font-black">▶</span> Credits re-routed as neural balance or back to the source node.</li>
        </ul>

        <h2 className="text-3xl font-black text-blue-600 mt-16 mb-8 italic uppercase tracking-tighter underline decoration-white/10 underline-offset-8">SWAP PROTOCOL</h2>
        <ul className="text-slate-400 space-y-6 font-medium italic uppercase tracking-widest text-[11px]">
          <li className="flex gap-4"><span className="text-blue-600 font-black">▶</span> Parity sync allowed for structural errors or mismatched IDs.</li>
          <li className="flex gap-4"><span className="text-blue-600 font-black">▶</span> Swap directives must be uploaded within 7 cycles of delivery.</li>
          <li className="flex gap-4"><span className="text-blue-600 font-black">▶</span> Replacement asset dispatched once original node is terminated.</li>
        </ul>
      </div>

      {/* Steps Section */}
      <div className="bg-blue-600 py-24 text-center rounded-[4rem]">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-16 italic uppercase tracking-tighter underline decoration-slate-900/10 underline-offset-12">EXECUTION <span className="text-slate-900">FLOW.</span></h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 px-8">
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 group hover:bg-slate-950 transition-all duration-500">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 font-black text-xl mb-6 mx-auto group-hover:bg-blue-600 group-hover:text-white transition-all italic">01</div>
            <h3 className="font-black text-white text-lg mb-4 italic uppercase tracking-tighter">INITIAL SIGNAL</h3>
            <p className="text-white/70 font-medium text-xs uppercase tracking-widest leading-relaxed">Transmit issues via the Contact Node with your acquisition ID.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 group hover:bg-slate-950 transition-all duration-500">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 font-black text-xl mb-6 mx-auto group-hover:bg-blue-600 group-hover:text-white transition-all italic">02</div>
            <h3 className="font-black text-white text-lg mb-4 italic uppercase tracking-tighter">DATA AUDIT</h3>
            <p className="text-white/70 font-medium text-xs uppercase tracking-widest leading-relaxed">Our operatives audit the directive and authorize within 24-48 cycles.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 group hover:bg-slate-950 transition-all duration-500">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 font-black text-xl mb-6 mx-auto group-hover:bg-blue-600 group-hover:text-white transition-all italic">03</div>
            <h3 className="font-black text-white text-lg mb-4 italic uppercase tracking-tighter">TERMINATION</h3>
            <p className="text-white/70 font-medium text-xs uppercase tracking-widest leading-relaxed">De-sync the artifact & receive your parity credit or new asset.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
