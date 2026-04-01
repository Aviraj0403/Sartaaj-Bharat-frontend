import React from "react";
import { motion } from "framer-motion";
import { useProducts, useCategories } from "../../hooks";
import { useViewport } from "../../hooks/useViewport";
import EliteHeroSlider from "../../components/home/EliteHeroSlider.jsx";
import ProductCard from "../../components/Product/ProductCard.jsx";
import AccessoriesShowcase from "../../components/home/AccessoriesShowcase.jsx";
import { ArrowRight, Sparkles, TrendingUp, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import {   Headphones, Award, Shield, Truck, Clock } from "lucide-react";
import { Star } from "lucide-react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
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
  <section className="container-custom mb-10 md:mb-14">
    <div className="flex items-end justify-between mb-6 md:mb-8 gap-4">
      <div className="max-w-[70%] md:max-w-xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-2 md:mb-3"
        >
          <div
            className={`h-0.5 sm:h-1 w-6 sm:w-8 rounded-full ${color === "blue" ? "bg-blue-600" : "bg-orange-500"}`}
          ></div>
          <span
            className={`${color === "blue" ? "text-blue-600" : "text-orange-500"} font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em]`}
          >
            {subtitle}
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none"
        >
          {title}
        </motion.h2>
      </div>
      <Link
        to={linkTo}
        className="group flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors whitespace-nowrap pb-0.5 sm:pb-1"
      >
        Explore All
        <ArrowRight
          size={14}
          className="group-hover:translate-x-1 transition-transform duration-300"
        />
      </Link>
    </div>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-10"
    >
      {loading
        ? [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="aspect-3/4 bg-slate-200/50 animate-pulse rounded-[2.5rem] border border-slate-100"
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
    <section className="container-custom mb-10 md:mb-16 relative">
      <div className="hidden md:block absolute top-[-100px] left-0 w-64 h-64 bg-blue-100/20 blur-[100px] rounded-full -z-10"></div>

      <div className="flex items-end justify-between mb-6 px-2 gap-4">
        <div className="max-w-[70%]">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.3em] mb-2 block"
          >
            Elite curation
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl md:text-4xl font-black text-slate-900 tracking-tighter leading-none"
          >
            SHOP BY <span className="text-blue-600">CATEGORY</span>
          </motion.h2>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/categories"
            className="group flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors whitespace-nowrap pb-0.5"
          >
            View All
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-95 shadow-lg shadow-black/5"
            >
              <ArrowRight className="rotate-180" size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-95 shadow-lg shadow-black/5"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar gap-4 sm:gap-8 px-2 pb-8 scroll-smooth"
      >
        {loading
          ? [...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-32 h-32 md:w-44 md:h-44 bg-slate-100 animate-pulse rounded-full"
              ></div>
            ))
          : categories?.map((cat, idx) => (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex-shrink-0 group"
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className="flex flex-col items-center w-24 md:w-32"
                >
                  <div className="w-full aspect-square rounded-full bg-white border-2 border-slate-100 p-4 flex items-center justify-center mb-3 group-hover:border-blue-600 group-hover:shadow-[0_20px_40px_rgba(37,99,235,0.15)] transition-all duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img
                      src={
                        cat.image ||
                        "https://prestashop.codezeel.com/PRS23/PRS230560/default/img/c/1-category_default.jpg"
                      }
                      alt={cat.name}
                      className="w-full h-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="w-[140%] -ml-[20%]">
                    <span className="block text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] text-slate-800 group-hover:text-blue-600 text-center transition-colors truncate px-1">
                      {cat.name}
                    </span>
                  </div>
                  <div className="h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-500 mt-1 sm:mt-2"></div>
                </Link>
              </motion.div>
            ))}
      </div>
    </section>
  );
};

const Home = () => {
  const { isMobile } = useViewport();

  // All 4 queries fire in parallel — React Query deduplicates identical query keys
  // across the entire app. After 10 min staleTime, cached data is served instantly.
  const { data: latestData, isLoading: latestLoading } = useProducts({
    limit: 4,
  });
  const { data: featuredData, isLoading: featuredLoading } = useProducts({
    limit: 4,
    isFeatured: "true",
  });
  const { data: bestData, isLoading: bestLoading } = useProducts({
    limit: 4,
    isBestseller: "true",
  });
  const { data: categories, isLoading: catsLoading } = useCategories();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-blue-600 selection:text-white">
      <main className="flex-1 pb-8 md:pb-12 overflow-hidden">
        <EliteHeroSlider />

        <div className="mt-4 md:mt-8">
          <DepartmentScroll categories={categories} loading={catsLoading} />
        </div>

        {/* Global Stats Strip - Full Width */}
      <section className="mb-12 md:mb-16 px-4 sm:px-6 md:px-8">
  <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 rounded-2xl sm:rounded-3xl md:rounded-[2rem] overflow-hidden shadow-2xl border border-slate-800/50">
    {/* Decorative Elements */}
    <div className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#2563eb20_0%,transparent_70%)]"></div>
      <div className="hidden md:block absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="hidden md:block absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
      
      {/* Content */}
      <div className="relative z-10 py-10 sm:py-12 md:py-10 lg:py-10 px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 text-center">
            {[
              {
                label: "Global Reach",
                value: "45+",
                sub: "Countries Served",
                icon: Globe,
              },
              {
                label: "Market Trust",
                value: "99.9%",
                sub: "Customer Satisfaction",
                icon: Sparkles,
              },
              {
                label: "Elite Speed",
                value: "24h",
                sub: "Average Dispatch",
                icon: Zap,
              },
              {
                label: "Premium Support",
                value: "24/7",
                sub: "Concierge Service",
                icon: Headphones,
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative flex flex-col items-center p-3 sm:p-4 md:p-5 rounded-2xl transition-all duration-300"
              >
                {/* Hover Background */}
                <div className="hidden md:block absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                
                {/* Icon Container - White Icon */}
                <div className="relative mb-2 sm:mb-3 md:mb-4">
                  <div className="hidden md:block absolute inset-0 bg-blue-600/20 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-slate-800/80 p-2 sm:p-2.5 md:p-3 rounded-full border border-slate-700 group-hover:border-blue-500/50 transition-all duration-300">
                    <stat.icon
                      className="text-white"
                      size={20}
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                {/* Value */}
                <motion.span 
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tighter mb-1 sm:mb-1.5 md:mb-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {stat.value}
                </motion.span>
                
                {/* Label */}
                <span className="text-blue-400 font-black uppercase tracking-[0.2em] text-[8px] sm:text-[9px] md:text-[10px] mb-0.5 sm:mb-1">
                  {stat.label}
                </span>
                
                {/* Description */}
                <p className="text-slate-400 text-[8px] sm:text-[9px] md:text-[10px] font-medium">
                  {stat.sub}
                </p>

                {/* Decorative Line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        <ProductSection
          title="NEW ARRIVALS"
          subtitle="FRESHLY DROPPED"
          products={latestData?.products}
          loading={latestLoading}
          linkTo="/products"
        />

        {/* Cinematic Promo Banner */}
     <section className="mb-12 md:mb-16 px-4 sm:px-6 md:px-8">
  <div className="bg-slate-900 rounded-2xl sm:rounded-3xl md:rounded-[2rem] relative overflow-hidden shadow-2xl h-[380px] sm:h-[420px] md:h-[440px] lg:h-[460px] group">
    {/* Background Image with Parallax Effect */}
    <div className="absolute inset-0 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2000&auto=format&fit=crop"
        alt="Elite Promo"
        className="w-full h-full object-cover transition-all duration-[15s] group-hover:scale-110 opacity-60"
      />
    </div>
    
    {/* Gradient Overlays */}
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent"></div>
    
    {/* Content Container */}
    <div className="absolute inset-0 flex items-center">
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-2xl space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 sm:gap-3 bg-blue-600/20 backdrop-blur-xl border border-blue-500/30 text-blue-400 text-[9px] sm:text-[10px] md:text-[11px] font-black px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full uppercase tracking-[0.3em] w-fit"
          >
            <TrendingUp size={12} className="sm:w-3 sm:h-3 md:w-4 md:h-4" />
            <span>Seasonal Milestone 2026</span>
          </motion.div>

          {/* Main Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-black text-white leading-[1.1] sm:leading-[1.1] md:leading-[1.05] tracking-tighter"
          >
            SARTAAJ
            <br />
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text">
              BHARAT
            </span>
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-300 text-sm sm:text-base md:text-lg lg:text-lg font-medium max-w-md leading-relaxed"
          >
            Leading the future of Indian e-commerce with premium quality and unparalleled excellence.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 sm:gap-3 bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-7 md:px-9 py-2 sm:py-2.5 md:py-3 rounded-full font-bold text-sm sm:text-base md:text-base transition-all duration-300 shadow-lg hover:shadow-blue-600/30 hover:scale-105 active:scale-95"
            >
              <span>Shop Collection</span>
              <ArrowRight
                size={16}
                className="sm:w-4 sm:h-4 md:w-4 md:h-4 group-hover:translate-x-2 transition-transform duration-300"
              />
            </Link>
          </motion.div>

          {/* Optional: Stats Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="hidden sm:flex items-center gap-4 pt-1"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] text-slate-400 uppercase tracking-wider">Live Inventory</span>
            </div>
            <div className="w-px h-3 bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <Star size={10} className="text-yellow-500 fill-yellow-500" />
              <span className="text-[9px] text-slate-400 uppercase tracking-wider">4.9/5 Rating</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>

    {/* Decorative Elements */}
    <div className="hidden md:block absolute bottom-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
    <div className="hidden md:block absolute top-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
  </div>
</section>

        <ProductSection
          title="FEATURED SELECTION"
          subtitle="EXCLUSIVELY FOR YOU"
          products={featuredData?.products}
          loading={featuredLoading}
          linkTo="/products?filter=featured"
          color="orange"
        />

        <ProductSection
          title="BEST SELLERS"
          subtitle="GLOBAL FAVORITES"
          products={bestData?.products}
          loading={bestLoading}
          linkTo="/products?filter=bestsellers"
        />

        <AccessoriesShowcase />
      </main>
    </div>
  );
};

export default Home;
