import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Smartphone,
  Info,
  Truck,
  ShoppingCart,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../../image/logo-cosmetic2.jpg";

export default function DesktopHeader() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };

  // ✅ Menu items with submenus
  const menuItems = [
    {
      name: "Face Makeup",
      path: "/face-makeup",
      subItems: ["Foundation", "Primer", "Blush", "Concealer"],
    },
    {
      name: "Lip Care & Makeup",
      path: "/lip-care",
      subItems: ["Lipstick", "Lip Gloss", "Lip Balm"],
    },
    {
      name: "Skin Care",
      path: "/skin-care",
      subItems: ["Serum", "Moisturizer", "Sunscreen"],
    },
    {
      name: "Hair Care",
      path: "/hair-care",
      subItems: ["Shampoo", "Conditioner", "Hair Oil"],
    },
    {
      name: "Nails",
      path: "/nails",
      subItems: ["Nail Polish", "Remover", "Tools"],
    },
    {
      name: "Fragrances",
      path: "/fragrances",
      subItems: ["Perfume", "Body Mist"],
    },
    {
      name: "New Products",
      path: "/new-product",
      subItems: [],
    },
    {
      name: "collections",
      path: "/new-product",
      subItems: [],
    },
  ];

  return (
    <header className="w-full border-b border-pink-100">
      {/* ✅ Top Info Bar */}
      <div className="bg-[#ffe6ee] text-gray-800 text-sm flex justify-between items-center px-8 py-2">
        <span>
          Welcome to <strong>Gurmeet Kaur Store</strong>
        </span>
        <div className="flex items-center gap-6 text-gray-700">
          <span className="flex items-center gap-2">
            <FaPhone className="text-pink-500" /> +91 9999161803
          </span>
          <span className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-pink-500" /> 11021, 5A Block WEA,
            Sat Nagar, Karol Bagh, Delhi, 110005
          </span>
        </div>
      </div>

      {/* ✅ Search Bar */}
      <div className="relative bg-pink-500 text-sm text-white flex justify-between items-center px-8 py-3 shadow-md">
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

        {/* 📱 Right side links */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-5 text-white font-medium">
          <a
            href="#"
            className="flex items-center gap-1 hover:text-gray-200 transition"
          >
            <Smartphone size={15} />
            <span>DOWNLOAD APP</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-1 hover:text-gray-200 transition"
          >
            <Info size={15} />
            <span>SUPPORT</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-1 hover:text-gray-200 transition"
          >
            <Truck size={15} />
            <span>TRACK ORDER</span>
          </a>
        </div>
      </div>

      {/* ✅ Main Navbar */}
      <div className="flex justify-between items-center px-8 py-3 bg-white shadow-md relative z-50">
        {/* Logo */}
        <div className="flex items-center gap-3">
  <Link to="/">
    <img
      src={logo}
      alt="Logo"
      className="h-12 w-auto object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
    />
  </Link>
</div>

        {/* 🛍️ Middle Menu Items with dropdown */}
      {/* 🛍️ Middle Menu Items with dropdown + active underline animation */}
<div className="flex-1 flex justify-center">
  <ul className="flex items-center gap-5 text-gray-800 font-semibold relative">
    {menuItems.map((item, index) => (
      <li
        key={index}
        className="relative group"
        onMouseEnter={() => setActiveMenu(index)}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <Link
          to={item.path}
          className="flex items-center gap-1 relative py-1
                     after:content-[''] after:absolute after:left-0 after:bottom-0 
                     after:w-0 after:h-[2px] after:bg-pink-500 after:transition-all after:duration-300
                     group-hover:after:w-full hover:text-pink-600"
        >
          {item.name}
          {item.subItems.length > 0 && (
            <ChevronDown size={16} className="mt-0.5" />
          )}
        </Link>

        {/* 🔽 Dropdown */}
        {item.subItems.length > 0 && activeMenu === index && (
          <ul className="absolute top-8 left-0 bg-white border border-pink-100 shadow-lg rounded-md w-44 py-2 z-50">
            {item.subItems.map((sub, subIndex) => (
              <li key={subIndex}>
                <Link
                  to={`${item.path}/${sub
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition"
                >
                  {sub}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
</div>


        {/* 🛒 Right Icons */}
        <div className="flex items-center gap-6 text-gray-700">
          <Link
            to="/cart"
            className="cursor-pointer hover:text-pink-600 transition"
          >
            <ShoppingCart />
          </Link>

          <Link to="/profile">
            <User
              className="cursor-pointer hover:text-pink-600 transition"
              size={22}
            />
          </Link>

          <LogOut
            className="cursor-pointer hover:text-pink-600 transition"
            size={22}
            onClick={handleLogout}
          />
        </div>
      </div>
    </header>
  );
}
