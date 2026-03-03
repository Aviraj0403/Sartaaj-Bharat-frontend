import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, Sparkles, SlidersHorizontal, Loader2, ArrowLeft,
  ChevronDown, X, Filter, LayoutGrid, List, SortAsc,
  Cpu, HardDrive, Smartphone, CheckCircle2
} from "lucide-react";
import ProductCard from "../../components/Product/ProductCard";
import { useProducts } from "../../hooks";

const CategoryDetails = () => {
  const { categorySlug } = useParams();

  // State for filters
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedRam, setSelectedRam] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Data Fetching with all filters
  const { data, isLoading, error } = useProducts({
    category: categorySlug,
    limit: 100,
    brand: selectedBrand,
    ram: selectedRam,
    storage: selectedStorage,
    sortBy: sortBy,
    sortOrder: sortOrder
  });

  const categoryName = data?.category?.name || categorySlug?.replace(/-/g, ' ');

  // Reset filters when category changes
  useEffect(() => {
    setSelectedBrand("");
    setSelectedRam("");
    setSelectedStorage("");
  }, [categorySlug]);

  const clearFilters = () => {
    setSelectedBrand("");
    setSelectedRam("");
    setSelectedStorage("");
  };

  const brands = ["Apple", "Samsung", "OnePlus", "Xiaomi", "Vivo"];
  const rams = ["4GB", "8GB", "12GB", "16GB"];
  const storages = ["64GB", "128GB", "256GB", "512GB", "1TB"];

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-200 selection:text-blue-900">
      {/* Dynamic Breadcrumb Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight size={14} strokeWidth={3} />
            <span className="text-slate-900 italic">Categories</span>
            <ChevronRight size={14} strokeWidth={3} />
            <span className="text-blue-600 italic">{categoryName}</span>
          </div>
        </div>
      </div>

      {/* Beast Elite Category Hero */}
      <div className="relative overflow-hidden bg-slate-950 border-b border-slate-800 mb-8 md:mb-12">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[30rem] h-[30rem] bg-slate-800/20 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Mesh Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>

        <div className="container-custom relative py-10 md:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-3 bg-blue-500/10 text-blue-400 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-blue-500/20 backdrop-blur-md">
                <Sparkles size={14} className="animate-pulse" /> The Elite Archive
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 capitalize tracking-[-0.05em] italic leading-[1]">
                {categoryName}<span className="text-blue-600">.</span>
              </h1>

              <p className="text-slate-400 font-bold text-lg md:text-xl max-w-2xl leading-relaxed mb-10 italic opacity-80">
                Engineering the future of {categoryName?.toLowerCase()}. Explore our curated collection of high-performance artifacts designed for the tech sovereign.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-10 items-center">
                <div className="flex flex-col items-center lg:items-start group">
                  <span className="text-blue-500 text-4xl font-black tracking-tighter italic group-hover:scale-110 transition-transform duration-500">
                    {data?.products?.length || 0}
                  </span>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">Artifacts</span>
                </div>
                <div className="h-8 w-px bg-slate-800 hidden md:block"></div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-white text-base font-black tracking-widest uppercase italic border-b-2 border-blue-600 pb-1">Series 2.0</span>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">Current Protocol</span>
                </div>
              </div>
            </motion.div>

            {/* Decorative Tech Visual - Scaled Down */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden xl:block relative w-64 h-64 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-1 border border-slate-700/50 shadow-2xl"
            >
              <div className="w-full h-full rounded-[2.3rem] bg-slate-950 overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-4 shadow-xl shadow-blue-500/40">
                    <LayoutGrid size={28} strokeWidth={2.5} />
                  </div>
                  <span className="text-white font-black uppercase tracking-widest text-[8px] italic opacity-60">Protocol {categorySlug?.toUpperCase()}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <main className="container-custom pb-20">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Elite Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-72 space-y-8">
            <div className="sticky top-32 space-y-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 flex items-center gap-2 italic">
                  <Filter size={18} className="text-blue-600" /> Refined Search
                </h3>
                {(selectedBrand || selectedRam || selectedStorage) && (
                  <button
                    onClick={clearFilters}
                    className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Brand Filter */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2 italic">
                  <Smartphone size={14} /> Manufacturer
                </h4>
                <div className="space-y-4">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="radio"
                          name="brand"
                          checked={selectedBrand === brand}
                          onChange={() => setSelectedBrand(brand)}
                          className="peer hidden"
                        />
                        <div className="w-5 h-5 rounded-md border-2 border-slate-200 peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all"></div>
                        <CheckCircle2 size={12} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <span className={`text-sm font-bold uppercase tracking-wider transition-colors ${selectedBrand === brand ? 'text-blue-600 italic' : 'text-slate-500 group-hover:text-slate-900'}`}>
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* RAM Filter */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2 italic">
                  <Cpu size={14} /> Memory Array
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {rams.map(ram => (
                    <button
                      key={ram}
                      onClick={() => setSelectedRam(selectedRam === ram ? "" : ram)}
                      className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedRam === ram ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                    >
                      {ram}
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage Filter */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2 italic">
                  <HardDrive size={14} /> Digital Vault
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {storages.map(storage => (
                    <button
                      key={storage}
                      onClick={() => setSelectedStorage(selectedStorage === storage ? "" : storage)}
                      className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedStorage === storage ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Catalog Operations Bar */}
          <div className="flex-1 space-y-6">
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest italic"
                >
                  <Filter size={14} /> Filter Artifacts
                </button>

                <div className="flex items-center bg-slate-50 rounded-2xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-xl transition-all ${viewMode === "grid" ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-xl transition-all ${viewMode === "list" ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <SortAsc size={16} className="text-slate-400" />
                  <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [field, order] = e.target.value.split("-");
                      setSortBy(field);
                      setSortOrder(order);
                    }}
                    className="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-900 border-none focus:ring-0 cursor-pointer italic"
                  >
                    <option value="createdAt-desc">Newest Arrivals</option>
                    <option value="price-asc">Price: Elite to Premium</option>
                    <option value="price-desc">Price: Premium to Elite</option>
                    <option value="rating-desc">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedBrand || selectedRam || selectedStorage) && (
              <div className="flex flex-wrap gap-2">
                {selectedBrand && (
                  <span className="bg-blue-50 text-blue-600 border border-blue-100 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 italic">
                    {selectedBrand} <X size={12} className="cursor-pointer" onClick={() => setSelectedBrand("")} />
                  </span>
                )}
                {selectedRam && (
                  <span className="bg-purple-50 text-purple-600 border border-purple-100 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 italic">
                    RAM: {selectedRam} <X size={12} className="cursor-pointer" onClick={() => setSelectedRam("")} />
                  </span>
                )}
                {selectedStorage && (
                  <span className="bg-amber-50 text-amber-600 border border-amber-100 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 italic">
                    Storage: {selectedStorage} <X size={12} className="cursor-pointer" onClick={() => setSelectedStorage("")} />
                  </span>
                )}
              </div>
            )}

            {/* Elite Catalog Grid */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-32"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-6 italic">Synchronizing Elite Data...</span>
                </motion.div>
              ) : data?.products?.length > 0 ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
                    : "space-y-6"
                  }
                >
                  {data.products.map((product, idx) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <ProductCard product={product} layout={viewMode} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden relative"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                  <Smartphone className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                  <h3 className="text-3xl font-black text-slate-900 mb-3 italic">No Artifacts Match</h3>
                  <p className="text-slate-500 font-bold mb-10 max-w-sm mx-auto uppercase text-xs tracking-widest italic leading-relaxed">
                    Your elite parameters did not returned any active results in our current catalog.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 italic"
                  >
                    Reset Refinements
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Mobile Elite Filter Modal */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[60] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 italic">Filters</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-white rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Reusing desktop filter components or similar */}
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2 italic">Manufacturer</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {brands.map(brand => (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(selectedBrand === brand ? "" : brand)}
                        className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${selectedBrand === brand ? 'border-blue-600 bg-blue-50 text-blue-600 font-black italic' : 'border-slate-100 text-slate-500'}`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2 italic">Memory Array</h4>
                  <div className="flex flex-wrap gap-3">
                    {rams.map(ram => (
                      <button
                        key={ram}
                        onClick={() => setSelectedRam(selectedRam === ram ? "" : ram)}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${selectedRam === ram ? 'border-blue-600 bg-blue-50 text-blue-600 font-black italic' : 'border-slate-100 text-slate-500'}`}
                      >
                        {ram}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2 italic">Digital Vault</h4>
                  <div className="flex flex-wrap gap-3">
                    {storages.map(storage => (
                      <button
                        key={storage}
                        onClick={() => setSelectedStorage(selectedStorage === storage ? "" : storage)}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${selectedStorage === storage ? 'border-blue-600 bg-blue-50 text-blue-600 font-black italic' : 'border-slate-100 text-slate-500'}`}
                      >
                        {storage}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest italic shadow-xl"
                >
                  View Artifacts
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryDetails;
