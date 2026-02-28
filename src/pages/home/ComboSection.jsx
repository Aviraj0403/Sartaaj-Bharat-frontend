import React, { useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BestSellPC from "../../components/Product/ProductCard";
import { getMiniProducts } from "../../services/productApi";

export default function ComboSection({ categorySlug }) {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["isCombo", categorySlug],
    queryFn: () =>
      getMiniProducts(1, 100, "", categorySlug, "", "", "", "true"),
  });

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -carouselRef.current.offsetWidth / 2,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: carouselRef.current.offsetWidth / 2,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        if (
          carouselRef.current.scrollLeft +
          carouselRef.current.offsetWidth >=
          carouselRef.current.scrollWidth
        ) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({
            left: carouselRef.current.offsetWidth / 2,
            behavior: "smooth",
          });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <section className="bg-white relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block text-center italic">Optimized Packages</span>
        <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-12 text-center italic uppercase tracking-tighter">
          ARTIFACT <span className="text-blue-600">CLUSTERS.</span>
        </h2>

        <div className="relative group/carousel">
          <button
            onClick={scrollLeft}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-slate-950 text-white p-4 rounded-2xl shadow-2xl opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-blue-600 active:scale-90"
          >
            <FaChevronLeft className="text-sm" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-slate-950 text-white p-4 rounded-2xl shadow-2xl opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-blue-600 active:scale-90"
          >
            <FaChevronRight className="text-sm" />
          </button>

          <div
            ref={carouselRef}
            className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory py-2 px-2"
          >
            {data.products.map((product) => (
              <div
                key={product._id}
                className="flex-shrink-0 w-1/2 sm:w-60 md:w-52 lg:w-60"
              >
                <BestSellPC
                  product={product}
                  onProductClick={(id) => navigate(`/product/${id}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
