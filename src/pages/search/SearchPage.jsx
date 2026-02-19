import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, SlidersHorizontal, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import ProductCard from "../../components/Product/ProductCard";
import { useProducts } from "../../hooks";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    // Fetch products based on search query
    const { data, isLoading } = useProducts({
        search: query,
        limit: 20
    });

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* <Header /> */}

            {/* Elite Search Header */}
            <div className="bg-slate-50 border-b border-slate-100 py-16 md:py-24">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-4 text-blue-600 font-black text-[10px] uppercase tracking-[0.5em] mb-8 italic">
                            <Sparkles size={14} /> Repository Scan
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter italic mb-8">
                            Results for: <span className="text-blue-600 underline underline-offset-[12px] decoration-4">"{query}"</span>
                        </h1>
                        <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3">
                            {data?.products?.length || 0} Artifacts Indexed <span className="w-12 h-[1px] bg-slate-200"></span> Lounge Standard
                        </p>
                    </motion.div>
                </div>
            </div>

            <main className="container-custom py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Minimal Sidebar / Filter Toggle */}
                    <aside className="lg:w-64 space-y-12">
                        <div className="sticky top-32">
                            <button className="w-full flex items-center justify-between p-6 bg-slate-900 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-slate-200 italic mb-8 group hover:bg-blue-600 transition-all">
                                <span className="flex items-center gap-3">
                                    <SlidersHorizontal size={14} className="group-hover:rotate-180 transition-transform duration-500" /> Refine Intel
                                </span>
                                <Check size={14} className="text-blue-400" />
                            </button>

                            <div className="space-y-10 p-4">
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Conditions</h3>
                                    <div className="space-y-4">
                                        {['Signature', 'Hot Acquisition', 'Elite Stock', 'Curated'].map(tag => (
                                            <label key={tag} className="flex items-center gap-3 cursor-pointer group">
                                                <div className="w-5 h-5 rounded-md border-2 border-slate-100 flex items-center justify-center group-hover:border-blue-400 transition-colors">
                                                    <div className="w-2 h-2 rounded-sm bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900 transition-colors">{tag}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Results Grid */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center py-32"
                                >
                                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-6" strokeWidth={3} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 italic">Decrypting Database...</span>
                                </motion.div>
                            ) : data?.products?.length > 0 ? (
                                <motion.div
                                    key="grid"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
                                >
                                    {data.products.map((product, idx) => (
                                        <motion.div
                                            key={product._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
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
                                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl border border-slate-100">
                                        <Search size={32} className="text-slate-200" strokeWidth={3} />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter italic">Void Encountered</h3>
                                    <p className="text-slate-400 font-medium text-lg mb-12 max-w-sm mx-auto">None of our indexed artifacts match the requested intel signature: <span className="text-slate-900 font-black italic">"{query}"</span></p>
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

export default SearchPage;
