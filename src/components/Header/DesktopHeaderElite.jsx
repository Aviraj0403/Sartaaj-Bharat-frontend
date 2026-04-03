// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Search,
//   ShoppingCart,
//   User,
//   Heart,
//   Phone,
//   Mail,
//   ChevronDown,
//   X,
// } from "lucide-react";
// import { useSelector } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";
// import { useCategories } from "../../hooks";

// const DesktopHeaderElite = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSearchOpen, setIsSearchOpen] = useState(false);

//   const navigate = useNavigate();
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const { totalQuantity } = useSelector((state) => state.cart);
//   const { data: categories, isLoading: categoriesLoading } = useCategories();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       setIsSearchOpen(false);
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   return (
//     <header
//       className={`w-full z-50 transition-all duration-500 hidden lg:block ${isScrolled ? "sticky top-0 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-lg shadow-slate-200/20" : "relative bg-white"}`}
//     >
//       {/* Top Bar - Elite Branding */}
//       {!isScrolled && (
//         <div className="bg-[#0f172a] text-slate-400 text-[10px] py-2 border-b border-slate-800">
//           <div className="container-custom flex justify-between items-center">
//             <div className="flex space-x-8 font-black uppercase tracking-[0.2em]">
//               <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors group">
//                 <Phone
//                   size={12}
//                   className="text-blue-500 group-hover:scale-110 transition-transform"
//                 />{" "}
//                 +91 98765 43210
//               </span>
//               <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors group">
//                 <Mail
//                   size={12}
//                   className="text-blue-500 group-hover:scale-110 transition-transform"
//                 />{" "}
//                 concierge@sartaaj.com
//               </span>
//             </div>
//             <div className="flex space-x-8 font-black uppercase tracking-[0.2em]">
//               <Link
//                 to="/track-order"
//                 className="hover:text-white transition-colors"
//               >
//                 Order Concierge
//               </Link>
//               <Link to="/help" className="hover:text-white transition-colors">
//                 Assistance
//               </Link>
//               <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
//                 <span>Global / INR</span> <ChevronDown size={10} />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main Navigation Hub */}
//       <div className="container-custom py-6 flex items-center justify-between gap-12">
//         {/* Brand Identity */}
//         <Link to="/" className="flex-shrink-0 group relative">
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="flex items-center gap-3"
//           >
//             <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-slate-200 group-hover:bg-blue-600 transition-colors duration-500">
//               S
//             </div>
//             <div className="flex flex-col">
//               <h1 className="text-3xl font-black text-slate-900 leading-none tracking-tighter italic">
//                 SARTAAJ<span className="text-blue-600">BHARAT</span>
//               </h1>
//               <span className="text-[10px] font-black text-slate-400 tracking-[0.4em] uppercase mt-1">
//                 Prime Excellence
//               </span>
//             </div>
//           </motion.div>
//         </Link>

//         {/* Advanced Search Engine - Redesigned for Premium Alignment */}
//         <div className="flex-1 max-w-xl mx-8">
//           <form onSubmit={handleSearch} className="relative group">
//             <div className="absolute inset-0 bg-blue-600/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
//             <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md group-hover:border-blue-200 transition-all duration-300">
//               <div className="pl-5 text-slate-400 group-hover:text-blue-600 transition-colors">
//                 <Search size={20} strokeWidth={2.5} />
//               </div>
//               <input
//                 type="text"
//                 readOnly
//                 onClick={() => setIsSearchOpen(true)}
//                 placeholder="Curating your next elite acquisition..."
//                 className="w-full pl-4 pr-32 py-3.5 bg-transparent border-none outline-none text-slate-800 font-bold text-[11px] uppercase tracking-wider placeholder-slate-400 cursor-pointer"
//               />
//               <div className="absolute right-2 flex items-center gap-2">
//                 <kbd className="hidden xl:inline-flex h-6 select-none items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-sans text-[10px] font-bold text-slate-400 opacity-100">
//                   <span className="text-xs">⌘</span>K
//                 </kbd>
//                 <button
//                   type="submit"
//                   className="bg-slate-900 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95"
//                 >
//                   Search
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>

//         {/* Exclusive Actions */}
//         <div className="flex items-center gap-5">
//           <div className="flex items-center gap-1">
//             <Link
//               to="/wishlist"
//               className="p-3 rounded-2xl hover:bg-slate-100 text-slate-600 hover:text-blue-600 transition-all relative group"
//             >
//               <Heart size={24} strokeWidth={2.5} />
//               <span className="absolute top-2 right-2 w-5 h-5 bg-orange-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-md group-hover:scale-110 transition-transform">
//                 0
//               </span>
//             </Link>

//             <Link
//               to={isAuthenticated ? "/profile" : "/signin"}
//               className="p-3 rounded-2xl hover:bg-slate-100 text-slate-600 hover:text-blue-600 transition-all group relative"
//             >
//               <User size={24} strokeWidth={2.5} />
//               {isAuthenticated && (
//                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
//               )}
//             </Link>

//             <div className="h-10 w-[2px] bg-slate-100 mx-2"></div>

//             <Link
//               to="/cart"
//               className="flex items-center gap-4 px-4 py-3 bg-slate-900 hover:bg-blue-600 rounded-[1.5rem] text-white transition-all shadow-xl shadow-slate-200 hover:shadow-blue-200 active:scale-95 group"
//             >
//               <div className="relative">
//                 <ShoppingCart size={22} strokeWidth={2.5} />
//                 <span className="absolute -top-3 -right-3 w-6 h-6 bg-blue-500 text-white text-[11px] font-black rounded-full flex items-center justify-center border-2 border-slate-900 group-hover:border-blue-600 transition-colors shadow-lg">
//                   {totalQuantity}
//                 </span>
//               </div>
//               <span className="text-xs font-black uppercase tracking-widest">
//                 Lounge
//               </span>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Premium Category Navigation */}
//       <AnimatePresence>
//         {!isScrolled && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="border-t border-slate-100 overflow-x-auto no-scrollbar"
//           >
//             <div className="container-custom">
//               <nav className="flex items-center justify-center gap-12 py-4">
//                 <Link
//                   to="/"
//                   className="text-[11px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-[0.3em] relative group"
//                 >
//                   Home
//                   <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform scale-x-100 transition-transform"></span>
//                 </Link>

//                 {categoriesLoading
//                   ? [...Array(6)].map((_, i) => (
//                       <div
//                         key={i}
//                         className="w-20 h-3 bg-slate-100 animate-pulse rounded-full"
//                       ></div>
//                     ))
//                   : categories?.slice(0, 8).map((cat) => (
//                       <Link
//                         key={cat.id || cat._id}
//                         to={`/category/${cat.slug}`}
//                         className="text-[11px] font-black text-slate-500 hover:text-blue-600 uppercase tracking-[0.2em] transition-all hover:-translate-y-0.5 relative group"
//                       >
//                         {cat.name}
//                         <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
//                       </Link>
//                     ))}

//                 <Link
//                   to="/exclusive"
//                   className="text-[11px] font-black text-orange-500 hover:text-orange-600 uppercase tracking-[0.3em] flex items-center gap-2 group"
//                 >
//                   <span className="relative flex h-2 w-2">
//                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
//                     <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
//                   </span>
//                   Collections
//                 </Link>
//               </nav>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Global Search Overlay (Desktop) - Reimagined for Elite Experience */}
//       <AnimatePresence>
//         {isSearchOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[100] flex flex-col"
//           >
//             <motion.div 
//               initial={{ y: -50 }}
//               animate={{ y: 0 }}
//               className="bg-white w-full shadow-2xl rounded-b-[3rem] p-10"
//             >
//               <div className="container-custom">
//                 <div className="flex items-center justify-between gap-12 mb-16">
//                   <div className="flex-1 group">
//                     <form onSubmit={handleSearch} className="relative">
//                       <Search
//                         className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-600 transition-transform group-focus-within:scale-110"
//                         size={48}
//                         strokeWidth={3}
//                       />
//                       <input
//                         autoFocus
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Search the archive..."
//                         className="w-full bg-transparent border-none outline-none text-5xl md:text-7xl font-black italic tracking-tighter text-slate-900 pl-20 py-8 placeholder-slate-100 focus:placeholder-transparent transition-all"
//                       />
//                     </form>
//                   </div>
//                   <button
//                     onClick={() => setIsSearchOpen(false)}
//                     className="p-6 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all shadow-inner border border-slate-100"
//                   >
//                     <X size={32} strokeWidth={3} />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-24 pb-12">
//                   <div className="space-y-10">
//                     <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400 italic flex items-center gap-4">
//                       <div className="h-px w-8 bg-slate-200"></div>
//                       Exclusive Archives
//                     </h4>
//                     <div className="flex flex-col gap-8">
//                       {categories?.slice(0, 5).map((cat) => (
//                         <Link
//                           key={cat._id}
//                           to={`/category/${cat.slug}`}
//                           onClick={() => setIsSearchOpen(false)}
//                           className="text-3xl font-black italic tracking-tight text-slate-900 hover:text-blue-600 hover:translate-x-4 transition-all duration-300"
//                         >
//                           {cat.name}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="space-y-10">
//                     <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400 italic flex items-center gap-4">
//                       <div className="h-px w-8 bg-slate-200"></div>
//                       Trending Artifacts
//                     </h4>
//                     <div className="flex flex-wrap gap-4">
//                       {[
//                         "Headphones",
//                         "MacBook Pro",
//                         "iPhone 15",
//                         "Elite Audio",
//                         "Gaming Consoles",
//                         "4K Smart TV",
//                         "Tablets",
//                       ].map((tag) => (
//                         <button
//                           key={tag}
//                           onClick={() => {
//                             setSearchQuery(tag);
//                           }}
//                           className="px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-blue-600 hover:text-white hover:shadow-2xl hover:shadow-blue-500/20 transition-all italic"
//                         >
//                           {tag}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="bg-slate-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
//                     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-20 blur-[80px] -mr-16 -mt-16 group-hover:opacity-40 transition-opacity"></div>
//                     <div className="relative z-10 flex flex-col h-full justify-between">
//                       <div>
//                         <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 block">Recommended Selection</span>
//                         <h5 className="text-2xl font-black italic tracking-tighter leading-tight mb-6">
//                           Discover the 2026 <br/> <span className="text-blue-500 underline decoration-2 underline-offset-8">Prime Collection</span>
//                         </h5>
//                       </div>
//                       <Link 
//                         to="/exclusive"
//                         onClick={() => setIsSearchOpen(false)}
//                         className="bg-white text-slate-900 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] text-center hover:bg-blue-600 hover:text-white transition-all shadow-xl"
//                       >
//                         Explore Now
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//             <div className="flex-1" onClick={() => setIsSearchOpen(false)}></div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default DesktopHeaderElite;



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Phone,
  Mail,
  ChevronDown,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useCategories } from "../../hooks";

const DesktopHeaderElite = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header
      className={`w-full z-50 transition-all duration-300 hidden lg:block ${isScrolled ? "sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm" : "relative bg-white"}`}
    >
      {/* Top Bar - Compact Elite Branding */}
      {!isScrolled && (
        <div className="bg-[#0f172a] text-slate-400 text-[9px] py-1 border-b border-slate-800">
          <div className="container-custom flex justify-between items-center">
            <div className="flex space-x-6 font-black uppercase tracking-wider">
              <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors group">
                <Phone size={10} className="text-blue-500" /> +91 98765 43210
              </span>
              <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors group">
                <Mail size={10} className="text-blue-500" /> support@sartaaj.com
              </span>
            </div>
            <div className="flex space-x-6 font-black uppercase tracking-wider">
              <Link to="/track-order" className="hover:text-white transition-colors">
                Track Orders
              </Link>
              <Link to="/help" className="hover:text-white transition-colors">
                Help Center
              </Link>
              <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                <span>Global / INR</span> <ChevronDown size={8} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Hub - Optimized Density */}
      <div className="container-custom py-3.5 flex items-center justify-between gap-8">
        {/* Brand Identity */}
        <Link to="/" className="flex-shrink-0 group">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:bg-blue-600 transition-colors">
              S
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black text-slate-900 leading-none tracking-tighter italic">
                SARTAAJ<span className="text-blue-600">BHARAT</span>
              </h1>
              <span className="text-[8px] font-black text-slate-400 tracking-[0.3em] uppercase mt-0.5">
                Prime Excellence
              </span>
            </div>
          </div>
        </Link>

        {/* Search Engine - Compact */}
        <div className="flex-1 max-w-lg mx-4">
          <div className="relative group">
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-blue-300 transition-all">
              <div className="pl-4 text-slate-400">
                <Search size={16} strokeWidth={2.5} />
              </div>
              <input
                type="text"
                readOnly
                onClick={() => setIsSearchOpen(true)}
                placeholder="Search the Elite archive..."
                className="w-full pl-3 pr-24 py-2.5 bg-transparent border-none outline-none text-slate-800 font-bold text-[10px] uppercase tracking-wider placeholder-slate-400 cursor-pointer"
              />
              <div className="absolute right-1.5">
                <button
                  type="button"
                  className="bg-slate-900 text-white px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Exclusive Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Link
              to="/wishlist"
              className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-blue-600 transition-all relative group"
            >
              <Heart size={20} strokeWidth={2.5} />
            </Link>

            <Link
              to={isAuthenticated ? "/profile" : "/signin"}
              className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-blue-600 transition-all group relative"
            >
              <User size={20} strokeWidth={2.5} />
            </Link>

            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            <Link
              to="/cart"
              className="flex items-center gap-3 px-4 py-2.5 bg-slate-900 hover:bg-blue-600 rounded-xl text-white transition-all shadow shadow-slate-200 active:scale-95 group"
            >
              <div className="relative">
                <ShoppingCart size={18} strokeWidth={2.5} />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-blue-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-slate-900 shadow-md">
                    {totalQuantity}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">
                My Bag
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Category Navigation - Minimalist */}
      {!isScrolled && (
        <div className="border-t border-slate-100 overflow-x-auto no-scrollbar">
          <div className="container-custom">
            <nav className="flex items-center justify-center gap-10 py-3">
              <Link
                to="/"
                className="text-[10px] font-black text-blue-600 uppercase tracking-widest relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600"></span>
              </Link>

              {categoriesLoading
                ? [...Array(6)].map((_, i) => (
                    <div key={i} className="w-16 h-2 bg-slate-100 animate-pulse rounded-full"></div>
                  ))
                : categories?.slice(0, 8).map((cat) => (
                    <Link
                      key={cat.id || cat._id}
                      to={`/category/${cat.slug}`}
                      className="text-[10px] font-black text-slate-500 hover:text-blue-600 uppercase tracking-widest transition-all relative group"
                    >
                      {cat.name}
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                    </Link>
                  ))}

              <Link
                to="/exclusive"
                className="text-[10px] font-black text-orange-500 hover:text-orange-600 uppercase tracking-widest flex items-center gap-1.5 group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                Elite Club
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Simplified Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-[100] overflow-y-auto animate-in fade-in duration-200">
          <div className="sticky top-0 bg-white border-b border-slate-100 z-10">
            <div className="container-custom py-6">
              <div className="flex items-center justify-between gap-8">
                <div className="flex-1">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-600" size={28} />
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Seek artifacts..."
                      className="w-full bg-transparent border-none outline-none text-3xl font-bold text-slate-900 pl-12 py-2 placeholder:text-slate-200"
                    />
                  </form>
                </div>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          </div>

          <div className="container-custom py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Collections</h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories?.slice(0, 8).map((cat) => (
                    <Link
                      key={cat._id}
                      to={`/category/${cat.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="p-4 bg-slate-50 hover:bg-blue-50 rounded-xl transition-all text-sm font-bold text-slate-700 hover:text-blue-600"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Quick Links</h3>
                <div className="flex flex-wrap gap-2">
                  {["Phones", "Laptops", "Audio", "Watches", "Elite", "New Arrivals"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSearchQuery(tag);
                        handleSearch({ preventDefault: () => {} });
                      }}
                      className="px-5 py-2.5 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-lg text-xs font-bold text-slate-600 transition-all"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default DesktopHeaderElite;