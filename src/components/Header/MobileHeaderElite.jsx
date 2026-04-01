// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Search,
//   ShoppingCart,
//   ShoppingBag,
//   User,
//   Heart,
//   Menu,
//   X,
//   Home,
//   Tag,
//   List,
// } from "lucide-react";
// import { useSelector } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";
// import { useCategories } from "../../hooks";

// const MobileHeaderElite = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isScrolled, setIsScrolled] = useState(false);

//   const navigate = useNavigate();
//   const { totalQuantity } = useSelector((state) => state.cart);
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const { data: categories } = useCategories();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Scroll Lock
//   useEffect(() => {
//     if (isMenuOpen || isSearchOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//   }, [isMenuOpen, isSearchOpen]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       setIsSearchOpen(false);
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   return (
//     <div className="lg:hidden">
//       {/* Top Sticky Header - Refined for Elite Selection */}
//       <header
//         className={`fixed top-0 left-0 w-full z-70 transition-all duration-500 ${isScrolled ? "bg-white/80 backdrop-blur-2xl shadow-xl shadow-slate-200/20 py-2" : "bg-white py-4"}`}
//       >
//         <div className="container-custom px-4 space-y-4">
//           <div className="flex justify-between items-center">
//             {/* Menu Trigger */}
//             <button
//               onClick={() => setIsMenuOpen(true)}
//               className="p-2.5 rounded-2xl bg-slate-50 text-slate-900 active:scale-90 transition-all border border-slate-100"
//             >
//               <Menu size={22} strokeWidth={2.5} />
//             </button>
  
//             {/* Logo */}
//             <Link to="/" className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-slate-950 rounded-xl flex items-center justify-center text-white font-black text-base shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
//                 S
//               </div>
//               <h1 className="text-lg font-black text-slate-900 italic tracking-tighter uppercase">
//                 SartaaJ<span className="text-blue-600">Bharat</span>
//               </h1>
//             </Link>
  
//             {/* Quick Actions */}
//             <div className="flex items-center gap-2">
//               <Link
//                 to="/cart"
//                 className="relative p-2.5 rounded-2xl bg-slate-950 text-white shadow-2xl shadow-slate-900/20 active:scale-90 transition-all"
//               >
//                 <ShoppingBag size={20} strokeWidth={2.5} />
//                 {totalQuantity > 0 && (
//                   <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-slate-950 shadow-lg">
//                     {totalQuantity}
//                   </span>
//                 )}
//               </Link>
//             </div>
//           </div>

//           {/* Premium Inline Search Trigger (Always visible or transitions on scroll) */}
//           <motion.div 
//             initial={false}
//             animate={{ opacity: 1, y: 0 }}
//             className="relative group"
//           >
//             <div 
//               onClick={() => setIsSearchOpen(true)}
//               className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 font-bold text-[10px] uppercase tracking-widest italic flex items-center gap-3 active:bg-slate-100 transition-all"
//             >
//               <Search className="absolute left-4 text-blue-600" size={16} strokeWidth={3} />
//               Discover the Archive...
//             </div>
//           </motion.div>
//         </div>
//       </header>

//       {/* Bottom Navigation */}
//       <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-3 z-60 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
//         <Link to="/" className="flex flex-col items-center gap-1 text-blue-600">
//           <Home size={20} />
//           <span className="text-[10px] font-black uppercase tracking-widest">
//             Home
//           </span>
//         </Link>
//         <Link
//           to="/exclusive"
//           className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors"
//         >
//           <Tag size={20} />
//           <span className="text-[10px] font-black uppercase tracking-widest">
//             Elite
//           </span>
//         </Link>
//         <button
//           onClick={() => setIsMenuOpen(true)}
//           className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors"
//         >
//           <List size={20} />
//           <span className="text-[10px] font-black uppercase tracking-widest">
//             Menu
//           </span>
//         </button>
//         <Link
//           to="/profile"
//           className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors"
//         >
//           <User size={20} />
//           <span className="text-[10px] font-black uppercase tracking-widest">
//             Profile
//           </span>
//         </Link>
//       </nav>

//       {/* Side Drawer Menu */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsMenuOpen(false)}
//               className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-80"
//             />
//             <motion.div
//               initial={{ x: "-100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "-100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               className="fixed left-0 top-0 h-screen w-[85%] max-w-sm bg-white z-90 shadow-2xl flex flex-col"
//             >
//               <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl">
//                     S
//                   </div>
//                   <span className="text-xl font-black italic tracking-tighter">
//                     SARTAAJ<span className="text-blue-600">BHARAT</span>
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => setIsMenuOpen(false)}
//                   className="p-2 rounded-xl bg-white shadow-sm ring-1 ring-slate-200"
//                 >
//                   <X size={20} />
//                 </button>
//               </div>

//               <div className="flex-1 overflow-y-auto p-8 bg-white">
//                 <div className="mb-8">
//                   <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 italic">
//                     Member Services
//                   </h4>
//                   <div className="grid grid-cols-2 gap-4">
//                     <Link
//                       to="/wishlist"
//                       onClick={() => setIsMenuOpen(false)}
//                       className="p-4 bg-slate-50 rounded-2xl flex flex-col gap-3 hover:bg-slate-100 transition-colors"
//                     >
//                       <Heart size={20} className="text-red-500" />
//                       <span className="text-xs font-black uppercase">
//                         Wishlist
//                       </span>
//                     </Link>
//                     <Link
//                       to="/track-order"
//                       onClick={() => setIsMenuOpen(false)}
//                       className="p-4 bg-slate-50 rounded-2xl flex flex-col gap-3 hover:bg-slate-100 transition-colors"
//                     >
//                       <ShoppingBag size={20} className="text-blue-500" />
//                       <span className="text-xs font-black uppercase">
//                         Orders
//                       </span>
//                     </Link>
//                   </div>
//                 </div>

//                 <nav className="flex flex-col gap-6">
//                   <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2 italic">
//                     Collections
//                   </h4>
//                   <Link
//                     to="/"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="text-2xl font-black italic tracking-tight text-blue-600"
//                   >
//                     Home Lounge
//                   </Link>
//                   {categories?.map((cat) => (
//                     <Link
//                       key={cat._id}
//                       to={`/category/${cat.slug}`}
//                       onClick={() => setIsMenuOpen(false)}
//                       className="text-2xl font-black italic tracking-tight text-slate-900 active:text-blue-600 transition-colors"
//                     >
//                       {cat.name}
//                     </Link>
//                   ))}
//                   <Link
//                     to="/exclusive"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="text-xl font-black text-orange-500 italic flex items-center gap-2"
//                   >
//                     <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
//                     Elite Collections
//                   </Link>
//                 </nav>
//               </div>

//               <div className="p-8 bg-slate-900 text-white rounded-t-[2.5rem]">
//                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">
//                   Concierge Support
//                 </p>
//                 <div className="flex items-center gap-4 mb-8">
//                   <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-700">
//                     {isAuthenticated ? (
//                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.userName || "U")}&background=2563eb&color=fff`} alt="user" className="w-full h-full object-cover" />
//                     ) : (
//                        <User size={24} className="text-blue-500" />
//                     )}
//                   </div>
//                   <div>
//                     <p className="text-sm font-black italic">{isAuthenticated ? user?.userName : "+91 98765 43210"}</p>
//                     <p className="text-[9px] font-black uppercase text-slate-500 tracking-wider">
//                       {isAuthenticated ? user?.email : "Available 24/7"}
//                     </p>
//                   </div>
//                 </div>
//                 <Link
//                   to={isAuthenticated ? "/profile" : "/signin"}
//                   onClick={() => setIsMenuOpen(false)}
//                   className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-center block shadow-xl shadow-blue-500/20 active:scale-95 transition-transform"
//                 >
//                   {isAuthenticated ? "Management Portal" : "Access Portal"}
//                 </Link>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Global Search Overlay (Mobile) - Reimagined for Elite Experience */}
//       <AnimatePresence>
//         {isSearchOpen && (
//           <motion.div
//             initial={{ opacity: 0, scale: 1.1 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 1.05 }}
//             className="fixed inset-0 bg-white z-[100] flex flex-col"
//           >
//             <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
//               <button
//                 onClick={() => setIsSearchOpen(false)}
//                 className="p-3 rounded-2xl bg-slate-50 text-slate-900 active:scale-90 transition-all shadow-sm"
//               >
//                 <X size={24} strokeWidth={3} />
//               </button>
//               <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">
//                 Archives Search
//               </h2>
//               <div className="w-12" /> {/* Spacer */}
//             </div>

//             <div className="p-8">
//               <form onSubmit={handleSearch} className="relative group">
//                 <Search
//                   className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-600"
//                   size={28}
//                   strokeWidth={3}
//                 />
//                 <input
//                   autoFocus
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="What are you seeking?"
//                   className="w-full bg-transparent border-none outline-none text-3xl font-black italic tracking-tighter text-slate-900 pl-12 py-6 focus:placeholder-transparent transition-all"
//                 />
//                 <div className="h-0.5 w-full bg-slate-100 group-focus-within:bg-blue-600 transition-colors"></div>
//               </form>
//             </div>

//             <div className="flex-1 overflow-y-auto px-8 pb-12">
//               <div className="space-y-12">
//                 <div>
//                   <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 italic">
//                     Popular Collections
//                   </h4>
//                   <div className="flex flex-wrap gap-3">
//                     {["Audio", "Computing", "Mobile", "Gaming", "Displays"].map(
//                       (tag) => (
//                         <button
//                           key={tag}
//                           onClick={() => setSearchQuery(tag)}
//                           className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-sm"
//                         >
//                           {tag}
//                         </button>
//                       ),
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 italic">
//                     Curated Categories
//                   </h4>
//                   <div className="grid grid-cols-1 gap-4">
//                     {categories?.slice(0, 5).map((cat) => (
//                       <Link
//                         key={cat._id}
//                         to={`/category/${cat.slug}`}
//                         onClick={() => setIsSearchOpen(false)}
//                         className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between group active:bg-blue-50 transition-all shadow-sm"
//                       >
//                         <span className="text-xl font-black italic tracking-tight text-slate-900 group-active:text-blue-600">
//                           {cat.name}
//                         </span>
//                         <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
//                           <X size={16} className="rotate-45 text-blue-600" strokeWidth={3} />
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="bg-slate-950 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
//                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] -mr-16 -mt-16"></div>
//                   <h5 className="text-xl font-black italic mb-4 relative z-10">Exclusive Membership</h5>
//                   <p className="text-[9px] text-slate-400 uppercase tracking-widest mb-6 leading-relaxed relative z-10">Unlock early access to premium releases and personalized curation services.</p>
//                   <Link 
//                     to="/auth" 
//                     onClick={() => setIsSearchOpen(false)}
//                     className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center block relative z-10"
//                   >
//                     Join Selection
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Spacer for sticky header */}
//       <div className="h-16"></div>
//     </div>
//   );
// };

// export default MobileHeaderElite;







import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  ShoppingBag,
  User,
  Heart,
  Menu,
  X,
  Home,
  Tag,
  List,
  Settings,
  LogOut,
  ChevronRight,
  Clock,
  Shield,
  Gift,
  TrendingUp,
  Star,
  Mail,
  Phone,
} from "lucide-react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useCategories } from "../../hooks";

const MobileHeaderElite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const { totalQuantity } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { data: categories } = useCategories();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll Lock
  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
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
      {/* Top Sticky Header */}
      <header
        className={`fixed top-0 left-0 w-full z-70 transition-all duration-500 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-xl shadow-slate-200/20 py-2" : "bg-white py-3"}`}
      >
        <div className="container-custom px-4 py-1">
          <div className="flex justify-between items-center">
            {/* Menu Trigger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2.5 rounded-2xl bg-slate-50 text-slate-900 active:scale-90 transition-all border border-slate-100"
            >
              <Menu size={22} strokeWidth={2.5} />
            </button>
  
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-950 rounded-xl flex items-center justify-center text-white font-black text-base shadow-xl">
                S
              </div>
              <h1 className="text-lg font-black text-slate-900 italic tracking-tighter uppercase">
                SartaaJ<span className="text-blue-600">Bharat</span>
              </h1>
            </Link>
  
            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-2xl bg-slate-50 text-slate-900 active:scale-90 transition-all border border-slate-100"
              >
                <Search size={20} strokeWidth={2.5} />
              </button>
              <Link
                to="/cart"
                className="relative p-2.5 rounded-2xl bg-slate-950 text-white shadow-2xl shadow-slate-900/20 active:scale-90 transition-all"
              >
                <ShoppingBag size={20} strokeWidth={2.5} />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-slate-950 shadow-lg">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-3 z-60 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <Link to="/" className="flex flex-col items-center gap-1 text-blue-600">
          <Home size={20} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Home
          </span>
        </Link>
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors"
        >
          <Search size={20} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Search
          </span>
        </button>
        <Link
          to="/exclusive"
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors"
        >
          <Tag size={20} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Elite
          </span>
        </Link>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors"
        >
          <List size={20} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Menu
          </span>
        </button>
        <Link
          to="/profile"
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors"
        >
          <User size={20} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Profile
          </span>
        </Link>
      </nav>

      {/* Side Drawer Menu - Profile Focused Header */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-80"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-screen w-[85%] max-w-sm bg-white z-90 shadow-2xl flex flex-col"
            >
              {/* Header with Profile */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 pt-8 px-5 pb-6 relative overflow-hidden border-b border-white/5">
                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                
                <div className="flex items-center justify-end mb-6 relative z-10">
                  {/* Close Button Only - Moved to Right */}
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all focus:outline-none"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Enhanced Premium Profile Card */}
                <Link
                  to={isAuthenticated ? "/profile" : "/signin"}
                  onClick={() => setIsMenuOpen(false)}
                  className="relative bg-white/5 border border-white/10 backdrop-blur-md rounded-[1.5rem] p-5 hover:bg-white/10 transition-all group block shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.5rem]"></div>
                  
                  <div className="flex items-center gap-4 relative z-10">
                    {/* Premium Circular Avatar */}
                    <div className="relative shrink-0">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] border-2 border-white/10 group-hover:border-white/20 transition-all">
                        {isAuthenticated ? (
                          <img 
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.userName || "U")}&background=2563eb&color=fff&size=64`} 
                            alt="user" 
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <User size={26} className="text-white" />
                        )}
                      </div>
                      {isAuthenticated && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full shadow-sm"></div>
                      )}
                    </div>
                    
                    {/* User Info */}
                    <div className="flex-1">
                      <p className="text-white font-black text-lg tracking-tight">
                        {isAuthenticated ? user?.userName || "User" : "Welcome Guest"}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                        {isAuthenticated ? user?.email || "member@sartaaj.com" : "Sign in for exclusive access"}
                      </p>
                      {!isAuthenticated && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-1.5  bg-blue-500 rounded-full"></div>
                          <span className="text-[8px] text-blue-400 uppercase tracking-wider">Join Elite Club</span>
                        </div>
                      )}
                    </div>
                    
                    <ChevronRight size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                </Link>

                {/* Quick Stats for Authenticated Users */}
                {isAuthenticated && (
                  <div className="grid grid-cols-2 gap- mt-5">
                  
                  </div>
                )}
              </div>

              {/* Menu Items - Organized Layout */}
              <div className="flex-1 overflow-y-auto">
                {/* Quick Actions Section */}
                <div className="px-6 pt-6 pb-4 border-b border-slate-100">
                  <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <Link
                      to="/wishlist"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all"
                    >
                      <Heart size={18} className="text-red-500" />
                      <span className="text-[9px] font-black uppercase">Wishlist</span>
                    </Link>
                    <Link
                      to="/track-order"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all"
                    >
                      <Clock size={18} className="text-blue-500" />
                      <span className="text-[9px] font-black uppercase">Orders</span>
                    </Link>
                    <Link
                      to="/offers"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all"
                    >
                      <Gift size={18} className="text-orange-500" />
                      <span className="text-[9px] font-black uppercase">Offers</span>
                    </Link>
                  </div>
                </div>

                {/* Categories Section */}
                <div className="px-6 py-6 border-b border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Collections
                    </h3>
                    <TrendingUp size={12} className="text-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <Link
                      to="/"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between py-3 text-slate-900 hover:text-blue-600 transition-colors group"
                    >
                      <span className="text-base font-bold">Home Lounge</span>
                      <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    {categories?.slice(0, 6).map((cat) => (
                      <Link
                        key={cat._id}
                        to={`/category/${cat.slug}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between py-3 text-slate-900 hover:text-blue-600 transition-colors group"
                      >
                        <span className="text-base font-medium">{cat.name}</span>
                        <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Elite Features */}
                <div className="px-6 py-6 border-b border-slate-100">
                  <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                    Elite Benefits
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
                      <Star size={16} className="text-orange-500" />
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-900">Elite Membership</p>
                        <p className="text-[8px] text-slate-500">Exclusive access & premium perks</p>
                      </div>
                      <ChevronRight size={14} className="text-orange-500" />
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                      <Shield size={16} className="text-blue-500" />
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-900">Premium Warranty</p>
                        <p className="text-[8px] text-slate-500">Extended coverage on all products</p>
                      </div>
                      <ChevronRight size={14} className="text-blue-500" />
                    </div>
                  </div>
                </div>

                {/* Support Section */}
                <div className="px-6 py-6">
                  <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                    Support
                  </h3>
                  <div className="space-y-3">
                    <Link
                      to="/help"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 py-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      <Mail size={14} />
                      Help Center
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 py-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      <Phone size={14} />
                      Contact Us
                    </Link>
                    <Link
                      to="/faq"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 py-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      <Shield size={14} />
                      FAQ
                    </Link>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-slate-100 bg-slate-50">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      // Handle logout
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-red-100 transition-all"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-center block hover:bg-blue-700 transition-all shadow-lg"
                  >
                    Sign In / Register
                  </Link>
                )}
                <p className="text-[8px] text-center text-slate-400 mt-4">
                  © 2026 Sartaaj Bharat. All rights reserved.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global Search Overlay (Mobile) */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="fixed inset-0 bg-white z-[100] flex flex-col"
          >
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-3 rounded-2xl bg-slate-50 text-slate-900 active:scale-90 transition-all shadow-sm"
              >
                <X size={24} strokeWidth={3} />
              </button>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">
                Archives Search
              </h2>
              <div className="w-12" />
            </div>

            <div className="p-8">
              <form onSubmit={handleSearch} className="relative group">
                <Search
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-600"
                  size={28}
                  strokeWidth={3}
                />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you seeking?"
                  className="w-full bg-transparent border-none outline-none text-3xl font-black italic tracking-tighter text-slate-900 pl-12 py-6 focus:placeholder-transparent transition-all"
                />
                <div className="h-0.5 w-full bg-slate-100 group-focus-within:bg-blue-600 transition-colors"></div>
              </form>
            </div>

            <div className="flex-1 overflow-y-auto px-8 pb-12">
              <div className="space-y-12">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 italic">
                    Popular Collections
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {["Audio", "Computing", "Mobile", "Gaming", "Displays"].map(
                      (tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-sm"
                        >
                          {tag}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 italic">
                    Curated Categories
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {categories?.slice(0, 5).map((cat) => (
                      <Link
                        key={cat._id}
                        to={`/category/${cat.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between group active:bg-blue-50 transition-all shadow-sm"
                      >
                        <span className="text-xl font-black italic tracking-tight text-slate-900 group-active:text-blue-600">
                          {cat.name}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                          <X size={16} className="rotate-45 text-blue-600" strokeWidth={3} />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] -mr-16 -mt-16"></div>
                  <h5 className="text-xl font-black italic mb-4 relative z-10">Exclusive Membership</h5>
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest mb-6 leading-relaxed relative z-10">Unlock early access to premium releases and personalized curation services.</p>
                  <Link 
                    to="/auth" 
                    onClick={() => setIsSearchOpen(false)}
                    className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center block relative z-10"
                  >
                    Join Selection
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for sticky header */}
      <div className="h-[65px]"></div>
    </div>
  );
};

export default MobileHeaderElite;