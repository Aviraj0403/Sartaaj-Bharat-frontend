import React from "react";
import { Link } from "react-router-dom";

import {
  Smartphone,
  Info,
  Truck,
  ShoppingCart,
  User,
  LogOut,
} from "lucide-react"; // ✅ Added new icons
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../../image/logo-cosmetic2.jpg"; // ✅ Update your logo path

export default function DesktopHeader() {
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
            <FaMapMarkerAlt className="text-pink-500" /> 11021, 5A Block WEA, Sat Nagar, Karol Bagh, Delhi, 110005
          </span>
        </div>
      </div>

      {/* ✅ Search Bar */}
      <div className="relative bg-pink-500 text-sm text-white flex justify-between items-center px-8 py-3 shadow-md">
        {/* 🔍 Search Field */}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </div>
        </div>

        {/* 📱 Right side links */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-5 text-white font-medium">
          <a href="#" className="flex items-center gap-1 hover:text-gray-200 transition">
            <Smartphone size={15} />
            <span>DOWNLOAD APP</span>
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-gray-200 transition">
            <Info size={15} />
            <span>SUPPORT</span>
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-gray-200 transition">
            <Truck size={15} />
            <span>TRACK ORDER</span>
          </a>
        </div>
      </div>

      {/* ✅ Main Navbar */}
      <div className="flex justify-between items-center px-8 py-3 bg-white shadow-md">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* 🛍️ Middle Menu Items */}
        <ul className="flex items-center gap-8 text-gray-800 font-semibold">
          {[
            "Face Makeup",
            "Lip Care & Makeup",
            "Skin Care",
            "Hair Care",
            "Nails",
            "Makeup Tools & Accessories",
            "Fragrances",
          ].map((item) => (
            <li
              key={item}
              className="cursor-pointer hover:text-pink-600 hover:underline underline-offset-8 transition-all duration-200"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* 🛒 Right Icons (Cart, Profile, Logout) */}
        <div className="flex items-center gap-6 text-gray-700">
        <Link to="/cart" className="cursor-pointer hover:text-pink-600 transition">
        <ShoppingCart />
      </Link>
        

{/* wrap in Link */}
<Link to="/profile">
  <User className="cursor-pointer hover:text-pink-600 transition" size={22} />
</Link>
          <LogOut className="cursor-pointer hover:text-pink-600 transition" />
        </div>
      </div>
    </header>
  );
}
