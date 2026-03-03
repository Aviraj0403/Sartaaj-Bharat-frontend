import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function ContactUs() {
  return (
    <section className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-24 px-4 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
        <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block italic">Transmission Channel</span>
        <h1 className="text-5xl md:text-7xl font-black text-slate-950 mb-6 italic uppercase tracking-tighter">STRIKE <span className="text-blue-600">CONTACT.</span></h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto text-sm uppercase tracking-widest leading-relaxed italic">
          ELITE SUPPORT OPERATIVES ARE ON STANDBY. AUTHORIZE YOUR COMMUNICATION BELOW.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 -mt-12 mb-24 relative z-10">
        <div className="bg-white shadow-2xl rounded-[2.5rem] p-10 text-center border border-slate-100 hover:border-blue-600 transition-all group">
          <FaPhoneAlt className="text-blue-600 text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 italic">Audio Link</h3>
          <p className="text-slate-900 font-black italic">+91 9999398494</p>
        </div>

        <div className="bg-white shadow-2xl rounded-[2.5rem] p-10 text-center border border-slate-100 hover:border-blue-600 transition-all group">
          <FaEnvelope className="text-blue-600 text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 italic">Data Node</h3>
          <p className="text-slate-900 font-black italic text-xs">gurmeetkaurstore@gmail.com</p>
        </div>

        <div className="bg-white shadow-2xl rounded-[2.5rem] p-10 text-center border border-slate-100 hover:border-blue-600 transition-all group">
          <FaMapMarkerAlt className="text-blue-600 text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 italic">Geo Coordinates</h3>
          <p className="text-slate-900 font-black italic text-[10px] leading-relaxed uppercase">11021, 5A Block WEA, Sat Nagar, Karol Bagh, Delhi, 110005</p>
        </div>

        <div className="bg-white shadow-2xl rounded-[2.5rem] p-10 text-center border border-slate-100 hover:border-blue-600 transition-all group">
          <FaClock className="text-blue-600 text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 italic">Uptime</h3>
          <p className="text-slate-900 font-black italic uppercase">Mon – Sat: 0900 – 1900</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 px-4 pb-16">
        {/* Form */}
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 transition-all group-hover:bg-blue-50/50"></div>
          <h2 className="text-3xl font-black text-slate-950 mb-8 italic uppercase tracking-tighter">INITIATE <span className="text-blue-600">OVERRIDE.</span></h2>

          <form className="space-y-8">
            <div className="relative group/input">
              <input
                type="text"
                placeholder="OPERATOR IDENTITY"
                className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-blue-600 focus:bg-white transition-all outline-none font-black text-[10px] uppercase tracking-widest italic"
                required
              />
            </div>

            <div className="relative group/input">
              <input
                type="email"
                placeholder="NEURAL DATA NODE (EMAIL)"
                className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-blue-600 focus:bg-white transition-all outline-none font-black text-[10px] uppercase tracking-widest italic"
                required
              />
            </div>

            <div className="relative group/input">
              <input
                type="text"
                placeholder="TRANSMISSION SUBJECT"
                className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-blue-600 focus:bg-white transition-all outline-none font-black text-[10px] uppercase tracking-widest italic"
                required
              />
            </div>

            <div className="relative group/input">
              <textarea
                rows="4"
                placeholder="CONSTRUCT CORE MESSAGE..."
                className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-blue-600 focus:bg-white transition-all outline-none font-black text-[10px] uppercase tracking-widest italic resize-none"
                required
              ></textarea>
            </div>

            <button className="w-full bg-slate-950 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] italic hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
              Execute Transmission
            </button>
          </form>
        </div>

        {/* Google Map */}
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <iframe
            title="map"
            className="w-full h-full min-h-[400px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14014.711338103568!2d77.205294!3d28.628901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd35d8e9c0cd%3A0x4ff7c8b8c6fe4894!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Extra Contact Details Section */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="bg-slate-900 rounded-[4rem] shadow-2xl p-16 grid md:grid-cols-3 gap-16 border border-white/5">
          <div className="relative">
            <div className="text-blue-600 font-black text-[10px] mb-4 uppercase tracking-[0.3em] italic">01. Priority Support</div>
            <h3 className="text-xl font-black text-white mb-4 italic uppercase tracking-tighter">NEURAL ASSISTANCE</h3>
            <p className="text-slate-400 font-medium text-sm leading-relaxed uppercase tracking-wider">Available 24/7 for artifact inquiries, precision logistics, or terminal encryption support.</p>
          </div>

          <div className="relative">
            <div className="text-blue-600 font-black text-[10px] mb-4 uppercase tracking-[0.3em] italic">02. Strategic Alliance</div>
            <h3 className="text-xl font-black text-white mb-4 italic uppercase tracking-tighter">PROTOCOL MERGER</h3>
            <p className="text-slate-400 font-medium text-sm leading-relaxed uppercase tracking-wider">For enterprise logic, bulk asset acquisition, or strategic influencer syncs—initiate contact now.</p>
          </div>

          <div className="relative">
            <div className="text-blue-600 font-black text-[10px] mb-4 uppercase tracking-[0.3em] italic">03. Trace & Logistics</div>
            <h3 className="text-xl font-black text-white mb-4 italic uppercase tracking-tighter">ARTIFACT TRACKING</h3>
            <p className="text-slate-400 font-medium text-sm leading-relaxed uppercase tracking-wider">Monitor your asset coordinates or request logistical adjustments directly with our dispatch tier.</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-blue-600 py-24 text-white text-center px-4 relative">
        <h2 className="text-4xl md:text-5xl font-black mb-6 italic uppercase tracking-tighter">OPTIMIZE YOUR <span className="text-slate-950">EXPERIENCE.</span></h2>
        <p className="max-w-2xl mx-auto text-sm font-black uppercase tracking-[0.3em] mb-10 opacity-80 leading-relaxed italic">
          Have algorithmic suggestions or special protocol requests? Your feedback drives our evolution.
        </p>
        <button className="bg-white text-blue-600 font-black px-12 py-5 rounded-2xl shadow-2xl hover:bg-slate-950 hover:text-white transition-all text-[10px] uppercase tracking-[0.4em] italic active:scale-95">
          Submit Logic
        </button>
      </div>
    </section>
  );
}
