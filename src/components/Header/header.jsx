import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, Phone, Mail, ChevronDown } from 'lucide-react';
import { categories } from '../../data/mockData';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full z-50 transition-all duration-300 ${isScrolled ? 'sticky top-0 bg-white/90 backdrop-blur-md shadow-md' : 'relative bg-white shadow-sm'}`}>
      {/* Top Bar - Hide on scroll to save space, or keep it? Let's hide it for a cleaner sticky feel, or keep it static? 
          For a "premium" feel, usually the top bar scrolls away and the main nav sticks. 
          To achieve that, we put the sticky class on the Main Header part, OR we just let the whole thing stick.
          Let's make the WHOLE thing sticky but maybe condense it? 
          Actually, standard pattern: Top bar scrolls away, Main Header + Nav sticks.
          BUT structure here is: Top Bar -> Main Header -> Nav. 
          Let's wrap Main Header + Nav in a sticky div.
      */}

      {/* Top Bar */}
      <div className={`bg-[#232323] text-gray-300 text-xs py-2 hidden md:block transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden py-0 opacity-0' : 'h-auto opacity-100'}`}>
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

      {/* Main Header + Nav Container */}
      <div>
        {/* Main Header */}
        <div className="container-custom py-4 md:py-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight group-hover:opacity-80 transition">
              <span className="text-blue-600">Sartaaj</span>Bharat
            </h1>
            <span className="text-[10px] md:text-xs text-gray-500 tracking-[0.2em] uppercase block text-right mt-1">Premium Store</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl px-8">
            <div className="flex w-full border-2 border-blue-600 rounded-lg overflow-hidden transition-shadow focus-within:shadow-lg focus-within:shadow-blue-100">
              <div className="bg-gray-50 px-4 py-2 text-sm text-gray-600 border-r flex items-center gap-2 cursor-pointer whitespace-nowrap hover:bg-gray-100 transition">
                All Categories <ChevronDown size={14} />
              </div>
              <input
                type="text"
                placeholder="Search our catalog..."
                className="flex-1 px-4 py-2 outline-none text-gray-700 placeholder-gray-400 bg-white"
              />
              <button className="bg-blue-600 text-white px-6 hover:bg-blue-700 transition duration-300 flex items-center justify-center">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-6">
            <div className="flex flex-col items-center cursor-pointer group relative">
              <div className="p-2 rounded-full group-hover:bg-blue-50 transition">
                <Heart size={24} className="text-gray-700 group-hover:text-blue-600 transition" />
              </div>
              <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">0</span>
              <span className="text-xs text-gray-500 hidden lg:block font-medium group-hover:text-blue-600 transition">Wishlist</span>
            </div>

            <Link to="/auth" className="flex flex-col items-center cursor-pointer group">
              <div className="p-2 rounded-full group-hover:bg-blue-50 transition">
                <User size={24} className="text-gray-700 group-hover:text-blue-600 transition" />
              </div>
              <span className="text-xs text-gray-500 hidden lg:block font-medium group-hover:text-blue-600 transition">Sign In</span>
            </Link>

            <Link to="/cart" className="flex flex-col items-center cursor-pointer group relative">
              <div className="p-2 rounded-full group-hover:bg-blue-50 transition">
                <ShoppingCart size={24} className="text-gray-700 group-hover:text-blue-600 transition" />
              </div>
              <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">2</span>
              <span className="text-xs text-gray-500 hidden lg:block font-medium group-hover:text-blue-600 transition">My Cart</span>
            </Link>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className={`border-t border-gray-100 border-b transition-colors ${isScrolled ? 'border-b-transparent' : 'border-b-gray-200'}`}>
          <div className="container-custom">
            <nav className="flex items-center justify-between h-12">
              {/* Mobile Menu Button */}
              <button className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition">
                <Menu size={24} />
              </button>

              {/* Desktop Menu */}
              <ul className="hidden md:flex space-x-8 text-sm font-bold text-gray-800 h-full">
                <li className="h-full flex items-center">
                  <Link to="/" className="hover:text-blue-600 transition h-full flex items-center border-b-[3px] border-transparent hover:border-blue-600 px-1 uppercase tracking-wide">
                    Home
                  </Link>
                </li>
                {categories.slice(0, 6).map((cat) => (
                  <li key={cat.id} className="h-full flex items-center">
                    <Link
                      to={`/${cat.slug}`}
                      className="hover:text-blue-600 transition h-full flex items-center border-b-[3px] border-transparent hover:border-blue-600 px-1 uppercase tracking-wide"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="hidden md:block text-sm text-blue-600 font-bold bg-blue-50 px-4 py-1 rounded-full animate-pulse">
                Free Shipping on orders over ₹999!
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
