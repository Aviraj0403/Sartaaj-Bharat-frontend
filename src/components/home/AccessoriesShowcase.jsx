import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Sparkles, Package } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../Product/ProductCard";
import Axios from "../../utils/Axios";

// ─── Constants ─────────────────────────────────────────────────────────────
const CATEGORY_TABS = [
  { id: "premium-cases-covers", label: "Cases & Covers" },
  { id: "chargers-cables", label: "Chargers & Cables" },
  { id: "audio-headsets", label: "Audio & Headsets" },
  { id: "stands-docks", label: "Stands & Docks" },
  { id: "screen-protectors", label: "Screen Protectors" },
];

const STALE_TIME = 10 * 60 * 1000; // 10 minutes
const GC_TIME = 15 * 60 * 1000; // 15 minutes

// ─── API helpers ───────────────────────────────────────────────────────────
const fetchSubCategoryMap = async () => {
  const res = await Axios.get("/categories/tree");
  const tree = res.data?.data || [];
  const map = {};
  for (const parent of tree) {
    for (const child of parent.children || []) {
      if (child.slug) map[child.slug] = child.id;
    }
  }
  return map;
};

const fetchProductsBySubCategoryId = async (subCategoryId) => {
  const res = await Axios.get("/products", {
    params: {
      subCategory: subCategoryId,
      limit: 4,
      sortBy: "rating",
      sortOrder: "desc",
    },
  });
  return res.data?.data || [];
};

// ─── Component ─────────────────────────────────────────────────────────────
export default function AccessoriesShowcase() {
  const [activeTab, setActiveTab] = useState(CATEGORY_TABS[0].id);
  const queryClient = useQueryClient();

  const { data: subCatMap = {} } = useQuery({
    queryKey: ["accessories-category-map"],
    queryFn: fetchSubCategoryMap,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });

  useEffect(() => {
    if (Object.keys(subCatMap).length === 0) return;

    CATEGORY_TABS.forEach(({ id }) => {
      const subCategoryId = subCatMap[id];
      if (!subCategoryId) return;

      queryClient.prefetchQuery({
        queryKey: ["accessories-tab", id],
        queryFn: () => fetchProductsBySubCategoryId(subCategoryId),
        staleTime: STALE_TIME,
        gcTime: GC_TIME,
      });
    });
  }, [subCatMap, queryClient]);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["accessories-tab", activeTab],
    queryFn: async () => {
      const subCategoryId = subCatMap[activeTab];
      if (subCategoryId) return fetchProductsBySubCategoryId(subCategoryId);
      return [];
    },
    enabled: Object.keys(subCatMap).length > 0,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });

  return (
    <section className="container-custom py-8 md:py-12 bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={12} className="text-blue-600" />
            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-widest">
              MUST-HAVE ACCESSORIES
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
            ESSENTIAL <span className="text-blue-600 italic">ACCESSORIES</span>
          </h2>

          <p className="mt-2 text-slate-500 text-sm font-medium leading-relaxed max-w-sm">
            Premium cases, audio, and chargers designed for your elite lifestyle.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center flex-wrap gap-2">
          {CATEGORY_TABS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-200 border ${
                activeTab === cat.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-slate-50 text-slate-500 border-slate-100 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 min-h-[400px] content-start">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col h-full animate-pulse">
              <div className="aspect-[4/5] bg-slate-100 rounded-xl mb-3" />
              <div className="h-4 bg-slate-100 rounded mb-2 w-2/3" />
              <div className="h-4 bg-slate-100 rounded w-1/2" />
            </div>
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <div key={product._id || product.id} className="transition-transform hover:translate-y-[-4px] duration-300">
               <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <Package size={32} className="text-slate-300 mb-4" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Stock Re-Syncing
            </span>
            <Link
              to="/products"
              className="mt-4 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              Browse All <ArrowRight size={12} />
            </Link>
          </div>
        )}
      </div>

      {/* CTA */}
      {products.length > 0 && (
        <div className="mt-10 flex justify-center">
          <Link
            to="/category/accessories"
            className="flex items-center gap-3 px-10 py-3 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg"
          >
            Explore All Accessories
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </section>
  );
}
