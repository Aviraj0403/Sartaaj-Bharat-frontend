import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Heart, Menu, X, Home, Tag, List } from 'lucide-react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useCategories } from '../../hooks';

const MobileHeaderElite = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

    const navigate = useNavigate();
    const { totalQuantity } = useSelector((state) => state.cart);
    const { data: categories } = useCategories();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll Lock
    useEffect(() => {
        if (isMenuOpen || isSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen, isSearchOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsSearchOpen(false);
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="lg:hidden">
            {/* Top Sticky Bar */}
            <header className={`fixed top-0 left-0 w-full z-[70] transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-md py-3' : 'bg-white py-4'}`}>
                <div className="container-custom flex justify-between items-center px-4">
                    {/* Menu Trigger */}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="p-2 rounded-xl bg-slate-100 text-slate-900 active:scale-90 transition-transform"
                    >
                        <Menu size={24} />
                    </button>

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">
                            S
                        </div>
                        <h1 className="text-xl font-black text-slate-900 italic tracking-tighter">
                            SARTAAJ<span className="text-blue-600">BHARAT</span>
                        </h1>
                    </Link>

                    {/* Quick Profile/Search */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 rounded-xl text-slate-600 hover:text-blue-600 transition-colors"
                        >
                            <Search size={22} />
                        </button>
                        <Link to="/cart" className="relative p-2 rounded-xl text-slate-600">
                            <ShoppingBag size={22} />
                            {totalQuantity > 0 && (
                                <span className="absolute top-1 right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                                    {totalQuantity}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </header>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-3 z-[60] flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <Link to="/" className="flex flex-col items-center gap-1 text-blue-600">
                    <Home size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Home</span>
                </Link>
                <Link to="/exclusive" className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors">
                    <Tag size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Elite</span>
                </Link>
                <button onClick={() => setIsMenuOpen(true)} className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors">
                    <List size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Menu</span>
                </button>
                <Link to="/profile" className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors">
                    <User size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Profile</span>
                </Link>
            </nav>

            {/* Side Drawer Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[80]"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 h-screen w-[85%] max-w-sm bg-white z-[90] shadow-2xl flex flex-col"
                        >
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl">
                                        S
                                    </div>
                                    <span className="text-xl font-black italic tracking-tighter">SARTAAJ<span className="text-blue-600">BHARAT</span></span>
                                </div>
                                <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 bg-white">
                                <div className="mb-8">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 italic">Member Services</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="p-4 bg-slate-50 rounded-2xl flex flex-col gap-3 hover:bg-slate-100 transition-colors">
                                            <Heart size={20} className="text-red-500" />
                                            <span className="text-xs font-black uppercase">Wishlist</span>
                                        </Link>
                                        <Link to="/track-order" onClick={() => setIsMenuOpen(false)} className="p-4 bg-slate-50 rounded-2xl flex flex-col gap-3 hover:bg-slate-100 transition-colors">
                                            <ShoppingBag size={20} className="text-blue-500" />
                                            <span className="text-xs font-black uppercase">Orders</span>
                                        </Link>
                                    </div>
                                </div>

                                <nav className="flex flex-col gap-6">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2 italic">Collections</h4>
                                    <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black italic tracking-tight text-blue-600">Home Lounge</Link>
                                    {categories?.map((cat) => (
                                        <Link
                                            key={cat._id}
                                            to={`/category/${cat.slug}`}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-2xl font-black italic tracking-tight text-slate-900 active:text-blue-600 transition-colors"
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                    <Link to="/exclusive" onClick={() => setIsMenuOpen(false)} className="text-xl font-black text-orange-500 italic flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                                        Elite Collections
                                    </Link>
                                </nav>
                            </div>

                            <div className="p-8 bg-slate-900 text-white rounded-t-[2.5rem]">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">Concierge Support</p>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center">
                                        <User size={24} className="text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black italic">+91 98765 43210</p>
                                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Available 24/7</p>
                                    </div>
                                </div>
                                <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-center block shadow-xl shadow-blue-500/20 active:scale-95 transition-transform">
                                    Access Portal
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Global Search Overlay (Mobile) */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="fixed inset-0 bg-white z-[100] p-6 flex flex-col"
                    >
                        <div className="flex items-center justify-between gap-4 mb-8">
                            <button onClick={() => setIsSearchOpen(false)} className="p-2 rounded-xl bg-slate-100">
                                <X size={24} />
                            </button>
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Search Archive</h2>
                            <div className="w-10" /> {/* Spacer */}
                        </div>

                        <div className="mb-12">
                            <form onSubmit={handleSearch} className="relative">
                                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-600" size={24} />
                                <input
                                    autoFocus
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search brands..."
                                    className="w-full bg-transparent border-b-2 border-slate-100 outline-none text-2xl font-black italic tracking-tighter text-slate-900 pl-10 py-4 focus:border-blue-600 transition-colors"
                                />
                            </form>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 italic">Suggested</h4>
                            <div className="flex flex-wrap gap-2 mb-12">
                                {['Headphones', 'MacBook', 'iPhone', 'Watch', 'Gaming'].map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => setSearchQuery(tag)}
                                        className="px-5 py-2.5 bg-slate-50 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>

                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 italic">Trending Now</h4>
                            <div className="flex flex-col gap-6">
                                {categories?.slice(0, 4).map(cat => (
                                    <Link key={cat._id} to={`/category/${cat.slug}`} onClick={() => setIsSearchOpen(false)} className="text-xl font-black italic hover:text-blue-600 transition-colors flex items-center justify-between">
                                        {cat.name}
                                        <X size={14} className="rotate-45 text-slate-300" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spacer for sticky header */}
            <div className="h-16"></div>
        </div>
    );
};

export default MobileHeaderElite;
