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
      getMiniProducts(1, 12, "", categorySlug, "", "true", "", "", ""),
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

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const el = carouselRef.current;
      if (!el) return;
      if (el.scrollLeft + el.offsetWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: el.offsetWidth * 0.5, behavior: "smooth" });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#050b18] py-8 md:py-12 relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-8 gap-4 border-b border-white/5 pb-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 text-blue-500 text-[10px] font-bold uppercase tracking-widest mb-2">
              <Sparkles size={12} />
              BEST SELLING PRODUCTS
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              BEST <span className="text-blue-600">SELLERS</span>
            </h2>
          </div>

          <Link
            to="/category/bestsellers"
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-white transition-all duration-300"
          >
            VIEW ALL
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading && (
          <div className="flex gap-4 overflow-hidden py-4 justify-center">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-64 h-[350px] bg-white/5 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-12 border border-white/5 rounded-2xl bg-white/5">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">
              Unable to load products
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-2.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && products.length > 0 && (
          <div className="relative group/carousel">
            <div
              ref={carouselRef}
              className="flex items-stretch gap-4 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 px-2"
            >
              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex-shrink-0 w-[80%] xs:w-[70%] sm:w-60 md:w-64 lg:w-72 snap-center md:snap-start"
                >
                   <div className="bg-slate-900/40 rounded-2xl border border-white/5 overflow-hidden h-full">
                      <ProductCard product={product} />
                   </div>
                </div>
              ))}
            </div>

            {/* Simple Navigation Buttons */}
            <div className="hidden xl:flex justify-center gap-4 mt-6">
               <button
                onClick={scrollLeft}
                className="w-10 h-10 bg-white/5 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-all"
              >
                <FaChevronLeft size={14} />
              </button>
              <button
                onClick={scrollRight}
                className="w-10 h-10 bg-white/5 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-all"
              >
                <FaChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}