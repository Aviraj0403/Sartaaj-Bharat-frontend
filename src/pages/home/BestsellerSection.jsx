import { motion } from "framer-motion";
import React, { useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Sparkles, ArrowRight } from "lucide-react";
import ProductCard from "../../components/Product/ProductCard";
import { getMiniProducts } from "../../services/productApi";

export default function BestsellerSection({ categorySlug }) {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bestsellers", categorySlug],
    queryFn: () =>
      getMiniProducts(1, 20, "", categorySlug, "", "true", "", "", ""),
    staleTime: 10 * 60 * 1000,
  });

  const products = data?.products || [];

  const scrollLeft = () =>
    carouselRef.current?.scrollBy({
      left: -(carouselRef.current.offsetWidth * 0.6),
      behavior: "smooth",
    });
  const scrollRight = () =>
    carouselRef.current?.scrollBy({
      left: carouselRef.current.offsetWidth * 0.6,
      behavior: "smooth",
    });

  const [scrollProgress, setScrollProgress] = React.useState(0);

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const progress = (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 100;
    setScrollProgress(progress || 0);
  };

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const el = carouselRef.current;
      if (!el) return;
      if (el.scrollLeft + el.offsetWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: el.offsetWidth * 0.5, behavior: "smooth" });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#050b18] py-16 md:py-20 relative overflow-hidden">
      {/* CSS to reliably hide scrollbars across browsers */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Technical Grid Overlay - Slightly lower opacity */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-50"></div>

      {/* Background Deep Glows - Optimized size and blur */}
      <div className="absolute top-0 right-0 w-1/2 h-[400px] bg-blue-600/5 blur-[100px] rounded-full translate-x-1/4 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-[400px] bg-blue-900/5 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/2"></div>

      <div className="container-custom relative z-10">
        {/* Header - Tightened Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-blue-500 text-[9px] font-black uppercase tracking-[0.4em] mb-3 italic"
            >
              <Sparkles size={10} />
              ELITE_PROTOCOL
              <div className="w-6 h-[1px] bg-blue-500/20"></div>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-[42px] md:text-[75px] font-black italic uppercase tracking-tighter leading-[0.85] text-white"
            >
              BEST <span className="text-blue-600">SELLERS</span>
            </motion.h2>
          </div>

          <Link
            to="/category/bestsellers"
            className="group flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-all duration-300 self-center md:self-end mb-2"
          >
            VIEW_ALL
            <span className="w-8 h-[1px] bg-white/10 group-hover:w-16 group-hover:bg-blue-600 transition-all duration-300"></span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading && (
          <div className="flex gap-8 overflow-hidden py-6 justify-center">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-64 h-[400px] bg-white/5 rounded-[2rem] animate-pulse border border-white/5"
              />
            ))}
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-16 border border-white/5 rounded-3xl bg-white/2 backdrop-blur-xl">
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em] italic mb-6">
              DATA_SYNC_FAILURE
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-10 py-3 bg-white text-slate-950 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
            >
              RE-INITIATE
            </button>
          </div>
        )}

        {!isLoading && !isError && products.length > 0 && (
          <div className="relative group/carousel">
            {/* Custom Navigation - Refined */}
            <div className="absolute -left-10 top-[42%] -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hidden xl:block">
              <button
                onClick={scrollLeft}
                className="w-12 h-12 bg-white/5 backdrop-blur-xl rounded-full border border-white/5 flex items-center justify-center text-white hover:bg-white hover:text-slate-950 transition-all duration-300 active:scale-90 shadow-2xl"
              >
                <FaChevronLeft size={16} />
              </button>
            </div>
            
            <div className="absolute -right-10 top-[42%] -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hidden xl:block">
              <button
                onClick={scrollRight}
                className="w-12 h-12 bg-white/5 backdrop-blur-xl rounded-full border border-white/5 flex items-center justify-center text-white hover:bg-white hover:text-slate-950 transition-all duration-300 active:scale-90 shadow-2xl"
              >
                <FaChevronRight size={16} />
              </button>
            </div>

            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="flex items-stretch gap-6 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-12 px-2"
            >
              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex-shrink-0 w-[78%] xs:w-[70%] sm:w-60 md:w-64 lg:w-72 snap-center md:snap-start flex flex-col"
                >
                  <div className="w-full h-full group/card relative transition-all duration-300">
                    {/* Elite Hover Glow - Optimized */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 to-blue-400/0 rounded-[2rem] blur-xl group-hover/card:from-blue-600/10 group-hover/card:to-blue-400/10 transition-opacity duration-500 opacity-0 group-hover/card:opacity-100 pointer-events-none"></div>
                    
                    <div className="relative h-full w-full transition-transform duration-300 group-hover/card:translate-y-[-4px]">
                      <div className="bg-slate-900/60 backdrop-blur-sm rounded-[2rem] border border-white/5 overflow-hidden h-full shadow-xl">
                        <ProductCard product={product} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Technical Scroll Progress Bar - Tighter Positioning */}
            <div className="mt-6 max-w-lg mx-auto px-8">
              <div className="h-[1px] w-full bg-white/5 rounded-full relative overflow-hidden backdrop-blur-sm">
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-300 ease-out"
                  style={{ width: `${scrollProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black uppercase tracking-[0.4em] text-blue-500 italic">SYSTEM_STATUS</span>
                  <span className="text-[7px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1 flex items-center gap-1.5">
                       <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                       Operational v.24
                  </span>
                </div>
                <div className="text-right flex flex-col justify-end">
                  <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 italic">SYNC</span>
                  <span className="text-[7px] font-bold text-blue-500 uppercase tracking-[0.2em] mt-1">{Math.round(scrollProgress)}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}