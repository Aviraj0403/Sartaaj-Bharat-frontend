import React from 'react';
import { motion } from 'framer-motion';
import { useProducts, useCategories } from '../../hooks';
import { useViewport } from '../../hooks/useViewport';
import EliteHeroSlider from '../../components/home/EliteHeroSlider.jsx';
import ProductCard from '../../components/Product/ProductCard.jsx';
import { ArrowRight, LayoutGrid, Sparkles, TrendingUp, Zap, Globe } from 'lucide-react';
import { Link } from "react-router-dom";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const ProductSection = ({ title, subtitle, products, loading, linkTo, color = "blue" }) => (
  <section className="container-custom mb-24 md:mb-32">
    <div className="flex flex-col md:flex-row md:justify-between md:items-end items-start mb-12 gap-6">
      <div className="max-w-xl w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-4"
        >
          <div className={`h-1 w-12 rounded-full ${color === 'blue' ? 'bg-blue-600' : 'bg-orange-500'}`}></div>
          <span className={`${color === 'blue' ? 'text-blue-600' : 'text-orange-500'} font-black text-[10px] uppercase tracking-[0.4em]`}>
            {subtitle}
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 tracking-tighter italic leading-tight"
        >
          {title}
        </motion.h2>
      </div>
      <Link to={linkTo} className="btn-premium-outline group min-w-[180px] md:ml-auto">
        Explore All <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
      </Link>
    </div>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
    >
      {loading ? (
        [...Array(4)].map((_, i) => (
          <div key={i} className="aspect-3/4 bg-slate-200/50 animate-pulse rounded-[2.5rem] border border-slate-100"></div>
        ))
      ) : (
        products?.map(product => (
          <motion.div key={product.id || product._id} variants={itemVariants}>
            <ProductCard product={product} />
          </motion.div>
        ))
      )}
    </motion.div>
  </section>
);

const CategorySection = ({ categories, loading }) => (
  <section className="container-custom mb-32 relative">
    <div className="absolute top-[-100px] left-0 w-64 h-64 bg-blue-100/30 blur-[100px] rounded-full -z-10"></div>
    <div className="flex flex-col items-center text-center mb-16">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-blue-600 font-black text-xs uppercase tracking-[0.5em] mb-4"
      >
        Elite curation
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl md:text-7xl font-black text-slate-900 tracking-tighter italic mb-8"
      >
        SHOP BY <span className="text-blue-600">UNIVERSE</span>
      </motion.h2>
      <Link to="/categories" className="btn-premium-outline group">
        All Departments <LayoutGrid size={18} className="group-hover:rotate-90 transition-transform duration-500" />
      </Link>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 px-2">
      {loading ? (
        [...Array(8)].map((_, i) => (
          <div key={i} className="aspect-square bg-slate-100 animate-pulse rounded-3xl"></div>
        ))
      ) : (
        categories?.slice(0, 8).map((cat, idx) => (
          <motion.div
            key={cat._id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.5 }}
            whileHover={{ y: -10, scale: 1.05 }}
            className="group"
          >
            <Link to={`/category/${cat.slug}`} className="flex flex-col items-center">
              <div className="w-full aspect-square glass-surface rounded-[2.5rem] p-6 flex items-center justify-center mb-4 group-hover:shadow-[0_20px_40px_rgba(37,99,235,0.15)] group-hover:border-blue-200 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={cat.image || 'https://prestashop.codezeel.com/PRS23/PRS230560/default/img/c/1-category_default.jpg'}
                  alt={cat.name}
                  className="w-full h-full object-contain mix-blend-multiply relative z-10 transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600 group-hover:text-blue-600 text-center transition-colors">
                {cat.name}
              </span>
            </Link>
          </motion.div>
        ))
      )}
    </div>
  </section>
);

const Home = () => {
  const { isMobile } = useViewport();
  // Pro-level data fetching with React Query
  const { data: latestData, isLoading: latestLoading } = useProducts({ limit: 4 });
  const { data: featuredData, isLoading: featuredLoading } = useProducts({ limit: 4, isFeatured: 'true' });
  const { data: bestData, isLoading: bestLoading } = useProducts({ limit: 4, isBestSeller: 'true' });
  const { data: categories, isLoading: catsLoading } = useCategories();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-blue-600 selection:text-white">
      <main className="flex-1 pb-8 md:pb-12 overflow-hidden">
        <EliteHeroSlider />

        <CategorySection categories={categories} loading={catsLoading} />

        {/* Global Stats Strip */}
        <section className="container-custom mb-24 md:mb-32">
          <div className="bg-slate-900 rounded-[3rem] md:rounded-[5rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#2563eb33_0%,transparent_50%)]"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 text-center">
              {[
                { label: 'Global Reach', value: '45+', sub: 'Countries Served', icon: Globe },
                { label: 'Market Trust', value: '99.9%', sub: 'Customer Satisfaction', icon: Sparkles },
                { label: 'Elite Speed', value: '24h', sub: 'Average Dispatch', icon: Zap }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <stat.icon className="text-blue-500 mb-4 md:mb-6" size={isMobile ? 32 : 40} />
                  <span className="text-4xl sm:text-5xl md:text-7xl font-black text-white italic tracking-tighter mb-2">{stat.value}</span>
                  <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-1">{stat.label}</span>
                  <p className="text-slate-500 text-xs md:text-sm font-medium">{stat.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ProductSection
          title="THE NEW NEXUS"
          subtitle="Just Landed"
          products={latestData?.products}
          loading={latestLoading}
          linkTo="/products"
        />

        {/* Cinematic Promo Banner */}
        <section className="container-custom mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative rounded-[2.5rem] md:rounded-[5rem] overflow-hidden h-[450px] md:h-[600px] shadow-3xl bg-slate-900"
          >
            <div className="absolute inset-0 bg-dark-elite"></div>
            <img
              src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2000&auto=format&fit=crop"
              alt="Elite Promo"
              className="w-full h-full object-cover opacity-60 transition-transform duration-[15s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900/40 to-transparent flex items-center p-8 md:p-32">
              <div className="max-w-2xl space-y-6 md:space-y-10">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-3 bg-blue-600/10 backdrop-blur-xl border border-blue-500/20 text-blue-400 text-[9px] md:text-[10px] font-black px-5 md:px-6 py-2.5 md:py-3 rounded-full uppercase tracking-[0.4em]"
                >
                  <TrendingUp size={16} /> Seasonal Milestone
                </motion.div>
                <h3 className="text-4xl sm:text-6xl md:text-[10rem] font-black text-white leading-[0.85] tracking-tighter italic">
                  ELITE<br /><span className="text-blue-600 md:ml-20">PRIME</span>
                </h3>
                <p className="text-slate-400 text-sm sm:text-xl md:text-2xl font-medium max-w-md leading-relaxed line-clamp-2 md:line-clamp-none">Redefining the boundaries of premium e-commerce performance.</p>
                <Link to="/products" className="btn-premium px-8 md:px-12 py-3.5 md:py-5 text-sm md:text-xl group w-fit flex items-center gap-3">
                  Start Experience <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-500" />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        <ProductSection
          title="CURATED EXCELLENCE"
          subtitle="Featured Selection"
          products={featuredData?.products}
          loading={featuredLoading}
          linkTo="/products?filter=featured"
          color="orange"
        />

        {/* Elite Hall of Fame (Bestsellers) */}
        <section className="bg-slate-950 py-28 md:py-40 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[150px] rounded-full translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-indigo-600/5 blur-[150px] rounded-full -translate-x-1/2"></div>

          <div className="container-custom relative z-10">
            <div className="flex flex-col items-center text-center mb-24">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-blue-500 font-black text-xs uppercase tracking-[0.6em] mb-6"
              >
                The Hall of Fame
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-white text-4xl sm:text-6xl md:text-[8rem] font-black italic tracking-tighter leading-none mb-4"
              >
                TITANS <span className="text-blue-600">'26</span>
              </motion.h2>
              <p className="text-slate-500 text-sm sm:text-lg md:text-xl font-medium max-w-lg mb-12">The most sought-after masterpieces in our global repository.</p>
              <div className="w-48 h-1.5 bg-linear-to-r from-transparent via-blue-600 to-transparent rounded-full"></div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
            >
              {bestLoading ? (
                [...Array(4)].map((_, i) => <div key={i} className="aspect-3/4 bg-slate-900 animate-pulse rounded-[3rem]"></div>)
              ) : (
                bestData?.products?.map(product => (
                  <motion.div key={product.id || product._id} variants={itemVariants}>
                    <ProductCard product={product} />
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </section>

        {/* Accessories / Finish Strip to fill space before footer */}
        <section className="container-custom pt-8 md:pt-12 pb-4 md:pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em]">
                Elite Accessories
              </span>
              <h3 className="mt-1.5 text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight italic">
                Complete your setup
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm hidden sm:block">
              Add finishing touches with cases, audio, and chargers designed to match your elite collection.
            </p>
          </div>

          <div className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2">
            {[
              'Premium Cases & Covers',
              'Chargers & Cables',
              'Audio & Headsets',
              'Stands & Docks',
              'Screen Protectors'
            ].map((label) => (
              <button
                key={label}
                className="whitespace-nowrap px-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-[11px] font-black uppercase tracking-[0.2em] text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md active:scale-95 transition-all"
              >
                {label}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
