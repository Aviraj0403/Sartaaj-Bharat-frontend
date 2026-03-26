import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, ArrowRight, Smartphone, Headphones, Cable, BatteryCharging } from "lucide-react";

const REDIRECT_SECONDS = 12;

const floatingIcons = [
  { Icon: Smartphone, top: "10%", left: "8%", delay: 0, size: 28 },
  { Icon: Headphones, top: "15%", left: "85%", delay: 0.4, size: 24 },
  { Icon: BatteryCharging, top: "75%", left: "6%", delay: 0.8, size: 22 },
  { Icon: Cable, top: "80%", left: "88%", delay: 1.2, size: 26 },
  { Icon: Smartphone, top: "50%", left: "92%", delay: 0.6, size: 18 },
  { Icon: Headphones, top: "60%", left: "4%", delay: 1.0, size: 20 },
];

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 relative overflow-hidden flex items-center justify-center px-4 py-16">

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl top-0 left-1/4 animate-pulse" />
        <div className="absolute w-80 h-80 bg-blue-500/10 rounded-full blur-3xl bottom-10 right-1/4 animate-pulse delay-700" />
        <div className="absolute w-64 h-64 bg-slate-700/20 rounded-full blur-2xl top-1/2 left-0 animate-pulse delay-300" />
      </div>

      {/* Floating tech icons */}
      {floatingIcons.map(({ Icon, top, left, delay, size }, idx) => (
        <motion.div
          key={idx}
          className="absolute text-blue-500/20 pointer-events-none"
          style={{ top, left }}
          animate={{ y: [0, -14, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon size={size} />
        </motion.div>
      ))}

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-lg w-full text-center"
      >
        {/* 404 Giant Number */}
        <div className="relative mb-6 select-none">
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-[10rem] sm:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-700 leading-none tracking-tighter"
          >
            404
          </motion.div>

          {/* Floating phone inside the 404 */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 backdrop-blur-sm flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.3)]">
              <Smartphone size={32} className="text-blue-400" />
            </div>
          </motion.div>
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
            Page Not Found
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight tracking-tight">
            Looks like this signal's lost!
          </h1>
          <p className="text-slate-400 text-base font-medium max-w-sm mx-auto leading-relaxed mb-8">
            The page you're searching for doesn't exist. Maybe the link is broken, or this accessory has been removed from our collection.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-95"
          >
            <Home size={17} />
            Back to Home
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm rounded-xl border border-slate-700 hover:border-slate-600 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <Search size={17} />
            Search Products
          </Link>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {[
            { label: "Phones", to: "/category/phones" },
            { label: "Earphones", to: "/category/earphones" },
            { label: "Chargers", to: "/category/chargers" },
            { label: "Covers", to: "/category/covers" },
          ].map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-blue-400 transition-colors px-3 py-1.5 bg-slate-800/60 rounded-lg border border-slate-700/50 hover:border-blue-500/40"
            >
              {label}
              <ArrowRight size={11} />
            </Link>
          ))}
        </motion.div>

        {/* Countdown */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-slate-600 text-xs font-medium"
        >
          Redirecting to homepage in{" "}
          <span className="text-blue-500 font-bold tabular-nums">{countdown}s</span>...
        </motion.p>

        {/* Progress bar */}
        <div className="mt-3 h-0.5 w-48 mx-auto bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-600 rounded-full"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: REDIRECT_SECONDS, ease: "linear" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
