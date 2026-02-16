import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, Phone, Mail, ChevronDown } from 'lucide-react';
import { categories } from '../../data/mockData';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm z-50 relative">
      {/* Top Bar */}
      <div className="bg-[#232323] text-gray-300 text-xs py-2 hidden md:block">
        <div className="container-custom flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="flex items-center gap-1 hover:text-white cursor-pointer transition">
              <Phone size={14} /> +91 98765 43210
            </span>
            <span className="flex items-center gap-1 hover:text-white cursor-pointer transition">
              <Mail size={14} /> support@sartaajbharat.com
            </span>
          </div>
          <div className="flex space-x-6">
            <span className="cursor-pointer hover:text-white transition">My Account</span>
            <span className="cursor-pointer hover:text-white transition">Checkout</span>
            <div className="flex items-center gap-1 cursor-pointer hover:text-white transition">
              <span>Currency: INR</span> <ChevronDown size={12} />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-white transition">
              <span>Language: EN</span> <ChevronDown size={12} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom py-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            <span className="text-blue-600">Sartaaj</span>Bharat
          </h1>
          <span className="text-xs text-gray-500 tracking-widest uppercase">Premium Store</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl px-8">
          <div className="flex w-full border-2 border-blue-600 rounded-md overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 text-sm text-gray-600 border-r flex items-center gap-2 cursor-pointer whitespace-nowrap">
              All Categories <ChevronDown size={14} />
            </div>
            <input
              type="text"
              placeholder="Search our catalog..."
              className="flex-1 px-4 py-2 outline-none text-gray-700"
            />
            <button className="bg-blue-600 text-white px-6 hover:bg-blue-700 transition">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-6">
          <div className="flex flex-col items-center cursor-pointer group">
            <div className="relative">
              <Heart size={24} className="text-gray-700 group-hover:text-blue-600 transition" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </div>
            <span className="text-xs text-gray-500 mt-1 hidden lg:block">Wishlist</span>
          </div>

          <Link to="/auth" className="flex flex-col items-center cursor-pointer group">
            <User size={24} className="text-gray-700 group-hover:text-blue-600 transition" />
            <span className="text-xs text-gray-500 mt-1 hidden lg:block">Sign In</span>
          </Link>

          <Link to="/cart" className="flex flex-col items-center cursor-pointer group">
            <div className="relative">
              <ShoppingCart size={24} className="text-gray-700 group-hover:text-blue-600 transition" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </div>
            <span className="text-xs text-gray-500 mt-1 hidden lg:block">My Cart</span>
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-t border-gray-100 border-b">
        <div className="container-custom">
          <nav className="flex items-center justify-between h-12">
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-600">
              <Menu size={24} />
            </button>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-8 text-sm font-medium text-gray-800 h-full">
              <li className="h-full flex items-center">
                <Link to="/" className="hover:text-blue-600 transition h-full flex items-center border-b-2 border-transparent hover:border-blue-600">
                  Home
                </Link>
              </li>
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id} className="h-full flex items-center">
                  <Link
                    to={`/${cat.slug}`}
                    className="hover:text-blue-600 transition h-full flex items-center border-b-2 border-transparent hover:border-blue-600"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden md:block text-sm text-blue-600 font-medium">
              Special Offer: Free Shipping on all orders over ₹999!
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
