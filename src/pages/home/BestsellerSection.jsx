import React, { useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BestSellPC from "../../components/Product/ProductCard"; // Import the reusable ProductCard component
import { getMiniProducts } from "../../services/productApi"; // Import your product API

export default function BestsellerSection({ categorySlug }) {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  // Fetch products using React Query with the correct object signature
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["bestsellers", categorySlug],
    queryFn: () =>
      getMiniProducts(1, 100, "", categorySlug, "", "true", "", "", ""), // Fetch bestseller products with category filter
  });

  // Scroll functions
  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth / 2, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth / 2, behavior: "smooth" });
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        if (carouselRef.current.scrollLeft + carouselRef.current.offsetWidth >= carouselRef.current.scrollWidth) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth / 2, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <section className="bg-white relative ">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 text-center italic tracking-tighter uppercase">
          Elite <span className="text-blue-600 underline underline-offset-4 decoration-2">Classics</span>
        </h2>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 z-20 bg-white p-4 rounded-full shadow-2xl border border-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-500 group active:scale-90"
          >
            <FaChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2 z-20 bg-white p-4 rounded-full shadow-2xl border border-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-500 group active:scale-90"
          >
            <FaChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory py-2 px-2"
          >
            {data.products.map((product) => (
              <div key={product._id} className="flex-shrink-0 w-1/2 sm:w-60 md:w-52 lg:w-60">
                <BestSellPC
                  product={product}
                  onProductClick={(productId) => navigate(`/product/${productId}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

  );
}
