import React from "react";
import { useProducts, useCategories } from "../../hooks";
import { useViewport } from "../../hooks/useViewport";
import EliteHeroSlider from "../../components/home/EliteHeroSlider.jsx";
import ProductCard from "../../components/Product/ProductCard.jsx";
import BestsellerSection from "./BestsellerSection.jsx";
import AccessoriesShowcase from "../../components/home/AccessoriesShowcase.jsx";
import { ArrowRight, Sparkles, TrendingUp, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Headphones, Award, Shield, Truck, Clock } from "lucide-react";
import { Star } from "lucide-react";

// Stable Query Parameters
const LATEST_PARAMS = { limit: 4 };
const FEATURED_PARAMS = { limit: 4, isFeatured: "true" };

const ProductSection = ({
  title,
  subtitle,
  products,
  loading,
  linkTo,
  color = "blue",
}) => (
  <section className="container-custom mb-8 md:mb-12">
    <div className="flex items-end justify-between mb-4 md:mb-6 gap-4 border-b border-slate-100 pb-3">
      <div className="max-w-[70%] md:max-w-xl">
        <div className="flex items-center gap-2 mb-1.5">
          <div
            className={`h-0.5 w-6 rounded-full ${color === "blue" ? "bg-blue-600" : "bg-orange-500"}`}
          ></div>
          <span
            className={`${color === "blue" ? "text-blue-600" : "text-orange-500"} font-bold text-[10px] uppercase tracking-widest`}
          >
            {subtitle}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase">
          {title}
        </h2>
      </div>
      <Link
        to={linkTo}
        className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-all whitespace-nowrap"
      >
        VIEW ALL
        <ArrowRight
          size={14}
          className="group-hover:translate-x-1 transition-transform"
        />
      </Link>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {loading
        ? [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="aspect-[4/5] bg-slate-50 animate-pulse rounded-xl"
            ></div>
          ))
        : products?.map((product) => (
            <div key={product.id || product._id}>
              <ProductCard product={product} />
            </div>
          ))}
    </div>
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
    <section className="container-custom mb-8 md:mb-12 relative">
      <div className="flex items-end justify-between mb-4 px-2 gap-4">
        <div className="max-w-[75%] md:max-w-xl">
          <span className="text-blue-600 font-bold text-[10px] uppercase tracking-widest mb-1 block">
            OUR COLLECTIONS
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase">
            SHOP BY <span className="text-blue-600">CATEGORY</span>
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/categories"
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-all"
          >
            BROWSE ALL
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              <ArrowRight className="rotate-180" size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar gap-4 sm:gap-6 px-2 pb-2 scroll-smooth"
      >
        {loading
          ? [...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-24 h-24 md:w-32 bg-slate-50 animate-pulse rounded-full"
              ></div>
            ))
          : categories?.map((cat) => (
              <div
                key={cat._id}
                className="flex-shrink-0"
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className="flex flex-col items-center w-22 md:w-28"
                >
                  <div className="w-full aspect-square rounded-full bg-slate-50 border border-slate-100 p-3 flex items-center justify-center mb-2 hover:border-blue-600 hover:shadow-md transition-all relative overflow-hidden">
                    <img
                      src={
                        (Array.isArray(cat.image) ? cat.image[0] : cat.image) ||
                        "https://via.placeholder.com/300?text=Category"
                      }
                      alt={cat.name}
                      className="w-[75%] h-[75%] object-contain"
                    />
                  </div>
                  <span className="block text-[10px] font-bold uppercase tracking-tight text-slate-800 text-center px-1 truncate w-full">
                    {cat.name}
                  </span>
                </Link>
              </div>
            ))}
      </div>
    </section>
  );
};

const Home = () => {
  const { data: latestData, isLoading: latestLoading } = useProducts(LATEST_PARAMS);
  const { data: featuredData, isLoading: featuredLoading } = useProducts(FEATURED_PARAMS);
  const { data: categories, isLoading: catsLoading } = useCategories();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 pb-8 md:pb-12 overflow-hidden">
        <EliteHeroSlider />

        <div className="mt-4 md:mt-8">
          <DepartmentScroll categories={categories} loading={catsLoading} />
        </div>

        {/* Brand Stats */}
      <section className="mb-8 md:mb-12 px-4">
  <div className="bg-[#050b18] rounded-2xl overflow-hidden shadow-lg">
    <div className="py-8 md:py-10 px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 text-center">
          {[
            { label: "Global Presence", value: "45+", sub: "Countries", icon: Globe },
            { label: "Elite Users", value: "1M+", sub: "Premium Clients", icon: Sparkles },
            { label: "Express Dispatch", value: "24h", sub: "Delivery", icon: Zap },
            { label: "Premium Support", value: "24/7", sub: "Expert Help", icon: Headphones },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center"
            >
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 mb-2">
                <stat.icon className="text-blue-500" size={16} />
              </div>
              <span className="text-xl md:text-2xl font-black text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-blue-400 font-bold uppercase tracking-widest text-[8px] mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
    </div>
  </div>
</section>

        <ProductSection
          title="LATEST ARRIVALS"
          subtitle="FRESH PICKS"
          products={latestData?.products}
          loading={latestLoading}
          linkTo="/products"
        />

        {/* Feature Promo */}
     <section className="mb-8 md:mb-12 px-4">
  <div className="bg-slate-950 rounded-2xl relative overflow-hidden shadow-lg h-[300px] md:h-[400px]">
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2000&auto=format&fit=crop"
        alt="Promo"
        className="w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"></div>
    </div>
    
    <div className="absolute inset-0 flex items-center px-8 md:px-16">
      <div className="max-w-xl space-y-4">
        <div className="bg-blue-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest w-fit">
          LIMITED OFFERS
        </div>

        <h3 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase">
          UPGRADE YOUR
          <br />
          <span className="text-blue-600">LIFESTYLE.</span>
        </h3>

        <p className="text-slate-400 text-[10px] md:text-xs font-medium max-w-sm leading-relaxed uppercase tracking-widest">
          Premium technology crafted for the modern Indian home.
        </p>

        <div>
          <Link
            to="/products"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-white hover:text-slate-950 transition-all flex items-center gap-2 w-fit"
          >
            SHOP NOW
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

        <ProductSection
          title="FEATURED SELECTION"
          subtitle="TOP PRODUCTS"
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

