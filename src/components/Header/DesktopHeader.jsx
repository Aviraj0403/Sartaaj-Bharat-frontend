import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Smartphone, Info, Truck, ShoppingCart, User, LogOut, ChevronDown } from "lucide-react";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../../image/logo-cosmetic2.jpg";
import { useQuery } from "@tanstack/react-query";
import { getMenuCategories } from "../../services/categoryApi";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import { HiOutlinePhone } from "react-icons/hi";

export default function DesktopHeader() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user, logout } = useAuth();
  const { items: cartItems } = useSelector((state) => state.cart);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const { data: menuItems, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getMenuCategories,
  });

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  const handleProfileClick = () => {
    if (user) navigate("/profile");
    else navigate("/signin?redirect=/profile");
  };

  // ⭐ Hide/Show on Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowTopBar(false);
      else setShowTopBar(true);

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (isLoading) {
    return (
      <header className="w-full border-b border-pink-100">
        <div className="bg-gray-200 text-center py-4">Loading...</div>
      </header>
    );
  }

  if (isError) {
    return (
      <header className="w-full border-b border-slate-100">
        <div className="bg-slate-50 text-center py-4 font-black text-[10px] uppercase tracking-[0.4em] text-slate-400 italic">Synchronizing Neural Interface...</div>
      </header>
    );
  }

  return (
    <header className="w-full z-[999]">
      {/* 🟣 TOP BAR */}
      <div
        className={`fixed top-0 left-0 w-full bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.3em] flex justify-between items-center px-8 py-3 shadow-2xl transition-transform duration-500 z-[999] italic ${showTopBar ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
          <span>LOGGED INTO <strong className="text-blue-500">ELITE ENTERPRISE</strong></span>
        </div>
        <div className="flex items-center gap-8">
          <span className="flex items-center gap-2 hover:text-blue-500 transition-colors cursor-pointer">
            <HiOutlinePhone className="text-blue-500 text-sm" />
            +91 9999398494
          </span>
          <span className="flex items-center gap-2 hover:text-blue-500 transition-colors cursor-pointer">
            <FaMapMarkerAlt className="text-blue-500 text-sm" /> KAROL BAGH SECURE HUB
          </span>
        </div>
      </div>

      {/* 🔴 SEARCH + SIGN IN */}
      <div
        className={`fixed left-0 w-full bg-blue-600 text-sm text-white flex justify-between items-center px-8 py-4 shadow-xl z-[998] transition-all duration-500 border-b border-white/10`}
        style={{ top: showTopBar ? "40px" : "0px" }}
      >
        {/* Premium Search */}
        <div className="flex justify-start w-full">
          <div
            onClick={() => navigate("/search")}
            className="relative w-2/5 cursor-pointer group"
          >
            <div className="absolute inset-0 rounded-2xl bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-all"></div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl pl-12 pr-6 py-3 shadow-2xl text-white font-black text-[10px] uppercase tracking-[0.2em] italic hover:bg-white/20 transition-all">
              Initiate Product Scan...
            </div>

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={18} strokeWidth={3} />
          </div>
        </div>

        {/* Right Side */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] italic">
          <Link to="/contact-us" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
            <Info size={16} strokeWidth={3} /> SUPPORT
          </Link>

          <Link to="/profile" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
            <Truck size={16} strokeWidth={3} /> TRACKING
          </Link>

          {user ? (
            <div className="flex items-center gap-4 bg-slate-900 px-6 py-2 rounded-full border border-white/10">
              <User size={16} className="cursor-pointer hover:text-blue-500 transition-colors" onClick={handleProfileClick} />
              <span className="cursor-pointer hover:text-blue-500 transition-colors uppercase" onClick={handleProfileClick}>
                {user.userName}
              </span>
              <div className="w-[2px] h-3 bg-white/10 mx-1"></div>
              <LogOut size={16} className="cursor-pointer hover:text-red-500 transition-colors" onClick={handleLogout} />
            </div>
          ) : (
            <Link to="/signin" className="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-slate-900 hover:text-white transition-all shadow-lg active:scale-95">AUTHORIZE ACCESS</Link>
          )}
        </div>
      </div>

      {/* 🔵 MENU NAVBAR */}
      <div
        className="fixed left-0 w-full flex justify-between items-center px-8 py-3 bg-white shadow-md z-[997] transition-all duration-300"
        style={{ top: showTopBar ? "100px" : "60px" }}
      >
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-auto object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <ul className="flex items-center gap-4 text-gray-800 font-semibold whitespace-nowrap z-10">

          {/* ⭐ DYNAMIC MENU ITEMS FIRST */}
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="relative group"
              onMouseEnter={() => setActiveMenu(index)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                to={`/${item.slug}`}
                className="flex items-center gap-2 relative py-2 text-[11px] font-black uppercase tracking-[0.2em] italic transition-colors
          after:content-[''] after:absolute after:left-0 after:bottom-0 
          after:w-0 after:h-[3px] after:bg-blue-600 after:transition-all after:duration-500
          group-hover:after:w-full group-hover:text-blue-600 text-slate-900"
              >
                {item.name}
                {item.subcategories.length > 0 && <ChevronDown size={14} strokeWidth={3} className="mt-0.5 group-hover:rotate-180 transition-transform duration-500" />}
              </Link>

              {item.subcategories.length > 0 && activeMenu === index && (
                <div className="absolute top-10 left-0 z-50">
                  <ul
                    className="
        bg-white/95
        backdrop-blur-xl
        border-x border-b border-slate-100
        shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]
        rounded-b-[2rem]
        w-80
        max-h-[500px]
        overflow-y-auto
        py-6
        scrollbar-hide
      "
                  >
                    {item.subcategories.map((sub, subIndex) => (
                      <Link
                        key={subIndex}
                        to={`/${item.slug}/${sub.slug}`}
                        className="
            block
            px-8
            py-4
            text-[10px]
            font-black
            uppercase
            tracking-[0.25em]
            italic
            text-slate-500
            hover:text-blue-600
            hover:translate-x-3
            transition-all
            duration-300
          "
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </ul>
                </div>
              )}

            </li>
          ))}

          {/* ⭐ STATIC MENU ITEM 1 → NEW ARRIVALS */}
          <li>
            <Link
              to="/new-products"
              className="hover:text-pink-600 transition"
            >
              New Arrivals
            </Link>
          </li>

          {/* ⭐ STATIC MENU ITEM 2 → CLOTHS */}
          <li>
            {/* <Link
      to="/cloths"
      className="hover:text-pink-600 transition"
    >
      Cloths
    </Link> */}
          </li>

        </ul>


        {/* CART ICON */}
        <Link to="/cart" className="relative cursor-pointer group">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-500">
            <ShoppingBag size={22} strokeWidth={2.5} />
          </div>
          {totalQuantity > 0 && (
            <span className="absolute -top-1 -right-1 text-[10px] font-black italic bg-slate-900 text-white rounded-full px-2 py-0.5 shadow-xl">
              {totalQuantity}
            </span>
          )}
        </Link>
      </div>

      {/* Spacer */}
      <div className="h-[170px]"></div>
    </header>
  );
}
