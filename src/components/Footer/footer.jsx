import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Heart,
  ArrowUpRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-[#0f172a] text-slate-400 pt-14 pb-6 overflow-hidden">
      {/* Background Decorative Element - Compact */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-600/5 blur-[60px] rounded-full"></div>

      <div className="container-custom px-4 sm:px-6 md:px-8">
        {/* First Row: Brand & Concierge on mobile, all on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10 relative z-10">
          {/* Column 1: Brand & Contact */}
          <div className="space-y-4">
            <Link to="/" className="inline-block group">
              <h1 className="text-2xl font-black text-white leading-none tracking-tight">
                SARTAAJ<span className="text-blue-500">BHARAT</span>
              </h1>
              <span className="text-[9px] font-bold text-slate-500 tracking-[0.3em] uppercase block mt-1">
                Premium Excellence
              </span>
            </Link>

            <p className="text-sm leading-relaxed max-w-xs font-medium">
              Redefining the digital shopping experience with premium technology
              and lifestyle essentials curated for the modern world.
            </p>

            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:-translate-y-0.5 transition-all border border-slate-700/50"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Experience and Corporate - Mobile: 2 columns side by side */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-6">
              {/* Experience - Mobile */}
              <div>
                <h3 className="text-white text-[11px] font-black uppercase tracking-[0.3em] mb-4">
                  Experience
                </h3>
                <ul className="space-y-2.5 text-sm font-semibold">
                  {[
                    "Latest Drops",
                    "Exclusive Collections",
                    "Hot Deals",
                    "Store Locator",
                    "Elite Membership",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="hover:text-blue-400 transition-colors flex items-center gap-2 group text-sm"
                      >
                        {item}
                        <ArrowUpRight
                          size={12}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Corporate - Mobile */}
              <div>
                <h3 className="text-white text-[11px] font-black uppercase tracking-[0.3em] mb-4">
                  Corporate
                </h3>
                <ul className="space-y-2.5 text-sm font-semibold">
                  {[
                    "Our Story",
                    "Careers at Sartaaj",
                    "Sustainability",
                    "Investors",
                    "Wholesale",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="hover:text-blue-400 transition-colors flex items-center gap-2 group text-sm"
                      >
                        {item}
                        <ArrowUpRight
                          size={12}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Hidden on mobile */}
          <div className="hidden md:block">
            <h3 className="text-white text-[11px] font-black uppercase tracking-[0.3em] mb-5">
              Experience
            </h3>
            <ul className="space-y-3 text-sm font-semibold">
              {[
                "Latest Drops",
                "Exclusive Collections",
                "Hot Deals",
                "Store Locator",
                "Elite Membership",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    {item}{" "}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:block">
            <h3 className="text-white text-[11px] font-black uppercase tracking-[0.3em] mb-5">
              Corporate
            </h3>
            <ul className="space-y-3 text-sm font-semibold">
              {[
                "Our Story",
                "Careers at Sartaaj",
                "Sustainability",
                "Investors",
                "Wholesale",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    {item}{" "}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Concierge */}
          <div className="space-y-5">
            <div>
              <h3 className="text-white text-[11px] font-black uppercase tracking-[0.3em] mb-5">
                Concierge
              </h3>
              <ul className="space-y-3.5">
                <li className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-lg bg-slate-800/50 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all border border-slate-700/50">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                      Call Center
                    </p>
                    <p className="text-white text-sm font-bold">
                      +91 98765 43210
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-lg bg-slate-800/50 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all border border-slate-700/50">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                      Email Support
                    </p>
                    <p className="text-white text-sm font-bold">
                      concierge@sartaaj.com
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Strip - Compact & Aligned */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-5">
            {/* Left Content */}
            <div className="text-center sm:text-left">
              <h3 className="text-white text-base sm:text-lg md:text-xl font-black">
                JOIN THE ELITE
              </h3>
              <p className="text-blue-100 text-xs sm:text-sm font-medium mt-0.5">
                Get exclusive access to the latest drops and private deals.
              </p>
            </div>

            {/* Form */}
            <form className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-white/10 backdrop-blur-md text-white px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-l-xl sm:rounded-r-none outline-none placeholder:text-blue-200 text-sm font-medium border border-white/20 sm:border-r-0 min-w-[200px]"
              />
              <button className="bg-white text-blue-600 px-5 sm:px-6 py-1.5 sm:py-2 rounded-xl sm:rounded-r-xl sm:rounded-l-none text-xs sm:text-sm font-black hover:bg-slate-100 transition-all shadow-lg whitespace-nowrap">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 pt-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em]">
            <p>&copy; 2026 SARTAAJ BHARAT. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-5">
              <Link
                to="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-conditions"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookie-policy"
                className="hover:text-white transition-colors"
              >
                Cookies
              </Link>
            </div>
            <p className="flex items-center gap-1 text-[10px]">
              Engineered with{" "}
              <Heart size={9} className="text-blue-600 fill-current" /> by
              Sartaaj Prime
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;