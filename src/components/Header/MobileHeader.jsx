import React, { useState, useEffect } from "react";
import {
  User,
  ShoppingBag,
  Home,
  List,
  Tag,
  Percent,
  Menu,
  X,
  Search,
  ChevronDown,
  ChevronUp,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../image/sb.png";
import { useQuery } from "@tanstack/react-query";
import { getMenuCategories } from "../../services/categoryApi";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();
  const hideSearch = location.pathname === "/search";

  // Redux Cart
  const { items: cartItems } = useSelector((state) => state.cart);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // Categories
  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getMenuCategories,
  });

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate("/signin");
  };

  const handleProfileClick = () => {
    setIsMenuOpen(false);
    if (user) navigate("/profile");
    else navigate("/signin?redirect=/profile");
  };

  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  // Active tab: click-settable and route-synced
  const [activeTab, setActiveTab] = useState(() => {
    const p = location.pathname || "";
    if (p === "/" || p === "") return "home";
    if (p.startsWith("/new-product") || p.startsWith("/new-products"))
      return "brands";
    if (p.startsWith("/profile")) return "account";
    return "";
  });

  useEffect(() => {
    const p = location.pathname || "";
    if (p === "/" || p === "") setActiveTab("home");
    else if (p.startsWith("/new-product") || p.startsWith("/new-products"))
      setActiveTab("brands");
    else if (p.startsWith("/profile")) setActiveTab("account");
    else setActiveTab("");
  }, [location.pathname]);

  return (
    <div className="w-full bg-white flex flex-col md:hidden">
      {/* 🔝 Sticky Header */}
      <div className="fixed top-0 left-0 w-full z-[90] bg-white shadow-md">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
          {/* Menu Button */}
          <button
            className="text-slate-900 hover:text-blue-600 transition-colors"
            onClick={() => {
              setActiveTab("menu");
              setIsMenuOpen(true);
            }}
          >
            <Menu size={32} strokeWidth={2.5} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex justify-center">
            <img id="logo" src={logo} className="h-10" alt="Logo" />
          </Link>

          {/* Profile + Cart */}
          <div className="flex items-center gap-4 text-gray-700">
            {/* Search */}
            <button
               onClick={() => {
                 setActiveTab("search");
                 navigate("/search");
               }}
               className={`relative flex flex-col items-center gap-1 transition-colors ${activeTab === "search" ? "text-blue-600" : "text-slate-400"}`}
            >
               <Search size={22} strokeWidth={2.5} />
               <span className="text-[8px] font-black uppercase tracking-widest italic leading-none">
                 SCAN
               </span>
            </button>

            {/* Profile */}
            <button
              onClick={handleProfileClick}
              className={`relative flex flex-col items-center gap-1 transition-colors ${activeTab === "account" ? "text-blue-600" : "text-slate-400"}`}
            >
              <User size={24} strokeWidth={2.5} />
              <span className="text-[8px] font-black uppercase tracking-widest italic leading-none">
                ALPHA-01
              </span>
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors"
            >
              <div className="relative">
                <ShoppingBag size={24} strokeWidth={2.5} />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-2 text-[9px] font-black italic bg-blue-600 text-white rounded-full px-1.5 py-0.5 shadow-lg shadow-blue-500/30">
                    {totalQuantity}
                  </span>
                )}
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest italic leading-none">
                CARGO
              </span>
            </Link>
          </div>
        </div>

      </div>

      {/* Spacer for sticky header */}
      <div className="pt-[65px]"></div>

      {/* 📱 Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-2 z-50">
        <Link
          to="/"
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === "home" ? "text-blue-600 scale-110" : "text-slate-400"}`}
        >
          <Home size={22} strokeWidth={activeTab === "home" ? 3 : 2} />
          <span className="text-[9px] font-black uppercase tracking-widest italic">Core</span>
        </Link>

        <button
          onClick={() => {
            setActiveTab("search");
            navigate("/search");
          }}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === "search" ? "text-blue-600 scale-110" : "text-slate-400"}`}
        >
          <Search size={22} strokeWidth={activeTab === "search" ? 3 : 2} />
          <span className="text-[9px] font-black uppercase tracking-widest italic">Scan</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("menu");
            setIsMenuOpen(true);
          }}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === "menu" ? "text-blue-600 scale-110" : "text-slate-400"}`}
        >
          <List size={22} strokeWidth={activeTab === "menu" ? 3 : 2} />
          <span className="text-[9px] font-black uppercase tracking-widest italic">Grid</span>
        </button>

        <Link
          to="/new-products"
          onClick={() => setActiveTab("brands")}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === "brands" ? "text-blue-600 scale-110" : "text-slate-400"}`}
        >
          <Tag size={22} strokeWidth={activeTab === "brands" ? 3 : 2} />
          <span className="text-[9px] font-black uppercase tracking-widest italic">Vault</span>
        </Link>

        <button
          onClick={() => {
            setActiveTab("account");
            handleProfileClick();
          }}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === "account" ? "text-blue-600 scale-110" : "text-slate-400"}`}
        >
          <User size={22} strokeWidth={activeTab === "account" ? 3 : 2} />
          <span className="text-[9px] font-black uppercase tracking-widest italic">Alpha</span>
        </button>
      </div>

      {/* ⭐ Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-white shadow-xl transform transition-transform duration-300 z-[100] rounded-r-2xl ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-8 border-b border-white/5 bg-gradient-to-b from-slate-900 to-slate-950 sticky top-0 z-10">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
            >
              <X size={24} strokeWidth={3} />
            </button>
          </div>

          <div className="flex flex-col items-center">
            {user ? (
              <>
                <div className="rounded-3xl bg-blue-600 p-5 mb-5 shadow-2xl shadow-blue-500/20 rotate-3 hover:rotate-0 transition-transform duration-500">
                  <User size={48} className="text-white" strokeWidth={2.5} />
                </div>
                <h2 className="text-xl font-black text-white italic tracking-tight text-center uppercase">
                  {user.name || user.userName}
                </h2>
                <div className="mt-2 px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full">
                  <span className="text-blue-400 font-black text-[9px] uppercase tracking-[0.3em]">
                    Verified Member
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-3xl bg-slate-800 p-5 mb-5 shadow-2xl shadow-slate-900/20 border border-white/5">
                  <User size={48} className="text-slate-500" strokeWidth={2.5} />
                </div>
                <h2 className="text-xl font-black text-white italic tracking-tight text-center uppercase">
                  ELITE ACCESS
                </h2>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/signin");
                  }}
                  className="mt-4 bg-blue-600 text-white px-8 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] italic hover:bg-blue-500 transition-all shadow-lg active:scale-95 border border-white/10"
                >
                  Authorize Now
                </button>
              </>
            )}
          </div>
        </div>

        {/* Scrollable Menu */}
        <div className="h-[calc(100vh-64px)] overflow-y-auto pb-24 bg-white">
          <div className="flex flex-col px-6 py-6 border-b border-slate-100 gap-2">
            <button
              onClick={handleProfileClick}
              className="flex items-center justify-between p-4 rounded-2xl text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-100/50 transition-colors">
                  <User size={20} className="text-slate-400 group-hover:text-blue-600" />
                </div>
                <span className="font-black text-[10px] uppercase tracking-[0.2em] italic">Dashboard</span>
              </div>
              <ChevronDown size={14} className="-rotate-90 text-slate-300" />
            </button>

            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between p-4 rounded-2xl text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-100/50 transition-colors relative">
                  <ShoppingBag size={20} className="text-slate-400 group-hover:text-blue-600" />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 text-[8px] bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center font-black">
                      {totalQuantity}
                    </span>
                  )}
                </div>
                <span className="font-black text-[10px] uppercase tracking-[0.2em] italic">Cargo Bin</span>
              </div>
              <ChevronDown size={14} className="-rotate-90 text-slate-300" />
            </Link>

            <Link
              to="/new-products"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between p-4 rounded-2xl text-slate-700 hover:bg-pink-50 hover:text-pink-600 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-pink-100/50 transition-colors">
                  <Tag size={20} className="text-slate-400 group-hover:text-pink-600" />
                </div>
                <span className="font-black text-[10px] uppercase tracking-[0.2em] italic">New Archives</span>
              </div>
              <ChevronDown size={14} className="-rotate-90 text-slate-300" />
            </Link>

            <Link
              to="/collections"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between p-4 rounded-2xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-100/50 transition-colors">
                  <List size={20} className="text-slate-400 group-hover:text-indigo-600" />
                </div>
                <span className="font-black text-[10px] uppercase tracking-[0.2em] italic">Collections</span>
              </div>
              <ChevronDown size={14} className="-rotate-90 text-slate-300" />
            </Link>
          </div>

          <div className="px-6 py-4">
            <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 pl-4 italic">Categorized Protocols</h3>
            <ul className="space-y-1">
              {isLoading && <p className="px-6 py-4 text-gray-500">Loading categories...</p>}
              {menuItems.map((item, index) => (
                <li key={item._id} className="overflow-hidden">
                  <div
                    className={`flex justify-between items-center px-4 py-4 rounded-2xl transition-all cursor-pointer ${openSubMenu === index ? "bg-slate-50 text-blue-600 shadow-sm" : "text-slate-700 hover:bg-slate-50"}`}
                    onClick={() => {
                      if (item.subcategories?.length > 0) toggleSubMenu(index);
                      else {
                        navigate(`/${item.slug}`);
                        setIsMenuOpen(false);
                      }
                    }}
                  >
                    <span className="font-black text-[10px] uppercase tracking-[0.15em] italic">{item.name}</span>
                    {item.subcategories?.length > 0 &&
                      (openSubMenu === index ? (
                        <ChevronUp size={16} strokeWidth={3} />
                      ) : (
                        <ChevronDown size={16} strokeWidth={3} />
                      ))}
                  </div>

                  <AnimatePresence>
                    {openSubMenu === index && item.subcategories?.length > 0 && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-slate-50/50 rounded-2xl mt-1 overflow-hidden"
                      >
                        {item.subcategories.map((sub) => (
                          <li key={sub._id}>
                            <Link
                              to={`/${item.slug}/${sub.slug}`}
                              onClick={() => setIsMenuOpen(false)}
                              className="block px-8 py-3 text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>

          {user && (
            <div className="px-10 py-10">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full justify-center bg-red-600/5 text-red-500 hover:bg-red-600 hover:text-white transition-all duration-500 font-black text-[9px] uppercase tracking-[0.4em] py-5 rounded-[2rem] italic border border-red-500/20 shadow-lg shadow-red-500/5"
              >
                <LogOut size={18} strokeWidth={3} /> Purge Session
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[95] transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}
