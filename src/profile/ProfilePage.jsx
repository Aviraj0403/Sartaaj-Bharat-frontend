import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Smile,
  Star,
  User,
  MapPin,
  Trash2,
  Menu,
  X,
} from "lucide-react";
import Orders from "./Orders";
import Support from "./Support";
import Reviews from "./Reviews";
import BeautyProfile from "./BeautyProfile";
import Addresses from "./Addresses";
import DeleteAccount from "./DeleteAccount";
import SignInPage from "../pages/auth/SignInPage"; // Import SignInPage component

export default function ProfilePage() {
  const { user, logout, loading } = useAuth(); // Get user and logout function from AuthContext
  const [activeKey, setActiveKey] = useState("orders");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const profileOptions = [
    { key: "orders", title: "My Orders", icon: <ShoppingBag size={24} />, component: <Orders /> },
    { key: "support", title: "Customer Support", icon: <Smile size={24} />, component: <Support /> },
    { key: "reviews", title: "My Reviews", icon: <Star size={24} />, component: <Reviews /> },
    { key: "beauty", title: "My Beauty Profile", icon: <User size={24} />, component: <BeautyProfile /> },
    { key: "addresses", title: "My Addresses", icon: <MapPin size={24} />, component: <Addresses /> },
    { key: "delete", title: "Delete Account", icon: <Trash2 size={24} />, component: <DeleteAccount /> },
  ];

  const activeOption = profileOptions.find((opt) => opt.key === activeKey);

  // Loading state or user not logged in
  if (loading) return <div>Loading...</div>;
  if (!user) {
    return <SignInPage />;
  }


  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white relative selection:bg-blue-600 selection:text-white">
      {/* Top Menu Toggle for Mobile */}
      <div className="md:hidden w-full p-6 bg-slate-900 border-b border-slate-800 flex justify-between items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="rounded-2xl bg-blue-600 p-2.5 shadow-lg shadow-blue-500/30">
            <User size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white italic tracking-tighter uppercase">{user.name || user.username}</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{user.email}</p>
          </div>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2.5 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Corporate Elite Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-slate-950 border-r border-slate-900 p-0 space-y-0 z-[120] transform transition-transform duration-500 md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:block overflow-y-auto no-scrollbar`}
      >
        {/* Profile Info Header in Sidebar */}
        <div className="p-8 border-b border-slate-900 bg-linear-to-b from-slate-900 to-slate-950">
          <div className="flex flex-col items-center">
            <div className="rounded-3xl bg-blue-600 p-5 mb-5 shadow-2xl shadow-blue-500/20 rotate-3 hover:rotate-0 transition-transform duration-500">
              <User size={48} className="text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-black text-white italic tracking-tight text-center uppercase">{user.name || user?.userName}</h2>
            <div className="mt-2 px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full">
              <span className="text-blue-400 font-black text-[9px] uppercase tracking-[0.3em]">Titan Member</span>
            </div>
          </div>
        </div>

        {/* Dynamic Navigation Menu */}
        <div className="p-4 space-y-2">
          {profileOptions.map((option) => (
            <div
              key={option.key}
              onClick={() => {
                setActiveKey(option.key);
                setSidebarOpen(false); // Close sidebar on mobile after selection
              }}
              className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 group ${activeKey === option.key
                ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20"
                : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`}
            >
              <div className={`${activeKey === option.key ? "text-white" : "text-blue-500 group-hover:scale-110"} transition-transform`}>
                {React.cloneElement(option.icon, { size: 20, strokeWidth: 2.5 })}
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] italic">{option.title}</h3>
            </div>
          ))}
        </div>

        {/* System Exit Portal */}
        <div className="p-8 pt-4">
          <button
            onClick={logout}
            className="w-full bg-slate-900 hover:bg-red-600/90 text-[10px] font-black uppercase tracking-[0.3em] text-white py-4 rounded-2xl transition-all duration-500 border border-white/5 hover:border-red-500/50 shadow-2xl flex items-center justify-center gap-3 active:scale-95 italic"
          >
            TERMINATE SESSION
          </button>
        </div>
      </div>

      {/* Void Overlay for Mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] md:hidden bg-slate-950/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 mt-0 md:mt-0 z-10 relative">
        {activeOption.component}
      </div>
    </div>
  );
}
