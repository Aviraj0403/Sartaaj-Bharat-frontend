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

  // Body scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <div className="w-full bg-white flex flex-col" data-testid="mobile-header">
      {/* 🔝 Sticky Header */}
      <div className="fixed top-0 left-0 w-full z-[90] bg-white shadow-md">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
          {/* Menu Button */}
          <button
            className={`text-pink-500 hover:text-pink-600 transition min-w-[44px] min-h-[44px] flex items-center justify-center ${activeTab === "menu" ? "text-pink-500" : "text-pink-500"}`}
            onClick={() => {
              setActiveTab("menu");
              setIsMenuOpen(true);
            }}
          >
            <Menu size={28} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex justify-center">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </Link>

          {/* Profile + Cart */}
          <div className="flex items-center gap-2 text-gray-700">
            {/* Profile */}
            <button
              onClick={handleProfileClick}
              className="relative flex flex-col items-center text-xs hover:text-pink-500 transition min-w-[44px] min-h-[44px] justify-center"
            >
              <User size={22} />
              <span className="text-[10px]">Profile</span>
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex flex-col items-center text-xs hover:text-pink-500 transition min-w-[44px] min-h-[44px] justify-center"
            >
              <ShoppingBag size={22} />
              {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 text-[10px] bg-pink-600 text-white rounded-full px-1.5 py-0.5">
                  {totalQuantity}
                </span>
              )}
              <span className="text-[10px]">Cart</span>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
       {/* Search Bar (Hide on /search page) */}
{!hideSearch && (
  <div className="px-4 py-2 border-b border-gray-200 bg-white">
    <div className="flex items-center gap-2 bg-pink-50 rounded-full px-3 py-2 border border-pink-200 min-h-[44px]">
      <Search className="text-pink-300" size={18} />
      <div
        className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-pink-300 cursor-pointer"
        onClick={() => navigate("/search")}
      >
        <span className="text-gray-500">Search for products...</span>
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
          className={`flex flex-col items-center min-w-[44px] min-h-[44px] justify-center ${activeTab === "home" ? "text-pink-500" : "text-gray-700"}`}
        >
          <Home size={22} />
          <span className="text-xs">Home</span>
        </Link>

        <button
          onClick={() => {
            setActiveTab("menu");
            setIsMenuOpen(true);
          }}
          className={`flex flex-col items-center min-w-[44px] min-h-[44px] justify-center ${activeTab === "menu" ? "text-pink-500" : "text-gray-700"}`}
        >
          <List size={22} />
          <span className="text-xs">Menu</span>
        </button>

        <Link
          to="/new-products"
          onClick={() => setActiveTab("brands")}
          className={`flex flex-col items-center min-w-[44px] min-h-[44px] justify-center ${activeTab === "brands" ? "text-pink-500" : "text-gray-700"}`}
        >
          <Tag size={22} />
          <span className="text-xs">Brands</span>
        </Link>

        {/* <Link to="/offers" className="flex flex-col items-center text-gray-700 min-w-[44px] min-h-[44px] justify-center">
          <Percent size={22} />
          <span className="text-xs">Offers</span>
        </Link> */}

        <button
          onClick={() => {
            setActiveTab("account");
            handleProfileClick();
          }}
          className={`flex flex-col items-center min-w-[44px] min-h-[44px] justify-center ${activeTab === "account" ? "text-pink-500" : "text-gray-700"}`}
        >
          <User size={22} />
          <span className="text-xs">Account</span>
        </button>
      </div>

      {/* ⭐ Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-white shadow-xl transform transition-transform duration-300 z-[100] rounded-r-2xl ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-pink-100 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-pink-600">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)}>
            <X size={26} className="text-pink-600" />
          </button>
        </div>

        {/* Scrollable Menu */}
        <div className="h-[calc(100vh-64px)] overflow-y-auto pb-20">
          {/* Static Links */}
          <div className="flex flex-col px-6 py-4 border-b border-pink-200 gap-4">
            <button
              onClick={handleProfileClick}
              className="flex items-center gap-3 text-gray-800 hover:text-pink-600 transition"
            >
              <User size={22} />
              <span>My Profile</span>
            </button>

            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 text-gray-800 hover:text-pink-600 transition relative"
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
            <div className="w-full px-6 py-6">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full justify-center bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl"
              >
                <LogOut size={20} /> Logout
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
