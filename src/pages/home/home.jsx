import React from "react";
import { motion } from "framer-motion";
import { useProducts, useCategories } from "../../hooks";
import { useViewport } from "../../hooks/useViewport";
import EliteHeroSlider from "../../components/home/EliteHeroSlider.jsx";
import ProductCard from "../../components/Product/ProductCard.jsx";
import BestsellerSection from "./BestsellerSection.jsx";
import AccessoriesShowcase from "../../components/home/AccessoriesShowcase.jsx";
import { ArrowRight, Sparkles, TrendingUp, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import {   Headphones, Award, Shield, Truck, Clock } from "lucide-react";
import { Star } from "lucide-react";

// Stable Query Parameters to prevent re-renders triggering new keys
const LATEST_PARAMS = { limit: 4 };
const FEATURED_PARAMS = { limit: 4, isFeatured: "true" };
const BESTSELLER_PARAMS = { limit: 4, isBestseller: "true" };

// Animation Variants - Faster & Snappier
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const ProductSection = ({
  title,
  subtitle,
  products,
  loading,
  linkTo,
  color = "blue",
}) => (
  <section className="container-custom mb-24 md:mb-32">
    <div className="flex items-end justify-between mb-8 md:mb-10 gap-4">
      <div className="max-w-[70%] md:max-w-xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-3"
        >
          <div
            className={`h-0.5 w-8 rounded-full ${color === "blue" ? "bg-blue-600" : "bg-orange-500"}`}
          ></div>
          <span
            className={`${color === "blue" ? "text-blue-600" : "text-orange-500"} font-black text-[9px] uppercase tracking-[0.3em] italic`}
          >
            {subtitle}
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none italic uppercase"
        >
          {title}
        </motion.h2>
      </div>
      <Link
        to={linkTo}
        className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-all italic whitespace-nowrap pb-1"
      >
        EXPLORE
        <ArrowRight
          size={14}
          className="group-hover:translate-x-1 transition-transform"
        />
      </Link>
    </div>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-10"
    >
      {loading
        ? [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] bg-slate-200/50 animate-pulse rounded-[2rem]"
            ></div>
          ))
        : products?.map((product) => (
            <motion.div key={product.id || product._id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
    </motion.div>
  </section>
);

const DepartmentScroll = ({ categories, loading }) => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="container-custom mb-24 md:mb-32 relative">
      <div className="flex items-end justify-between mb-8 px-2 gap-4">
        <div className="max-w-[75%] md:max-w-xl">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-blue-600 font-black text-[9px] uppercase tracking-[0.4em] mb-2 block italic"
          >
            ELITE_CURATION
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none italic uppercase"
          >
            SHOP BY <span className="text-blue-600">CATEGORY</span>
          </motion.h2>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/categories"
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-all italic whitespace-nowrap"
          >
            VIEW_ALL
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all active:scale-95 shadow-sm"
            >
              <ArrowRight className="rotate-180" size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all active:scale-95 shadow-sm"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar gap-6 sm:gap-10 px-2 pb-8 scroll-smooth"
      >
        {loading
          ? [...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-32 h-32 md:w-44 bg-slate-100 animate-pulse rounded-full"
              ></div>
            ))
          : categories?.map((cat, idx) => (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03, duration: 0.3 }}
                className="flex-shrink-0 group"
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className="flex flex-col items-center w-28 md:w-36"
                >
                  <div className="w-full aspect-square rounded-full bg-white border border-slate-100 p-6 flex items-center justify-center mb-4 group-hover:border-blue-600 group-hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                    <img
                      src={
                        (Array.isArray(cat.image) ? cat.image[0] : cat.image) ||
                        "https://via.placeholder.com/300?text=Category"
                      }
                      alt={cat.name}
                      className="w-[85%] h-[85%] object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="w-[140%] -ml-[20%] text-center">
                    <span className="block text-[10px] font-black uppercase tracking-[0.1em] text-slate-800 group-hover:text-blue-600 transition-colors italic">
                      {cat.name}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
      </div>
    </section>
  );
};

const Home = () => {
  const { isMobile } = useViewport();

  const { data: latestData, isLoading: latestLoading } = useProducts(LATEST_PARAMS);
  const { data: featuredData, isLoading: featuredLoading } = useProducts(FEATURED_PARAMS);
  const { data: categories, isLoading: catsLoading } = useCategories();

  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-blue-600 selection:text-white">
      <main className="flex-1 pb-16 md:pb-24 overflow-hidden">
        <EliteHeroSlider />

        <div className="mt-8 md:mt-16">
          <DepartmentScroll categories={categories} loading={catsLoading} />
        </div>

        {/* Global Stats Strip - Performance Optimized */}
      <section className="mb-24 md:mb-32 px-4 sm:px-10">
  <div className="bg-[#050b18] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative">
    <div className="relative z-10 py-12 md:py-20 px-8 md:px-16">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {[
            { label: "GLOBAL_REACH", value: "45+", sub: "Distribution", icon: Globe },
            { label: "MARKET_TRUST", value: "99.9%", sub: "Users", icon: Sparkles },
            { label: "ELITE_SPEED", value: "24h", sub: "Dispatch", icon: Zap },
            { label: "PREMIUM_CARE", value: "24/7", sub: "Priority", icon: Headphones },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5 mb-4">
                <stat.icon className="text-blue-500" size={20} />
              </div>
              <span className="text-2xl md:text-4xl font-black text-white tracking-tighter italic">
                {stat.value}
              </span>
              <span className="text-blue-400 font-bold uppercase tracking-[0.4em] text-[8px] mt-1">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

        <ProductSection
          title="NEW ARRIVALS"
          subtitle="FRESH_DROPS"
          products={latestData?.products}
          loading={latestLoading}
          linkTo="/products"
        />

        {/* Cinematic Promo Banner - Optimized */}
     <section className="mb-24 md:mb-32 px-4 sm:px-10">
  <div className="bg-slate-950 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden shadow-2xl h-[400px] md:h-[550px] group">
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2000&auto=format&fit=crop"
        alt="Elite Promo"
        className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
    </div>
    
    <div className="absolute inset-0 flex items-center px-8 md:px-20 lg:px-24">
      <div className="max-w-3xl space-y-4 md:space-y-8">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="bg-blue-600/10 backdrop-blur-md border border-blue-500/20 text-blue-400 text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-[0.3em] italic w-fit"
        >
          SEASONAL_MILESTONE_2026
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[1] tracking-tighter italic uppercase"
        >
          SARTAAJ
          <br />
          <span className="text-blue-600">BHARAT.</span>
        </motion.h3>

        <motion.p
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="text-slate-400 text-sm md:text-lg font-medium max-w-lg leading-relaxed italic uppercase tracking-wider"
        >
          Defining the future of technology with precision engineering.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <Link
            to="/products"
            className="group px-8 py-4 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lg hover:bg-white hover:text-slate-950 transition-all duration-300 italic flex items-center gap-3 w-fit"
          >
            INITIATE_SHOP
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  </div>
</section>

        <ProductSection
          title="FEATURED SELECTION"
          subtitle="ELITE_UNITS"
          products={featuredData?.products}
          loading={featuredLoading}
          linkTo="/products?filter=featured"
          color="orange"
        />

        <BestsellerSection />

        <AccessoriesShowcase />
      </main>
    </div>
  );
};

export default Home;
