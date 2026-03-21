import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, Sparkles, SlidersHorizontal, Loader2, ArrowLeft,
  X, Filter, LayoutGrid, List, SortAsc, Tag, DollarSign,
  ShoppingBag, ChevronDown, ChevronUp
} from "lucide-react";
import ProductCard from "../../components/Product/ProductCard";
import { useProducts } from "../../hooks";
import Axios from "../../utils/Axios";

// ─── Fetch dynamic filter options from backend ─────────────────────────────
const fetchFilterOptions = async (categorySlug) => {
  if (!categorySlug) return null;
  const res = await Axios.get(`/categories/slug/${categorySlug}/filters`);
  return res.data?.data || null;
};

// ─── Collapsible Filter Group ──────────────────────────────────────────────
const FilterGroup = ({ title, icon: Icon, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
          {Icon && <Icon size={13} className="text-blue-500" />}
          {title}
        </span>
        {open ? <ChevronUp size={14} className="text-slate-300" /> : <ChevronDown size={14} className="text-slate-300" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────
const CategoryDetails = () => {
  const { categorySlug } = useParams();

  // Filter state
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSubCat, setSelectedSubCat] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const [dynamicFilters, setDynamicFilters] = useState({}); // { filter_Fabric: "Cotton,Silk" }

  // Reset filters on category switch
  useEffect(() => {
    setSelectedBrand(""); setSelectedSubCat("");
    setMinPrice(""); setMaxPrice("");
    setDynamicFilters({});
  }, [categorySlug]);

  const clearFilters = useCallback(() => {
    setSelectedBrand(""); setSelectedSubCat("");
    setMinPrice(""); setMaxPrice("");
    setDynamicFilters({});
  }, []);

  const hasFilters = selectedBrand || selectedSubCat || minPrice || maxPrice || Object.keys(dynamicFilters).length > 0;

  const toggleDynamicFilter = (filterName, value) => {
    setDynamicFilters(prev => {
      const key = `filter_${filterName}`;
      const currentValues = prev[key] ? prev[key].split(',') : [];
      let nextValues;
      if (currentValues.includes(value)) {
        nextValues = currentValues.filter(v => v !== value);
      } else {
        nextValues = [...currentValues, value];
      }
      
      if (nextValues.length === 0) {
        const { [key]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: nextValues.join(',') };
    });
  };

  // ── Data: dynamic filter options ────────────────────────────────────────
  const { data: filterOpts } = useQuery({
    queryKey: ["category-filters", categorySlug],
    queryFn: () => fetchFilterOptions(categorySlug),
    enabled: !!categorySlug,
    staleTime: 10 * 60 * 1000,
  });

  // ── Data: products ──────────────────────────────────────────────────────
  const { data, isLoading } = useProducts({
    category: categorySlug,
    subCategory: selectedSubCat || undefined,
    limit: 100,
    brand: selectedBrand || undefined,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
    sortBy,
    sortOrder,
    ...dynamicFilters,
  });

  const categoryName = data?.category?.name || categorySlug?.replace(/-/g, " ");
  const products = data?.products || [];

  // ── Filter sidebar markup (reused for desktop + mobile) ─────────────────
  const FilterPanel = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-blue-600" /> Refined Search
        </h3>
        {hasFilters && (
          <button onClick={clearFilters} className="text-[9px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors">
            Clear All
          </button>
        )}
      </div>

      {/* Sub-categories */}
      {filterOpts?.subCategories?.length > 0 && (
        <FilterGroup title="Category" icon={Tag}>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setSelectedSubCat("")}
              className={`text-left text-xs font-bold uppercase tracking-wider py-2 px-3 rounded-xl transition-all ${!selectedSubCat ? "bg-blue-50 text-blue-700 font-black" : "text-slate-400 hover:text-slate-700"}`}
            >
              All
            </button>
            {filterOpts.subCategories.map(sub => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubCat(selectedSubCat === sub.id ? "" : sub.id)}
                className={`text-left text-xs font-bold uppercase tracking-wider py-2 px-3 rounded-xl transition-all ${selectedSubCat === sub.id ? "bg-blue-50 text-blue-700 font-black" : "text-slate-400 hover:text-slate-700"}`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </FilterGroup>
      )}

      {/* Brands */}
      {filterOpts?.brands?.length > 0 && (
        <FilterGroup title="Brand">
          <div className="flex flex-wrap gap-2">
            {filterOpts.brands.map(brand => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(selectedBrand === brand ? "" : brand)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${selectedBrand === brand ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-400 border-slate-200 hover:border-blue-300"}`}
              >
                {brand}
              </button>
            ))}
          </div>
        </FilterGroup>
      )}

      {/* Dynamic Filters */}
      {filterOpts?.dynamicFilters && Object.entries(filterOpts.dynamicFilters).map(([filterName, filterValues]) => (
        <FilterGroup key={filterName} title={filterName} defaultOpen={false}>
          <div className="flex flex-col gap-2">
            {filterValues.map(val => (
              <label key={val} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={dynamicFilters[`filter_${filterName}`]?.split(',').includes(val) || false}
                    onChange={() => toggleDynamicFilter(filterName, val)}
                  />
                  <div className="w-4 h-4 rounded border-2 border-slate-300 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all flex items-center justify-center group-hover:border-blue-400">
                    <svg className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-800 transition-colors capitalize">
                  {val}
                </span>
              </label>
            ))}
          </div>
        </FilterGroup>
      ))}

      {/* Price range */}
      {filterOpts?.priceRange && (
        <FilterGroup title="Price Range" icon={DollarSign} defaultOpen={false}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">Min ₹</label>
              <input
                type="number"
                placeholder={filterOpts.priceRange.min}
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">Max ₹</label>
              <input
                type="number"
                placeholder={filterOpts.priceRange.max}
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </FilterGroup>
      )}
    </div>
  );

  return (
    <div className="bg-[#f8fafc] min-h-screen selection:bg-blue-200 selection:text-blue-900">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="container-custom py-3.5">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight size={12} strokeWidth={3} />
            <span className="text-slate-900 capitalize">{categoryName}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden bg-slate-950 border-b border-slate-800 mb-8">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

        <div className="container-custom relative py-10 md:py-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2.5 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] mb-6 border border-blue-500/20">
              <Sparkles size={12} className="animate-pulse" /> The Elite Archive
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 capitalize tracking-tight italic leading-none">
              {categoryName}<span className="text-blue-600">.</span>
            </h1>

            <p className="text-slate-400 text-sm max-w-xl leading-relaxed mb-8 italic opacity-70">
              Engineering the future of {categoryName?.toLowerCase()}. Curated for the tech sovereign.
            </p>

            <div className="flex flex-wrap gap-8 items-center">
              <div className="text-center">
                <span className="text-blue-500 text-3xl font-black italic block">{products.length}</span>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Products</span>
              </div>
              {filterOpts?.subCategories?.length > 0 && (
                <>
                  <div className="h-6 w-px bg-slate-800 hidden md:block" />
                  <div className="text-center">
                    <span className="text-white text-base font-black italic block">{filterOpts.subCategories.length}</span>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Sub-categories</span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <main className="container-custom pb-20">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-28">
              <FilterPanel />
            </div>
          </aside>

          {/* Catalog */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Ops bar */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest"
                >
                  <Filter size={13} /> Filter
                  {hasFilters && <span className="bg-blue-600 text-white rounded-full text-[8px] w-4 h-4 flex items-center justify-center font-black">!</span>}
                </button>

                {/* View toggle */}
                <div className="flex items-center bg-slate-50 rounded-xl p-1 gap-0.5">
                  <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"}`}><LayoutGrid size={16} /></button>
                  <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"}`}><List size={16} /></button>
                </div>

                <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {products.length} Results
                </span>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <SortAsc size={14} className="text-slate-300 flex-shrink-0" />
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={e => { const [f, o] = e.target.value.split("-"); setSortBy(f); setSortOrder(o); }}
                  className="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-700 border-none focus:ring-0 cursor-pointer"
                >
                  <option value="createdAt-desc">Newest</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="rating-desc">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Active filter chips */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2">
                {selectedBrand && (
                  <span className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                    {selectedBrand} <X size={10} className="cursor-pointer" onClick={() => setSelectedBrand("")} />
                  </span>
                )}
                {selectedSubCat && filterOpts?.subCategories && (
                  <span className="bg-violet-50 text-violet-600 border border-violet-100 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                    {filterOpts.subCategories.find(s => s.id === selectedSubCat)?.name} <X size={10} className="cursor-pointer" onClick={() => setSelectedSubCat("")} />
                  </span>
                )}
                {(minPrice || maxPrice) && (
                  <span className="bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                    ₹{minPrice || 0} – ₹{maxPrice || "∞"} <X size={10} className="cursor-pointer" onClick={() => { setMinPrice(""); setMaxPrice(""); }} />
                  </span>
                )}
                {/* Dynamic Filters Chips */}
                {Object.entries(dynamicFilters).map(([key, valueStr]) => {
                  const filterName = key.replace('filter_', '');
                  const values = valueStr.split(',');
                  return values.map(val => (
                    <span key={`${key}-${val}`} className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                      {filterName}: {val} <X size={10} className="cursor-pointer" onClick={() => toggleDynamicFilter(filterName, val)} />
                    </span>
                  ));
                })}
              </div>
            )}

            {/* Product grid */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-32">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 border-4 border-blue-100 rounded-full" />
                    <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-5 italic">Loading products…</span>
                </motion.div>
              ) : products.length > 0 ? (
                <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className={viewMode === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
                    : "space-y-4"
                  }
                >
                  {products.map((product, idx) => (
                    <motion.div key={product._id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.04 }}>
                      <ProductCard product={product} layout={viewMode} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-28 bg-white rounded-3xl border border-slate-100 text-center"
                >
                  <ShoppingBag size={42} className="text-slate-100 mb-5" />
                  <h3 className="text-2xl font-black text-slate-700 italic mb-2">No Products Found</h3>
                  <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-8">Try adjusting your filters</p>
                  <button onClick={clearFilters} className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 italic">
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileFilterOpen(false)} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 26, stiffness: 220 }} className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-slate-50 z-[60] flex flex-col shadow-2xl">
              <div className="p-5 border-b border-slate-200 bg-white flex items-center justify-between">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Filter Products</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><X size={18} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <FilterPanel />
              </div>

              <div className="p-5 border-t border-slate-200 bg-white">
                <button onClick={() => setIsMobileFilterOpen(false)} className="w-full bg-slate-900 text-white py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">
                  Show {products.length} Results
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
