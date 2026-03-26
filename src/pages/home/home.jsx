import React from "react";
import { motion } from "framer-motion";
import { useProducts, useCategories } from "../../hooks";
import { useViewport } from "../../hooks/useViewport";
import EliteHeroSlider from "../../components/home/EliteHeroSlider.jsx";
import ProductCard from "../../components/Product/ProductCard.jsx";
import AccessoriesShowcase from "../../components/home/AccessoriesShowcase.jsx";
import { ArrowRight, Sparkles, TrendingUp, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="flex flex-col md:flex-row md:justify-between md:items-end items-start mb-8 gap-6">
      <div className="max-w-xl w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-3"
        >
          <div
            className={`h-1 w-8 rounded-full ${color === "blue" ? "bg-blue-600" : "bg-orange-500"}`}
          ></div>
          <span
            className={`${color === "blue" ? "text-blue-600" : "text-orange-500"} font-bold text-[10px] uppercase tracking-[0.2em]`}
          >
            {subtitle}
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight"
        >
          {title}
        </motion.h2>
      </div>
      <Link
        to={linkTo}
        className="btn-premium-outline group min-w-[180px] md:ml-auto"
      >
        Explore All{" "}
        <ArrowRight
          size={18}
          className="group-hover:translate-x-2 transition-transform duration-500"
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
    <section className="container-custom mb-12 md:mb-16 relative">
      <div className="absolute top-[-100px] left-0 w-64 h-64 bg-blue-100/20 blur-[100px] rounded-full -z-10"></div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 px-2">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-3 block"
          >
            Elite curation
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight"
          >
            SHOP BY <span className="text-blue-600">CATEGORY</span>
          </motion.h2>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/categories"
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors mr-4"
          >
            View All
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
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 group-hover:text-blue-600 text-center transition-colors line-clamp-1">
                    {cat.name}
                  </span>
                  <div className="h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-500 mt-2"></div>
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
        <section className="mb-12 md:mb-16">
          <div className="bg-slate-900 rounded-[2rem] md:rounded-[2rem] p-8 md:p-14 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#2563eb33_0%,transparent_50%)]"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[150px] rounded-full translate-x-1/2"></div>

            <div className="container-custom relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
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
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <stat.icon
                      className="text-blue-500 mb-2 md:mb-3"
                      size={isMobile ? 24 : 28}
                    />
                    <span className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-tight mb-1">
                      {stat.value}
                    </span>
                    <span className="text-blue-400 font-semibold uppercase tracking-[0.2em] text-[10px] mb-1">
                      {stat.label}
                    </span>
                    <p className="text-slate-500 text-xs md:text-sm font-medium">
                      {stat.sub}
                    </p>
                  </motion.div>
                ))}
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
        <section className="mb-12 md:mb-16">
          <div className="bg-slate-900 rounded-[2rem] md:rounded-[2rem] relative overflow-hidden shadow-2xl h-[350px] md:h-[450px]">
            <div className="absolute inset-0 bg-dark-elite"></div>
            <img
              src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2000&auto=format&fit=crop"
              alt="Elite Promo"
              className="w-full h-full object-cover opacity-60 transition-transform duration-[15s] hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900/40 to-transparent flex items-center">
              <div className="container-custom">
                <div className="max-w-2xl space-y-6 md:space-y-10">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-3 bg-blue-600/10 backdrop-blur-xl border border-blue-500/20 text-blue-400 text-[9px] md:text-[10px] font-black px-5 md:px-6 py-2.5 md:py-3 rounded-full uppercase tracking-[0.4em]"
                  >
                    <TrendingUp size={16} /> Seasonal Milestone
                  </motion.div>
                  <h3 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                    SARTAAJ
                    <br />
                    <span className="text-blue-400">BHARAT</span>
                  </h3>
                  <p className="text-slate-400 text-sm sm:text-xl md:text-2xl font-medium max-w-md leading-relaxed line-clamp-2 md:line-clamp-none">
                    Leading the future of Indian e-commerce with premium
                    quality.
                  </p>
                  <Link
                    to="/products"
                    className="btn-premium px-8 md:px-12 py-3.5 md:py-5 text-sm md:text-lg group w-fit flex items-center gap-3"
                  >
                    Shop Collection{" "}
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-2 transition-transform duration-500"
                    />
                  </Link>
                </div>
              </div>
            </div>
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

        {/* Best Sellers Section */}
        <section className="bg-slate-950 py-12 md:py-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[150px] rounded-full translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-indigo-600/5 blur-[150px] rounded-full -translate-x-1/2"></div>

          <div className="container-custom relative z-10">
            <div className="flex flex-col items-center text-center mb-10 md:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-px w-8 bg-blue-600"></div>
                <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.5em]">
                  Global Favorites
                </span>
                <div className="h-px w-8 bg-blue-600"></div>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-white text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-none mb-8"
              >
                BEST <span className="text-blue-500">SELLERS</span>
              </motion.h2>
              <p className="text-slate-400 text-sm sm:text-lg font-medium max-w-lg mb-8 leading-relaxed">
                Our most sought-after products, loved by customers worldwide.
              </p>
              <Link
                to="/products?filter=bestsellers"
                className="btn-premium px-10 py-4 text-xs group flex items-center gap-3"
              >
                Explore Collection{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-2 transition-transform duration-500"
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
              {bestLoading
                ? [...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-3/4 bg-slate-900/50 animate-pulse rounded-[2.5rem] border border-slate-800"
                    ></div>
                  ))
                : bestData?.products?.map((product) => (
                    <motion.div
                      key={product.id || product._id}
                      variants={itemVariants}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
            </motion.div>
          </div>
        </section>

        <AccessoriesShowcase />
      </main>
    </div>
  );
};

export default Home;
