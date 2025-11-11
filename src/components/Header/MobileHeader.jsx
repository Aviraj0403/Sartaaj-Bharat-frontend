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
  ChevronDown,
  ChevronUp,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../image/logo-cosmetic2.jpg";

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };

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
      name: "Collections",
      path: "/collections",
      subItems: [],
    },
  ];

  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  return (
<div className="w-full bg-white flex flex-col md:hidden">
  {/* 🔝 Fixed Sticky Header */}
  <div className="fixed top-0 left-0 w-full z-[90] bg-white ">
    {/* 🔝 Top Header */}
    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
      <button
        className="text-pink-500 hover:text-pink-600 transition"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu size={28} />
      </button>

      <Link to="/" className="flex justify-center">
        <img src={logo} alt="Logo" className="h-12 w-auto" />
      </Link>

      <div className="flex items-center gap-4 text-gray-700">
        <Link
          to="/profile"
          className="flex flex-col items-center text-xs hover:text-pink-500 transition"
        >
          <User size={22} />
          <span>Profile</span>
        </Link>
        <Link
          to="/cart"
          className="flex flex-col items-center text-xs hover:text-pink-500 transition"
        >
          <ShoppingBag size={22} />
          <span>Cart</span>
        </Link>
      </div>
    </div>

    {/* 🔍 Search Bar */}
    <div className="px-4 py-2 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-2 bg-pink-50 rounded-full px-3 py-2 border border-pink-200">
        <Search className="text-pink-300" size={18} />
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-pink-300"
        />
      </div>
    </div>
  </div>


<div className="pt-[130px]">
      {/* Your page content or main component renders here */}
    </div>
      {/* 📱 Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-2 z-50">
        <Link
          to="/"
          className="flex flex-col items-center text-pink-500 hover:text-pink-600 transition"
        >
          <Home size={22} />
          <span className="text-xs">Home</span>
        </Link>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col items-center text-gray-700 hover:text-pink-600 transition"
        >
          <List size={22} />
          <span className="text-xs">Menu</span>
        </button>
        <Link
          to="/brands"
          className="flex flex-col items-center text-gray-700 hover:text-pink-600 transition"
        >
          <Tag size={22} />
          <span className="text-xs">Brands</span>
        </Link>
        <Link
          to="/offers"
          className="flex flex-col items-center text-gray-700 hover:text-pink-600 transition"
        >
          <Percent size={22} />
          <span className="text-xs">Offers</span>
        </Link>
        <Link
          to="/profile"
          className="flex flex-col items-center text-gray-700 hover:text-pink-600 transition"
        >
          <User size={22} />
          <span className="text-xs">Account</span>
        </Link>
      </div>

      {/* 📂 Sidebar Menu */}
      <div
    className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 z-[100] rounded-r-2xl overflow-y-auto ${
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
        {/* Profile / Cart / Logout */}
        <div className="flex flex-col px-6 py-4 border-b border-pink-200 gap-3">
          <Link
            to="/profile"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2 text-gray-800 hover:text-pink-600 transition"
          >
            <User size={22} />
            <span>My Profile</span>
          </Link>
          <Link
            to="/cart"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2 text-gray-800 hover:text-pink-600 transition"
          >
            <ShoppingBag size={22} />
            <span>My Cart</span>
          </Link>
        </div>

        {/* Menu with Submenus */}
        <ul className="flex flex-col mt-2 text-gray-800 font-semibold">
          {menuItems.map((item, index) => (
            <li key={item.name} className="border-b border-pink-100">
       <div
  className="flex justify-between items-center px-5 py-3 hover:bg-pink-500 hover:text-white transition-all duration-200 cursor-pointer"
  onClick={() => {
    if (item.subItems.length > 0) {
      toggleSubMenu(index);
    } else {
      navigate(item.path);
      setIsMenuOpen(false);
    }
  }}
>
  {item.name}
  {item.subItems.length > 0 &&
    (openSubMenu === index ? (
      <ChevronUp size={18} />
    ) : (
      <ChevronDown size={18} />
    ))}
</div>


              {/* Submenu */}
              {openSubMenu === index && item.subItems.length > 0 && (
                <ul className="bg-pink-50 text-sm text-gray-700 font-normal">
                  {item.subItems.map((sub, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={`${item.path}/${sub
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-8 py-2 hover:bg-pink-100 hover:text-pink-600 transition"
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

        {/* 🚪 Logout Button */}
        <div className="absolute bottom-6 left-0 w-full px-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full justify-center bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition"
          >
            <LogOut size={20} /> Logout
          </button>
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
