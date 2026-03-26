import React, { useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
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
    <section className="bg-white py-2">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-blue-600 text-[9px] font-black uppercase tracking-[0.3em] mb-2">
              <Sparkles size={11} className="animate-pulse" /> Top Rated
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 italic tracking-tighter leading-none">
              Best<span className="text-blue-600">sellers</span>
            </h2>
          </div>
          <Link
            to="/category/bestsellers"
            className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors border-b-2 border-blue-200 hover:border-blue-600 pb-0.5"
          >
            View All →
          </Link>
        </div>

        {isLoading && (
          <div className="flex gap-5 overflow-hidden py-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-64 h-80 bg-slate-100 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest text-center py-10">
            Unable to load bestsellers
          </p>
        )}

        {!isLoading && !isError && products.length > 0 && (
          <div className="relative">
            {/* Scroll buttons */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white p-3 rounded-full shadow-xl border border-slate-100 hover:bg-blue-600 hover:text-white transition-all group hidden md:flex"
            >
              <FaChevronLeft
                size={14}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white p-3 rounded-full shadow-xl border border-slate-100 hover:bg-blue-600 hover:text-white transition-all group hidden md:flex"
            >
              <FaChevronRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>

            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-3"
            >
              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex-shrink-0 w-[48%] sm:w-56 md:w-60 lg:w-64 snap-start"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
