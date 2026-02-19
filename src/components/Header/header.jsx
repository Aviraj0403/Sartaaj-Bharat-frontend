import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, Phone, Mail, ChevronDown, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useCategories } from '../../hooks';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={`w-full z-50 transition-all duration-500 ${isScrolled ? 'sticky top-0 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-lg shadow-slate-200/20' : 'relative bg-white'}`}>
      {/* Top Bar - Elite Branding */}
      {!isScrolled && (
        <div className="bg-[#0f172a] text-slate-400 text-[10px] py-2 hidden md:block border-b border-slate-800">
          <div className="container-custom flex justify-between items-center">
            <div className="flex space-x-8 font-black uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors group">
                <Phone size={12} className="text-blue-500 group-hover:scale-110 transition-transform" /> +91 98765 43210
              </span>
              <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors group">
                <Mail size={12} className="text-blue-500 group-hover:scale-110 transition-transform" /> concierge@sartaaj.com
              </span>
            </div>
            <div className="flex space-x-8 font-black uppercase tracking-[0.2em]">
              <Link to="/track-order" className="hover:text-white transition-colors">Order Concierge</Link>
              <Link to="/help" className="hover:text-white transition-colors">Assistance</Link>
              <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
                <span>Global / INR</span> <ChevronDown size={10} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Hub */}
      <div className="container-custom py-4 md:py-6 flex items-center justify-between gap-12">
        {/* Brand Identity */}
        <Link to="/" className="flex-shrink-0 group relative">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-slate-200 group-hover:bg-blue-600 transition-colors duration-500">
              S
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-none tracking-tighter italic">
                SARTAAJ<span className="text-blue-600">BHARAT</span>
              </h1>
              <span className="text-[10px] font-black text-slate-400 tracking-[0.4em] uppercase mt-1">Prime Excellence</span>
            </div>
          </motion.div>
        </Link>

        {/* Advanced Search Engine */}
        <div className="hidden lg:flex flex-1 max-w-2xl">
          <form onSubmit={handleSearch} className="relative w-full group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Discover premium essentials..."
              className="w-full pl-14 pr-32 py-4 bg-slate-100/50 border-2 border-transparent rounded-[1.5rem] outline-none text-slate-800 font-medium placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:shadow-2xl focus:shadow-blue-200/20 transition-all duration-500"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={22} />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-8 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95"
            >
              Explore
            </button>
          </form>
        </div>

        {/* Exclusive Actions */}
        <div className="flex items-center gap-2 md:gap-5">
          <div className="flex items-center gap-1">
            <Link to="/wishlist" className="p-3 rounded-2xl hover:bg-slate-100 text-slate-600 hover:text-blue-600 transition-all relative group">
              <Heart size={24} strokeWidth={2.5} />
              <span className="absolute top-2 right-2 w-5 h-5 bg-orange-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-md group-hover:scale-110 transition-transform">0</span>
            </Link>

            <Link to={isAuthenticated ? "/profile" : "/auth"} className="p-3 rounded-2xl hover:bg-slate-100 text-slate-600 hover:text-blue-600 transition-all group">
              <User size={24} strokeWidth={2.5} />
            </Link>

            <div className="h-10 w-[2px] bg-slate-100 mx-2 hidden lg:block"></div>

            <Link to="/cart" className="flex items-center gap-4 px-4 py-3 bg-slate-900 hover:bg-blue-600 rounded-[1.5rem] text-white transition-all shadow-xl shadow-slate-200 hover:shadow-blue-200 active:scale-95 group">
              <div className="relative">
                <ShoppingCart size={22} strokeWidth={2.5} />
                <span className="absolute -top-3 -right-3 w-6 h-6 bg-blue-500 text-white text-[11px] font-black rounded-full flex items-center justify-center border-2 border-slate-900 group-hover:border-blue-600 transition-colors shadow-lg">
                  {totalQuantity}
                </span>
              </div>
              <span className="text-xs font-black hidden xl:block uppercase tracking-widest">Lounge</span>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 rounded-2xl bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Premium Category Navigation */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-slate-100 hidden lg:block overflow-x-auto no-scrollbar"
          >
            <div className="container-custom">
              <nav className="flex items-center justify-center gap-12 py-4">
                <Link to="/" className="text-[11px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-[0.3em] relative group">
                  Home
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform scale-x-100 transition-transform"></span>
                </Link>

                {categoriesLoading ? (
                  [...Array(6)].map((_, i) => <div key={i} className="w-20 h-3 bg-slate-100 animate-pulse rounded-full"></div>)
                ) : (
                  categories?.slice(0, 8).map((cat) => (
                    <Link
                      key={cat.id || cat._id}
                      to={`/category/${cat.slug}`}
                      className="text-[11px] font-black text-slate-500 hover:text-blue-600 uppercase tracking-[0.2em] transition-all hover:-translate-y-0.5 relative group"
                    >
                      {cat.name}
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </Link>
                  ))
                )}

                <Link to="/exclusive" className="text-[11px] font-black text-orange-500 hover:text-orange-600 uppercase tracking-[0.3em] flex items-center gap-2 group">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  Collections
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Sidebar */}
      {/* Logic for mobile menu would go here... skipping for now to focus on Main UI as requested */}
    </header>
  );
};

export default Header;
