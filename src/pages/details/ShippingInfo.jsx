import React from "react";
import { Truck, Clock, Globe, Phone, Mail, MapPin, ShieldCheck, Package, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function ShippingInfo() {
  return (
    <section className="bg-slate-50 min-h-screen p-8 md:p-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
      {/* Header */}
      <div className="text-center mb-24 px-4">
        <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block italic">Logistics Topology</span>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-black text-slate-950 italic uppercase tracking-tighter"
        >
          DISPATCH <span className="text-blue-600">INTEL.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-slate-500 font-medium max-w-2xl mx-auto text-sm uppercase tracking-widest leading-relaxed mt-6 italic"
        >
          SECURE, RAPID, AND CALIBRATED ARTIFACT DEPLOYMENT ACROSS ALL DOMESTIC NODES.
        </motion.p>
      </div>

      {/* Highlight Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900 shadow-2xl rounded-[3rem] border border-white/5 p-8 md:p-14 mb-24 flex flex-col lg:flex-row items-center gap-12 justify-between relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 opacity-10 blur-[100px]"></div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
            <ShieldCheck size={32} strokeWidth={3} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">SECURE NODE TRANSFER</h3>
            <p className="text-slate-400 font-medium text-[10px] uppercase tracking-widest mt-2">Assets buffered with high-density kinetic shielding.</p>
          </div>
        </div>

        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
            <Package size={32} strokeWidth={3} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">REAL-TIME TELEMETRY</h3>
            <p className="text-slate-400 font-medium text-[10px] uppercase tracking-widest mt-2">Monitor packet coordinates instantly post-dispatch.</p>
          </div>
        </div>
      </motion.div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Shipping Policy */}
        <motion.div
          whileHover={{ y: -8 }}
          className="bg-white shadow-sm rounded-[2.5rem] p-10 border border-slate-100 hover:shadow-2xl hover:border-blue-600 transition-all group"
        >
          <div className="flex items-center gap-4 mb-6">
            <Truck className="text-blue-600 group-hover:scale-110 transition-transform" size={24} strokeWidth={3} />
            <h2 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">PROTOCOL <span className="text-blue-600">ALPHA</span></h2>
          </div>
          <p className="text-slate-500 font-medium text-sm leading-relaxed uppercase tracking-wide">
            Directives are executed within <strong className="text-slate-950">01–02 operational cycles</strong>. Tier-1 logistics nodes ensure verified delivery.
          </p>
        </motion.div>

        {/* Delivery Timeframes */}
        <motion.div
          whileHover={{ y: -8 }}
          className="bg-white shadow-sm rounded-[2.5rem] p-10 border border-slate-100 hover:shadow-2xl hover:border-blue-600 transition-all group"
        >
          <div className="flex items-center gap-4 mb-6">
            <Clock className="text-blue-600 group-hover:scale-110 transition-transform" size={24} strokeWidth={3} />
            <h2 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">CYCLE <span className="text-blue-600">TIME</span></h2>
          </div>
          <ul className="text-slate-500 font-black text-[9px] space-y-3 uppercase tracking-[0.2em] italic">
            <li className="flex justify-between border-b border-slate-50 pb-2"><span>Core City Node</span> <strong className="text-slate-950">1-3 Cycles</strong></li>
            <li className="flex justify-between border-b border-slate-50 pb-2"><span>Regional Node</span> <strong className="text-slate-950">2-5 Cycles</strong></li>
            <li className="flex justify-between border-b border-slate-50 pb-2"><span>Metropolitan Hub</span> <strong className="text-slate-950">3-6 Cycles</strong></li>
            <li className="flex justify-between border-b border-slate-50 pb-2"><span>Domestic Sector</span> <strong className="text-slate-950">5-9 Cycles</strong></li>
            <li className="flex justify-between"><span>Outer Rim</span> <strong className="text-slate-950">7-12 Cycles</strong></li>
          </ul>
        </motion.div>

        {/* Shipping Charges */}
        <motion.div
          whileHover={{ y: -8 }}
          className="bg-white shadow-sm rounded-[2.5rem] p-10 border border-slate-100 hover:shadow-2xl hover:border-blue-600 transition-all group"
        >
          <div className="flex items-center gap-4 mb-6">
            <Globe className="text-blue-600 group-hover:scale-110 transition-transform" size={24} strokeWidth={3} />
            <h2 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">ACQUISITION <span className="text-blue-600">FEES</span></h2>
          </div>
          <p className="text-slate-500 font-medium text-sm leading-relaxed uppercase tracking-wide">
            Acquisitions below ₹999 trigger standard logistical offsets. Acquisitions exceeding <strong className="text-blue-600">₹999</strong> authorize <strong className="text-slate-950 italic">FREE DISPATCH.</strong>
          </p>
        </motion.div>

        {/* Order Processing */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-lg rounded-2xl p-7 border border-pink-100 hover:shadow-pink-200 transition"
        >
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-pink-600" size={28} />
            <h2 className="text-xl font-semibold text-gray-800">Order Processing</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm">
            After placing an order, items are packed carefully and dispatched within <strong>1–2 days</strong>. You will receive your tracking details instantly after dispatch.
          </p>
        </motion.div>

        {/* Tracking Info */}
        <motion.div
          whileHover={{ y: -8 }}
          className="bg-white shadow-sm rounded-[2.5rem] p-10 border border-slate-100 hover:shadow-2xl hover:border-blue-600 transition-all group"
        >
          <div className="flex items-center gap-4 mb-6">
            <MapPin className="text-blue-600 group-hover:scale-110 transition-transform" size={24} strokeWidth={3} />
            <h2 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">TELEMETRY <span className="text-blue-600">SYNC</span></h2>
          </div>
          <p className="text-slate-500 font-medium text-sm leading-relaxed uppercase tracking-wide">
            Encryption-linked tracking is transmitted via <strong className="text-slate-950">Neural Message, SMS, or Data-Link</strong> instantly post-release.
          </p>
        </motion.div>

        {/* Easy Returns */}
        <motion.div
          whileHover={{ y: -8 }}
          className="bg-white shadow-sm rounded-[2.5rem] p-10 border border-slate-100 hover:shadow-2xl hover:border-blue-600 transition-all group"
        >
          <div className="flex items-center gap-4 mb-6">
            <RefreshCcw className="text-blue-600 group-hover:scale-110 transition-transform" size={24} strokeWidth={3} />
            <h2 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">PARITY <span className="text-blue-600">ROLLBACK</span></h2>
          </div>
          <p className="text-slate-500 font-medium text-sm leading-relaxed uppercase tracking-wide">
            Structural mismatches authorize a rollback/return within <strong className="text-slate-950">02 Cycles</strong> via our operative support node.
          </p>
        </motion.div>

        {/* Support */}
        <motion.div
          whileHover={{ y: -8 }}
          className="bg-slate-950 shadow-2xl rounded-[2.5rem] p-10 border border-slate-800 hover:border-blue-600 transition-all group"
        >
          <div className="flex items-center gap-4 mb-6">
            <Phone className="text-blue-600 group-hover:scale-110 transition-transform" size={24} strokeWidth={3} />
            <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">OPERATIVE <span className="text-blue-600">LINK</span></h2>
          </div>
          <p className="text-slate-400 font-medium text-sm leading-relaxed uppercase tracking-wide mb-6">Operatives on standby for topological inquiries:</p>

          <ul className="text-white space-y-4 font-black text-[10px] uppercase tracking-widest italic">
            <li className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity"><Mail size={16} className="text-blue-600" /> gurmeetkaurstore@gmail.com</li>
            <li className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity"><Phone size={16} className="text-blue-600" /> +91 9999398494</li>
          </ul>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="text-center mt-32">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-blue-600 hover:bg-slate-950 text-white px-12 py-5 rounded-2xl shadow-xl shadow-blue-500/20 text-[10px] font-black uppercase tracking-[0.4em] italic transition-all active:scale-95"
        >
          AUTHORIZE SUPPORT SYNC
        </motion.button>
      </div>
    </section>
  );
}