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
import logo from "../../image/logo-cosmetic2.jpg";
import { useQuery } from "@tanstack/react-query";
import { getMenuCategories } from "../../services/categoryApi";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";


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
    0
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
    if (p.startsWith("/new-product") || p.startsWith("/new-products")) return "brands";
    if (p.startsWith("/profile")) return "account";
    return "";
  });

  useEffect(() => {
    const p = location.pathname || "";
    if (p === "/" || p === "") setActiveTab("home");
    else if (p.startsWith("/new-product") || p.startsWith("/new-products")) setActiveTab("brands");
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
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </Link>

          {/* Profile + Cart */}
          <div className="flex items-center gap-4 text-gray-700">
            {/* Profile */}
            <button
              onClick={handleProfileClick}
              className={`relative flex flex-col items-center gap-1 transition-colors ${activeTab === 'account' ? 'text-blue-600' : 'text-slate-400'}`}
            >
              <User size={24} strokeWidth={2.5} />
              <span className="text-[8px] font-black uppercase tracking-widest italic leading-none">ALPHA-01</span>
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
              <span className="text-[8px] font-black uppercase tracking-widest italic leading-none">CARGO</span>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {/* Search Bar (Hide on /search page) */}
        {!hideSearch && (
          <div className="px-4 py-4 border-b border-slate-50 bg-white">
            <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-5 py-3 border border-slate-100 group">
              <Search className="text-slate-400" size={18} strokeWidth={3} />
              <div
                className="w-full bg-transparent outline-none text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-400"
                onClick={() => navigate("/search")}
              >
                <span>Initialize Archive Search...</span>
              </div>
            </div>
          </div>
        )}



      </div>

      {/* Spacer for sticky header */}
      {!hideSearch && <div className="pt-[130px]"></div>}

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

        {/* <Link to="/offers" className="flex flex-col items-center text-gray-700">
          <Percent size={22} />
          <span className="text-xs">Offers</span>
        </Link> */}

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
        className={`fixed top-0 left-0 h-screen w-72 bg-white shadow-xl transform transition-transform duration-300 z-[100] rounded-r-2xl ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-8 bg-slate-950 sticky top-0 z-10 border-b border-white/5">
          <div>
            <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">ELITE SYSTEMS</h2>
            <p className="text-blue-500 text-[8px] font-black uppercase tracking-[0.4em] mt-1">Authorized Access Only</p>
          </div>
          <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        {/* Scrollable Menu */}
        <div className="h-[calc(100vh-64px)] overflow-y-auto pb-20">
          {/* Static Links */}
          <div className="flex flex-col px-6 py-4 border-b border-slate-200 gap-4">
            <button
              onClick={handleProfileClick}
              className="flex items-center gap-3 text-gray-800 hover:text-blue-600 transition"
            >
              <User size={22} />
              <span>My Profile</span>
            </button>

            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 text-gray-800 hover:text-blue-600 transition relative"
            >
              <ShoppingBag size={22} />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-2 text-[10px] bg-pink-600 text-white rounded-full px-1.5 py-0.5">
                  {totalQuantity}
                </span>
              )}
              <span>My Cart</span>
            </Link>

            <Link
              to="/new-products"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 text-gray-800 hover:text-pink-600 transition"
            >
              <Tag size={22} />
              <span>New Arrival</span>
            </Link>

            <Link
              to="/collections"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 text-gray-800 hover:text-pink-600 transition"
            >
              <List size={22} />
              <span>Collections</span>
            </Link>
          </div>

          {/* Categories */}
          <ul className="flex flex-col mt-2 text-gray-800 font-semibold">
            {isLoading && (
              <p className="px-6 py-4 text-gray-500">Loading categories...</p>
            )}
            {menuItems.map((item, index) => (
              <li key={item._id} className="border-b border-pink-100">
                <div
                  className="flex justify-between items-center px-5 py-3 hover:bg-pink-500 hover:text-white transition cursor-pointer"
                  onClick={() => {
                    if (item.subcategories.length > 0) toggleSubMenu(index);
                    else {
                      navigate(`/${item.slug}`);
                      setIsMenuOpen(false);
                    }
                  }}
                >
                  {item.name}
                  {item.subcategories.length > 0 &&
                    (openSubMenu === index ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    ))}
                </div>

                {openSubMenu === index && item.subcategories.length > 0 && (
                  <ul className="bg-pink-50 text-sm font-normal">
                    {item.subcategories.map((sub) => (
                      <li key={sub._id}>
                        <Link
                          to={`/${item.slug}/${sub.slug}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-8 py-2 hover:bg-pink-100 hover:text-pink-600"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Logout */}
          {user && (
            <div className="w-full px-6 py-10">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full justify-center bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white transition-all duration-300 font-black text-[10px] uppercase tracking-[0.3em] py-5 rounded-[2rem] italic border border-red-500/20"
              >
                <LogOut size={20} strokeWidth={3} /> Purge Session
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-[95]"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}
