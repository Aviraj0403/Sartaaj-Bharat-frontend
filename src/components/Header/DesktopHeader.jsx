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
  const [showTopBar, setShowTopBar] = useState(true); // top bar visibility
  const [lastScrollY, setLastScrollY] = useState(0); // track scroll position
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
    if (user) {
      navigate("/profile");
    } else {
      navigate("/signin?redirect=/profile");
    }
  };

  // ⭐ Handle scroll to hide/show top bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down → hide top bar
        setShowTopBar(false);
      } else {
        // scrolling up → show top bar
        setShowTopBar(true);
      }
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

  {/* 🔴 SEARCH BAR + SIGN IN */}
  <div
    className={`fixed left-0 w-full bg-pink-500 text-sm text-white flex justify-between items-center px-8 py-3 shadow-md z-[998] transition-all duration-300`}
    style={{ top: showTopBar ? "40px" : "0px" }} // adjust position dynamically
  >
    {/* Search */}
    <div className="flex justify-start w-full">
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search for products, brands and more..."
          className="w-full py-2 pl-10 pr-4 rounded-full border border-white focus:outline-none text-black placeholder-gray-700 bg-pink-100"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-2.5 text-gray-700"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
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

    {/* RIGHT SIDE */}
    <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-6 text-white font-medium">
      {/* <a className="flex items-center gap-1 hover:text-gray-200 transition">
        <Smartphone size={15} /> DOWNLOAD APP
      </a> */}
     <Link
  to="/contact-us"
  className="flex items-center gap-1 hover:text-gray-200 transition"
>
  <Info size={15} />
  SUPPORT
</Link>
     <Link
  to="/profile"
  className="flex items-center gap-1 text-sm font-semibold hover:text-gray-200 transition"
>
  <Truck size={15} />
  TRACK ORDER
</Link>
      {user ? (
        <div className="flex items-center gap-2">
          <User size={16} className="cursor-pointer hover:text-pink-900 " onClick={handleProfileClick} />
          <span className="font-semibold cursor-pointer" onClick={handleProfileClick}>
            {user.userName}
          </span>
          <LogOut size={16} className="cursor-pointer" onClick={handleLogout} />
        </div>
      ) : (
        <Link to="/signin" className="hover:text-gray-200">
          Sign In
        </Link>
      )}
    </div>
  </div>

  {/* 🔵 MENU NAVBAR */}
  <div
    className={`fixed left-0 w-full flex justify-between items-center px-8 py-3 bg-white shadow-md z-[997] transition-all duration-300`}
    style={{ top: showTopBar ? "100px" : "60px" }} // menu shifts down if top bar visible
  >
    <Link to="/">
      <img
        src={logo}
        alt="Logo"
        className="h-12 w-auto object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
      />
    </Link>

    <ul className="flex items-center gap-4 text-gray-800 font-semibold whitespace-nowrap z-10">
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
                <li key={subIndex}>
                  <Link
                    to={`/${item.slug}/${sub.slug}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600"
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

  {/* Spacer for fixed headers */}
  <div className="h-[170px]"></div>
</header>

  );
}
