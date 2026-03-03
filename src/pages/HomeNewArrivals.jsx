import React, { useEffect } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";  // Use React Query for fetching
import { getMiniProducts } from "../services/productApi";  // Your dynamic API function
import NewArrivalPC from "../components/Product/NewArrivalPC";  // Import the reusable product card


export default function HomeNewArrivals() {
  const navigate = useNavigate();

  const { data: productsData, isLoading, isError, error } = useQuery({
    queryKey: ["miniProducts", "home"],
    queryFn: () => getMiniProducts(1, 10),
  });


  // Handle navigation to product details page
  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
  };

  if (isLoading) {
    return <div className="text-center text-blue-600 font-black py-20 uppercase tracking-[0.5em] italic animate-pulse">Synchronizing...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-600">Error: {error.message}</div>;
  }

  const products = productsData?.products || [];

  return (
    <section className="py-5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block text-center italic">Newly Cataloged</span>
        <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-12 text-center italic uppercase tracking-tighter">
          LATEST <span className="text-blue-600">ARCHIVES.</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {/* Map through the fetched products and display them */}
          {products.map((product) => (
            <NewArrivalPC
              key={product._id}
              product={product}
              onProductClick={handleProductClick}  // Pass custom click handler if needed
            />
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/new-products")}
            className="
    bg-slate-950 text-white font-black px-12 py-4 rounded-2xl
    text-[10px] uppercase tracking-[0.4em] italic
    hover:bg-blue-600 transition-all shadow-2xl
    animate-[zoom_1.5s_ease-in-out_infinite]
  "
          >
            SYNC NEW ARCHIVES
          </button>
          <style>
            {`
@keyframes zoom {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
}
`}
          </style>

        </div>
      </div>
    </section>
  );
}
