import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Smartphone, Info, Truck, ShoppingCart, User, LogOut, ChevronDown } from "lucide-react";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../../image/logo-cosmetic2.jpg";
import { useQuery } from "@tanstack/react-query";
import { getMenuCategories } from "../../services/categoryApi";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";

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
      <header className="w-full border-b border-pink-100">
        <div className="bg-red-100 text-center py-4">
          Failed to load categories. {error?.message}
        </div>
      </header>
    );
  }

  return (
    <header className="w-full z-[999]">
      {/* 🟣 TOP BAR */}
      <div
        className={`fixed top-0 left-0 w-full bg-[#ffe6ee] text-gray-800 text-sm flex justify-between items-center px-8 py-3 shadow transition-transform duration-300 z-[999] ${
          showTopBar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <span>
          Welcome to <strong>Gurmeet Kaur Store</strong>
        </span>
        <div className="flex items-center gap-6 text-gray-700">
          <span className="flex items-center gap-2">
            <FaPhone className="text-pink-500" /> +91 9999161803
          </span>
          <span className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-pink-500" /> 11021, 5A Block WEA, Sat Nagar, Karol Bagh, Delhi, 110005
          </span>
        </div>
      </div>

      {/* 🔴 SEARCH + SIGN IN */}
      <div
        className={`fixed left-0 w-full bg-pink-500 text-sm text-white flex justify-between items-center px-8 py-3 shadow-md z-[998] transition-all duration-300`}
        style={{ top: showTopBar ? "40px" : "0px" }}
      >
        {/* Premium Search */}
        <div className="flex justify-start w-full">
          <div
            onClick={() => navigate("/search")}
            className="relative w-1/3 cursor-pointer group"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400/40 to-fuchsia-400/40 blur-xl opacity-0 group-hover:opacity-100 transition-all"></div>

            <div className="bg-pink-100 border border-white rounded-full pl-10 pr-4 py-2 shadow-md text-gray-700 font-medium hover:shadow-lg transition-all">
              Search for products, brands and more...
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-2.5 text-gray-700"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>
        </div>

        {/* Right Side */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-6 text-white font-medium">
          <Link to="/contact-us" className="flex items-center gap-1 hover:text-gray-200 transition">
            <Info size={15} /> SUPPORT
          </Link>

          <Link to="/profile" className="flex items-center gap-1 text-sm font-semibold hover:text-gray-200 transition">
            <Truck size={15} /> TRACK ORDER
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <User size={16} className="cursor-pointer hover:text-pink-900" onClick={handleProfileClick} />
              <span className="font-semibold cursor-pointer" onClick={handleProfileClick}>
                {user.userName}
              </span>
              <LogOut size={16} className="cursor-pointer" onClick={handleLogout} />
            </div>
          ) : (
            <Link to="/signin" className="hover:text-gray-200">Sign In</Link>
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
        className="flex items-center gap-1 relative py-1 
          after:content-[''] after:absolute after:left-0 after:bottom-0 
          after:w-0 after:h-[2px] after:bg-pink-500 after:transition-all after:duration-300
          group-hover:after:w-full hover:text-pink-600"
      >
        {item.name}
        {item.subcategories.length > 0 && <ChevronDown size={16} className="mt-0.5" />}
      </Link>

      {item.subcategories.length > 0 && activeMenu === index && (
        <ul className="absolute top-8 left-0 bg-white border border-pink-100 shadow-lg rounded-md w-44 py-2">
          {item.subcategories.map((sub, subIndex) => (
            <Link
              key={subIndex}
              to={`/${item.slug}/${sub.slug}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600"
            >
              {sub.name}
            </Link>
          ))}
        </ul>
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
        <Link to="/cart" className="relative cursor-pointer hover:text-pink-600 transition">
          <ShoppingCart size={24} />
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-pink-600 text-white rounded-full px-2 py-0.5">
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
