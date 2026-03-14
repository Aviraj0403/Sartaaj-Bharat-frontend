/**
 * Accessories Showcase — Production-Optimized
 * Strategy: Fetch the category tree ONCE, extract all sub-category IDs,
 * then prefetch ALL 5 tab product sets in PARALLEL on mount.
 * Subsequent tab switches are instant (served from React Query cache).
 */
import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Package } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../Product/ProductCard";
import Axios from "../../utils/Axios";

// ─── Constants ─────────────────────────────────────────────────────────────
const CATEGORY_TABS = [
  { id: "premium-cases-covers", label: "Cases & Covers" },
  { id: "chargers-cables",       label: "Chargers & Cables" },
  { id: "audio-headsets",        label: "Audio & Headsets" },
  { id: "stands-docks",          label: "Stands & Docks" },
  { id: "screen-protectors",     label: "Screen Protectors" },
];

const STALE_TIME = 10 * 60 * 1000; // 10 minutes
const GC_TIME    = 15 * 60 * 1000; // 15 minutes

// ─── API helpers ───────────────────────────────────────────────────────────

/** Fetch and cache the category tree. Returns a slug→id map. */
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

/** Fetch products for a single subcategory ID (4 max, sorted by rating). */
const fetchProductsBySubCategoryId = async (subCategoryId) => {
  const res = await Axios.get("/products", {
    params: { subCategory: subCategoryId, limit: 4, sortBy: "rating", sortOrder: "desc" },
  });
  return res.data?.data || [];
};

// ─── Component ─────────────────────────────────────────────────────────────
export default function AccessoriesShowcase() {
  const [activeTab, setActiveTab] = useState(CATEGORY_TABS[0].id);
  const queryClient = useQueryClient();

  // Step 1: Fetch the category tree ONCE, build a slug→id map
  const { data: subCatMap = {} } = useQuery({
    queryKey: ["accessories-category-map"],
    queryFn: fetchSubCategoryMap,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });

  // Step 2: Prefetch ALL 5 tabs in parallel as soon as we have the map
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

  // Step 3: Active tab products — almost always served from cache after prefetch
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

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section className="container-custom py-12 md:py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-3"
          >
            <div className="h-1 w-8 rounded-full bg-blue-600" />
            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-1.5">
              <Sparkles size={10} />
              Must-Have Accessories
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight"
          >
            Add the <span className="text-blue-600 font-black italic">final touch</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-slate-400 text-xs md:text-sm font-medium leading-relaxed max-w-sm"
          >
            Add finishing touches with cases, audio, and chargers designed to match your elite collection.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex items-center flex-wrap gap-2">
          {CATEGORY_TABS.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              whileTap={{ scale: 0.95 }}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                activeTab === cat.id
                  ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20"
                  : "bg-white text-slate-400 border-slate-200 hover:border-blue-500 hover:text-blue-600"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Product Grid — same ProductCard as the rest of the site */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-10"
        >
          {isLoading ? (
            // Skeleton — matches ProductCard aspect ratio
            [...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col h-full">
                <div className="aspect-square bg-slate-100 animate-pulse rounded-[1.5rem] border border-slate-50 mb-3" />
                <div className="h-3 bg-slate-100 animate-pulse rounded mb-2 w-2/3" />
                <div className="h-3 bg-slate-100 animate-pulse rounded w-1/2" />
              </div>
            ))
          ) : products.length > 0 ? (
            products.map((product) => (
              <motion.div
                key={product._id || product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Reusing the exact same ProductCard from the rest of the site */}
                <ProductCard product={product} imageFit="cover" />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-slate-100">
                <Package size={22} className="text-slate-200" />
              </div>
              <span className="text-[10px] font-black mt-1 text-slate-400 uppercase tracking-widest italic">
                Coming Soon
              </span>
              <Link
                to="/products"
                className="mt-4 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 flex items-center gap-2 transition-colors"
              >
                Browse All Products <ArrowRight size={12} />
              </Link>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* CTA */}
      {products.length > 0 && (
        <div className="mt-10 flex justify-center">
          <Link
            to="/category/accessories"
            className="btn-premium-outline group flex items-center gap-3 px-10 py-4 text-[10px]"
          >
            Explore All Accessories
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
        </div>
      )}
    </section>
  );
}
