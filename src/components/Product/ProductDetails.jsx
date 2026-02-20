import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../../data/mockData";

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const foundProduct = products.find((p) => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setActiveImage(foundProduct.image);
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  const handleQuantity = (type) => {
    if (type === "dec") {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const rating = Math.round(product.rating || 5);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-600 selection:text-white">
      {/* Elite Breadcrumb / Top Strip */}
      <div className="bg-slate-50 border-b border-slate-100 py-5 md:py-6">
        <div className="container-custom flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={12} />
              Lounge
            </Link>
            <span>/</span>
            <span className="text-slate-500">
              {product.category.replace("-", " ")}
            </span>
            <span>/</span>
            <span className="text-slate-900 italic line-clamp-1">
              {product.name}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            <ShieldCheck size={14} className="text-blue-600" />
            <span>Prime Verified Artifact</span>
          </div>
        </div>
      </div>

      {/* Core Layout */}
      <main className="container-custom py-10 md:py-16">
        <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 shadow-[0_25px_80px_rgba(15,23,42,0.06)] p-6 md:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left: Gallery */}
            <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-8">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-3 md:gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24">
                <AnimatePresence initial={false}>
                  {[product.image, ...(product.images || [])].map((img, idx) => {
                    const key = `${img}-${idx}`;
                    return (
                      <motion.button
                        key={key}
                        whileHover={{ y: -4, scale: 1.03 }}
                        onClick={() => setActiveImage(img)}
                        className={`relative aspect-square rounded-2xl overflow-hidden border shrink-0 p-2 bg-white transition-all duration-300 ${
                          activeImage === img
                            ? "border-blue-600 shadow-xl shadow-blue-100"
                            : "border-slate-100 hover:border-slate-300"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} view`}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Main image */}
              <div className="flex-1">
                <motion.div
                  className="aspect-square rounded-[2.5rem] bg-slate-50 border border-slate-100 p-6 md:p-10 relative overflow-hidden flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-contain mix-blend-multiply drop-shadow-[0_35px_60px_rgba(15,23,42,0.25)]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/0 via-white/10 to-white/0 opacity-0 md:opacity-100 mix-blend-screen" />
                  <div className="absolute top-5 left-5">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/80 backdrop-blur border border-slate-100 text-[10px] font-black uppercase tracking-[0.25em] text-slate-700">
                      <Sparkles size={14} className="text-blue-600" />
                      Elite Visual
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block text-blue-600 text-[10px] font-black uppercase tracking-[0.4em]">
                  {product.category.replace("-", " ")}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-tight italic">
                  {product.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-slate-900 text-white px-3 py-1.5 rounded-full">
                      <Star className="w-4 h-4 text-blue-400 fill-blue-400" />
                      <span className="text-xs font-black">
                        {product.rating?.toFixed(1) || "5.0"}
                      </span>
                    </div>
                    <span className="text-slate-500 text-xs font-medium">
                      Elite score • {(rating / 5) * 100}% approval
                    </span>
                  </div>
                  <span className="w-px h-5 bg-slate-200" />
                  <span className="text-emerald-600 text-xs font-semibold flex items-center gap-1">
                    <ShieldCheck size={14} /> In stock • Prime dispatch
                  </span>
                </div>
              </div>

              <div className="flex items-end gap-4">
                <span className="text-4xl sm:text-5xl font-black text-blue-600 tracking-tighter">
                  ₹{product.price.toFixed(2)}
                </span>
                {product.oldPrice && (
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-300 line-through text-lg font-semibold">
                      ₹{product.oldPrice.toFixed(2)}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-[0.25em]">
                      -
                      {Math.round(
                        ((product.oldPrice - product.price) /
                          product.oldPrice) *
                          100
                      )}
                      % reserved
                    </span>
                  </div>
                )}
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                {product.description ||
                  "Engineered for those who demand both performance and presence. A balanced blend of design, power, and reliability crafted for everyday excellence."}
              </p>

              {/* Quantity + Actions */}
              <div className="border-y border-slate-100 py-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                  <div className="flex items-center bg-slate-50 rounded-2xl border border-slate-200 w-fit">
                    <button
                      onClick={() => handleQuantity("dec")}
                      className="px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-l-2xl transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-semibold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantity("inc")}
                      className="px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-r-2xl transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button className="flex-1 bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.35em] hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 active:scale-95">
                    <ShoppingCart size={18} /> Add to Lounge
                  </button>

                  <button className="p-3 rounded-2xl border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-300 transition-colors flex items-center justify-center">
                    <Heart size={20} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-2">
                    <Truck size={16} /> Free delivery over ₹999
                  </span>
                  <span className="flex items-center gap-2">
                    <Share2 size={16} /> Share elite access
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-12 md:mt-14">
            <div className="flex flex-wrap gap-4 border-b border-slate-100 pb-4 mb-8">
              {["description", "details", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-2 text-xs font-black uppercase tracking-[0.35em] transition-colors ${
                    activeTab === tab
                      ? "text-blue-600"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="text-slate-600 text-sm md:text-base leading-relaxed">
              {activeTab === "description" && (
                <p className="max-w-2xl">
                  Carefully curated to balance aesthetics, endurance, and
                  performance. From the materials to the finish, every detail is
                  tuned for a seamless daily experience that feels quietly
                  luxurious rather than loud.
                </p>
              )}

              {activeTab === "details" && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl text-sm">
                  <li>
                    <span className="font-semibold text-slate-800">
                      Brand:
                    </span>{" "}
                    {product.category === "apple" ? "Apple" : "Samsung"}
                  </li>
                  <li>
                    <span className="font-semibold text-slate-800">
                      Model:
                    </span>{" "}
                    {product.name}
                  </li>
                  <li>
                    <span className="font-semibold text-slate-800">
                      Condition:
                    </span>{" "}
                    New / Prime Grade
                  </li>
                  <li>
                    <span className="font-semibold text-slate-800">
                      Warranty:
                    </span>{" "}
                    1 Year Manufacturer + Concierge Support
                  </li>
                </ul>
              )}

              {activeTab === "reviews" && (
                <div className="p-6 md:p-8 bg-slate-50 rounded-3xl border border-dashed border-slate-200 text-center max-w-xl">
                  <p className="font-semibold text-slate-800 mb-2">
                    No public reviews yet.
                  </p>
                  <p className="text-xs text-slate-500 mb-4">
                    Be the first to validate this artifact for the community.
                  </p>
                  <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-colors">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                    Write a review
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;