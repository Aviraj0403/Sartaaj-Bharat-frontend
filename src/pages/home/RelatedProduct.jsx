import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategorySlug } from "../../services/productApi"; // Adjust path if necessary
import ProductCard from "../../components/Product/ProductCard"; // Assuming ProductCard is a reusable component

export default function RelatedProduct({ categorySlug }) {
  const scrollRef = useRef(null);

  // Fetch related products by category using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["relatedProducts", categorySlug],
    queryFn: () => getProductsByCategorySlug(categorySlug, 1, 12),
    enabled: !!categorySlug, // Ensure query is triggered if categorySlug is available
  });

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading related products...</div>;
  }

  if (error) {
    return <div>Error loading related products</div>;
  }

  return (
    <section className="py-10 bg-slate-50 w-full overflow-hidden border-t border-slate-100">
      <div className="w-full max-w-[100vw] px-4">
        <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-3 block text-center italic">Neural Match</span>
        <h2 className="text-2xl md:text-4xl font-black text-slate-950 mb-6 text-center italic uppercase tracking-tighter">
          SIMILAR <span className="text-blue-600">ARTIFACTS.</span>
        </h2>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing select-none snap-x snap-mandatory pb-4"
        >
          {data?.products?.map((product) => (
            <div key={product._id} className="snap-start flex-shrink-0 w-[47.5%] md:w-[18%]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
