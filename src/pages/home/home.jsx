import React from 'react';
import { motion } from 'framer-motion';
import { useProducts, useCategories } from '../../hooks';
import Header from '../../components/Header/header.jsx';
import Footer from '../../components/Footer/footer.jsx';
import HeroSlider from '../../components/home/HeroSlider.jsx';
import ProductCard from '../../components/Product/ProductCard.jsx';
import { ArrowRight, Truck, ShieldCheck, Headphones, CreditCard, Sparkles, LayoutGrid } from 'lucide-react';
import { Link } from "react-router-dom";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const ProductSection = ({ title, subtitle, products, loading, linkTo, color = "blue" }) => (
  <section className="container-custom mb-24">
    <div className="flex justify-between items-end mb-10">
      <div>
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className={`text-${color === 'blue' ? 'blue-600' : 'orange-500'} font-bold text-sm uppercase tracking-[0.3em] mb-2 block`}
        >
          {subtitle}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="section-heading"
        >
          {title}
        </motion.h2>
      </div>
      <Link to={linkTo} className="btn-premium-outline group">
        View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
    >
      {loading ? (
        [...Array(4)].map((_, i) => (
          <div key={i} className="h-[450px] bg-slate-200 animate-pulse rounded-[2.5rem]"></div>
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
  <section className="container-custom mb-24">
    <div className="flex justify-between items-end mb-10">
      <div>
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-blue-600 font-bold text-sm uppercase tracking-[0.3em] mb-2 block"
        >
          Curated Departments
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="section-heading"
        >
          Shop by Category
        </motion.h2>
      </div>
      <Link to="/categories" className="btn-premium-outline group">
        Explore All <LayoutGrid size={18} className="group-hover:rotate-90 transition-transform duration-500" />
      </Link>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
      {loading ? (
        [...Array(8)].map((_, i) => (
          <div key={i} className="aspect-square bg-slate-200 animate-pulse rounded-3xl"></div>
        ))
      ) : (
        categories?.slice(0, 8).map((cat, idx) => (
          <motion.div
            key={cat._id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -8 }}
            className="group cursor-pointer"
          >
            <Link to={`/category/${cat.slug}`} className="flex flex-col items-center">
              <div className="w-full aspect-square bg-white border border-slate-100 rounded-3xl p-6 flex items-center justify-center mb-4 group-hover:shadow-2xl group-hover:border-blue-100 transition-all duration-500 group-hover:bg-blue-50/30">
                <img
                  src={cat.image || 'https://prestashop.codezeel.com/PRS23/PRS230560/default/img/c/1-category_default.jpg'}
                  alt={cat.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-blue-600 text-center transition-colors">
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
  // Pro-level data fetching with React Query
  const { data: latestData, isLoading: latestLoading } = useProducts({ limit: 4 });
  const { data: featuredData, isLoading: featuredLoading } = useProducts({ limit: 4, isFeatured: 'true' });
  const { data: bestData, isLoading: bestLoading } = useProducts({ limit: 4, isBestSeller: 'true' });
  const { data: categories, isLoading: catsLoading } = useCategories();

  const features = [
    { icon: Truck, title: "Swift Delivery", desc: "Eco-friendly shipping storewide", color: "blue" },
    { icon: ShieldCheck, title: "Buyer Protection", desc: "Security at every checkout", color: "orange" },
    { icon: Headphones, title: "Elite Support", desc: "Expert assistance anytime", color: "blue" },
    { icon: CreditCard, title: "Returns Simplified", desc: "Hassle-free 30-day policy", color: "orange" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-blue-600 selection:text-white">
      <Header />

      <main className="flex-1 pb-20 overflow-hidden">
        <HeroSlider />

        {/* Features Bar */}
        <section className="container-custom my-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group p-10 glass-surface rounded-[2.5rem] hover:bg-slate-900 transition-smooth cursor-default active:scale-95 border border-white/50 shadow-sm"
              >
                <div className={`p-4 rounded-2xl mb-6 inline-block ${feature.color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'} group-hover:bg-blue-600 group-hover:text-white transition-smooth`}>
                  <feature.icon size={32} strokeWidth={2} />
                </div>
                <h4 className="font-black text-2xl text-slate-800 group-hover:text-white transition-smooth mb-3 italic tracking-tight">{feature.title}</h4>
                <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-smooth font-bold leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <CategorySection categories={categories} loading={catsLoading} />

        <ProductSection
          title="LATEST ARRIVALS"
          subtitle="Just Landed"
          products={latestData?.products}
          loading={latestLoading}
          linkTo="/products"
        />

        {/* Major Promo Banner */}
        <section className="container-custom mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[4rem] overflow-hidden group h-[500px] shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2000&auto=format&fit=crop"
              alt="Elite Promo"
              className="w-full h-full object-cover transition-smooth group-hover:scale-110 duration-[10s]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent flex items-center p-12 md:p-32">
              <div className="max-w-xl space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 bg-blue-600/20 backdrop-blur-md border border-blue-600/30 text-blue-400 text-xs font-black px-6 py-3 rounded-full uppercase tracking-widest w-fit"
                >
                  <Sparkles size={16} /> Season Exclusive
                </motion.div>
                <h3 className="text-5xl md:text-8xl font-black text-white leading-[1] tracking-tighter italic">
                  THE ELITE<br /><span className="text-blue-500 text-6xl md:text-9xl">V.2</span>
                </h3>
                <p className="text-slate-300 text-xl font-medium max-w-md leading-relaxed">Experience technology like never before with our most advanced collection yet.</p>
                <button className="btn-premium px-12 py-5 text-xl">
                  Shop Experience <ArrowRight size={26} />
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        <ProductSection
          title="FEATURED SELECTION"
          subtitle="Top Rated"
          products={featuredData?.products}
          loading={featuredLoading}
          linkTo="/products?filter=featured"
          color="orange"
        />

        {/* Bestsellers Grid */}
        <section className="bg-slate-900 py-32 mb-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[150px] rounded-full translate-x-1/2"></div>
          <div className="container-custom relative z-10">
            <div className="flex flex-col items-center text-center mb-20">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-blue-400 font-bold text-sm uppercase tracking-[0.5em] mb-4 block"
              >
                Hall of Fame
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-white text-5xl md:text-7xl font-black mb-6 italic tracking-tight"
              >
                BESTSELLERS <span className="text-blue-600">'26</span>
              </motion.h2>
              <div className="w-40 h-2 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.6)]"></div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
              {bestLoading ? (
                [...Array(4)].map((_, i) => <div key={i} className="h-[450px] bg-slate-800 animate-pulse rounded-[2.5rem]"></div>)
              ) : (
                bestData?.products?.map(product => (
                  <motion.div key={product.id || product._id} variants={itemVariants} whileHover={{ y: -15 }}>
                    <ProductCard product={product} />
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
