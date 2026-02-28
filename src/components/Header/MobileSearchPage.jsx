import React, { useState, useEffect, useRef } from "react";
import { Search, X, Clock, TrendingUp, Sparkles, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMenuCategories, getSearchSuggestions } from "../../services/categoryApi";

export default function MobileSearchPage() {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const trendingKeywords = [
    "Shoes Craze Sale",
    "Perfumes for Women",
    "Trending Fashion",
    "New Arrivals",
    "Hot Deals"
  ];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Fetch categories
  const { data: menuItems, isLoading: isCategoriesLoading, isError: isCategoriesError } = useQuery({
    queryKey: ["categories"],
    queryFn: getMenuCategories,
    onError: (err) => console.error("Error fetching categories:", err),
  });

  // Fetch search suggestions
  const { data: suggestions, isLoading, isError } = useQuery({
    queryKey: ['searchSuggestions', query],
    queryFn: () => getSearchSuggestions(query),
    enabled: query.length > 1,
    onError: (err) => console.error("Error fetching search suggestions:", err),
  });

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);

    // Add to recent searches
    if (searchTerm && !recentSearches.includes(searchTerm)) {
      const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const handleProductClick = (slug) => {
    if (query && !recentSearches.includes(query)) {
      const updated = [query, ...recentSearches].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
    navigate(`/product/${slug}`);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 mt-[65px] sm:mt-0">

      {/* 🎨 Sticky Search Header with Glass Effect */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100 shadow-sm">
        <div className="px-8 py-8 md:py-12">
          <div className="flex gap-6 items-center">
            <div className="flex-1 relative">
              <div className="flex items-center bg-slate-50 rounded-[2rem] px-8 py-4 shadow-inner border border-slate-100 transition-all focus-within:ring-2 focus-within:ring-blue-600 focus-within:bg-white focus-within:shadow-2xl">
                <Search size={22} className="text-slate-400" strokeWidth={3} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="AUTHORIZE SEARCH..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent ml-4 outline-none text-slate-900 w-full text-xs font-black uppercase tracking-[0.2em] italic placeholder-slate-300"
                />
                {query.length > 0 && (
                  <button
                    onClick={() => setQuery("")}
                    className="ml-2 w-8 h-8 flex items-center justify-center hover:bg-slate-200 rounded-full transition-colors"
                  >
                    <X size={18} className="text-slate-500" strokeWidth={3} />
                  </button>
                )}
              </div>
            </div>

            {query.length > 0 && (
              <button
                onClick={() => setQuery("")}
                className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] italic px-4"
              >
                ABORT
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pb-20">
        {/* 🔎 Search Results - Show when query exists */}
        {query.length > 1 && (
          <div className="mt-6">
            {isLoading && (
              <div className="flex justify-center items-center py-32">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
                  <ShoppingBag className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600" size={28} strokeWidth={2.5} />
                </div>
              </div>
            )}

            {isError && (
              <div className="text-center py-16 px-4">
                <div className="inline-block p-4 bg-red-50 rounded-2xl mb-4">
                  <X size={48} className="text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
                <p className="text-gray-600 text-sm">Error fetching results. Please try again.</p>
              </div>
            )}

            {!isLoading && !isError && suggestions?.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-8 px-2">
                  <h2 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">
                    Found {suggestions.length} <span className="text-blue-600">Artifacts</span>
                  </h2>
                  <Sparkles size={24} className="text-blue-600" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {suggestions.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => handleProductClick(item.slug)}
                      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden bg-slate-100">
                        <img
                          src={item.pimages?.[0] || '/placeholder.jpg'}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => e.target.src = '/placeholder.jpg'}
                        />
                        {item.discount && (
                          <div className="absolute top-4 right-4 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg italic">
                            -{item.discount}%
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="p-6">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight italic line-clamp-2 mb-4 leading-relaxed">
                          {item.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl font-black text-blue-600 italic tracking-tighter">
                              ₹{item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-[10px] text-slate-300 line-through ml-3 font-bold">
                                ₹{item.originalPrice}
                              </span>
                            )}
                          </div>
                          <button className="text-slate-400 group-hover:text-blue-600 transition-colors">
                            <TrendingUp size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!isLoading && !isError && suggestions?.length === 0 && (
              <div className="text-center py-16 px-4">
                <div className="inline-block p-6 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full mb-4">
                  <Search size={48} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 text-sm mb-6">Try different keywords or browse categories</p>
              </div>
            )}
          </div>
        )}

        {/* 🏠 Default View - Show when no query */}
        {query.length === 0 && (
          <div className="mt-6 space-y-8">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6 px-2">
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-slate-400" />
                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] italic">
                      Recent Logs
                    </h3>
                  </div>
                  <button
                    onClick={handleClearRecent}
                    className="text-[9px] text-slate-400 font-black uppercase tracking-widest hover:text-red-500 transition-colors"
                  >
                    Purge All
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {recentSearches.map((search, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearch(search)}
                      className="px-6 py-3 bg-white rounded-[1.5rem] text-[10px] text-slate-600 font-black uppercase tracking-widest italic shadow-sm border border-slate-100 hover:border-blue-600 hover:shadow-xl transition-all"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Keywords */}
            <div>
              <div className="flex items-center gap-3 mb-6 px-2">
                <TrendingUp size={20} className="text-blue-600" />
                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] italic">
                  Critical Trends
                </h3>
              </div>
              <div className="space-y-4">
                {trendingKeywords.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => handleSearch(item)}
                    className="flex items-center gap-5 px-6 py-5 bg-white rounded-[2rem] text-slate-900 border border-slate-100 cursor-pointer hover:border-blue-600 hover:shadow-2xl transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      <Search size={18} strokeWidth={3} />
                    </div>
                    <span className="flex-1 font-black text-xs uppercase tracking-widest italic">{item}</span>
                    <span className="text-xs text-blue-600 font-black animate-pulse opacity-0 group-hover:opacity-100 transition-opacity">ACTIVE</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 🛒 Original CategorySlider */}
            <div className="mt-12 pt-12 border-t border-slate-100">
              <h2 className="text-3xl font-black text-slate-900 mb-8 italic uppercase tracking-tighter px-2">Sector <span className="text-blue-600 underline decoration-4 underline-offset-8">Browsing</span></h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {isCategoriesLoading && (
                  <p className="w-full text-center text-pink-600 col-span-full">Loading categories...</p>
                )}
                {isCategoriesError && (
                  <div className="w-full text-center text-red-600 col-span-full">
                    Error fetching categories. Please try again later.
                  </div>
                )}
                {!isCategoriesLoading && !isCategoriesError && menuItems?.map((cat) => (
                  <div
                    key={cat._id}
                    onClick={() => navigate(`/${cat.slug}`)}
                    className="flex flex-col items-center justify-center cursor-pointer group relative"
                  >
                    <div className="rounded-lg overflow-hidden shadow-md border border-gray-100">
                      <img
                        src={cat.image[0]}
                        alt={cat.name}
                        className="w-full h-[150px] sm:h-[180px] object-cover"
                      />
                    </div>
                    <h3 className="text-center mt-3 font-semibold text-gray-700 text-sm sm:text-base">
                      {cat.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}