import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsByCategorySlug } from "../../services/productApi"; // Import the new API function
import { FaStar, FaHeart } from "react-icons/fa";

export default function CategoryDetails() {
  const { categorySlug } = useParams(); // Get the categorySlug from URL params
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryName, setCategoryName] = useState(""); // State for category name

  // Fetch products by category and set the category name
  const fetchProducts = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProductsByCategorySlug(categorySlug, page, 20);
      if (data.success) {
        setProducts(data.products);
        console.log(data.products);
        setPagination(data.pagination);
        setCurrentPage(page);

        // Check if category name is provided in the response
        if (data.categoryName) {
          setCategoryName(data.categoryName); // Set the category name if provided
        } else {
          setCategoryName(categorySlug); // Fallback to categorySlug if no category name
        }
      } else {
        setError("Failed to load products");
      }
    } catch (error) {
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [categorySlug, currentPage]);

  // Calculate discount for products
  const calculateDiscount = (originalPrice, discountedPrice) => {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  };

  // Navigate to product detail page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* 🆕 Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-pink-500 mb-8 text-center">
          {categoryName || categorySlug}
        </h2>

        {/* 🛍️ Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.length === 0 ? (
            <div>No products found in this category.</div>
          ) : (
            products.map((product) => {
              const discount = calculateDiscount(product.originalAmnt, product.discountedPrice);

              return (
                <div
                  key={product._id}
                  className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 relative group p-3 flex flex-col justify-between overflow-hidden"
                >
                  {/* ❤️ Heart Icon */}
                  <div className="absolute top-3 right-3 z-20 text-pink-500 cursor-pointer opacity-80 hover:opacity-100 transition text-lg">
                    <FaHeart />
                  </div>

                  {/* 🏷️ Discount Badge */}
                  {product?.discount > 0 && (
                    <div className="absolute top-3 left-3 z-20 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                      {product.discount}% OFF
                    </div>
                  )}

                  {/* 🖼️ Product Image */}
                  <div
                    className="w-full h-24 md:h-36 flex justify-center items-center mb-2 cursor-pointer relative z-10"
                    onClick={() => handleProductClick(product._id)}
                  >
                    <img
                      src={product.pimage}
                      alt={product.name}
                      className="h-full object-contain transition-transform duration-300 group-hover:scale-105 relative z-10"
                    />
                  </div>

                  {/* 🏷️ Product Info */}
                  <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-1 text-left">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-2 text-left">
                    {product.description}
                  </p>

                  {/* 💰 Price and Rating */}
                  <div className="flex justify-between items-center mb-2 px-1 text-sm">
                    <div className="flex items-center gap-1">
                      <p className="text-pink-500 font-medium text-sm">
                        ₹{product.discountedPrice}
                      </p>
                      <p className="text-gray-400 line-through text-xs">
                        ₹{product.originalAmnt}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 text-xs" />
                      <span className="ml-1 text-gray-600 text-xs">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  {/* 🛒 Buttons */}
                  <div className="flex flex-col md:flex-row gap-2">
                    <button className="flex-1 bg-pink-500 text-white font-semibold py-1 rounded-lg hover:bg-pink-600 transition text-sm">
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleProductClick(product._id)}
                      className="flex-1 border border-pink-500 text-pink-500 font-semibold py-1 rounded-lg hover:bg-pink-50 transition text-sm"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => fetchProducts(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-4 py-2 bg-pink-500 text-white rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className="mx-4">{currentPage} / {pagination.totalPages}</span>
            <button
              onClick={() => fetchProducts(currentPage + 1)}
              disabled={currentPage >= pagination.totalPages}
              className="px-4 py-2 bg-pink-500 text-white rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
