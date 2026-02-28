import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";  // Using React Query for data fetching
import { getMiniProducts } from "../../services/productApi";  // Assuming this is your API function
import NewArrivalPC from "../../components/Product/NewArrivalPC";  // Import the reusable product card

const NewProducts = () => {
  const navigate = useNavigate();

  // Fetch new products from API using React Query
  const { data: productsData, isLoading, isError, error } = useQuery({
    queryKey: ["miniProducts", { page: 1, limit: 1000, isBestSeller: false }],
    queryFn: getMiniProducts,
  });

  // Handle navigation to product details page
  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
  };

  // Loading state
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[60vh] text-blue-600 font-black uppercase tracking-[0.5em] italic animate-pulse">Syncing Archives...</div>;
  }

  // Error handling state
  if (isError) {
    return <div className="text-center text-red-600">Error: {error.message}</div>;
  }

  // Get the products list
  const products = productsData?.products || [];

  return (
    <section className="py-5 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block italic">Newly Logged Artifacts</span>
          <h2 className="text-3xl md:text-6xl font-black text-slate-950 italic uppercase tracking-tighter">
            LATEST <span className="text-blue-600">ARCHIVES.</span>
          </h2>
        </div>

        {/* Product Grid */}
        <div
          className="
    grid
    grid-cols-2
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    gap-3 lg:gap-4
  "
        >
          {products.map((product) => (
            <NewArrivalPC
              key={product._id}
              product={product}
              onProductClick={handleProductClick}
            />
          ))}
        </div>


      </div>
    </section>
  );
};

export default NewProducts;
