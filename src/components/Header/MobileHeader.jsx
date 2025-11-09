import React, { useState } from "react";
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
  LogOut,
} from "lucide-react";
import logo from "../../image/logo-cosmetic2.jpg";

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Face Makeup",
    "Lip Care & Makeup",
    "Skin Care",
    "Hair Care",
    "Nails",
    "Makeup Tools & Accessories",
    "Fragrances",
  ];

  return (
    <div className="w-full bg-white flex flex-col md:hidden relative">
      {/* Top Header with Menu & Logo */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
        {/* Hamburger Menu */}
        <button
          className="text-pink-500 hover:text-pink-600 transition"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={28} />
        </button>

        {/* Center Logo */}
        <img src={logo} alt="Logo" className="h-12 w-auto mx-auto" />

        {/* Right side icons: Profile | Cart */}
        <div className="flex items-center gap-4 text-gray-700">
          <button className="flex flex-col items-center text-xs hover:text-pink-500 transition">
            <User size={22} />
            <span>Profile</span>
          </button>
          <button className="flex flex-col items-center text-xs hover:text-pink-500 transition">
            <ShoppingBag size={22} />
            <span>Cart</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-2 border-b border-gray-200">
        <div className="flex items-center gap-2 bg-pink-50 rounded-full px-3 py-2 border border-pink-200">
          <Search className="text-pink-300" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-pink-300"
          />
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-2 z-50">
        <div className="flex flex-col items-center text-pink-500">
          <Home size={22} />
          <span className="text-xs">Home</span>
        </div>
        <div className="flex flex-col items-center text-gray-700">
          <List size={22} />
          <span className="text-xs">Categories</span>
        </div>
        <div className="flex flex-col items-center text-gray-700">
          <Tag size={22} />
          <span className="text-xs">Brands</span>
        </div>
        <div className="flex flex-col items-center text-gray-700">
          <Percent size={22} />
          <span className="text-xs">Offers</span>
        </div>
        <div className="flex flex-col items-center text-gray-700">
          <User size={22} />
          <span className="text-xs">Account</span>
        </div>
      </div>

      {/* Slide-in Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 z-50 rounded-r-2xl overflow-hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-pink-100">
          <h2 className="text-xl font-bold text-pink-600">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)}>
            <X size={26} className="text-pink-600" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex items-center justify-end px-6 py-4 border-b border-pink-200">
          <div className="flex items-center gap-2">
            <User size={24} className="text-pink-500" />
            <span className="font-semibold text-gray-800">Profile</span>
          </div>
        </div>

        {/* Menu Links with enhanced pink divider lines */}
        <ul className="flex flex-col mt-2 text-gray-800 font-semibold">
          {menuItems.map((item, index) => (
            <React.Fragment key={item}>
              <li className="cursor-pointer hover:text-white hover:bg-pink-500 px-4 py-3 transition-all duration-200 relative">
                {item}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-300"></span>
              </li>
              {index !== menuItems.length - 1 && (
                <hr className="border-pink-300 mx-4" />
              )}
            </React.Fragment>
          ))}
        </ul>

        {/* Logout */}
        <div className="absolute bottom-6 left-0 w-full px-6">
          <button className="flex items-center gap-3 w-full justify-center bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}
