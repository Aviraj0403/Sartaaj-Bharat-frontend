import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  ArrowLeft,
  Loader2,
  Sparkles,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import ProductCard from "../../components/Product/ProductCard";
import { useSearch } from "../../hooks/useProducts";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products based on search query
  const { data, isLoading } = useSearch(query, currentPage, 20);

  const products = data?.products || [];
  const pagination = data?.pagination || {};

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-600 selection:text-white antialiased">
      {/* Elite Search Header - Immersive Design */}
      <div className="relative bg-slate-950 pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full -mr-64 -mt-64 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full -ml-32 -mb-32"></div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-4 text-blue-500 font-black text-[10px] uppercase tracking-[0.6em] mb-10 italic">
              <Sparkles size={14} className="animate-spin-slow" /> Strategic Repository Scan
            </div>
            
            <div className="space-y-4 mb-12">
               <span className="text-white/40 text-[11px] font-black uppercase tracking-[0.4em] italic">Search Intelligence // Result Matrix</span>
               <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter italic leading-none uppercase">
                 Curating <span className="text-blue-500">"{query}"</span>
               </h1>
            </div>

            <div className="flex flex-wrap items-center gap-8 text-white/60 font-black text-[10px] uppercase tracking-[0.3em]">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl">
                <span className="text-blue-500">{products.length}</span> Artifacts Indexed
              </div>
              <div className="h-px w-16 bg-white/10"></div>
              <span className="hover:text-white transition-colors cursor-default italic">Lounge Protocol 2.0</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content hub */}
      <main className="container-custom -mt-12 relative z-20 pb-32">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Elite Sidebar Navigation */}
          <aside className="w-full lg:w-72 space-y-10 group">
            <div className="lg:sticky lg:top-36">
              {/* Refinement Control */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 blur-[40px] opacity-50"></div>
                
                <div className="flex items-center justify-between mb-10">
                   <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900 italic">Filters</h3>
                   <SlidersHorizontal size={16} className="text-blue-600" />
                </div>

                <div className="space-y-12">
                   {/* Categories Section */}
                   <section>
                      <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
                         <TrendingUp size={12} className="text-blue-400" /> Collection Status
                      </h4>
                      <div className="space-y-5">
                        {[
                          "Elite Vault",
                          "Prime Artifacts",
                          "Heritage Edition",
                          "Modern Essentials",
                        ].map((label) => (
                          <label key={label} className="flex items-center gap-4 cursor-pointer group/item">
                            <div className="w-6 h-6 rounded-xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center transition-all group-hover/item:border-blue-500 active:scale-90 shadow-inner">
                               <div className="w-2 h-2 rounded-full bg-blue-600 opacity-0 group-hover/item:opacity-20"></div>
                            </div>
                            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest italic group-hover/item:text-slate-950 transition-colors">
                               {label}
                            </span>
                          </label>
                        ))}
                      </div>
                   </section>

                   <div className="pt-8 border-t border-slate-50">
                      <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest leading-loose italic">
                         Strategic refinement allows for more precise artifact acquisition within the repository.
                      </p>
                   </div>
                </div>
              </div>

              {/* Back Link */}
              <Link
                to="/"
                className="mt-8 flex items-center justify-center gap-4 py-5 px-8 rounded-[2rem] bg-slate-950 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-600 shadow-xl shadow-slate-200 transition-all active:scale-95 italic group"
              >
                <ArrowLeft size={16} strokeWidth={3} className="group-hover:-translate-x-2 transition-transform" /> 
                Return to Lounge
              </Link>
            </div>
          </aside>

          {/* Result Matrix Grid */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-48 bg-slate-50/30 rounded-[4rem] border border-dashed border-slate-100"
                >
                  <div className="relative">
                    <Loader2 className="w-20 h-20 text-blue-600 animate-spin" strokeWidth={1} />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Search size={24} className="text-blue-200 animate-pulse" />
                    </div>
                  </div>
                  <span className="mt-10 text-[11px] font-black uppercase tracking-[0.6em] text-slate-400 italic animate-pulse">
                    Decrypting Result Matrix...
                  </span>
                </motion.div>
              ) : products.length > 0 ? (
                <div className="space-y-16">
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
                  >
                    {products.map((product, idx) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.5, ease: "easeOut" }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Enhanced Pagination Protocol */}
                  {pagination.totalPages > 1 && (
                    <div className="flex justify-center items-center gap-10 pt-16 border-t border-slate-50">
                       <button 
                         disabled={currentPage === 1}
                         onClick={() => setCurrentPage(prev => prev - 1)}
                         className="p-4 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-950 hover:text-white transition-all disabled:opacity-20 shadow-inner"
                       >
                         <ArrowLeft size={20} />
                       </button>
                       <div className="flex items-center gap-4">
                          <span className="text-sm font-black italic text-slate-900">{currentPage}</span>
                          <div className="h-px w-8 bg-slate-200"></div>
                          <span className="text-xs font-black italic text-slate-300">{pagination.totalPages}</span>
                       </div>
                       <button 
                         disabled={currentPage === pagination.totalPages}
                         onClick={() => setCurrentPage(prev => prev + 1)}
                         className="p-4 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-950 hover:text-white transition-all disabled:opacity-20 shadow-inner"
                       >
                         <ChevronRight size={20} />
                       </button>
                    </div>
                  )}
                </div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-48 bg-slate-50/50 rounded-[4rem] border border-slate-100 border-dashed relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-white/80 to-transparent pointer-events-none"></div>
                  
                  <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl border border-slate-50 relative z-10 group-hover:rotate-12 transition-transform duration-700">
                    <Search
                      size={48}
                      className="text-slate-100 group-hover:text-blue-500/20 transition-colors"
                      strokeWidth={3}
                    />
                  </div>
                  
                  <div className="relative z-10 px-6">
                    <h3 className="text-4xl md:text-5xl font-black text-slate-950 mb-6 tracking-tighter italic uppercase">
                      Intel Void <span className="text-blue-600">Detected</span>
                    </h3>
                    <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em] mb-16 max-w-sm mx-auto leading-relaxed italic">
                      Zero matching artifact signatures found for intel: <span className="text-slate-900 border-b border-blue-600">"{query}"</span>
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                          to="/"
                          className="bg-slate-950 text-white px-12 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-600 shadow-2xl shadow-slate-200 transition-all italic active:scale-95"
                        >
                          Reset Repository
                        </Link>
                        <button
                          onClick={() => window.history.back()}
                          className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-950 transition-colors italic"
                        >
                          Abort Search Sequence
                        </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
