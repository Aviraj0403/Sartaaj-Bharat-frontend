import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Heart, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-[#0f172a] text-slate-400 pt-24 pb-12 mt-24 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600"></div>
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-blue-600/5 blur-[100px] rounded-full"></div>

      <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 relative z-10">
        {/* Column 1: Brand & Contact */}
        <div className="space-y-8">
          <Link to="/" className="inline-block group">
            <h1 className="text-2xl font-black text-white leading-none tracking-tight">
              SARTAAJ<span className="text-blue-500">BHARAT</span>
            </h1>
            <span className="text-[10px] font-bold text-slate-500 tracking-[0.3em] uppercase block mt-1">Premium Excellence</span>
          </Link>

          <p className="text-sm leading-relaxed max-w-xs font-medium">
            Redefining the digital shopping experience with premium technology and lifestyle essentials curated for the modern world.
          </p>

          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-smooth border border-slate-700/50"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Experience */}
        <div>
          <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-8">Experience</h3>
          <ul className="space-y-4 text-sm font-semibold">
            {['Latest Drops', 'Exclusive Collections', 'Hot Deals', 'Store Locator', 'Elite Membership'].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  {item} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Corporate */}
        <div>
          <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-8">Corporate</h3>
          <ul className="space-y-4 text-sm font-semibold">
            {['Our Story', 'Careers at Sartaaj', 'Sustainability', 'Investors', 'Wholesale'].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  {item} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Concierge */}
        <div className="space-y-8">
          <div>
            <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-8">Concierge</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-smooth border border-slate-700/50">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Call Center</p>
                  <p className="text-white text-sm font-bold">+91 98765 43210</p>
                </div>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-smooth border border-slate-700/50">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Support</p>
                  <p className="text-white text-sm font-bold">concierge@sartaaj.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Strip */}
      <div className="container-custom mb-16">
        <div className="bg-blue-600 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-white text-2xl md:text-3xl font-black mb-2">JOIN THE ELITE</h3>
            <p className="text-blue-100 font-medium">Get exclusive access to the latest drops and private deals.</p>
          </div>
          <form className="flex w-full md:w-auto max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-transparent text-white px-4 py-2 outline-none placeholder:text-blue-200 font-medium"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl text-sm font-black hover:bg-slate-100 transition-colors shadow-xl">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-slate-800/50 pt-8">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em]">
          <p>&copy; 2026 SARTAAJ BHARAT. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
          <p className="flex items-center gap-1">
            Engineered with <Heart size={10} className="text-blue-600 fill-current" /> by Sartaaj Prime
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
