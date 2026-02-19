import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles, SlidersHorizontal, Loader2, ArrowLeft } from "lucide-react";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import ProductCard from "../../components/Product/ProductCard";
import { useProducts } from "../../hooks";

const CategoryDetails = () => {
  const { categorySlug } = useParams();

  // Elite Data Fetching
  const { data, isLoading, error } = useProducts({
    category: categorySlug,
    limit: 100
  });

  const categoryName = data?.category?.name || categorySlug?.replace(/-/g, ' ');

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* <Header /> */}

      {/* Signature Category Header */}
      <div className="bg-slate-50 border-b border-slate-100 py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
              <Link to="/" className="hover:text-blue-600 transition-colors uppercase">Lounge</Link>
              <ChevronRight size={10} strokeWidth={3} />
              <span className="text-slate-900 italic uppercase">{categoryName}</span>
            </div>

            <div className="flex items-center gap-4 text-blue-600 font-black text-[10px] uppercase tracking-[0.5em] mb-8 italic">
              <Sparkles size={14} /> Curated Department
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter italic mb-8 capitalize">
              {categoryName}
            </h1>
            <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3">
              {data?.products?.length || 0} Artifacts Indexed <span className="w-12 h-[1px] bg-slate-200"></span> Lounge Standard
            </p>
          </motion.div>
        </div>
      </div>

      <main className="container-custom py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Refinement Sidebar */}
          <aside className="lg:w-64">
            <div className="sticky top-32">
              <button className="w-full flex items-center justify-between p-6 bg-slate-900 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-slate-200 italic mb-8 group hover:bg-blue-600 transition-all">
                <span className="flex items-center gap-3">
                  <SlidersHorizontal size={14} className="group-hover:rotate-180 transition-transform duration-500" /> Filter Specs
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
              </button>

              <div className="space-y-10 p-4">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Classifications</h3>
                  <div className="space-y-4">
                    {['Signature Series', 'Prototype', 'Archival', 'Limited'].map(tag => (
                      <div key={tag} className="flex items-center justify-between group cursor-pointer">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900 transition-colors">{tag}</span>
                        <div className="w-4 h-4 rounded-full border border-slate-200 group-hover:border-blue-600 transition-colors"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Artifact Matrix */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-32"
                >
                  <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-6" strokeWidth={3} />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 italic">Indexing Repository...</span>
                </motion.div>
              ) : data?.products?.length > 0 ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10"
                >
                  {data.products.map((product, idx) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (idx % 3) * 0.1 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-48 bg-slate-50/50 rounded-[3rem] border border-slate-100 border-dashed"
                >
                  <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter italic">Depository Depleted</h3>
                  <p className="text-slate-400 font-medium text-lg mb-12 max-w-sm mx-auto">No artifacts currently match this sector classification.</p>
                  <Link to="/" className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-600 shadow-2xl transition-all italic">
                    <ArrowLeft size={14} strokeWidth={3} /> Return to Lounge
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default CategoryDetails;
