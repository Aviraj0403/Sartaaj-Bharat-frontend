import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";  // Using React Query for data fetching
import { getMiniProducts } from "../../services/productApi";  // Assuming this is your API function
import NewArrivalPC from "../../components/Product/NewArrivalPC";  // Import the reusable product card

const NewProducts = () => {
  const navigate = useNavigate();

  // Fetch new products from API using React Query
  const { data: productsData, isLoading, isError, error } = useQuery({
    queryKey: ["miniProducts", { page: 1, limit: 10, isBestSeller: true }],
    queryFn: getMiniProducts,
  });

  // Handle navigation to product details page
  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
  };

  // Loading state
  if (isLoading) {
    return <div className="text-center text-pink-600">Loading...</div>;
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
        <h2 className="text-2xl md:text-3xl font-bold text-pink-500 mb-6 text-center">
          New Arrivals
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <NewArrivalPC
              key={product._id}
              product={product}
              onProductClick={handleProductClick}  // Pass custom click handler
            />
          ))}
        </div>

     
      </div>
    </section>
  );
};

export default NewProducts;
