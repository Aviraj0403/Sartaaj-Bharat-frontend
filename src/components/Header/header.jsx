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
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  // Live Search Data
  const { data: searchResults, isLoading: isSearching } = useProducts({
    search: debouncedSearch,
    limit: 5,
    enabled: debouncedSearch.length >= 2
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

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
      setIsSearchOpen(false);
      setIsFocused(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={`w-full z-50 transition-all duration-700 ${isScrolled ? 'sticky top-0 bg-white/70 backdrop-blur-2xl border-b border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]' : 'relative bg-white'}`}>
      {/* Top Bar - Sovereign Branding */}
      {!isScrolled && (
        <div className="bg-[#020617] text-slate-500 text-[10px] py-2.5 hidden md:block border-b border-white/5">
          <div className="container-custom flex justify-between items-center">
            <div className="flex space-x-10 font-black uppercase tracking-[0.3em] italic">
              <span className="flex items-center gap-2.5 hover:text-white cursor-pointer transition-all group">
                <Phone size={12} className="text-blue-500 group-hover:rotate-12 transition-transform" /> +91 98765 43210
              </span>
              <span className="flex items-center gap-2.5 hover:text-white cursor-pointer transition-all group">
                <Mail size={12} className="text-blue-500 group-hover:-translate-y-0.5 transition-transform" /> concierge@sartaaj.com
              </span>
            </div>
            <div className="flex space-x-10 font-black uppercase tracking-[0.3em] italic">
              <Link to="/track-order" className="hover:text-white transition-colors">Order Tracker</Link>
              <Link to="/help" className="hover:text-white transition-colors">Support</Link>
              <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors group">
                <span>INTL / INR</span> <ChevronDown size={10} className="group-hover:translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Hub */}
      <div className={`container-custom transition-all duration-500 ${isScrolled ? 'py-3' : 'py-6 md:py-8'} flex items-center justify-between gap-12`}>
        {/* Brand Identity */}
        <Link to="/" className="flex-shrink-0 group relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 bg-slate-950 rounded-[1.2rem] flex items-center justify-center text-white font-black text-2xl shadow-2xl shadow-slate-900/20 group-hover:bg-blue-600 group-hover:shadow-blue-500/40 transition-all duration-500 rotate-3 group-hover:rotate-0">
              S
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-black text-slate-950 leading-none tracking-[-0.05em] italic">
                SARTAAJ<span className="text-blue-600">BHARAT</span>
              </h1>
              <span className="text-[10px] font-black text-slate-400 tracking-[0.5em] uppercase mt-1.5 opacity-60">Prime Sovereign</span>
            </div>
          </motion.div>
        </Link>

        {/* Advanced E-commerce Search Engine */}
        <div className="hidden lg:flex flex-1 max-w-2xl px-8 relative">
          <form onSubmit={handleSearch} className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className={`transition-all ${isFocused ? 'text-blue-600 scale-110' : 'text-slate-400 group-hover:text-blue-500'}`} size={20} strokeWidth={2.5} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Search for Mobiles, Accessories & more..."
              className={`w-full pl-16 pr-36 py-3.5 bg-slate-100 border-2 border-transparent rounded-xl outline-none text-slate-900 font-medium placeholder-slate-500 transition-all duration-300 ${isFocused ? 'bg-white border-blue-600 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)]' : 'hover:bg-slate-200/50'}`}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-8 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider hover:bg-blue-700 transition-all shadow-lg active:scale-95"
            >
              Search
            </button>
          </form>

          {/* Elite Live Results Dropdown (Flipkart Inspired) */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-8 right-8 mt-3 bg-white rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-[60] py-2"
              >
                {searchQuery.length < 2 ? (
                  <div className="p-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-2">Trending Collections</h4>
                    <div className="flex flex-wrap gap-2">
                      {['iPhone 15', 'Samsung S24', 'OnePlus 12', 'Smart Watches', 'Airpods'].map(item => (
                        <button key={item} onClick={() => setSearchQuery(item)} className="px-5 py-2.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl text-xs font-bold text-slate-600 transition-all border border-slate-100">
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-4 border-b border-slate-50 flex items-center justify-between px-6">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Live Matches</span>
                      {isSearching && <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>}
                    </div>

                    <div className="max-h-[30rem] overflow-y-auto no-scrollbar py-2">
                      {searchResults?.products?.length > 0 ? (
                        <div className="px-2 space-y-1">
                          {searchResults.products.map((p) => (
                            <Link
                              key={p._id}
                              to={`/product/${p.slug}`}
                              className="flex items-center gap-5 p-3 rounded-2xl hover:bg-blue-50/50 transition-all group"
                            >
                              <div className="w-14 h-14 rounded-xl bg-slate-50 overflow-hidden flex-shrink-0 border border-slate-100 group-hover:border-blue-200 transition-colors">
                                <img src={p.thumbnail || p.images?.[0]} alt={p.name} className="w-full h-full object-contain p-2" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">{p.name}</h4>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="text-blue-600 font-extrabold text-sm">₹{p.price?.toLocaleString()}</span>
                                  <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{p.categoryId?.name}</span>
                                </div>
                              </div>
                              <ChevronDown size={14} className="text-slate-300 group-hover:text-blue-500 -rotate-90 transition-transform opacity-0 group-hover:opacity-100" />
                            </Link>
                          ))}
                          <button
                            onClick={handleSearch}
                            className="w-full text-center py-4 mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 hover:bg-blue-50 group transition-all italic"
                          >
                            Explore all matching artifacts <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                          </button>
                        </div>
                      ) : !isSearching ? (
                        <div className="p-10 text-center">
                          <p className="text-sm font-bold text-slate-400 italic">No matching products found</p>
                        </div>
                      ) : null}
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Exclusive Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center">
            <Link to="/wishlist" className="p-4 rounded-2xl hover:bg-slate-50 text-slate-500 hover:text-blue-600 transition-all relative group">
              <Heart size={22} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
              <span className="absolute top-2.5 right-2.5 w-5 h-5 bg-blue-600 text-white text-[9px] font-black rounded-lg flex items-center justify-center border-2 border-white shadow-xl group-hover:-translate-y-1 transition-transform">0</span>
            </Link>

            <Link to={isAuthenticated ? "/profile" : "/auth"} className="p-4 rounded-2xl hover:bg-slate-50 text-slate-500 hover:text-blue-600 transition-all group">
              <User size={22} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
            </Link>

            <div className="h-8 w-px bg-slate-100 mx-3 hidden lg:block"></div>

            <Link to="/cart" className="flex items-center gap-5 px-6 py-4 bg-slate-950 hover:bg-blue-600 rounded-[1.4rem] text-white transition-all shadow-2xl shadow-slate-950/20 hover:shadow-blue-500/40 active:scale-95 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center gap-3">
                <div className="relative">
                  <ShoppingCart size={20} strokeWidth={2.5} />
                  <span className="absolute -top-3 -right-3 w-6 h-6 bg-blue-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-slate-950 group-hover:border-blue-600 transition-colors shadow-lg">
                    {totalQuantity}
                  </span>
                </div>
                <span className="text-[10px] font-black hidden xl:block uppercase tracking-[0.2em] italic">Archive</span>
              </div>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-4 rounded-2xl bg-slate-100 text-slate-950 hover:bg-slate-200 transition-colors"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Premium Category Navigation */}
      < AnimatePresence >
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
      </AnimatePresence >

      {/* Mobile Navigation Drawer */}
      < AnimatePresence >
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-screen w-[85%] max-w-sm bg-white z-[70] shadow-2xl lg:hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xl font-black italic tracking-tighter">SARTAAJ<span className="text-blue-600">BHARAT</span></span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-xl bg-slate-100"><X size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-8">
                <nav className="flex flex-col gap-8">
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black italic tracking-tight text-blue-600">Home Lounge</Link>
                  {categories?.map((cat) => (
                    <Link
                      key={cat._id}
                      to={`/category/${cat.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl font-black italic tracking-tight text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <div className="h-px bg-slate-100 my-4" />
                  <Link to="/exclusive" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black text-orange-500 italic">Elite Collections</Link>
                  <Link to="/track-order" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-slate-500">Track Order</Link>
                </nav>
              </div>
              <div className="p-8 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center gap-4 text-slate-400 mb-6">
                  <Phone size={18} /> <span className="text-xs font-black tracking-widest">+91 98765 43210</span>
                </div>
                <button className="btn-premium w-full">Member Portal</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence >

      {/* Global Search Overlay - Focused Version */}
      < AnimatePresence >
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="fixed inset-0 bg-[#020617] z-[100] p-6 flex flex-col"
          >
            {/* Background Grain Effect */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

            <div className="container-custom flex items-center justify-between gap-8 mb-20 relative z-10">
              <div className="flex-1">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-600" size={48} strokeWidth={3} />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="INITIATING ARCHIVE SEARCH..."
                    className="w-full bg-transparent border-none outline-none text-5xl md:text-8xl font-black italic tracking-[-0.05em] text-white pl-20 py-12 placeholder-white/10"
                  />
                </form>
              </div>
              <button onClick={() => setIsSearchOpen(false)} className="w-20 h-20 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center border border-white/10 backdrop-blur-xl group">
                <X size={40} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            <div className="container-custom flex-1 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-10 italic">Archive Branches</h4>
                  <div className="flex flex-col gap-8">
                    {categories?.slice(0, 5).map((cat, i) => (
                      <Link
                        key={cat._id}
                        to={`/category/${cat.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="text-3xl md:text-4xl font-black italic text-slate-400 hover:text-white transition-all group flex items-center gap-4"
                      >
                        <span className="text-[10px] opacity-20 font-sans group-hover:opacity-100">0{i + 1}</span>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-10 italic">Live Feed Suggestions</h4>
                  <div className="flex flex-wrap gap-4">
                    {['Flagship Phones', 'Laptops', 'Galaxy Buds', 'Elite Artifacts', 'Modular'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => { setSearchQuery(tag); }}
                        className="px-8 py-4 bg-white/5 hover:bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-white transition-all italic border border-white/5"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence >
    </header >
  );
};

export default Header;
